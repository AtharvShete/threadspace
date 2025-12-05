import { db } from '@/lib/db'
import PostFeed from '../PostFeed'
import { INFINITE_SCROLL_PAGINATION_RESULTS } from '@/config'
import { FeedSort, getFeedOrderBy } from '@/lib/feed'

const GeneralFeed = async ({ sort }: { sort: FeedSort }) => {
  const posts = await db.post.findMany({
    orderBy: getFeedOrderBy(sort),
    include: {
      votes: true,
      author: true,
      comments: true,
      subreddit: true,
    },
    take: INFINITE_SCROLL_PAGINATION_RESULTS, // 4 to demonstrate infinite scroll, should be higher in production
  })

  return <PostFeed key={sort} initialPosts={posts} sort={sort} />
}

export default GeneralFeed
