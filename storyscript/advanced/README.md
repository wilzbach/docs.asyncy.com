---
prev: /storyscript/flow/
next: false
---

# Advanced

## Variable Scope

Variables are not global.

```coffeescript
n = 1

function incr
  n = n + 1
    # ^ Error: variable `n` is undefined.
```

Functions do not have access to variables outside their scope.
All variables must be provided as arguments.

```
Error: syntax error in story at line 4, column 7

4|      a = n + 1
            ^

E0101: Variable `n` has not been defined.
```

## Operations

```coffeescript{2}
if something_went_wrong
    end story
```

Use `end story` to stop the story and exit now.


## Exception Handling

```coffeescript
try
  # more stuff here
catch as error
  # more stuff here
finally
  # more stuff here
```

In Storyscript, the `try` expressions catch exceptions and pass the error to the `catch` block.

The `finally` block is **always** entered regardless of an exception being raised or not, use it for cleanup commands.

You may omit both the `catch` and `finally`.

```coffeescript
try
  # more stuff here
catch as error
  # more stuff here
  throw
```

Use the `throw` keyword to raise the exception, bubbling up to the next try block or stopping the story.

## Types

```coffeescript
1 type
# int

true type
# bool

"" type
# string

[] type
# list

{} type
# object

null type
# null

30s type
# time

(date now) type
# date

(interval days:1) type
# interval

(range from:foo to:bar) type
# range

/^foobar/ type
# regexp

function foobar returns int
    return 1

foobar type
# function
```

Use the method `type` to get the type of a variable as a string.

```coffeescript
(1 is int) and (true is bool) and ("" is string)
# true

([] is list) and ({} is object)
# true

(1 is number) and (1.2 is number)
# true

{} is string
# false
```

## Type checking

Storyscript allows a few implicit type conversions:

- `boolean` types are implicitly convertible to `int`
- `int` types are implicitly convertible to `float`
- all types are implicitly convertible to `any`

If a type is unknown, the Storyscript compiler will infer it to `any`.

The generic container types `List` and `Map` can be constructed from base types
or themselves.
Examples:

- `List[int]`
- `List[List[int]]`
- `Map[int, string]`
- `Map[int, List[string]]`

### Assignments

A type must be implicitly convertible to the assignment variable.

```
a = 1
a = "foo" # E0100: Can't assign `string` to `int`
```

### Boolean operations

Boolean operators are: `and`, `or`, `!`.
The following types are convertible to a `boolean` and can thus perform
boolean operations:

- `boolean`
- `int`
- `float`
- `time`
- `string`
- `List`
- `Map`
- `any`

### Arithmetic operations

Arithmetic operators are: `+`, `-`, `*`, `/`, `%` and `^`.

Type       | Operations | Remarks
-----------|------------|------
`boolean`  | all        | Operations between two `boolean`s are implicitly converted to `int`
`int`      | all        |
`float`    | all        |
`regexp`   | (none)     |
`time`     | `+`, `-`   |
`string`   | `+`        | Addition with any other type is possible, returns a `string`
`List`     | `+`        |
`Map`      | (none)     |
`none`     | (none)     |
`any`      | varies     | The other type must support this operation, returns `any`

If for the arithmetic operation `<left> <op> <right>`,
`left` and `right` have mismatching, the compiler will try to implicitly cast
`left` to `right` and `right` to `left`. If both casts fail, the operation is
disallowed. Otherwise the type system will check the operation on the up-casted
type.

### Comparisons operations

The following types are comparable:

- `boolean`
- `int`
- `float`
- `time`
- `string`
- `any`

Remarks: when comparing a type with `any`, this type must support comparisons too.

### Equality operations

All real types can be checked for their equality with themselves.
Only the virtual `none` type (e.g. from a function without a return type) can't
check for its equality.

### Object keys

The following types can be used as object keys:

- `boolean`
- `int`
- `float`
- `time`
- `string`
- `any`

## Operator precedence

Operators with a higher precedence will be evaluated first.
Storyscript has the following operator precedence (from higher precedence down to lower precedence):

- `or` (Or expression)
- `and` (And expression
- `<`, `<=`, `==`, `!=`, `>`, `>=` (Comparison expression)
- `+`, `-` (Arithmetic expression)
- `*`, `/`, `%` (Multiplicative expression)
- `!` (Unary expression)
- `^^` (Pow expression)
- `.`, (Dot expression) `[...]` (Index expression)
- Literals (`1`, `1.2`, `[1, 2, 3]`, `{a: b}`, …)
- `(...)` (Nested expression)

## Application Information

Storyscript has access to application level information under the keyword `app`, containing the following details:

```coffeescript
app.secrets   # map of environment variables set via the CLI (more below)
app.hostname  # the full http dns hostname where your application is located
              # e.g, "smart-einstein-1235.storyscriptapp.com"
app.version   # the release number of the application (see "story releases list" for releases)
              # e.g, "v1"
```
