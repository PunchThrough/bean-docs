---
title: Install on Windows
layout: basic.hbs
autotoc: true
order: 3
---


## Prerequisites

1. Python 2.7.* needs to be installed and on your system PATH. You system PATH or Path is an environment variable. Sometimes the Python installer may add Python to your PATH for you, if not there is plenty of documentation online for doing this.
2. [Setup BLE Dongle](../ble-dongle-setup/)
3. [node-gyp](https://github.com/nodejs/node-gyp#installation) prerequisites, explained further later, ignore for now.

## Install Node.js/NPM

We officially support the LTS (v4.x.x) and Current (v6.x.x) versions of Node.js.

* [Node.js Download Page](https://nodejs.org/en/download/)

Also, make sure NPM is at least version 3+.

1. Check version, `npm --version`.
2. If it is less than 3, upgrade it `npm install npm -g`

**Note:** We've seen the previous command fail on Windows, if so, delete this file and retry:		

```		
C:\Users\<user>\AppData\Roaming\npm\node_modules\npm		
```

## Install Microsoft Build Tools

Before we jump into installing the bean-sdk, we must first ensure your system is ready to build native Node.js modules using [node-gyp](https://github.com/nodejs/node-gyp#installation).

There are two options for doing this. The option you pick depends on if you have you have Visual Studio installed on your computer. Even for those of you with VS installed, we recommend *trying* option 1 first! If it doesn't work, move on to option 2.

#### Option 1 (Recommended)

For those of you who do **not** have visual studio, install `windows-build-tools` using NPM from an elevated PowerShell or CMD.exe (run as Administrator).

```
npm install --global --production windows-build-tools
```

#### Option 2

If option 1 didn't work for you, and you have Visual Studio installed on your computer, you don't need to install the package from option 1. You simply need to tell `npm` which version of Visual Studio you have installed. For example, if it's version 2015, run:

```
npm config set msvs_version 2015 --global
```

## Install `bean-sdk`

Finally, install `bean-sdk`

```
npm install -g bean-sdk
```

## Run it!

Let's scan for Beans to ensure everything is working properly!

From the terminal:

```
bean scan
```
