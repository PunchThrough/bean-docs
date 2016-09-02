---
title: Installation
layout: basic.hbs
autotoc: true
order: 5
---

# Prerequisites

1. Python 2.7.* needs to be installed and on your system PATH
2. `sudo apt-get install bluetooth bluez libbluetooth-dev libudev-dev`

# Install Node.js/NPM

We officially support the LTS (v4.*.*) and Current (v6.*.*) versions of Node.js.

https://nodejs.org/en/download/

Steps:

1. Figure out which version of the ARM architecture your Raspberry Pi has, `uname -a`.
2. Find the appropriate ARM binary under "Additional Platforms".
3. Download the binary. Example: `curl -O https://nodejs.org/dist/v4.5.0/node-v4.5.0-linux-armv7l.tar.xz`
4. Unpack. Example: `tar -xfv node-v4.5.0-linux-armv7l.tar.xz`
5. Enter the newly unpacked folder, and delete the following files:

```
cd node-v4.5.0-linux-arm7l
rm CHANGELOG.md
rm LICENSE
rm README.md
```

6. Install `sudo cp -R * /usr/local/`

Finally, make sure NPM is at least version 3+.

1. Check version, `npm --version`.
2. If it is less than 3, upgrade it ``

# Install `bean-sdk`

```
sudo npm install --unsafe-perm -g bean-sdk
```

# Run it!

On Linux, the underlying [noble library](https://github.com/sandeepmistry/noble) requires root access. So either run the `bean` command as `sudo` OR, do the following:

```
sudo apt-get install libcap2-bin
sudo setcap cap_net_raw+eip $(eval readlink -f `which node`)
```
