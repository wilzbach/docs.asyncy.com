---
prev: /storyscript/advanced/
---

# Secrets

Secrets (aka environment variables) are stored in a restricted keyword `app.secrets`.

Set secrets with the Storyscript CLI

```bash
story config set foo=bar
```

Then you may access them via `app.secrets` map, like this:
```coffeescript
if app.secrets.foo == "bar"
    ...
```

::: tip 💡Hint
Secrets are case–insensitive. For example: `app.secrets.FOO` and `app.secrets.foo` reference the same variable.
:::

