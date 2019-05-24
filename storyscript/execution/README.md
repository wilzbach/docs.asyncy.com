# Execution Model

Storyscripts are executed by the Storyscript Cloud Runtime (not compiled to C or Java or any other language).
This gives Storyscript distinct advantages over General Purpose Programming Languages (GPPL) with little to no performance overhead since you can use any other GPPL for data processing (low and high-level programming).

## Compilation

Storyscript is a dynamically compiled language. Type checking is performed at compile time, but not in a traditional way. From the perspective of the developer the following steps are performed during compile time.

Compile time consists of four primary processes:

1. **Linting** is performed to check syntax and grammar.
1. **Translation** is performed which translates the Storyscripts into event-logic tree.
1. **Dependency** checks are performed to ensure command and arguments exists.
1. **Type-Checking** is performed on the Stories the ensure data integrity.

The type-checking includes the following checks:

1. Type mutation method exists.
1. Arguments are of the expected type.

## Deployment

1. All dependencies are gathered and prepared for execution.
1. The Storyscript Cloud Runtime is prepared with the Stories as first-class assets for swift execution.
1. Every Storyscript is executed allowing them to register with event-based services.

## Execution

A story may [execute in many ways](/faq/#how-are-storyscripts-started).

1. The Runtime received notice to start a Story with or without starting arguments.
1. The Story is executed in a single thread.
1. When a service is called the Runtime will communicate with the service passing necessary data to and from the service back into the primary thread.
1. Asynchronous commands may generate new threads and execute in the same pattern above.

```coffeescript
translated = language_service translate from:my_string to:'spanish'
words = translated split by:' '
service_b action_b name:words[0]
```

The Story above is would perform the following operations:

1. Translate a string to Spanish (calling the service `language_service` with action `translate`)
1. Split the translated string by whitespace into `words`
1. Invoke a second service `service_b` with action `action_b` and pass the first word of the translated text as `name` argument
