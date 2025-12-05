'use client'

import { INFINITE_SCROLL_PAGINATION_RESULTS } from '@/config'
import { ExtendedPost } from '@/types/db'
import { useIntersection } from '@mantine/hooks'
import { useInfiniteQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import { FC, useEffect, useRef } from 'react'
import Post from './Post'
import { useSession } from 'next-auth/react'
import { FeedSort, getNextFeedPage } from '@/lib/feed'

interface PostFeedProps {
  initialPosts: ExtendedPost[]
  subredditName?: string
  sort?: FeedSort
}

const PostFeed: FC<PostFeedProps> = ({ initialPosts, subredditName, sort = 'newest' }) => {
  const lastPostRef = useRef<HTMLElement>(null)
  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 1,
  })
  const { data: session } = useSession()

  const { data, fetchNextPage, isFetchingNextPage, hasNextPage, isError } = useInfiniteQuery(
    ['posts', subredditName ?? 'home', sort, session?.user.id ?? 'anonymous'],
    async ({ pageParam = 1 }) => {
      const query =
        `/api/posts?limit=${INFINITE_SCROLL_PAGINATION_RESULTS}&page=${pageParam}&sort=${sort}` +
        (subredditName ? `&subredditName=${encodeURIComponent(subredditName)}` : '')

      const { data } = await axios.get(query)
      return data as ExtendedPost[]
    },

    {
      getNextPageParam: (lastPage, pages) =>
        getNextFeedPage(lastPage, pages.length, INFINITE_SCROLL_PAGINATION_RESULTS),
      initialData: { pages: [initialPosts], pageParams: [1] },
    }
  )

  useEffect(() => {
    if (entry?.isIntersecting && hasNextPage && !isFetchingNextPage && !isError) {
      fetchNextPage() // Load more posts when the last post comes into view
    }
  }, [entry, fetchNextPage, hasNextPage, isFetchingNextPage, isError])

  const posts = data?.pages.flatMap((page) => page) ?? initialPosts

  return (
    <ul className='flex flex-col col-span-2 space-y-6'>
      {posts.length === 0 && (
        <li className='rounded-xl border border-indigo-100 bg-white p-10 text-center'>
          <h2 className='font-semibold text-slate-900'>Start a conversation</h2>
          <p className='mt-2 text-sm text-slate-500'>Join a community or create one to fill your feed.</p>
        </li>
      )}
      {posts.map((post, index) => {
        const votesAmt = post.votes.reduce((acc, vote) => {
          if (vote.type === 'UP') return acc + 1
          if (vote.type === 'DOWN') return acc - 1
          return acc
        }, 0)

        const currentVote = post.votes.find(
          (vote) => vote.userId === session?.user.id
        )

        if (index === posts.length - 1) {
          // Add a ref to the last post in the list
          return (
            <li key={post.id} ref={ref}>
              <Post
                post={post}
                commentAmt={post.comments.length}
                subredditName={post.subreddit.name}
                votesAmt={votesAmt}
                currentVote={currentVote}
              />
            </li>
          )
        } else {
          return (
            <li key={post.id}>
              <Post
                post={post}
                commentAmt={post.comments.length}
                subredditName={post.subreddit.name}
                votesAmt={votesAmt}
                currentVote={currentVote}
              />
            </li>
          )
        }
      })}

      {isFetchingNextPage && (
        <li className='flex justify-center'>
          <Loader2 className='w-6 h-6 text-zinc-500 animate-spin' />
        </li>
      )}
      {isError && (
        <li className='rounded-lg border bg-white p-4 text-center text-sm' role='alert'>
          Could not load more posts.{' '}
          <button className='font-semibold text-indigo-700 underline' onClick={() => fetchNextPage()}>
            Try again
          </button>
        </li>
      )}
    </ul>
  )
}

export default PostFeed
