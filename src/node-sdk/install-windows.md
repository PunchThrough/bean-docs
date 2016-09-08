---
title: Install on Windows
layout: basic.hbs
autotoc: true
order: 3
---


## Prerequisites

1. Python 2.7.* needs to be installed and on your system PATH
2. [Setup BLE Dongle](/node-sdk/ble-dongle-setup/)
3. [node-gyp](https://github.com/nodejs/node-gyp#installation) prerequisites, explained further later.

## Install Node.js/NPM

We officially support the LTS (v4.*.*) and Current (v6.*.*) versions of Node.js.

* [Node.js Download Page](https://nodejs.org/en/download/)

Also, make sure NPM is at least version 3+.

1. Check version, `npm --version`.
2. If it is less than 3, upgrade it `npm install npm -g`

**Note:** We've seen the previous command fail on Windows, if so, delete this file and retry:		

```		
C:\Users\<user>\AppData\Roaming\npm\node_modules\npm		
```

## Install `bean-sdk`

Before we jump into installing the bean-sdk, we must first ensure your system is ready to build native Node.js modules using [node-gyp](https://github.com/nodejs/node-gyp#installation).

Install `windows-build-tools` using NPM from an elevated PowerShell or CMD.exe (run as Administrator).

```		
npm install --global --production windows-build-tools
```

Finally, install `bean-sdk`

```
npm install -g bean-sdk
```

## Run it!

Let's scan for Beans to ensure everything is working properly!

```
bean scan
```
