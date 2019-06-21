# General

## What are services?

Services are service-oriented self-contained applications that are highly specialized and reusable services.
These services can be algorithms, APIs or specialized functions. In Storyscript world, it's anything you can wrap in a Docker container. Services are independently deployable, scalable and manage their own metrics, logs and other operations.

> <small>Next: [Open Microservice Guide](http://microservice.guide/) &mdash; the open guide and standard for implementation and design of microservices.</small>

## Who maintains the services?

The project contributors maintain the service. This may be open-source projects, vendor built projects, or private projects.

For example, a Twitter library written in Python can be built in a Docker container and deployed on Storyscript in minutes. The Twitter library is already maintained by the contributors, there is very little extra work to make the service compatible in Storyscript Cloud.

## How difficult is it to build my own services?

Use any programming language necessary to build your service just like you would a library, package, or application.

> <small>Blog: [Building Smarter Microservices](https://blog.storyscript.io/designing-smarter-microservices/) &mdash; A guide for building your first microservice.</small>
