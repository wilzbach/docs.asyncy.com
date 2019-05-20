---
prev: /quick-start/
next: /storyscript/semantics/
---

# Intro to Storyscript

Storyscript strings together microservices and functions in a serverless way with Storyscript, the top-level programming language for **Application Storytelling**™ on Storyscript Cloud.

The foundation of Storyscript is to **move data** with no boilerplate code in a declarative way. In the diagram below we have two lines of code: one that represents data being pushed from a service (e.g., streams and events) and the next line data being pulled from a service (e.g., http get).

![design of a story](./design-of-a-story.png)

::: tip Inspiration behind Storyscript
Storyscript is inspired by many popular languages to be as natural and intuitive as possible. It is declarative, strong-typed, static-typed and focused on top-level data-flow.
:::

Many think of Storyscript as glue code for microservices, flow-code, low-code, or pure business-logic programming. We call this **top-level programming**. The diagram shows how the language focuses on the most important aspect of application development: the business-logic.

![abstraction](./abstraction.png)

**Key value propositions**
1. **Transparency**.
  It looks like a monolith but is a full microservice/function serverless architecure.
1. **Readability**.
  The truth is in the code. Not only is Storyscript easy to read it's also easy to refactor, add features and traceback errors.
1. **Polyglot**.
  Storyscript connects all languages together in one cohesive story of data. Choose the right language for the job.
1. **Zero-devops Deployments**.
  No Kubernetes configuration, port bindings, ingress controllers, central message queue, no container coupling, no infra configuration or custom scaling.

![stackup](./stackup.png)

> Storyscript amplifies the developer to program robust, scalable backend applications in a fraction of the time by focusing on what matters most: the story of data, *everything else is noise*.

## Why Storyscript?

The developer dream is to build software like Legos; writing code as a story of data between well orchestrated services with the least amount of boilerplate and complexity. The goal of Storyscript is to be the thread that connects everything from a top-level design: API's, databases, functions, and microservices. We believe a language that connects polyglot services provides the most inclusive and unified platform opposed to focusing on extending one language which further fractures the many tribes of developers. Storyscript **does not replace other languages**, it connects them while freeing the developer to pick the right language for the task.

## Use Cases

All things backend can be created in one line of code. No dev-ops, no boilerplate code, no management or custom scaling.

1. **HTTP Requests and APIs** -- `when http server listen ...`
2. **Web-sockets** -- `when websocket server connects ...`
3. **Cron** -- `when schedule cron daily ...`
4. **Event-driven** -- `when slack bot responds ...`
5. **IoT Events** -- `when iotDevice stream doorBellRang ...`
6. **Social Media** -- `when twitter stream tweets ...`
7. **Machine Learning** -- `result = machinebox/textbox analyze text:'...'`
8. **Microservices Orchestration** -- `output = serviceName action key:value` any language in a Docker container
9. **Functions Orchestration** -- `output = myFunction(key:value)` powered by OpenFaaS
10. **CI/CD Pipelines** -- `ci_result = jenkins run ...`
11. **Video Manipulation** -- `video = ffmpeg compress video:... codec:'h265'`
12. **Image Manipulation** -- `image = imagemagic scale input:... size:'150x150'`
13. **Fully-Asynchronous Programming** -- Network-bound, io-bound, time-bound, and event-bound.

## Syntax Overview

```coffeescript
###
Meet Storyscript
###

# Pull data from a microservice
output = service action key:value
output = team/service action key:value
# Discover and create services in the Storyscript Hub

# Call a function
output = function_name(key:value)
# A Storyscript function
# or another programming language

# Call type methods
output = variable mutation key:value

# Event streaming microservice
when service action event key:value as output
    ... # run this block for every event

# Types
string = "Hello"
integer = 1
number = 1.3
bool = true
list = ['a', 'b', 'c']
map = {'apple': 'red', 'banana': 'yellow'}
regexp = /^foobar/
empty = null
time = 1d35m

# Destructuring
{ apple, banana } = map
# apple = 'red'

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
```

