/**
 * Represents the absence of a value.
 */
export type None = { readonly kind: "none" };

/**
 * Represents the presence of a value.
 */
export type Some<T> = { readonly kind: "some"; readonly value: T };

/**
 * Represents an optional value, either `Some<T>` or `None`.
 */
export type Maybe<T> = Some<T> | None;

/**
 * Creates a `Some` with the given value.
 *
 * @example
 * const s = some(42); // { kind: "some", value: 42 }
 */
export function some<T>(value: T): Maybe<T> {
  return { kind: "some", value };
}

/**
 * Creates a `None`.
 *
 * @example
 * const n = none(); // { kind: "none" }
 */
export function none(): Maybe<never> {
  return { kind: "none" };
}

/**
 * Checks if a `Maybe` is `None`.
 *
 * @example
 * const ok = isNone(none()); // true
 */
export function isNone<T>(maybe: Maybe<T>): maybe is None {
  return maybe.kind === "none";
}

/**
 * Checks if a `Maybe` is `Some`.
 *
 * @example
 * const ok = isSome(some(42)); // true
 */
export function isSome<T>(maybe: Maybe<T>): maybe is Some<T> {
  return maybe.kind === "some";
}

/**
 * Converts a nullable value to a `Maybe`.
 *
 * @example
 * const s = maybe("hello"); // { kind: "some", value: "hello" }
 * const n = maybe(null);    // { kind: "none" }
 */
export function maybe<T>(value: T | null | undefined): Maybe<T> {
  return value != null ? some(value) : none();
}

/**
 * Unwraps a `Maybe` or returns a default value if `None`.
 *
 * @example
 * const x = unwrapOr(some(42), 24); // 42
 * const y = unwrapOr(none(), 24);   // 24
 */
export function unwrapOr<T>(maybe: Maybe<T>, defaultValue: T): T {
  return isSome(maybe) ? maybe.value : defaultValue;
}

/**
 * Maps a `Maybe` to a new value using a function.
 *
 * @example
 * const x = map(some(42), (v) => v * 2); // { kind: "some", value: 84 }
 * const y = map(none(),   (v) => v * 2); // { kind: "none" }
 */
export function map<T, U>(maybe: Maybe<T>, fn: (value: T) => U): Maybe<U> {
  return isSome(maybe) ? some(fn(maybe.value)) : none();
}

/**
 * Maps a `Maybe` to another `Maybe` using a function.
 *
 * @example
 * const x = flatMap(some(42), (v) => maybe(v * 2)); // { kind: "some", value: 84 }
 * const y = flatMap(none(),   (v) => maybe(v * 2)); // { kind: "none" }
 */
export function flatMap<T, U>(
  maybe: Maybe<T>,
  fn: (value: T) => Maybe<U>,
): Maybe<U> {
  return isSome(maybe) ? fn(maybe.value) : none();
}

/**
 * Converts a `Maybe` to a nullable value.
 *
 * @example
 * const x = toNullable(some(42)); // 42
 * const y = toNullable(none());   // null
 */
export function toNullable<T>(maybe: Maybe<T>): T | null {
  return isSome(maybe) ? maybe.value : null;
}

/**
 * Converts a `Maybe` to an undefined value.
 *
 * @example
 * const x = toUndefined(some(42)); // 42
 * const y = toUndefined(none());   // undefined
 */
export function toUndefined<T>(maybe: Maybe<T>): T | undefined {
  return isSome(maybe) ? maybe.value : undefined;
}

/**
 * Matches a `Maybe` with handlers for `Some` and `None`.
 *
 * @example
 * const result = match(some(42), {
 *   some: (v) => `Value: ${v}`,
 *   none: () => "No value",
 * }); // "Value: 42"
 */
export function match<T, U>(
  maybe: Maybe<T>,
  handlers: { some: (value: T) => U; none: () => U },
): U {
  return isSome(maybe) ? handlers.some(maybe.value) : handlers.none();
}
