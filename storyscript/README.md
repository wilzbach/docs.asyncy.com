# Storyscript

The language for Application Storytelling that strings together microservices and functions in a serverless way. It significantly reduces unnecessary complexities and amplifys the developer to build applications in a fraction of the time by focusing on the story of data.

*Applications are stories of data.* What makes your application unique is how you move data from point A to Z. This flow we call Storytelling and we designed Storyscript to describe this flow in a descriptive, service-oriented programming language.

# Table of Contents
[[toc]]

## About Storyscript

The developer industry, and world as a whole, is becoming more and more integrated. Businesses may rely on hundreds of SaaS tools to power their business; their business technology as well. Yet, there is no simple way to hook service A to service B programmically. There are many products that aim to solve this yet they all run on propriatary software, expose graphical interfaces, and aim for a different audience than developers.

Storyscript is a programming language. An open source developer-first tool to build powerful cloud native applications. It runs on Asyncy Runtime, another open source developer-first tool that generates a robust cloud archecture out-of-the-box.

Developers want to focus on what matters most: business-logic. Everything else is noise.


## Syntax Cheatsheet

The foundation of design is around a consistant pattern that is service-oriented, where microservices and functions are first-class.

```coffeescript
###
Meet Storyscript
###

# Pull data from a microservice
output = service action key:value
output = team/service action key:value

# Call a function
output = function_name(key:value)

# Call type methods
output = variable mutation key:value

# Event streaming microservice
when service action event key:value as output
    # run this block for every event

# Types
string = "Hello"
integar = 1
number = 1.3
bool = true
list = ['a', 'b', 'c']
map = {'apple': 'red', 'banana': 'yellow'}
regexp = /^foobar/
empty = null

# Conditions
if one > 1
    # ...
else if one == 1
    # ...
else
    # ...

# Loops
foreach list as item
    # ...
while true
    # ...

# Functions
function name input:int returns int
    # ...
    return input
name(input:1)
# >>> 1

# try and catch
try
  # ...
catch as error
  # ...
  retry  # try the block again
  throw  # bubble it up
```

::: tip Inspiration behind Storyscript
Storyscript was inspired by Python, Ruby, Swift and other popular programming languages to feel familiar but also intuitive and declarative.
:::

## Semantics

### Procedure

```coffeescript
output = functionA(key:(functionB(key:(functionC(...)))))
```

Parentheses MUST be used to produce inline procedures. The innermost Parentheses will be executed first moving out to the outermost.

Same level parentheses MAY be called at the same time which done by parallel processing in new threads.

First set of parentheses when assigning variables is optional. E.g., `a = my_list length` is the same as `a = (my_list length)`.

### Attributes, methods and entries

Objects may have attributes and methods. A Map can *only* have entries.

1. `Object` attributes can **only** be accessed using a period character (`.`) as in `user.name`.
1. `Object` methods can **only** be accessed using a space character (` `) as in `cart add item:...`.
1. `Map` entries can **only** be accessed using brackets and strings (`['key']`) as in `some_map['key']`

The example below illustrates how the object `tweet` has attributes and methods.

```coffeescript
tweet = twitter tweet text:'Hello world'
id = tweet.id  # returns the tweet id 123456 of type int.
tweet like     # calls "like", a method of tweet
```

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

#### Chaining Mutations

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

### Variable Scope

Variables are not global.

```coffeescript
n = 1

when cron schedule every minute:3
  n = n + 1
    # ^ Error: variable `n` is undefined.

function incr
  n = n + 1
    # ^ Error: variable `n` is undefined.
```

Functions do not have access to local variables. All variables must be provided as arguments.


### Compiling

Storyscript is a dynamically compiled language. Type checking is performed at compile time, but not in a traditional way. From the perspective of the developer the following steps are performed during compile time.

Compile time consists of four primary processes:

1. **Linting** is performed to check syntax and grammar.
1. **Translation** is performed which translates the Storyscripts into event-logic tree.
1. **Dependancy** checks are performed to ensure command and arguments exists.
1. **Type-Checking** is performed on the Stories the ensure data integrity.

The type-checking includes the following checks:

1. Type mutation method exists.
2. Arguments are of the expected type.


### Environment Variables (aka Secrets)

Environment variables are stored in a restricted keyword `app.secrets`.

Set variables in the `asyncy.yml`
```yaml
# asyncy.yml
environment:
  food: cake
  FOO: bar
```
Or set them with the Asyncy CLI
```shell
asyncy config set foo=bar
```

Then you may access them via `app.secrets` map, like this:
```coffeescript
if app.secrets.food == 'cake'
    ...

if app.secrets.foo == 'bar'
    ...
```

::: tip 💡Hint
Secrets are case insensative. `app.secrets.FOO` is the same as `app.secrets.foo`.
:::

### Service Variables

May services require environment variables, such as oauth tokens and client id/secret pairs.

Service variables are ALWAYS unique to that service and cannot be accessed by any other service or within Storyscript secrets.

Set variables in the `asyncy.yml`
```yaml
# asyncy.yml
environment:
  twitter:
    client_id: abc123
```
Or set them with the Asyncy CLI
```shell
asyncy config set twitter.client_id=abc123
```

These variables ARE NOT accessible in Storyscript because they are for a service only.
```coffeescript
token = app.secrets.client_id  # Error. Secret `client_id` not set.
token = app.secrets.twitter.client_id  # Error. Accessing service environment variables is prohitted.
```

However, when the service `twitter` is started by Asyncy it will be assigned `client_id=abc123` accoring to it's `microservice.yml` as an environment variable.

### Execution Model

Storyscripts are executed by an interpretation engine (not compiled to C or Java).

#### Deployment

1. All dependencies are gathered and prepared for execution.
1. The Asyncy Engine is prepared with the Stories as first-class assets for swift execution.
1. Every Storyscript is executed allowing them to register with event-based services.

#### Execution

A story may [execute in many ways](/faq/#how-are-storyscripts-started).

1. The Engine received notice to start a Story with or without starting arguments.
1. The Story is executed in a single thread.
1. When a service is called the Engine will communicate with the service passing necessary data to and from the service back into the primary thread.
1. Asynchronous commands may generate new threads and execute in the same pattern above.

```coffeescript
translated = service action translate:my_string to:'spanish'
parts = translated split by:' '
service_b action name:parts[0]
```

The Story above is would perform the following operations:

1. Translate a string to Spanish
1. Split the translated string by whitespace
1. Assign `first_word` to the first word in the `parts` array


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
Storyscript also supports string interpolation within "-quoted strings, using `{ variable }`.
Single-quoted strings are literal. You may even use interpolation in object keys.
:::

Multiline strings are allowed in Storyscript.
Lines are joined by a single space unless they end with a backslash.
Indentation is ignored.

Block strings, delimited by `"""` or `'''`, can be used to hold formatted or indentation-sensitive text (or, if you just don’t feel like escaping quotes and apostrophes).
The indentation level that begins the block is maintained throughout, so you can keep it all aligned with the body of your code.

Double-quoted block strings, like other double-quoted strings, allow interpolation.

## Numbers

```coffeescript
int = 1
number = 1.2
```

## Boolean

```coffeescript
happy = true
sad = false
```

## Lists

```coffeescript
list_inline = ["string", 1, 2]
list_multiline = [
  "string",
  1,
  2
]
```

## Maps

```coffeescript
map_inline = {'foo': 'bar', 'apples': 'oranges'}
map_multiline = {
  'foo': 'bar',
  'apples': 'oranges'
}
```

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

Loops have reserved keywords for ending and continuing loops.

```coffeescript
foreach my_list as item
    # more stuff here
    if do_end_loop
        end
    if do_skip_to_next_item
        next
    # ...
```


## Functions

```coffeescript
function get_user id:int returns map
    someone = (psql exec query:'select * from users where id={id} limit 1;')[0]
    someone['contact'] = fullcontact person email:someone['email']
    return someone

user_a = get_user(id:7)
user_b = get_user(id:10)
```

The example above is a function what queries the database and also downloads their FullContact profile.

Function must define their inputs and outputs which help with transparency, autocomplete and type checking during the Asyncy CI process.

Functions **MAY** declare one output and identify it's type. If an output type is used the function **MUST** use `return` and return that type.

```coffeescript
function add this:int that:int returns int
   return this + that
```

Functions that do not have an output may not use `return`. An error is thrown if a return is used.

```coffeescript
function do_this
    # ...

function do_that
    return 1
>>> ERROR: Function must set type of return.
```


## Services

A service is a containerize microservice that is registered in the [Asyncy Hub](https://hub.asyncy.com). Discover hundreds of services in the Hub or build your own in any language, submit to the Asyncy Hub and call it in your Storyscript like this:

```coffeescript
# Call a service with a command and all arguments named
service cmd key:value foo:bar
tean/service cmd key:value foo:bar

# Service output assigned to variable
foobar = service cmd key:value

# Arguments may by indented under the service
service cmd key:value
            foo:bar
```

In Storyscript, the syntax to run a service appears natural and arguments are named for transparency.
Variable shorthands can be used to reduce repeating terms, ie `data:data` or `name:name`.

```coffeescript
message = "hello"
twitter tweet :message
# would result in ```twitter tweet message:"hello"```
```

Service, actions and argument names are **static grammar** and **interpreted literally**.

## Event-Based Services

Services may publish events which run a new block of logic.

```coffeescript
# All three patterns below are equivelent
when service action event key:value as output
    ...

service action as client
    when client event key:value as output
        ...
    # more events ...

service action
    when event key:value as output
        ...
    # more events ...
```

A good example of this is streaming Tweets by hashtag.

```coffeescript
when twitter stream tweets track:'programming' as tweet
    res = machinebox/textbox analyze input:tweet.message
    if res.sentiment == 'positive'
        tweet reply message:'Thank you!'
        tweet retweet
        tweet like
```

Every new tweet will be passed into the block below in the variable `tweet`.
Then machine learning will determine if the tone of the tweet's message is good or bad. The streaming service will wait for new tweets until the story is ended.

If no output is defined, it will be implicitly default to the name of the command. Furthermore, if only a command name is used in `when` blocks, it will use the `output` of its parent as subscribing service.
This allows this to shorten the example from above:


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
Learn the methods you can call with regular expression in the [Asyncy Hub](https://hub.asyncy.com)
:::

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

Type checking can be applied to any type.


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


## Application Information

Storyscript has access to application level information under the keyword `app`, containing the following details:

```coffeescript
app.secrets   # map of environment variables set via the CLI (more below)
app.hostname  # the full http dns hostname where your application is located
              # e.g, "smart-einstein-1235.asyncyapp.com"
app.version   # the release number of the application (see "asyncy releases list" for releases)
              # e.g, "v1"
```
