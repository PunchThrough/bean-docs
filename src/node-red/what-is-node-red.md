---
title: What is Node-RED?
layout: basic.hbs
autotoc: true
order: 1
---

## Introduction

This guide will walk you through the steps neccessary to connect your Bean to another device using Node-RED, a visual programming interface that requires very little coding experience.

## Node-RED Basics
 
Node-RED is based on Node.js. The Node-RED application runs as a web server, and you customize and manipulate functional “flows” from any computer’s browser, local or remote. Every Node-RED app consists of nodes which are linked together to form the logical flow of your application. The nodes typically fall under _input_, _operation_ or _output_.

Below is a very simple example of how these different nodes would interact with each other.

{{{img_rel this 'generic_node_red.png' 'Generic Node-RED app' '70%'}}}

In reality, you wouldn't have nodes with such generic names as "input" or "output". At Punch Through we have created our own nodes which are specifically designed to communicate with the Bean.

{{{img_rel this 'bean-nodes.png' 'Bean Nodes' '50%'}}}

* __Acceleration:__ Get accelerometer data from Bean.
* __Serial:__ Send or recieve serial messages to or from Bean.
* __Temperature:__ Get the ambient temperature from Bean.
* __Read Scratch:__ Read scratch data set by Bean. 
* __RGB LED:__ Set Bean's LED to a specified color.
* __Write Scratch:__ Write scratch data to Bean. 

Each of the nodes defined above can be used in a Node-RED application once you install these nodes into your Node environment. We will cover installation and setup in following sections.

Check out the following example of a Node-RED app that grabs temperature data from the Bean and tweets it! Connecting your Bean to the internet can be as easy as this.

{{{img_rel this 'complex_node_red.png' 'Bean Node-RED app' '70%'}}}

## Possible Configurations

Node-RED apps for the web in traditional client/server fashion. Most of the time you will run both the server and client on your computer:

{{{img_rel this 'pc_node_red_setup.png' 'PC Server Node-RED' '70%'}}}

However, a more powerful configuration might be to run your server on a dedicated machine that rarely or never turns off. As long as your server is within connection range of a Bean, this setup can open a whole new world of possibilities.

{{{img_rel this 'rpi_node_red_setup.png' 'Rpi Server Node-RED' '100%'}}}

## Next Steps

Now that you have a basic understanding of what Node-RED is and how it can be used to quickly start connecting Beans to your computer and internet, you can get started by installing Node-RED:

[Install Node-RED >>](../installation)

You may also want to check out the [official Node-RED docs](http://nodered.org/docs/).
