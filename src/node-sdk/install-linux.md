---
title: Install on Linux
layout: basic.hbs
autotoc: true
order: 4
---

## Prerequisites

1. Python 2.7.* needs to be installed and on your system PATH
2. `sudo apt-get install bluetooth bluez libbluetooth-dev libudev-dev`
3. [Setup BLE Dongle](/node-sdk/ble-dongle-setup/) (Optional: only required if no builtin BLE)

## Install Node.js/NPM

## Install `bean-sdk`

## Run it!

On Linux, the underlying [noble library](https://github.com/sandeepmistry/noble) requires root access. So either run the `bean` command as `sudo` OR, do the following:

```
sudo apt-get install libcap2-bin
sudo setcap cap_net_raw+eip $(eval readlink -f `which node`)
```

Finally, let's scan for Beans!

```
bean scan
```

## Next Steps

You have now installed the Node.js Bean SDK and CLI. Check out our CLI usage guide next:

* [CLI Usage](/node-sdk/cli-usage/)
