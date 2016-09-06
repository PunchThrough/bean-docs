---
title: Install on OS X
layout: basic.hbs
autotoc: true
order: 2
---

## Prerequisites

1. Python 2.7.* needs to be installed and on your system PATH

## Install Node.js/NPM

We officially support the LTS (v4.*.*) and Current (v6.*.*) versions of Node.js.

https://nodejs.org/en/download/

Steps:

TODO

Finally, make sure NPM is at least version 3+.

1. Check version, `npm --version`.
2. If it is less than 3, upgrade it ``

## Install `bean-sdk`

```
sudo npm install --unsafe-perm -g bean-sdk
```

## Run it!

Finally, let's scan for Beans!

```
bean scan
```

## Next Steps

You have now installed the Node.js Bean SDK and CLI. Check out our CLI usage guide next:

* [CLI Usage](/node-sdk/cli-usage/)
