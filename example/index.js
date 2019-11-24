import promto from '../src'

/**
 * @param {number} timeout
 * @param {string|Error} result
 */
const makePromise = async (timeout, result) => {
  await new Promise((resolve) => {
    setTimeout(resolve, timeout || 200)
  })
  if (result instanceof Error) throw result
  return result
}

(async () => {
  // ok
  const res = await promto(makePromise(50, 'hello'), 100)
  console.log(res)
  // rejected timeout
  try {
    await promto(makePromise(150, 'world'), 100)
  } catch (err) {
    console.log(err.message)
  }
  // rejected timeout with description
  try {
    await promto(makePromise(150, 'world'), 100, 'Example')
  } catch (err) {
    console.log(err.message)
  }
  // rejected promise
  try {
    await promto(makePromise(50, new Error('Error in promise')), 100)
  } catch (err) {
    console.log(err.message)
  }
})()