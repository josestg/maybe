import { assertEquals } from "@std/assert";
import {
  flatMap,
  isNone,
  isSome,
  map,
  match,
  maybe,
  none,
  some,
  toNullable,
  toUndefined,
  unwrapOr,
} from "./mod.ts";

Deno.test({
  name: "none() creates { kind: 'none' }",
  fn() {
    assertEquals(none(), { kind: "none" });
  },
});

Deno.test({
  name: "some(value) creates { kind: 'some', value }",
  fn() {
    assertEquals(some(42), { kind: "some", value: 42 });
  },
});

Deno.test({
  name: "isSome() checks if Maybe is 'some'",
  fn() {
    assertEquals(isSome(some(42)), true);
    assertEquals(isSome(none()), false);
  },
});

Deno.test({
  name: "isNone() checks if Maybe is 'none'",
  fn() {
    assertEquals(isNone(some(42)), false);
    assertEquals(isNone(none()), true);
  },
});

Deno.test({
  name: "maybe(null or undefined) creates none()",
  fn() {
    assertEquals(maybe(undefined), none());
    assertEquals(maybe(null), none());
  },
});

Deno.test({
  name: "maybe(value) creates some(value)",
  fn() {
    assertEquals(maybe(42), some(42));
    assertEquals(maybe(true), some(true));
    assertEquals(maybe(false), some(false));
    assertEquals(maybe(NaN), some(NaN));
  },
});

Deno.test({
  name: "unwrapOr(some) returns the wrapped value",
  fn() {
    assertEquals(unwrapOr(some(42), 24), 42);
    assertEquals(unwrapOr(some(false), true), false);
  },
});

Deno.test({
  name: "unwrapOr(none) returns the default value",
  fn() {
    assertEquals(unwrapOr(none(), 24), 24);
    assertEquals(unwrapOr(none(), true), true);
  },
});

Deno.test({
  name: "toNullable(some) returns the wrapped value",
  fn() {
    assertEquals(toNullable(some(42)), 42);
  },
});

Deno.test({
  name: "toNullable(none) returns null",
  fn() {
    assertEquals(toNullable(none()), null);
  },
});

Deno.test({
  name: "toUndefined(some) returns the wrapped value",
  fn() {
    assertEquals(toUndefined(some(42)), 42);
  },
});

Deno.test({
  name: "toUndefined(none) returns undefined",
  fn() {
    assertEquals(toUndefined(none()), undefined);
  },
});

Deno.test({
  name: "map(some) applies the function to the value",
  fn() {
    assertEquals(map(some(10), (v) => v ** 2), some(100));
  },
});

Deno.test({
  name: "map(none) does nothing",
  fn() {
    assertEquals(map(none(), (v) => v ** 2), none());
  },
});

Deno.test({
  name: "flatMap(some) applies the function and flattens",
  fn() {
    assertEquals(flatMap(some(4), (v) => some(v ** 2)), some(16));
    assertEquals(flatMap(some(4), (_) => none()), none());
  },
});

Deno.test({
  name: "flatMap(none) does nothing",
  fn() {
    assertEquals(flatMap(none(), (v) => some(v ** 2)), none());
  },
});

Deno.test({
  name: "match(some) executes the 'some' handler",
  fn() {
    const result = match(some(42), {
      some: (v) => `got ${v}`,
      none: () => "no value",
    });
    assertEquals(result, "got 42");
  },
});

Deno.test({
  name: "match(none) executes the 'none' handler",
  fn() {
    const result = match(none(), {
      some: (v) => `got ${v}`,
      none: () => "no value",
    });
    assertEquals(result, "no value");
  },
});
