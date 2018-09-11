---
prev: false
next: /storyscript/
---

# Quick Start

Welcome to **Λsyncy Beta** :tada: We are very excited to share our product and receive your feedback.


## Gettting started

To get started, install our CLI.

```shell
brew install asyncy/brew/asyncy
```

| [More install options](/cli/#install) | <img src="../assets/apple-logo.svg" width="15"> macOS | <img src="../assets/windows-logo.svg" width="15"> Windows | <img src="../assets/ubuntu-logo.svg" width="15"> Ubuntu 16+ | :snake: Python
| --- | --- | --- | --- | --- |


Login with GitHub Oauth.

```shell
asyncy login
```

Next, let's bootstrap from an example project.

```shell
git clone https://github.com/asyncy/bootstrap.git && cd bootstrap
```

Now, we can create our first application.

```shell
asyncy apps:create
```

Let's deploy!

```shell
git push asyncy master
```

:sparkles::cake::sparkles: Congratulation! You have deployed your first Asyncy application!

::: tip See it live!

Checkout the deploy output from your deployment.
Should something like `https://happy-gilmore-523.asyncyapp.com`

:::

Ready to create your own application? Head over to our []


<!-- TODO Feedback and question on how your experience was doing this. -->


## Writing your first Story

Storyscript is a new programming language, but do not worry, it's built for developers taking favourite features of many languages. You'll see familiar syntax to Python, Ruby, Clojure and Node.

We have created a couple examples that can help you bootstrap your project.

```shell
asyncy bootstrap
```

Let's choose the http endpoint.

```shell
asyncy bootstrap http > http.story && cat http.story
```

```coffeescript
http server as client
    when client listen method:'get' path:'/' as request
        request write content:'Hello world!'
```

::: tip Learn more about Storyscript

Checkout our extensive documentation about [Storyscript](/storyscript/)

Read [How to write Stories](https://medium.com/asyncy/how-to-write-stories-a7cffd270225) on Medium (2 minutes)

:::

## Deploy changes

Ready to redeploy your application? We made that easy and intuitive.

Check your changes into `git`.

```shell
git add . && git commit -m 'wrote cool stories :tada:'
```

Ship it! :rocket:

```shell
git push asyncy master
```

:sparkles::cake::sparkles: Your application is now live!
