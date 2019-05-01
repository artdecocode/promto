function createTimeout(desc, timeout, cb) {
  return setTimeout(() => {
    const message = `${desc ? desc : 'Promise'} has timed out after ${timeout}ms`
    const err = new Error(message)
    err.stack = `Error: ${err.message}`
    cb(err)
  }, timeout)
}

function makeTimeoutPromise(desc, timeout) {
  let to
  const promise = new Promise((_, reject) => {
    to = createTimeout(desc, timeout, reject)
  })
  return { timeout: to, promise }
}

/**
 * Create a promise which will be rejected after a timeout.
 * @param {!Promise} promise A promise to race with
 * @param {number} timeout Timeout in ms after which to reject
 * @param {string} [desc] Description of a promise to be printed in error
 * @returns {!Promise} A promise with a timeout
 */
export default async function createPromiseWithTimeout(promise, timeout, desc) {
  if (!(promise instanceof Promise))
    throw new Error('Promise expected')
  if (!timeout)
    throw new Error('Timeout must be a number')
  if (timeout < 0)
    throw new Error('Timeout cannot be negative')

  const { promise: toPromise, timeout: to } = makeTimeoutPromise(desc, timeout)
  try {
    return await Promise.race([
      promise,
      toPromise,
    ])
  } finally {
    clearTimeout(to)
  }
}