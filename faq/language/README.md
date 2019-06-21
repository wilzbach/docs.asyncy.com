# Storyscript Language

## What is Storyscript used for?

[Read more here](/storyscript/intro/#why-storysctipt).

## How are Storyscripts started?

Storyscripts can start in many ways, here are just a **couple examples**:

1. HTTP request
1. Cron
1. Frontend user click button
1. API request
1. Webhook
1. IOT devices
1. Stream (event from logs, metrics)
1. Pub/sub
1. Smart Button or Alexa command
1. Text message or phone call
1. Another 3rd party application


## What are service aliases?

Services must be registered with the [Storyscript Hub](https://hub.storyscript.io) to be used in Storyscript. A service may specify aliases which are short title of the service (`myteam/ss-foobar-service` can choose `foobar` as an alias).

During the service discovery phase developers will select certain services which end up getting tracked in the `story.yml` file.

```yaml{3,4}
# story.yml
services:
  foobar:
    image: myTeam/myService
    tag: v1.123
```

In Storyscript you can call upon this service like this:

```coffeescript
result = foobar action key:value
```

## Can Storyscript run asynchronously?

**Yes**. Storyscript is fully asynchronous. Not just IO-bound or network-bound but also time-bound and event-bound.

For example, during an HTTP request once the response if finished the remaining script is inherently asynchronous. When a Storyscript runs it is asynchronous from another Storyscript execution. Specific line(s) in the Storyscript may be executed asynchronously.

## How do I debug Storyscript?

<!-- Things don't always go according to plan. Checkout our [Debugging](/debugging/) docs for more details. -->
This answer is being simplified by our team. Stay tuned !

## Are Storyscripts stateless or stateful?

**Storyscripts are stateless.** An application may use stateful services but the Storyscript itself, by design, is stateless.

## Is Storyscript compiled or interpreted?

Storyscript is compiled in a cloud native runtime. It is not compiled to any other language, by design.

## What is Storyscript's type system?

**Strong and static.** This make it easy to debug before compile time and assist with auto-complete.
