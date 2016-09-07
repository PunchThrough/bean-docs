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

* [Node.js Download Page](https://nodejs.org/en/download/)

Also, make sure NPM is at least version 3+.

1. Check version, `npm --version`.
2. If it is less than 3, upgrade it `npm install npm -g`

## Install `bean-sdk`

```
npm install -g bean-sdk
```

## Run it!

Let's scan for Beans to ensure everything is working properly!

```
bean scan
```

## Next Steps

You have now installed the Node.js Bean SDK and CLI. Check out our CLI usage guide next:

* [CLI Usage](/node-sdk/cli-usage/)
