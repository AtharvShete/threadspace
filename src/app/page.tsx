import CustomFeed from '@/components/homepage/CustomFeed'
import GeneralFeed from '@/components/homepage/GeneralFeed'
import { buttonVariants } from '@/components/ui/Button'
import { getAuthSession } from '@/lib/auth'
import { Home as HomeIcon } from 'lucide-react'
import Link from 'next/link'
import FeedSortTabs from '@/components/FeedSortTabs'
import { parseFeedSort } from '@/lib/feed'
import { cn } from '@/lib/utils'

export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

export default async function Home({ searchParams }: {
  searchParams: Promise<{ sort?: string | string[] }>
}) {
  const session = await getAuthSession()
  const sort = parseFeedSort((await searchParams).sort)

  return (
    <>
      <section className='mb-8 rounded-2xl bg-indigo-950 px-6 py-8 text-white md:px-10 md:py-10'>
        <p className='mb-3 text-xs font-semibold uppercase tracking-widest text-indigo-200'>Your people. Your conversations.</p>
        <h1 className='text-3xl font-bold tracking-tight md:text-4xl'>Find your corner of the internet.</h1>
        <p className='mt-3 max-w-xl text-sm leading-6 text-indigo-100'>Share an idea, ask a question, and discover communities that feel like home.</p>
        <Link href='/r/create' className={cn(buttonVariants(), 'mt-6 bg-white text-indigo-950 hover:bg-indigo-100')}>Create a community</Link>
      </section>
      <div className='flex items-center justify-between'>
        <h2 className='text-2xl font-bold tracking-tight'>{session ? 'Your community feed' : 'Explore conversations'}</h2>
        <span className='hidden text-sm text-slate-500 sm:block'>A little curiosity goes a long way</span>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-y-6 md:gap-x-6 py-6'>
        <div className='md:col-span-2'>
          <FeedSortTabs sort={sort} />
          {session ? <CustomFeed sort={sort} /> : <GeneralFeed sort={sort} />}
        </div>

        {/* subreddit info */}
        <aside className='overflow-hidden h-fit rounded-xl border border-indigo-100 bg-white md:sticky md:top-24'>
          <div className='bg-indigo-50 px-6 py-4 text-indigo-900'>
            <p className='font-semibold py-3 flex items-center gap-1.5'>
              <HomeIcon className='h-4 w-4' />
              Welcome to Threadspace
            </p>
          </div>
          <div className='px-6 py-4 text-sm leading-6'>
            <div className='flex justify-between gap-x-4 py-3'>
              <p className='text-zinc-500'>
                A space for thoughtful conversations. Join your favorite communities, share what you know, and meet people who share your interests.
              </p>
            </div>

            <Link
              className={buttonVariants({
                className: 'w-full mt-4 mb-6',
              })}
              href={`/r/create`}>
              Create Community
            </Link>
          </div>
          <div className='border-t border-indigo-100 px-6 py-5'>
            <h3 className='text-sm font-semibold'>Make this a good place to be</h3>
            <ul className='mt-3 space-y-2 text-sm text-slate-500'>
              <li>Be curious and respectful.</li>
              <li>Give credit where it belongs.</li>
              <li>Contribute something worth discussing.</li>
            </ul>
          </div>
        </aside>
      </div>
    </>
  )
}
