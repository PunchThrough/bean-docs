---
title: BLE Dongle Setup
layout: basic.hbs
autotoc: true
order: 6
---

## Introduction

This page will guide you through the process of getting your BLE dongle setup for use with the Bean SDK and CLI for Node.js. The reason a dongle is required for certain platforms is to work around problematic platform-specific BLE APIs (e.g. Windows).

**The following platforms require a dongle:**

* Windows (all)
* Linux (**if** no builtin BLE)
* Raspberry Pi 1 & 2 (no builtin BLE)

**The following platforms do **not** require a dongle:**

* OS X (all)
* Linux (with builtin BLE)
* Raspberry Pi 3

Here is a list of BLE dongles that we have tested with that work:

* https://www.adafruit.com/products/1327
* https://www.amazon.com/IOGEAR-Bluetooth-Micro-Adapter-GBU521/dp/B007GFX0PY
* https://www.amazon.com/BootKitchenTan-Wireless-bluetooth-cable-free-connections/dp/B01EFB5Q2G/ref=sr_1_12?s=pc&ie=UTF8&qid=1473182516&sr=1-12&keywords=ble+dongle
* there are many more...

## Dongle setup

First, download the [Zadig tool](http://zadig.akeo.ie/).

Then, select **Options > List All Devices**.

{{{img_rel this 'zadig-list-all-devices.png' 'Zadig 1' '85%'}}}

Find your BLE adapter in the device dropdown list and click "Replace Driver". Make sure you are replacing it with the WinUSB driver (even on Linux!).

{{{img_rel this 'zadig-replace-driver.png' 'Zadig 2' '85%'}}}

You should see the following dialog if successful.

{{{img_rel this 'zadig-success.png' 'Zadig 3' '85%'}}}

All done! Your dongle should be ready to use with the Bean SDK and CLI.

## Driver Uninstall

If you wish to uninstall the WinUSB driver you can use Windows device manager.

{{{img_rel this 'zadig-uninstall-driver.png' 'Zadig 4' '85%'}}}
