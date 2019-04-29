## API

The package is available by importing its default function:

```js
import promto from 'promto'
```

%~%

```## async promto => Promise
[
  ["promise", "Promise"],
  ["timeout", "number"],
  ["description", "string?"]
]
```

Creates a new promise which will be rejected upon timeout (after N milliseconds). It will be resolved with the promise value or rejected with the promise error when not timed out.

%EXAMPLE: example, ../src => promto%
%FORK example%

%~%