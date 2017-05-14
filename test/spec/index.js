const promto = require('../../')
const assert = require('assert')

const makePromise = (timeout) => {
    return new Promise((resolve) => {
        setTimeout(resolve, timeout || 200)
    })
}

const TimedOut = {
    'should timeout with default message': () => {
        const n = 100
        const promise = makePromise()
        return promto(promise, n)
            .then(() => {
                throw new Error('promise should have timed out')
            })
            .catch((err) => {
                assert.equal(err.message, `Promise has timed out after ${n}ms`)
            })
    },
    'should timeout with description': () => {
        const desc = 'Timeout Promise'
        const n = 100
        const promise = makePromise()
        return promto(promise, n, desc)
            .then(() => {
                throw new Error('promise should have timed out')
            })
            .catch((err) => {
                assert.equal(err.message, `${desc} has timed out after ${n}ms`)
            })
    },
    'should fail when not passing timeout': () => {
        const promise = makePromise()
        return promto(promise)
            .then(() => {
                throw new Error('promise should have been rejected')
            })
            .catch((err) => {
                assert.equal(err.message, 'Timeout must be a number')
            })
    },
    'should fail when passing negative timeout': () => {
        const promise = makePromise()
        return promto(promise, -100)
            .then(() => {
                throw new Error('promise should have been rejected')
            })
            .catch((err) => {
                assert.equal(err.message, 'Timeout cannot be negative')
            })
    },
    'should fail when not passing a promise': () => {
        return promto()
            .then(() => {
                throw new Error('promise should have been rejected')
            })
            .catch((err) => {
                assert.equal(err.message, 'Promise expected')
            })
    },
}

const NotTimedOut = {
    'should resolve with promise\'s result': () => {
        const result = 'test-result'
        const promise = makePromise(100)
            .then(() => result)
        return promto(promise, 200)
            .then((res) => {
                assert.equal(res, result)
            })
    },
    'should fail with promise\'s error': () => {
        const error = new Error('test-error')
        const promise = makePromise(100)
            .then(() => {
                throw error
            })
        return promto(promise, 200)
            .then(() => {
                throw new Error('promise should have been rejected')
            })
            .catch((err) => {
                assert.strictEqual(err, error)
            })
    },
}

module.exports = {
    TimedOut,
    NotTimedOut,
}
