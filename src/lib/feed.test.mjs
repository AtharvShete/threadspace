import assert from 'node:assert/strict'
import test from 'node:test'

async function feedHelpers() {
  try {
    return await import('./feed.ts')
  } catch (error) {
    if (error.code === 'ERR_MODULE_NOT_FOUND') {
      assert.fail('Feed sorting is not implemented yet')
    }
    throw error
  }
}

test('unknown and repeated sort parameters fall back to newest', async () => {
  const { parseFeedSort } = await feedHelpers()
  for (const value of [undefined, null, '', 'invalid', ['discussed', 'newest']]) {
    assert.equal(parseFeedSort(value), 'newest')
  }
  assert.equal(parseFeedSort('discussed'), 'discussed')
})

test('most discussed query ranks comment counts with deterministic ties', async () => {
  const { getFeedOrderBy } = await feedHelpers()
  assert.deepEqual(getFeedOrderBy('discussed'), [
    { comments: { _count: 'desc' } },
    { createdAt: 'desc' },
    { id: 'desc' },
  ])
})

test('newest query ranks creation time with deterministic ties', async () => {
  const { getFeedOrderBy } = await feedHelpers()
  assert.deepEqual(getFeedOrderBy('newest'), [
    { createdAt: 'desc' },
    { id: 'desc' },
  ])
})

test('pagination stops after a short or empty page', async () => {
  const { getNextFeedPage } = await feedHelpers()
  assert.equal(getNextFeedPage([{}, {}], 3, 2), 4)
  assert.equal(getNextFeedPage([{}], 3, 2), undefined)
  assert.equal(getNextFeedPage([], 3, 2), undefined)
})
