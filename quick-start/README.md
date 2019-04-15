---
prev: false
next: /storyscript/
---

# Quick Start

Welcome to **Asyncy Beta** :tada: We are very excited to share our product and receive your feedback.


## Get started

To get started, install our CLI:

<!-- ```shell
brew install asyncy/brew/asyncy
``` -->
<!--
| <img src="../assets/apple-logo.svg" width="15"> macOS | <img src="../assets/windows-logo.svg" width="15"> Windows | <img src="../assets/ubuntu-logo.svg" width="15"> Ubuntu 16+ | :snake: Python
| --- | --- | --- | --- | -->

<table width="100%">
<tr>
<td style="text-align:center" width="100%" valign="top" colspan="2">
<details :open="$page.os === 'macos'">
<summary><h4><img src="../assets/apple-logo.svg" width="15"> macOS</h4></summary>

<!--
<a href="https://github.com/asyncy/cli/releases/download/0.0.6/asyncy-0.0.6.pkg" class="button">Download the installer</a>
<small>Also available via Homebrew:</small>
-->

```shell
brew install asyncy/brew/asyncy
```

</details>
</td>
<!--
<td style="text-align:center" width="50%" valign="top">
<details :open="$page.os === 'windows'">
<summary><h4><img src="../assets/windows-logo.svg" width="15"> Windows</h4></summary>

Download the appropriate installer:

<div><a href="https://github.com/asyncy/cli/releases/download/0.0.6/asyncy-x64.exe" class="button">64-bit installer</a></div>
<div><a href="#" class="button">32-bit installer</a></div>

</details>
</td>
-->
</tr>
<tr>
<td style="text-align:center" width="50%" valign="top">
<details :open="$page.os === 'unix' || $page.os === 'linux'">
<summary><h4><img src="../assets/ubuntu-logo.svg" width="15"> Ubuntu 16+</h4></summary>

```shell
sudo snap install asyncy --classic
```

<small><a href="https://snapcraft.io/">Snap is available on other Linux OS.</a></small>

</details>
</td>
<td style="text-align:center" width="50%" valign="top">
<details :open="$page.os === 'unknown'">
<summary><h4>Direct from Python</h4></summary>

```shell
pip install --user asyncy
```

We **strongly recommend** using the other installation techniques.

</details>
</td>
</tr>
</table>

Next, login using your GitHub account:

```shell
asyncy login
```

All done! You're all set to create and deploy apps written in Storyscript.

If you're having trouble logging in via GitHub, please [reach out to us](http://asyncy.click/slack).

<!-- TODO Feedback and question on how your experience was doing this. -->


## Write your first Story

Storyscript is a new programming language, but don't worry, it's built for developers taking favourite features of many languages. You'll see familiar syntax to Python, Ruby, Clojure and Node.

Let's create your first application, to be able to check out the samples which are bundled.
```shell
mkdir first_app && cd first_app
```
```shell
asyncy apps create
```

Doing so will create `asyncy.yml` in the current directory. This file contains metadata about your new app.

We have created a few examples that can help you bootstrap your project:

```shell
asyncy bootstrap
```

Let's choose the HTTP endpoint:

```shell
asyncy bootstrap http > http.story && cat http.story
```

```coffeescript
http server as client
    when client listen method: 'get' path: '/' as request
        request write content: 'Hello world!'
```

Let's deploy this story:

```shell
asyncy deploy
```
```text
Compiling Stories...
Deploying app competent-nash-82.asyncyapp.com... |
√ Version 1 of your app has been queued for deployment

Waiting for deployment to complete... |
√ Deployed successfully!
If your story listens to HTTP requests, visit https://competent-nash-82.asyncyapp.com
```

:sparkles::cake::sparkles: Congratulations! You have just deployed your first Asyncy application!

**Note:** `asyncy deploy` will deploy all the stories in your project at once.

::: tip See it live!

Check the deployment output.
It will indicate where your story was deployed.

:::

::: tip Learn more about Storyscript

Checkout our extensive documentation about [Storyscript](/storyscript/)

:::

## Deploy changes

Ready to redeploy your application? We made it easy and intuitive.

Just run the same `deploy` command again:
```shell
asyncy deploy
```

:sparkles::cake::sparkles: Your application is now live!


::: tip Next

Deploy a simple [file upload and download story](https://asyncy.com/blog/story-telling/).

:::
