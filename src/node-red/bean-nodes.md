---
title: Bean Nodes
layout: basic.hbs
autotoc: true
order: 3
---

## Introduction

---

This guide will walk you through how to use the custom nodes for communicating with the Bean.

## Using Bean Nodes

---

When using any of the Bean nodes you will have to tell the flow which Bean you want to communicate with. To do this, begin by double clicking on any of the Bean nodes. You will see the following menu.

{{{img_rel this 'config-bean.png' 'Config Bean' '100%'}}}

Clicking on the pencil icon will allow you to configure the Bean name or UUID. Make sure one of these settings is accurate for your Bean.

{{{img_rel this 'config-bean-name.png' 'Config Bean Name' '100%'}}}


### LED Node

The Bean LED node allows you to set the red, green and blue values of a Bean's LED. Here is an example using an `inject` node to input a comma delimited RGB string `0,255,0` which is Green!

{{{img_rel this 'example-led-node.png' 'LED Node' '100%'}}}

### Acceleration Node

Sending any message to the accel node will result in a query to the Bean for accelerometer data. Check out this example where a blank inject node is used to trigger the node execution.

{{{img_rel this 'example-accel-node.png' 'Accel Node' '100%'}}}




### Injecting and Debugging Flows


Two important nodes for creating flows are the Inject and Debug nodes. The Inject node allows you to start a flow by clicking a button or with a set time interval. The Debug node allows you to view the messages that are passed from node to node. 

{{{img_rel this 'inject.png' 'Inject Node' '70%'}}}

{{{img_rel this 'debug.png' 'Debug Node' '70%'}}}

## Next Steps

* Example project on hackster.io - [Logging Bean data](https://www.hackster.io/punchthrough/projects)
* Example project on hackster.io - [Tweet sentiment to LED](https://www.hackster.io/punchthrough/projects)
* Example project on hackster.io - [Email temperature warning system](https://www.hackster.io/punchthrough/projects)
* [Official Node-RED docs](http://nodered.org/docs/)