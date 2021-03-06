---
title: Install on OS X
layout: basic.hbs
autotoc: true
order: 2
---

## Prerequisites

1. [Python 2.7.*](https://www.python.org/downloads/) needs to be installed and on your system PATH

## Install Node.js/NPM

We officially support the LTS (v4.x.x) and Current (v6.x.x) versions of Node.js.

* [Node.js Download Page](https://nodejs.org/en/download/)

Also, make sure NPM is at least version 3+.

1. Check version, `npm --version`.
2. If it is less than 3, upgrade it `npm install npm -g`

## Install Bean CLI Loader

```
npm install -g bean-sdk
```

## Run it!

Let's scan for Beans to ensure everything is working properly!

From the terminal:

```
bean scan
```

## Next Steps

* [Getting Started with CLI Loader](../../getting-started/cli-loader/)
* [CLI Reference Docs](../cli-reference)
