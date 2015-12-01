---
title: Bean Nodes
layout: basic.hbs
autotoc: true
order: 3
---

## Introduction

---

This guide will walk you through how to use the custom nodes for communicating with the Bean.

## Using the Bean Nodes

---

Here are the nodes for communicating with the LightBlue Bean:

* __Bean Acceleration__ - Get accelerometer data from the Bean.
* __Bean Serial__ - Send or recieve serial messages to or from the Bean.
* __Bean Temperature__ - Get the ambient temperature from the Bean.
* __Bean Read Scratch__ - Read scratch data set by the Bean. 
* __Bean RGB LED__ - Set the Bean's LED to a specified color.
* __Bean Write Scratch__ - Write scratch data for the Bean. 

{{{img_rel this 'bean_nodes.png' 'LightBlue Bean Nodes' '100%'}}}


### Setting the Bean Node Config

Update the config settings for Bean nodes so that Node-RED can connect to the Bean name you specify. Double click on a Bean node and hit the edit icon to add the name of your Bean. 

{{{img_rel this 'bean_node_config.png' 'Bean Node Config' '100%'}}}


### Deploying Flows

Hit the red deploy button on the top right corner to push your flow to the server and put it into action. Check out our Node-RED example projects for more guidance! 


### Injecting and Debugging Flows

Two inportant nodes for creating flows are the Inject and Debug nodes. The Inject node allows you to start a flow by clicking a button or with a set time interval. The Debug node allows you to view the messages that are passed from node to node. 

{{{img_rel this 'inject.png' 'Inject Node' '100%'}}}

{{{img_rel this 'debug.png' 'Debug Node' '100%'}}}

## Next Steps

* [Official Node-RED docs](http://nodered.org/docs/)