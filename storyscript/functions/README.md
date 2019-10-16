# Functions

Repetitive code blocks can be grouped into functions for better re-usability and modularity:

```coffeescript
function get_user id:int returns Map[string, any]
    someone = (psql exec query:"select * from users where id={id} limit 1;")[0]
    someone["contact"] = fullcontact person email:someone["email"]
    return someone as Map[string, any]

user_a = get_user(id:7)
user_b = get_user(id:10)
```

The example above is a function that queries the database and also retrieves their `FullContact` profile.

Functions must define their inputs and their output which help with transparency, auto-complete and type checking.

Functions can have only one return value. If a function declares a return value, then that function **MUST** use `return` to return a value of that type.

```coffeescript
function add a:int b:int returns int
   return a + b
```

Functions that do not have an output may omit the `returns` keyword in it's declaration.

## Invoking multiple functions on the same line 

```coffeescript
result = functionA(arg1:functionB(arg2:functionC()))
```                                 

In the above example, the output from `functionC()` is given as argument `arg2` to `functionB()`.
Once `functionB()` returns, that output is given to `functionA()` as  argument `arg1`. 

## Built-ins

Built-ins refer to running operations on the built-in data types, such as strings, lists, maps, and numbers.
Just like functions, built-in functions do not affect the original variable. 

### Strings

```coffeescript
# Note: None of the string operations below change the original string in any form
str = ""
str.length()  # returns the number of UTF-8 characters
str.replace(item:"ab" by:"AB")  # returns a string by replacing "ab" with "AB"
str.replace(pattern:/ab/ by:"AB")  # replace all occurrences of the pattern RegExp /ab/ with "ab"
str.contains(pattern:/a/)  # returns true if the string matches the pattern, false otherwise
str.contains(item:"hello")  # returns true if the string contains the sequence "hello", false otherwise
str.split(by:".")  # returns a list by splitting the string with the delimiter
str.uppercase()  # returns a string where all characters are upper cased
str.lowercase()  # returns a string where all characters are lower cased
str.capitalize()  # returns a string where the first letter of each word is capitalized (eg: "jane smith" becomes "Jane Smith")
str.trim() # returns a string with any leading and trailing whitespace (including tabs) removed
str.startswith(prefix:"abc") # returns true if the string starts with the prefix "abc"
str.endswith(suffix:"xyz") # returns true if the string ends with the suffix "xyz"
"hey there".substring(start:4)  # returns characters after the specified index (here: "there")
"hey there".substring(start:1 end:3)  # returns characters after the start index and until the end index (here: "ey")
"hey there".substring(end:3)  # returns characters until the specified index (here: "hey")
```

### Numbers

```coffeescript
# Integers
num = 10
num.isOdd()  # returns false
num.isEven()  # returns true
num.absolute()  # returns the absolute value (if num was -1, this would return 1)
num.increment()  # returns 11. Note that num is not changed
num.decrement()  # returns 9. Note that num is not changed

# Floating point numbers
num = 10.5
num.round()  # returns 10
num.ceil()  # returns 11
num.floor()  # returns 10
num.sin()  # returns the sine of a number
num.cos()  # returns the cosine of a number 
num.tan()  # returns the tangent of a number
num.asin()  # returns the arcsine of a number
num.acos()  # returns the arccosine of a number
num.atan()  # returns the arctangent of a number
num.log()  # returns the logarithmic of a number
num.log2()  # returns the base 2 logarithm of a number
num.log10()  # returns the base 10 logarithm of a number
num.exp()  # returns e^num, where e is Euler's number
num.abs()  # returns the absolute value of a number
num.isNaN()  # returns true if the number is not a valid number, false otherwise
num.isInfinity()  # returns true if the number represents infinity, false otherwise
num.approxEqual(value:10.50001)  # returns true if the number is approximately equal to 10.50001
num.approxEqual(value:10.501 maxRelDiff:0.1)  # returns true if the number is approximately equal to 10.50001, within a relative tolerance of 0.1 (abs(num - value) / value <= maxRelDiff)
num.approxEqual(value:10.51 maxAbsDiff:0.1)  # returns true if the number is approximately equal to 10.50001, within a absolute tolerance of 0.1 (abs(num - value) <= maxAbsDiff)
num.approxEqual(value:10.50001 maxRelDiff:1.5 maxAbsDiff:1.5)  # returns true if the number is approximately equal to 10.50001 (within a relative and absolute threshold)
num.sqrt()  # returns the square root of a number
```

### Lists

```coffeescript
arr = [1, 2, 3, 4, 5]
arr.length()  # returns the length of the list, 5 in this case
arr.append(item:6)  # returns a new list with the item `6` added to the end of it
arr.prepend(item:1)  # returns a new list, with the item `1` added to the start of it
arr.random()  # returns a random element from this list
arr.reverse()  # returns a new list, in reverse order
arr.sort()  # returns a new list, sorted in an ascending fashion
arr.min()  # returns the lowest of the items in this list (if it contains numbers)
arr.max()  # returns the largest of the items in this list (if it contains numbers)
arr.sum()  # returns the sum of all the items in this list (if it contains numbers)
arr.contains(item:3)  # returns true if 3 is present, false otherwise
arr.unique()  # returns a new list, which will contain only unique items
arr.remove(item:3)  # returns a new list, with the specified item removed from the list
arr.index(of:5)  # returns the index of an item, 4 in this case
arr.replace(item:3 by:4)  # returns a new list, where all occurrences of the item `3` is replaced with `4`
arr.slice(start:1)  # returns a new list, with items starting from the index `1` (inclusive) - here: [2, 3, 4, 5]
arr.slice(start:1 end:3)  # returns a new list, with items starting from the index `1` (inclusive), to the index `3` (exclusive) - here: [2, 3] 
arr.slice(end:3)  # returns a new list, with all items until the index `3` (exclusive) - here: [1, 2, 3]
arr.join(sep:":")  # returns a string with all elements in list concatenated (joined) by the separator `sep`
```

### Maps

```coffeescript
m = {"a":1, "b":2}
m.length()  # returns the size of the map, 2 in this case
m.keys()  # returns a list of all keys
m.values()  # returns a list of all values
m.remove(key:"c")  # returns a map without the key "c" in it
m.flatten()  # returns a list of key/value pairs (eg: [["a", 1], ["b", 2]])
m.contains(key:"c")  # returns true if the key "c" exists in the map, false otherwise
m.contains(value:"c")  # returns true if the value "c" exists in the map, false otherwise
m.get(key:"b" default:"." )  # returns the value for the key "b", or a default value if it doesn't exist
```

### Chaining built-ins

Built-ins can be chained to help reduce complexity.

```coffeescript
"abc".uppercase().split(by:"")
# >>> ["A", "B", "C"]
```
