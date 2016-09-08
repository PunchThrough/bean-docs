---
title: Overview
layout: basic.hbs
autotoc: true
order: 1
---

## Welcome!

Welcome to the first official cross-platform Bean documentation. Building cross-platform apps that interface with real hardware can be difficult and is why we have only supported fully native applications until now. With the help of the [noble library]() we were able to build the first official cross-platform Bean SDK and CLI loader using Node.js.

The following platforms are supported:

* [Mac OS X](/node-sdk/install-osx/)
* [Linux (Desktop Debian distributions)](/node-sdk/install-linux/)
* [Windows 7, 8, 10](/node-sdk/install-windows/)
* [Raspberry Pi 1, 2 and 3](/node-sdk/install-rpi/)

#### Motivation

Supporting native applications on 5+ platforms (Linux, Windows, Android, OS X, iOS) is extremely time consuming. At Punch Through, we barely have the resources (developers/time) to keep all of our software of satisfactory quality while also tackling consulting projects. Because of this, we decided to go "all-in" on a cross platform solution so we could follow the mantra of "write once, deploy everywhere". Initially we are only targeting the desktop platforms. We are starting with our well designed SDK and CLI, but will be moving towards a GUI solution that we will distribute as a binary like normal.

## CLI

The CLI will act as a "Bean Loader" application for Windows and Linux until we have a full-featured GUI loader built on top of the SDK.

* [Getting started on Linux](/getting-started/cli-loader/)
* [Getting started on Windows](/getting-started/cli-loader/)

## SDK/Library

Documentation coming soon! For now, see the [project README](https://github.com/punchthrough/bean-sdk-node).

## Additional Links

* [Source code on GitHub](https://github.com/punchthrough/bean-sdk-node)
* [Listing on NPM](https://www.npmjs.com/package/bean-sdk)
* [noble](https://github.com/sandeepmistry/noble)
