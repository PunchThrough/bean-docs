---
title: Water Detection System
layout: basic.hbs
autotoc: true
order: 1
---

{{{img_rel this '1IMG_0009.jpeg' 'Bean lock' '100%'}}}

## Things Used In This Project

* [LightBlue Bean](https://punchthrough.com/bean/buy/)
* [Raspberry Pi 2 Model B](http://www.adafruit.com/product/2358)
* [SeeedStudio Grove Moisture Sensor](http://www.seeedstudio.com/depot/Grove-Moisture-Sensor-p-955.html)
* [	SeeedStudio 2xAA Battery Holder](http://www.seeedstudio.com/depot/2xAA-Battery-Holder-p-1109.html)
* [SeeedStudio 4 Pin Male Jumper to Grove Conversion Cable](http://www.seeedstudio.com/depot/Grove-4-pin-Male-Jumper-to-Grove-4-pin-Conversion-Cable-5-PCs-per-Pack-p-1565.html)

## Story

{{{img_rel this '2leaks.gif' 'Has this ever happened to you?' '100%'}}}

Ever find yourself in this situation…

It’s happened to me. But, worry no more with this water detection system which is fun to build and capable of saving you some $$$ when the plumbing busts.

**This example shows how to use Node-RED on a RaspberryPi to send an email whenever a moisture reading exceeds a threshold. Node-RED connects to the LightBlue Bean once a minute, requests the moisture and sends an email if water is detected.**

Node-RED is a visual programming interface for the Internet of things. If you haven’t used Node-RED with the LightBlue Bean before, here is more [information](http://punchthrough.com/bean/node-red/).

This example uses a RaspberryPi to run the Node-RED server. The node red server acts as an internet access point for the LightBlue Bean. Here are the full [installation](https://punchthrough.com/bean/guides/node-red/installation/) details for using the LightBlue Bean and Node-RED.

This is what the Node-RED flow for the project looks like:

{{{img_rel this '3flow3.png' 'flow diagram' '100%'}}}

## What do the different nodes do?

**1 min interval:** Triggers the nodes it’s connected to on a set interval. In this example the interval is 60 seconds.

**Bean serial:** This is a node developed specifically for the LightBlue Bean. It connects to a specified Bean and allows you to send and receive serial messages.

**Moisture threshold:** Compares the current moisture to a high threshold. If it’s too wet it sends a string with the moisture reading to the next node.

**Email:** Sends the string passed from the previous node to a specified address.

## Step 1: Get Node-RED up and running on the RaspberryPi

Follow these [instructions](instructions) to set up Node-RED.

{{{img_rel this '3flow3.png' 'flow diagram' '100%'}}}

