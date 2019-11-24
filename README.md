# promto

[![npm version](https://badge.fury.io/js/promto.svg)](https://www.npmjs.com/package/promto)

`promto` Wrappes A Promise In Timeout.

```sh
yarn add promto
```

## Table Of Contents

- [Table Of Contents](#table-of-contents)
- [API](#api)
- [`async promto(promise: Promise, timeout: number, description: string?): Promise`](#async-promtopromise-promisetimeout-numberdescription-string-promise)
- [Copyright](#copyright)

<p align="center"><a href="#table-of-contents">
  <img src="/.documentary/section-breaks/0.svg?sanitize=true">
</a></p>

## API

The package is available by importing its default function:

```js
import promto from 'promto'
```

<p align="center"><a href="#table-of-contents">
  <img src="/.documentary/section-breaks/1.svg?sanitize=true">
</a></p>

## <code>async <ins>promto</ins>(</code><sub><br/>&nbsp;&nbsp;`promise: Promise,`<br/>&nbsp;&nbsp;`timeout: number,`<br/>&nbsp;&nbsp;`description: string?,`<br/></sub><code>): <i>Promise</i></code>

Creates a new promise which will be rejected upon timeout (after N milliseconds). It will be resolved with the promise value or rejected with the promise error when not timed out.

```js
import promto from 'promto'

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
```
```
hello
Promise has timed out after 100ms
Example has timed out after 100ms
Error in promise
```

<p align="center"><a href="#table-of-contents">
  <img src="/.documentary/section-breaks/2.svg?sanitize=true">
</a></p>

## Copyright

<table>
  <tr>
    <th>
      <a href="https://artd.eco">
        <img width="100" src="https://raw.githubusercontent.com/wrote/wrote/master/images/artdeco.png"
          alt="Art Deco">
      </a>
    </th>
    <th>© <a href="https://artd.eco">Art Deco</a>   2019</th>
    <th>
      <a href="https://www.technation.sucks" title="Tech Nation Visa">
        <img width="100" src="https://raw.githubusercontent.com/idiocc/cookies/master/wiki/arch4.jpg"
          alt="Tech Nation Visa">
      </a>
    </th>
    <th><a href="https://www.technation.sucks">Tech Nation Visa Sucks</a></th>
  </tr>
</table>

<p align="center"><a href="#table-of-contents">
  <img src="/.documentary/section-breaks/-1.svg?sanitize=true">
</a></p>