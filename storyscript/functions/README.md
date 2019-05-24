# Functions

Repeating code blocks can be grouped into functions for better reusability and modularity:

```coffeescript
function get_user id:int returns map
    someone = (psql exec query:'select * from users where id={id} limit 1;')[0]
    someone['contact'] = fullcontact person email:someone['email']
    return someone

user_a = get_user(id:7)
user_b = get_user(id:10)
```

The example above is a function what queries the database and also downloads their `FullContact` profile.

Function must define their inputs and outputs which help with transparency, auto-complete and type checking during the Storyscript Cloud CI process.

Functions **MAY** declare one output and identify it's type. If an output type is used the function **MUST** use `return` and return that type.

```coffeescript
function add this:int that:int returns int
   return this + that
```

Functions that do not have an output may not use `return` with an entity.
An error is thrown if a return is used. An sole `return` statement is allowed.

```coffeescript
function do_this
    # ...

function do_that
    return 1
>>> Error: syntax error in story at line 5, column 12

5|        return 1
                 ^

E0110: Function has no return output defined. Only `return` is allowed.
```

## Nested functions

```coffeescript
output = functionA(key:(functionB(key:(functionC(...)))))
```

Functions MUST be used to produce inline functions. The innermost parentheses will be executed first moving out to the outermost.

Same level parentheses MAY be called at the same time which done by parallel processing in new threads.

First set of parentheses when assigning variables is optional. E.g., `a = my_list length` is the same as `a = (my_list length)`.

### Mutations
Mutations refer to running operations on the built in data types, such as strings, arrays, maps, and numbers.
```coffeescript
# Strings
# Note: None of the string operations below change the original string in any form
str = ''
str length  # returns the number of UTF-8 characters
str replace pattern: 'ab' by: 'AB'  # returns a string by replacing 'ab' with 'AB'
str replace pattern: /ab/ by: 'AB'  # same as above
str split by: '.'  # returns an array by splitting the string with the delimiter
str uppercase  # returns a string where all characters are upper cased
str lowercase  # returns a string where all characters are lower cased
str capitalize  # returns a string where the first letter of each word is capitalized (eg: 'jane smith' becomes 'Jane Smith')

# Numbers
num = 10
num is_odd  # returns false
num is_even  # returns true
num absolute  # returns the absolute value (if num was -1, this would return 1)
num increment  # returns 11. Note that num is not changed
num decrement  # returns 9. Note that num is not changed

# Arrays
arr = [1, 2, 3, 4, 5]
arr index of: 5  # returns the index of an element, 4 in this case
arr length  # returns the length of the array, 5 in this case
arr append item: 6  # adds 6 to the end of the array
arr prepend item: 1  # adds 1 to the start of the array
arr random  # returns a random element from this array
arr reverse  # reverses the array in-place
arr sort  # sorts the array in an ascending fashion
arr min  # returns the lowest of the elements in this array (if it contains numbers)
arr max  # returns the largest of the elements in this array (if it contains numbers)
arr sum  # returns the sum of all the elements in this array (if it contains numbers)
arr unique  # reduces the array to contain only unique items
arr contains item: 3  # returns true if 3 is present, false otherwise
arr remove item: 3  # removes the item specified from the array

# Maps
m = {'a': 1, 'b': 2}
m size  # returns the size of the map, 2 in this case
m keys  # returns an array of all keys
m values  # returns an array of all values
m flatten  # returns a list of key/value pairs (eg: [['a', 1], ['b', 2]])
m pop key: 'a'  # removes and returns the value for key 'a'
m get key: 'b'  # returns the value for the key 'b'
m contains key: 'c'  # returns true if the key 'c' exists in the map, false otherwise
```

### Chaining Mutations

Mutations can be chained to help reduce complexity.

```coffeescript
'abc' uppercase split
# >>> ['A', 'B', 'C']

'abc' uppercase
      then split
# >>> ['A', 'B', 'C']

('abc' uppercase) split
# >>> ['A', 'B', 'C']
```

