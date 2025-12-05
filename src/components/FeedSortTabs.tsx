import { FeedSort } from '@/lib/feed'
import { cn } from '@/lib/utils'
import Link from 'next/link'

export default function FeedSortTabs({ sort }: { sort: FeedSort }) {
  return (
    <nav aria-label='Feed sorting' className='mb-6 flex gap-2 rounded-xl border border-indigo-100 bg-white p-2 shadow-xs'>
      {([['newest', 'Newest'], ['discussed', 'Most discussed']] as const).map(([value, label]) => (
        <Link
          key={value}
          href={`/?sort=${value}`}
          aria-current={sort === value ? 'page' : undefined}
          className={cn('rounded-lg px-4 py-2 text-sm font-semibold transition-colors',
            sort === value ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-indigo-50')}>
          {label}
        </Link>
      ))}
    </nav>
  )
}
