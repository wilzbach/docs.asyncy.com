# Functions

Repeating code blocks can be grouped into functions for better reusability and modularity:

```coffeescript
function get_user id:int returns Map[string, any]
    someone = (psql exec query:"select * from users where id={id} limit 1;")[0]
    someone["contact"] = fullcontact person email:someone["email"]
    return someone as Map[string, any]

user_a = get_user(id:7)
user_b = get_user(id:10)
```

The example above is a function what queries the database and also downloads their `FullContact` profile.

Function must define their inputs and outputs which help with transparency, auto-complete and type checking during the Storyscript Cloud CI process.

Functions **MAY** declare one output and identify it's type. If an output type is used the function **MUST** use `return` and return that type.

```coffeescript
function add a:int b:int returns int
   return a + b
```

Functions that do not have an output may not use `return` with an entity.
An error is thrown if a return is used. An sole `return` statement is allowed.

```coffeescript
function do_this
    # ...

function do_that
    return 1
>>> Error: syntax error in story at line 5, column 12

5|  return 1
                 ^

E0110: Function has no return output defined. Only `return` is allowed.
```

## Nested functions

```coffeescript
output = functionA(key:(functionB(key:(functionC(...)))))
```

Functions MUST be used to produce inline functions. The innermost parentheses will be executed first moving out to the outermost.

Same level parentheses MAY be called at the same time which could be done by parallel processing in new threads.

Furthermore, the first set of parentheses when assigning variables is optional. E.g., `a = functionA()` is the same as `a = (functionA())`.

## Built-ins

Built-ins refer to running operations on the built-in data types, such as strings, lists, maps, and numbers.

### Strings

```coffeescript
# Note: None of the string operations below change the original string in any form
str = ""
str.length()  # returns the number of UTF-8 characters
str.replace(item: "ab" by: "AB")  # returns a string by replacing "ab" with "AB"
str.replace(pattern: /ab/ by: "AB")  # replace all occurrences of the pattern RegExp /ab/ with "ab"
str.split(by: ".")  # returns a list by splitting the string with the delimiter
str.uppercase()  # returns a string where all characters are upper cased
str.lowercase()  # returns a string where all characters are lower cased
str.capitalize()  # returns a string where the first letter of each word is capitalized (eg: "jane smith" becomes "Jane Smith")
str.trim() # returns a string with any leading and trailing whitespace (including tabs) removed
str.startswith(prefix: "abc") # returns true if the string starts with the prefix "abc"
str.endswith(suffix: "xyz") # returns true if the string ends with the suffix "xyz"
arr.contains(item: "a")  # returns true if the item "a" occurrs in the string, false otherwise
arr.contains(pattern: /a/)  # returns true if the RegExp /a/ occurrs in the string, false otherwise
```

### Numbers

```coffeescript
num = 10
num.is_odd()  # returns false
num.is_even()  # returns true
num.absolute()  # returns the absolute value (if num was -1, this would return 1)
num.increment()  # returns 11. Note that num is not changed
num.decrement()  # returns 9. Note that num is not changed
```

### Lists

```coffeescript
arr = [1, 2, 3, 4, 5]
arr.index(of: 5)  # returns the index of an element, 4 in this case
arr.length()  # returns the length of the list, 5 in this case
arr.append(item: 6)  # adds 6 to the end of the list
arr.prepend(item: 1)  # adds 1 to the start of the list
arr.random()  # returns a random element from this list
arr.reverse()  # returns the list in reverse-order
arr.sort()  # returns the list in an ascending fashion
arr.min()  # returns the lowest of the elements in this list (if it contains numbers)
arr.max()  # returns the largest of the elements in this list (if it contains numbers)
arr.sum()  # returns the sum of all the elements in this list (if it contains numbers)
arr.unique()  # reduces the list to contain only unique items
arr.contains(item: 3)  # returns true if 3 is present, false otherwise
arr.remove(item: 3)  # removes the item specified from the list
arr.replace(item: 3 by: 4)  # replaces all occurrences of the item "3" with "4"
```

### Maps

```coffeescript
m = {"a": 1, "b": 2}
m.length()  # returns the size of the map, 2 in this case
m.keys()  # returns a list of all keys
m.values()  # returns a list of all values
m.flatten()  # returns a list of key/value pairs (eg: [["a", 1], ["b", 2]])
m.pop(key: "a") # removes and returns the value for key "a"
m.get(key: "b" default: "." ) # returns the value for the key "b" with a "default" value if the "key" doesn't exist
m.contains(key: "c") # returns true if the key "c" exists in the map, false otherwise
m.contains(value: "c") # returns true if the value "c" exists in the map, false otherwise
```

### Chaining built-ins

Built-ins can be chained to help reduce complexity.

```coffeescript
"abc".uppercase().split()
# >>> ["A", "B", "C"]
```
