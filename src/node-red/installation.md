---
title: Installation
layout: basic.hbs
autotoc: true
order: 2
---

## Introduction

This guide will help you install Node-RED and the custom nodes used to communicate with Bean.

## Install Node-RED

Since Node-RED uses Node.js it can be used on any of the core desktop platforms such as OS X, Windows and Linux. Go ahead and follow the installation guide provided by Node-RED to get it running on your system.

* [Install Node-RED](http://nodered.org/docs/getting-started/installation.html)

If you are interested in setting up a Raspberry Pi or BeagleBone Black for a dedicated Node-RED server, they have guides for that too.

* [Install Node-RED on Raspberry Pi](http://nodered.org/docs/hardware/raspberrypi.html)
* [Install Node-RED on BeagleBone Black](http://nodered.org/docs/hardware/beagleboneblack.html)

## Install Bean Nodes

{{{img_rel this 'bean-nodes.png' 'Bean Nodes' '50%'}}}

These nodes are developed and maintained by Punch Through and must be installed seperately. First, it is important to understand that these nodes have a dependency on Bluetooth, since they are designed to talk to Bean. This is done by using a Node library called [Noble](https://github.com/sandeepmistry/noble).

Noble has it's own dependencies which need to be installed. Check out the [prerequisites section](https://github.com/sandeepmistry/noble#prerequisites) of the project README before you continue.

Finally, in order to make use of Bean nodes, you must install them in a place that Node-RED can find them. Run the following commands in a terminal.

### Mac OSX
* `mkdir -p ~/.node-red/node_modules`
* `npm install --prefix ~/.node-red node-red-contrib-bean`

### Windows
* `mkdir -p %userprofile%/.node-red/node_modules`
* `npm install --prefix %userprofile%/.node-red node-red-contrib-bean`

## Next Steps

Now that Node-RED and the Bean nodes are installed, you can start learning to use them to build flows with Bean!

[Learn to Use Bean Nodes >>](../bean-nodes)
