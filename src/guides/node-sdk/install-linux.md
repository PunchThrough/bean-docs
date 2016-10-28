---
title: Install on Linux
layout: basic.hbs
autotoc: true
order: 4
---

## Prerequisites

1. [Python 2.7.*](https://www.python.org/downloads/) needs to be installed and on your system PATH
2. `sudo apt-get install bluetooth bluez libbluetooth-dev libudev-dev`
3. [Setup BLE Dongle](../ble-dongle-setup/) (Optional: only required if no builtin BLE)

## Install Node.js/NPM

We officially support the LTS (v4.x.x) and Current (v6.x.x) versions of Node.js.

* [Node.js Download Page](https://nodejs.org/en/download/)

**Binary Install Steps:**

1. Download and unzip the appropriate binary Linux distribution for your system.
5. Enter the newly unpacked folder, and delete the following files:

```
cd node-v4.5.0-linux-arm7l
rm CHANGELOG.md
rm LICENSE
rm README.md
```

6. Install `sudo cp -R * /usr/local/`

Also, make sure NPM is at least version 3+.

1. Check version, `npm --version`.
2. If it is less than 3, upgrade it `sudo npm install npm -g`

## Install Bean CLI Loader

```
sudo npm install -g --unsafe-perm bean-sdk
```

## Run it!

On Linux, the underlying [noble library](https://github.com/sandeepmistry/noble) requires root access. So either run the `bean` command as `sudo` OR, do the following:

```
sudo apt-get install libcap2-bin
sudo setcap cap_net_raw+eip $(eval readlink -f `which node`)
```

Let's scan for Beans to ensure everything is working properly!

From the terminal:

```
bean scan
```

## Next Steps

* [Getting Started with CLI Loader](../../getting-started/cli-loader/)
* [CLI Reference Docs](../cli-reference)
