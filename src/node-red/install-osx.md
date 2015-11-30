---
title: Install on OSX
layout: basic.hbs
autotoc: true
order: 2
---

This is a setup guide for a Node-RED server for running on OSX. 

## Check System Requirements

The Bean nodes are built around a Node.js dependency called ‘noble’. <a href="https://github.com/sandeepmistry/noble" target="_blank">The noble project</a> currently supports OS X and Linux. Before starting, take a look through noble’s <a href="https://github.com/sandeepmistry/noble#prerequisites" target="_blank">prerequisites</a>.

{{{img_rel this 'platforms.jpg' 'Supported Platforms'}}}

## Install version 0.10.x of Node.js

* Linux binares: <a href="http://nodejs.org/dist/v0.10.36/node-v0.10.36-linux-x86.tar.gz">32-bit</a> or <a href="http://nodejs.org/dist/v0.10.36/node-v0.10.36-linux-x64.tar.gz">64-bit</a>
* Max OS X Installer: <a href="http://nodejs.org/dist/v0.10.36/node-v0.10.36.pkg">Universal</a>
* <a href="http://nodered.org/docs/hardware/raspberrypi.html">Raspberry Pi</a>
* <a href="http://nodered.org/docs/hardware/beagleboneblack.html">BeagleBone Black</a>

Note: Node-RED does not yet support the latest distributions of Node.js

{{{img_rel this 'nodejs.png' 'Supported Platforms'}}}

## Install Node-RED

* `sudo npm install -g node-red`

{{{img_rel this 'flow.png' 'Node-RED Flow'}}}

## Install Bean Nodes

* `mkdir -p ~/.node-red/node_modules`
* `npm install --prefix ~/.node-red node-red-contrib-bean`

{{{img_rel this 'bean-nodes.png' 'Bean Nodes'}}}

## Start Node-RED

* `node-red`
* Go to "http://localhost:1880" in your browser

