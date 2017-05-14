# promto

[![npm version](https://badge.fury.io/js/promto.svg)](https://badge.fury.io/js/promto)

Promise with timeout.

## _promto(promise:Promise, timeout:number, description: string): Promise_

Create a promise which should timeout after N milliseconds. It will be resolved with promise value
or rejected with promise error when not timed out, and rejected with timeout error otherwise.

### Timeout rejection

```js
const promto = require('promto')

const promise = new Promise(resolve => setTimeout(resolve, 200))
const promiseWithTimeout = promto(promise, 100, 'Example Promise')

promiseWithTimeout.then(console.log, console.error)
// Error: Example Promise has timed out after 100ms
```

### Resolve value

```js
const promto = require('promto')

const promise = new Promise(resolve => setTimeout(
    () => resolve('Promise Result'),
    50
))
const promiseWithTimeout = promto(promise, 100, 'Example Promise')

promiseWithTimeout.then(console.log, console.error)
// Promise Result
```

### Rejection error

```js
const promto = require('promto')

const promise = Promise.reject(new Error('Promise Error'))
const promiseWithTimeout = promto(promise, 100, 'Example Promise')

promiseWithTimeout.then(console.log, console.error)
// Error: Promise Error
```


## Copyright

2017, [Sobesednik Media](https://sobesednik.media)
