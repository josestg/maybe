# Maybe - Safe Optional Values for TypeScript

`Maybe` is a utility for handling optional values safely and cleanly in
TypeScript. Inspired by Haskell and OCaml, it provides a clear and functional
approach to dealing with values that may or may not exist.

## Features

- **Explicit Optional Values**: Use `Some` and `None` for clarity.
- **Functional API**: Transform and handle values with `map`, `flatMap`, and
  `match`.
- **Type-Safe**: Eliminate `null` and `undefined` errors.

## Example

```ts
import { map, match, none, some, unwrapOr } from "./mod.ts";

const value = some(42);
const empty = none();

console.log(unwrapOr(value, 24)); // 42
console.log(unwrapOr(empty, 24)); // 24

const squared = map(value, (v) => v ** 2); // some(1764)
console.log(squared);

const message = match(value, {
  some: (v) => `Value is ${v}`,
  none: () => "No value",
});

console.log(message); // "Value is 42"
```
