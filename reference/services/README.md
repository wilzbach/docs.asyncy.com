# Services

Services are containerized software or API specifications. Written in any programming language, services are designed to preform a variety of actions or event-driven behaviors.

**Services should encompass the full domain of it's scope.** For example, the Twitter microservice should be the entire Twitter API, the GitHub microservice includes the REST API, GraphQL, webhook server and login server.

## Create

There are three ways to create services for Storyscript Cloud.

1. [Containerized Services](#containerized-services) (e.g., Docker containers)
1. *Coming soon* [OpenAPI](#openapi)
1. *Coming soon* [AsyncAPI](#syncapi)


### Containerized Services

Containerized services is software wrapped in a Docker container. Commonly called microservices, but this could be your monolith codebase too.

1. Follow the [Open Microservice Guide](https://microservice.guide) - Spec and tools for building microservices rapidly.
2. Submit your service to the [Storyscript Hub](https://hub.storyscript.io).
3. Access your service via Storyscript, like this:

```coffeescript
output = myTeam/myFirstMicroservice foobar key:value
```

### OpenAPI

::: warning Coming soon
Looking forward to this feature? [Click here](https://asyncy.nolt.io/6) to share your feedback.
:::

The [OpenAPI](https://swagger.io/docs/specification/about/) spec (aka SwaggerAPI) is an API description format for REST APIs.

Soon Storyscript Hub will support uploading your OpenAPI spec enabling developers to rapidly communicate with the service.

1. Upload spec to Storyscript Hub.
2. Interact with your OpenAPI REST API in the following way:

```coffeescript
output = myTeam/myOpenAPI endpoint arg:value
```

### AsyncAPI

::: warning Coming soon
Looking forward to this feature? [Click here](https://asyncy.nolt.io/7) to share your feedback.
:::


The [AsyncAPI](https://asyncapi.com) spec is an API description format for event-driven services.

Soon Storyscript Hub will support uploading your AsyncAPI spec enabling developers to rapidly communicate with the service.

1. Upload spec to Storyscript Hub.
2. Interact with your AsyncAPI event-driven service in the following way:

```coffeescript
when myTeam/myOpenAPI action eventName arg:value as event
    ...
```

## Discover

Much like a traditional software library, the [Storyscript Hub](https://hub.storyscript.io) is your registry of services and functions to share between applications and developers.

> **Next**, discover services and functions on the [Storyscript Hub](https://hub.storyscript.io)

### Using services

Sharing and reusing services is easy. Discover services in the [Storyscript Hub](https://hub.storyscript.io) and follow the directions in the Hub to use public or your private collection of services cross application.

### Submitting services

Head over to [Storyscript Hub](https://hub.storyscript.io) to publish your services privately or publicly.

## Deploy

> Zero-devops deployments with Storyscript.

Storysript abstracts away the unnecessary complexities in orchestrating, communicating and managing microservices, including:

1. Container deployment
1. Version management
1. AB Testing
1. Scaling
1. Monitoring
1. Health checks
1. Protocols
1. Error handling
1. Retry-logic
1. Fail-over
1. Event-throttling
1. Rate-limiting

:sparkles::cake::sparkles: Our mission is to make all the above **no longer** the responsibility of a human, so they can focus exclusively on business-logic.

> **Blog**, [deploying your first Story on Asyncy](https://asyncy.com/blog/story-telling/)
