'use strict'

function isString(value) {
    return (typeof value).toLowerCase() === 'string'
}

function isNumber(value) {
    return (typeof value).toLowerCase() === 'number'
}

function createTimeout(desc, timeout, cb) {
    return setTimeout(() => {
        const message = `${isString(desc) ? desc : 'Promise'} has timed out after ${timeout}ms`
        const err = new Error(message)
        err.stack = `Error: ${message}`
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
 * Clear timeout and return / throw. Useful in .then()
 * @param {object} timeout Timeout handle returned by setTimeout
 * @param {any} [res] What to return after clearing
 * @param {Error} [err] What to throw after clearing
 */
function transientClearTimeout(timeout, res, err) {
    clearTimeout(timeout)
    if (err) throw err
    return res
}

/**
 * Create a promise which will be rejected after a timeout.
 * @param {Promise} promise A promise to race with
 * @param {Number} timeout Timeout in ms after which to reject
 * @param {string} desc Description of a promise to be printed in error
 * @returns {Promise} A promise with a timeout
 */
function createPromiseWithTimeout(promise, timeout, desc) {
    try {
        if (!(promise instanceof Promise)) {
            throw new Error('Promise expected')
        }
        if (!isNumber(timeout)) {
            throw new Error('Timeout must be a number')
        }
        if (timeout < 0) {
            throw new Error('Timeout cannot be negative')
        }
    } catch (err) {
        return Promise.reject(err)
    }

    const timeoutPromise = makeTimeoutPromise(desc, timeout)
    return Promise.race([
        promise,
        timeoutPromise.promise,
    ]).then(
        transientClearTimeout.bind(null, timeoutPromise.timeout),
        transientClearTimeout.bind(null, timeoutPromise.timeout, null)
    )
}

module.exports = createPromiseWithTimeout
