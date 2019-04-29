import promto from '../../src'
import { throws, equal } from 'zoroaster/assert'

const makePromise = async (timeout, result) => {
  await new Promise((resolve) => {
    setTimeout(resolve, timeout || 200)
  })
  if (result instanceof Error) throw result
  return result
}

export const TimedOut = {
  async 'times out with default message'() {
    const n = 100
    const promise = makePromise()
    await throws({
      fn: promto,
      args: [promise, n],
      message: /Promise has timed out after 100ms/,
    })
  },
  async 'times out with description'() {
    const desc = 'Timeout Promise'
    const n = 100
    const promise = makePromise()
    await throws({
      fn: promto,
      args: [promise, n, desc],
      message: `${desc} has timed out after 100ms`,
    })
  },
  async 'fails when not passing timeout'() {
    const promise = makePromise()
    await throws({
      fn: promto,
      args: promise,
      message: 'Timeout must be a number',
    })
  },
  async 'fails when passing negative timeout'() {
    const promise = makePromise()
    await throws({
      fn: promto,
      args: [promise, -100],
      message: 'Timeout cannot be negative',
    })
  },
  async 'fails when not passing a promise'() {
    await throws({
      fn: promto,
      message: 'Promise expected',
    })
  },
}

export const NotTimedOut = {
  async 'resolves with promise\'s result'() {
    const result = 'test-result'
    const promise = makePromise(100, result)
    const res = await promto(promise, 200)
    equal(res, result)
  },
  async 'fails with promise\'s error'() {
    const error = new Error('test-error')
    const promise = makePromise(100, error)
    await throws({
      fn: promto,
      args: [promise, 200],
      error,
    })
  },
}
