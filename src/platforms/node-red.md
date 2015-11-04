---
title: Node-RED
layout: basic.hbs
autotoc: true
---

## Introduction

---

Welcome to the Node-RED guide for the LightBlue Bean.  This guide will walk you through the steps neccessary to connect your Bean to another device using internet technologies like Node.js.  The particular techology we will be using is Node-RED, a visual programming interface that requires very little coding experience.

### Node-RED Basics

Node-RED is based on Node.js. The Node-RED application runs as a web server, and you customize and manipulate functional “flows” from any computer’s browser, local or remote. Every Node-RED app consists of nodes which are linked together to form the logical flow of your application. The nodes typically fall under _input_, _operation_ or _output_. Here is a very generic example showing this concep:

{{{img_rel this 'generic_node_red.png' 'Generic Node-RED app' '70%'}}}

We provide a set of nodes specifically for communicating with the Bean. They are defined as follows:

* [Bean Serial](#) - Send or recieve serial messages to or from a connected Bean.
* [Bean Accelerometer](#) - Get accelerometer data from a connected Bean.
* [Bean LED](#) - Set the Bean's LED to a specified color.
* [Bean Temperature](#) - Get the ambient temperature from a connected Bean.

Each of the nodes defined above can be used in a Node-RED application once you install these nodes into your Node environment. We will cover installation and setup in following sections. First, take a look at the following app to get an idea of how you might use our Bean nodes.

{{{img_rel this 'complex_node_red.png' 'Simple Node-RED app' '70%'}}}

### Configuration

Node-RED apps are built for the web in traditional client/server fashion. Most of the time you will run both the server (Node.js) and client (browser) on your computer. However, a more powerful configuration might be to run your server on a dedicated machine that rarely or never turns off. As long as your server machine is within range of a Bean for connection, this setup can open a whole new world of possibilities. See the diagrams below to get a visual respresentation of these concepts.

__Basic Setup:__

{{{img_rel this 'pc_node_red_setup.png' 'PC Server Node-RED' '70%'}}}

__Dedicated Server using a Raspbery Pi:__

{{{img_rel this 'rpi_node_red_setup.png' 'Rpi Server Node-RED' '100%'}}}

