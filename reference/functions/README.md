---
prev: /storyscript/basic-types/
next: /storyscript/flow/
---

# Functions

Functions are single methods written in any programming language that are fully managed serverless functions.

## Create

Creating your own functions is intuitive and powerful. Choose Storyscript for workflow and procedural functions. Choose another language for low and high-level logic and algorithms.


### Storyscript Functions

Storyscript functions are useful for common procedures that you want to reuse in your application **or** share between other applications by submitting Storyscript functions to the [Storyscript Hub](https://hub.storyscript.io).

####  Create your first Storyscript function

```coffeescript
function spam_me text:string
    twitter tweet status:"@me {text}"
    twilio sms text:text to:"+310601010101"
    gmail send to:"me@gmail.com" subject:"Read me" body:text
```

Now, we can call our function like this:

```coffeescript
spam_me(text: "doorbell rang!")
```

### GPPL Functions

::: warning Coming soon
Looking forward to this feature? [Click here](https://storyscript.nolt.io/8) to share your feedback.
:::

Creating a function in a GPPL (like Python, Node, Go, Ruby, etc.) is very simple in Storyscript.
These functions, like Storyscript functions, can be used anywhere in your Storyscript and shared to other applications when submitted to the [Storyscript Hub](https://hub.storyscript.io).

#### Creating your first function

Let's use Python for this very simple example.

```python
def main(principle: float, time: int, rate: float):
    return (principle * time * rate) / 100
```

:snake: Sssssweeet! We have a function, we called it `main` (common Python practice) and saved it to `calc_interest.py` in the root of your git repository.

Now, let's add it to our repository of functions in your `story.yml` manifest.

```yaml
functions:
    interest: ./calc_interest_rate.py
#   ^^ function name followed by it's location in your git repository
```

:thumbsup: Let's call our shinny new function in Storyscript.

```coffee
result = interest(principle:4000, time:120, rate:.03)
```

Nice work! You just created a serverless function and called it in our Storyscript. :clap:

## Discover

Much like a traditional library of software, the [Storyscript Hub](https://hub.storyscript.io) is your registry of services and functions to share between applications and developers.

### Using functions

Sharing and reusing functions is also easy. Discover functions in the [Storyscript Hub](https://hub.storyscript.io) and follow the directions in the Hub to use public or your private collection of functions cross application.

### Submitting functions

Head over to [Storyscript Hub](https://hub.storyscript.io) to publish your functions privately or publicly.

## Deploy

> Zero-devops deployments with Storyscript Cloud.

Storyscript Cloud abstracts away the unnecessary complexities in orchestrating, communicating and managing functions, including:

1. Deployment
1. Version management
1. AB Testing
1. Scaling
1. Monitoring
1. Health Checks
1. Protocols
1. Error handling
1. Retry-logic
1. Fail-over

:sparkles::cake::sparkles: All the above are **no longer** the responsibility of the developer.

Simply deploy your Storyscript application and Storyscript Cloud takes care of the rest.
