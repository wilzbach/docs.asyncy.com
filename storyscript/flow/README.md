---
prev: /storyscript/functions/
next: /storyscript/advanced/
---

# Control Flow

## Conditions

```coffeescript
if foo == bar
  # more stuff here
else if foo > bar
  # more stuff here
else
  # more stuff here

if (foo > 0 and cat == dog) or foobar contains item: /regexp/
  # more stuff here
```

`if`/`else` statements can be written without the use of parentheses and curly brackets. As with functions and other block expressions, multi-line conditionals are delimited by indentation.

## Looping

Looping through index and/or object keys.

```coffeescript
foreach my_list as item
    # ...

foreach my_list as index, item
    # ...

foreach my_object as key
    # ...

foreach my_object as key, value
    # ...

while foobar
    # ...
```

Similarly to conditions, loop blocks can use arbitrary expressions:

```
foreach "a.b.c".split(by: ".") as item
    # ...
```

Loops have reserved keywords for ending (`break`) and continuing loops (`continue`).

```coffeescript
foreach my_list as item
    if do_end_loop
        break
    if do_skip_to_next_item
        continue
    # ...
```
