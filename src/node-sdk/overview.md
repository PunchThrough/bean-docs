---
title: Node.js Bean SDK/CLI Overview
layout: basic.hbs
autotoc: true
order: 1
---

## Welcome!

Our goal with the Bean has been to build a wirelessly programmable Arduino with great user experience. Initially the only way to do this was to use each operating system's built in Bluetooth interface, which meant writing native code on each platform. Supporting 5+ platforms like this is a huge undertaking.

Now that there are stable cross platform BLE libraries, we are working towards unifying our code base, so we can provide more frequent updates. Our new CLI loader is a step in this cross-platform direction. It has allowed us to support Windows with a much improved user experience, and to provide Linux support for the first time.

The following platforms are supported:

* [Mac OS X](../install-osx/)
* [Linux (Debian distributions)](../install-linux/)
* [Windows 7, 8, 10](../install-windows/)
* [Raspberry Pi 1, 2 and 3](../install-rpi/)

## CLI

The CLI will act as a "Bean Loader" application for Windows and Linux until we have a full-featured GUI loader built on top of the SDK. Of course, it also works on OS X.

* [Getting started with CLI Loader](../../getting-started/cli-loader/)

## SDK

The SDK is written using Node.js which allows developers to write custom, cross-platform applications that communicate with Bean/Bean+ for the first time. A full API reference and example documentation coming soon! For now, see the [project README](https://github.com/punchthrough/bean-sdk-node).

## Additional Links

* [Source code on GitHub](https://github.com/punchthrough/bean-sdk-node)
* [Listing on NPM](https://www.npmjs.com/package/bean-sdk)
* [noble.js](https://github.com/sandeepmistry/noble)
