# Storyscript Cloud

## Is Storyscript Cloud serverless?

**Yes**, Storyscript Cloud is a serverless execution environment. The Storyscript Runtime provides an HTTP gateway which executes Storyscript in a serverless design.

## Is Storyscript Cloud a Paas, Baas, or Faas?

Storyscript Cloud is a **Platform as a Service** (aka PaaS) which has functionality of Backend as a Service (BaaS), Functions as a Service (FaaS) and some SaaS too...but it's mostly PaaS.

## Does Storyscript Cloud use Kubernetes under-the-hood?

**It can**. Kubernetes is our first supported container scheduler and we plan to support others like Nomad and Docker Swarm.

## How much Kubernetes or devops experience is required?

**Zero.** Storyscript Cloud's mission is to be a zero-devops deployment runtime.

## Where are Storyscript's and other code stored?

Deployments to Storyscript Cloud **must** be git-backed. Code is compiled during deployment and changes the runtime environment to match your execution patterns.

## How are services managed?

When the Application is deployed all containers are pulled, started and scaled intelligently. Storyscript monitors service metrics, scales dynamically and load-balances between nodes automatically.

## Is Storyscript Cloud used for prototypes only?

**No**, our mission is to make the Storyscript Cloud a dynamically-scalable, robust, production-grade platform. It can also be used for on-premise deployments.

## Does Storyscript Cloud provide file storage?

**Yes**. There are services that provide this functionality. You can create your own too.

## Does the Storyscript Cloud Platform come with a persistent database?

**No**, databases are unfortunately not one-size-fits-all (yet). We do have plans to help here too, but you can bring your own database or we can manage and create one for you.

## Is Storyscript Cloud multi-cloud?

**Soon**. This is something we label "unnecessary complexity" every application should be multi-cloud by default and not the developers job to manage it.

## Can I bring my own database?

**Yes***. We recommend using the cloud providers database, such as Google Cloud SQL or AWS RDS. But you can run and managing your own database on the Storyscript Cloud.

## Can I run Storyscript Cloud on my own cloud?

**Soon**. We plan to have `helm install storyscript` at your convenience.

## Is Storyscript Cloud open source?

**Yes**. Storyscript Cloud is open source on [GitHub](https://github.com/storyscript).
In the future, there may be power-user tools that are not open source, but the language and runtime will remain open source.

This is very important for developer trust. We believe it is far too much risk to develop applications on non-open source platforms as it handcuffs your product success to a 3rd party company (a big no-no in business). Futhermore, as a product and company, we made numerous decisions to reduce our vendor-lockin: prime example is the Open Microservice Guide, all the microservices are platform-agnostic by design.

## What if I want to migrate off of Storyscript Cloud?

Sorry to hear that, we hope you leave us feedback why. But, not to worry. You can go back to the "old ways" of orchestrating and managing microservices. All the microservices and functions you use in Storyscript are portable to another runtime. Our secret sauce is the glue...now you have to make your own glue (which is the hard part, hence the product value).

## Is there a managed Storyscript Cloud?

**Yes**, we call this the **Storyscript Cloud**. Currently in Private Beta, please contact us for an invitation.

## What is the pricing for Storyscript Cloud?

We plan to offer **highly transparent** pricing for our Storyscript Cloud offering. Our mission is to amplify developers to be 10-100x more effective. We hope our pricing reflects this amplification upside.

Pricing is shaping up to be a per-user license to utilize our tooling and connecting to our data.
Server costs are marked-up transparently at a rate around 10-20%.

A few services in the Storyscript Hub will be premium, at the developer/company discretion. We will **not** charge extra to utilize these services. In other words, there is 0% cut from our marketplace to Storyscript. The developer/company keeps 100% of the revenue. We believe this will encourage usage and strengthen the ecosystem while keeping the value-add in the right place.

## Does Storyscript offer training?

**Yes**. Details coming soon.

## Does Storyscript offer support?

> During Beta we offer [support](/support/) for **free**. :heart:

Storyscript offers a variety of support options ranging from community support to premium support. More details will arrive during Beta.

## Does Storyscript have a Service Level Agreement (SLA)?

After Beta. For sure!

## What are the limitations?
During Beta, we have the following limitations:
1. You may create and run 5 apps on the Storyscript Cloud for free
2. Each app may make use of a maximum of 15 services
3. Each service is allocated a maximum of 100 MiB of memory
4. Each app may make use of a maximum of 15 persistent volumes
5. Each volume is automatically sized to 100 MiB of data

> If any of these parameters are violated during runtime or deployment,
> your app will be terminated. If your app is terminated, run `$ story logs`
> to know the cause of termination. Please contact our team to increase limits during Beta.

## What are the vendor lock-in risks?

All technology has a level of vendor lock-in, it's unavoidable. Storyscript is focused at building an open platform to reduce vendor lock-in concerns as much as possible. Our core mission depends on our ability to reduce vendor lock-in.

1. **Open Source** &mdash; Storyscript is 100% open sourced under various licenses that provide transparency and portability to on-premise commercial applications.
1. **Open Language** &mdash; Storyscript is MIT licensed and designed to be highly portable and platform-agnostic. A vendor could use the output of Storyscript to build their own platform.
1. **Open Services** &mdash; Thanks to the Open Microservice Guide all microservices are, by design, not unique to Storyscript.
2. **Open Standards** &mdash; The microservices used by Storyscript are designed in a platform-agnostic way using the principles and guidelines outlined in the [Open Microservice Guide](https://microservice.guide).

Please contact [legal@storyscript.io](mailto:legal@storyscript.io) for questions and concerns.
