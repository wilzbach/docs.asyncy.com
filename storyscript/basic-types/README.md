---
prev: /storyscript/services/
next: /storyscript/functions/
---

# Types

## Comments

```coffeescript
###
Large
  Comment
Block
###

# Inline comment

foo = "bar"  # end of line comment
```

In Storyscript, comments are denoted by the `#` character to the end of a line,
or from `###` to the end of the line of the next appearance of `###`.

## Boolean

Truth values can be represented with the `boolean` type that has two possible values (`true` and `false`):

```coffeescript
happy = true
sad = false
```
## Numbers

Numbers in Storyscript can be whole numbers (`int`s) that can be positive, negative or zero:

```coffeescript
i  = 1
i2 = -2
i3 = 0
```

Integers are unlimited in size and have no minimum or maximum value.

Additionally, Storyscript can represent numbers with decimals as floating-point numbers (`float`):

```coffeescript
f1 = 1.2
f2 = -3.14
```

The engine uses IEEE-754 double precision floating point arithmetic.

## Strings

```coffeescript
data = "foobar"

long_string = "Hi Friend,
This is a lo\
ng string."
# Hi Friend, This is a long string.

more_data = """
    The quick brown fox
    jumps over the lazy dog.
"""
# The quick brown fox\njumps over the lazy dog.

where = "Earth"
data_formatted = "Hello, {where}"
# Hello, Earth
```

::: v-pre
Like many traditional programming languages, Storyscript supports strings as delimited by the `"` or `'` characters.
Storyscript also supports string interpolation within "-quoted strings, using `{ expression }`.
Single-quoted strings are literal. You may even use interpolation in object keys.
:::

Multi-line strings are allowed in Storyscript.
Lines are joined by a single space unless they end with a backslash.
Indentation is ignored.

Block strings, delimited by `"""` or `'''`, can be used to hold formatted or indentation-sensitive text (or, if you just don’t feel like escaping quotes and apostrophes).
The indentation level that begins the block is maintained throughout, so you can keep it all aligned with the body of your code.

Double-quoted block strings, like other double-quoted strings, allow interpolation.

### String indexing

A string index is zero-based.
A string index may be negative and will then start from the end. The absolute value
of an index may not be equal or greater than the length of the string.

```coffeescript
s = "abcd"
s[0]  # a
s[3]  # d
s[-1] # d
s[-3] # a
s[4]  # ERROR
s[-4] # ERROR
```

## Lists

Storyscript supports `List`s as a generic container type:

```coffeescript
list_inline = ["string", 1, 2]
list_multiline = [
  1,
  2,
  3
]
```

In a list the same value may occur more than once.
A list index is zero-based.
A list index may be negative and will then start from the end. The absolute value
of an index may not be equal or greater than the length of the list.

```coffeescript
list = [1, 2, 3, 4]
l[0]  # 1
l[3]  # 4
l[-1] # 4
l[-3] # 1
l[4]  # ERROR
l[-4] # ERROR
```

## Maps

Storyscript supports `Map`s as a generic container type:

```coffeescript
map_inline = {'foo': 'bar', 'apples': 'oranges'}
map_multiline = {
  'foo': 'bar',
  'apples': 'oranges'
}
object_int = {1: 11, 2: 22}
```

In a map the same value may occur more than once, but the same key can only occur once.

Maps can be destructured into its part with the destructuring assignments:

```coffeescript
map = {'foo': 'bar', 'apples': 'oranges'}
{ foo } = map
# foo = 'bar'
```

A destructuring assignment must contain one or more object keys.
These keys **must** exist in the map and will be new variables names.
Their value is the value of the respective key in the map (`map[key]`).

```coffeescript
map = {'foo': 'bar', 'apples': 'oranges'}
{ foo, apples } = map
# foo = 'bar', apples = 'oranges'
```

## Time durations

Time durations can be expressed natively.

```coffeescript
timeout  = 30s
duration = 5d10m
```

Supported time units are `w` (weeks)`, `d` (days), `h` (hours)`, `m` (minutes), `s` (seconds) and `ms` (milliseconds).

Time units must be used in this order and can't be repeated.

## Regular Expressions

```coffeescript
pattern = /^foo/i
```

Regular expressions are supported without any special characters of escaping necessary.

### Regular Expressions Methods

```coffeescript
pattern = /(?P<key>\w):(?P<value>\w)/
```

::: tip Info
Learn the methods you can call with regular expression in the [Storyscript Hub](https://hub.storyscript.io)
:::
