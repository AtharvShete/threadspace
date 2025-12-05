import type { Prisma } from '@prisma/client'

export type FeedSort = 'newest' | 'discussed'

export function parseFeedSort(value: unknown): FeedSort {
  return value === 'discussed' ? 'discussed' : 'newest'
}

export function getFeedOrderBy(sort: FeedSort): Prisma.PostOrderByWithRelationInput[] {
  const recent: Prisma.PostOrderByWithRelationInput[] = [
    { createdAt: 'desc' },
    { id: 'desc' },
  ]
  return sort === 'discussed'
    ? [{ comments: { _count: 'desc' } }, ...recent]
    : recent
}

export function getNextFeedPage(lastPage: unknown[], pageCount: number, limit: number) {
  return lastPage.length < limit ? undefined : pageCount + 1
}
