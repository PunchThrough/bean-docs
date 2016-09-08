---
title: CLI Loader
layout: basic.hbs
autotoc: true
order: 8
---

## Introduction

This guide will walk you step-by-step through the basic functionality of the Bean command-line-interface (CLI). When you are done reading this guide you will have:

1. Scanned for Beans
2. Located the Bean you are interested in
3. Compiled a Sketch
4. Uploaded the Sketch

If you are looking for an exhaustive reference for the commands available in the CLI please [see here](/node-sdk/cli-reference/).

## Before you begin

Follow the install guide for your system:

* [Linux](/node-sdk/install-linux)
* [Windows](/node-sdk/install-windows)
* [OS X](/node-sdk/install-osx)
* [Raspberry Pi](/node-sdk/install-rpi)

Also, [install Arduino IDE](https://www.arduino.cc/en/Main/Software).

## Get Started

### Scan and Locate

First, let's start scanning for Beans.

{{{img_rel this 'cli-scan.png' 'Scan for Bean' '100%'}}}

We see there is a new LightBlue device discovered, with some basic information about it, including the important **Address**.

To ensure that this is the Bean we are interested in, let's blink the on-board LED.

{{{img_rel this 'cli-blink-led.png' 'Blink LED' '100%'}}}

Ok! It looks like we have the correct address for the Bean we are interested in.

### Optional: Update Bean Firmware

This step ensures the Bean has the latest and greatest firmware. Although not always required for all Bean interactions it's never a bad idea and certain functionality wont work if the Bean isn't up to date!

Updating the firmware is as simple as blinking an LED. However, the log output in the terminal is quite chatty so we won't post a screen capture here.

### Associate With Arduino

Next, we must "associate" our CLI loader with the Arduino app on your system, similar to hitting cmd+A using the OS X loader. The command we will use for this is called `install_bean_arduino_core`.

This command will prompt you to enter the path to the Arduino install folder. Examples include:

Windows: **C:\Program Files (x86)\Arduino\**

Linux: **/home/user/Arduino/**

Mac: **/Applications/Arduino.app/**

{{{img_rel this 'cli-associate.png' 'Associate' '100%'}}}

### Compile Sketch

Compiling sketches works similar to the OS X Loader, although programing/uploading the Bean is done through the CLI.

First, open your Arduino app and make sure of two things:

1. The correct **Board** is chosen under the **Tools** menu. The only two valid options for LightBlue devices are Bean and Bean+.
2. The correct **Programmer** is selected under the **Tools** menu.

{{{img_rel this 'arduino-tools.png' 'Arduino Tools Menu' '100%'}}}

Next, open up a sketch of your choosing. For the sake of this guide it is probably easiest to open an example sketch located in the **File** menu. Make sure you choose a "LightBlue Bean" sketch (which compile for both Bean and Bean+).

With your sketch opened, click "Upload" in the Arduino IDE. This compiles the sketch and puts it somewhere where the CLI Loader can access it.

**Note:** This step requires `python` to be on your system path!

### Upload Sketch

Finally we are ready to upload the sketch.

First, we can view any compiled sketches from the previous step, or anytime in the past using the command `list_compiled_sketches`.

{{{img_rel this 'cli-list-sketches.png' 'List Sketches' '100%'}}}

As you can see here, we have many sketches compiled and available for uploading. Let's choose one and upload it using the `program_sketch` command.

The log output is somewhat chatty, which we will be improving upon.

{{{img_rel this 'cli-sketch-begin.png' 'List Sketches' '100%'}}}

And after some time...

{{{img_rel this 'cli-sketch-end.png' 'List Sketches' '100%'}}}

Complete!

## Next Steps

* []
