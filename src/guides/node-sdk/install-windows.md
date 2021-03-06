---
title: Install on Windows
layout: basic.hbs
autotoc: true
order: 3
---


## Prerequisites

1. [Python 2.7.*](https://www.python.org/downloads/) needs to be installed and on your system PATH. You system PATH or Path is an environment variable. Sometimes the Python installer may add Python to your PATH for you, if not there is plenty of documentation online for doing this.
2. [node-gyp](https://github.com/nodejs/node-gyp#installation) prerequisites, explained further later, ignore for now.


## Setup BLE Dongle 

[How to replace the driver on the BLE dongle to work with bean-sdk](../ble-dongle-setup/)

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
**Note**: In addition to having MS Visual Studio installed, you must ensure that C++ toolchain is actually installed. To do this, create a C++ project in VS. By creating a C++ project, additional required dependencies will be installed.

## Install Bean CLI Loader

Finally, install `bean-sdk`

```
npm install -g bean-sdk
```

**Important:** We are currently working through some installation issues in certain Windows environments, particularly those with a pre-existing Visual Studio installation. Please contact us at **info@punchthrough.com** and we will work through any installation issues.

## Run it!

Let's scan for Beans to ensure everything is working properly!

From the terminal:

```
bean scan
```

## Troubleshooting

1. Try upgrading to the latest possible `npm` version:

  ```
  npm -g install npm@next
  ```
2. Make sure Python27 is on System Path. When you type `python --version` it should report v2.x.x. If this is not the case, configure NPM to use Python2.7...here is an example:

  ```
  npm config set python C:\Python27\python.exe --global
  ```

3. Uninstall Visual Studio and re-try option 1. It should never come to this, but if it does, this may help.


## Next Steps

* [Getting Started with CLI Loader](../../getting-started/cli-loader/)
* [CLI Reference Docs](../cli-reference)
