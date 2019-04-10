# Services

Services are containerized software or API specs to interact with the API of a 3rd party service, database or another piece of software. 

**Services *should* encompass the full domain of it's scope.** For example, the Twitter microservices should be the entire Twitter API, the GitHub microservices should have the REST API, GraphQL, webhook server and login server.

[[toc]]

## Create

There are three ways to create services for Asyncy.

1. [Containerized Services](#containerized-services) (e.g., Docker containers)
1. *Coming soon* [OpenAPI](#openapi)
1. *Coming soon* [AsyncAPI](#syncapi)


### Containerized Services

Containerized services is software wrapped in a Docker container. Commonly called microservices, but this could be your monolith codebase too.

1. Follow the [Open Microservice Guide](https://microservice.guide) - Spec and tools for building microservices rapidly.
2. Submit your service to the [Asyncy Hub](https://hub.asyncy.com).
3. Access your service via Storyscript, like this:

```coffeescript
output = myTeam/myFirstMicroservice foobar key:value
```

### OpenAPI

The [OpenAPI](https://swagger.io/docs/specification/about/) spec (aka SwaggerAPI) is an API description format for REST APIs. 

Soon Asyncy Hub will support uploading your OpenAPI spec enabling developers to rapidly communicate with the service.

1. Upload spec to Asyncy Hub.
2. Interact with your OpenAPI REST API in the following way:

```coffeescript
output = myTeam/myOpenAPI endpoint arg:value
```

### AsyncAPI

The [AsyncAPI](https://asyncapi.com) spec is an API description format for event-driven services.

Soon Asyncy Hub will support uploading your AsyncAPI spec enabling developers to rapidly communicate with the service.

1. Upload spec to Asyncy Hub.
2. Interact with your AsyncAPI event-driven service in the following way:

```coffeescript
when myTeam/myOpenAPI action eventName arg:value as event
    ...
```

## Discover

Much like a traditional library of software, the [Asyncy Hub](https://hub.asyncy.com) is your registry of services and functions to share between applications and developers.

## Deploy

> Zero-devops deployments with Asyncy.

Asyncy abstracts away the unnecessary complexities in orchestrating, communicating and managing microservices, including:

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

Simply deploy your Storyscript application and Asyncy takes care of the rest.