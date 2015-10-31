---
title: Node-RED for Raspberry Pi
layout: basic.hbs
autotoc: true
order: 2
---

This is a setup guide for a dedicated Node-RED server on a Raspberry Pi

{{{img_rel this 'node-red-advanced.png' 'Node-RED with RaspberryPi', '50%'}}}

## Components

__Hardware:__ 

* Raspberry Pi

* SD Card (8 GB)

* Power Supply (5V 2A)

* Ethernet Cord

* IOGear Bluetooth LE Dongle

__Software:__ 

* Adafruit's <a href="https://github.com/adafruit/Adafruit-Pi-Finder">Pi Finder</a>

## Install and Configure Raspbian Linux

* Install the latest <a href="https://www.raspberrypi.org/documentation/installation/installing-images/">Raspbian Linux</a> on your SD card
* Boot up your Raspberry pi and connect it to the internet with an ethernet cable
* Use Adafruit’s “Pi Finder” utility to connect and open an SSH session with the Pi
* Configure your Pi’s setting by using the command `raspi-config`
    * Limit the amount of memory dedicated to graphics to 32mb
    * Expand the filesystem
    * Change the hostname to something convenient for you. ex: hostname “node-red” will let you access Node-RED on the Pi by going to “http://node-red.local:1880/” in your browser.
    * Exit out of the raspi-config utility
* Update Raspian
    * `sudo apt-get update`
    * `sudo apt-get upgrade`

{{{img_rel this 'platforms.jpg' 'Node-RED with RaspberryPi', '50%'}}}

## Install Node.js

* Install Node.js
    * If using Raspberry Pi 2 
        * `curl -sL https://deb.nodesource.com/setup | sudo bash -`
        * `sudo apt-get install -y build-essential python-dev python-rpi.gpio nodejs`
    * If using an original Raspberry Pi 
        * `wget http://node-arm.herokuapp.com/node_0.10.36_armhf.deb`
        * `sudo dpkg -i node_0.10.36_armhf.deb`
* Install dependancies:  
    * `sudo apt-get install bluetooth bluez-utils libbluetooth-dev libcap2-bin`

{{{img_rel this 'nodejs.png' 'Node-RED with RaspberryPi', '50%'}}}

## Install Node-RED

* `sudo npm install -g node-red` (There may be errors, but you can ignore them)

{{{img_rel this 'flow.png' 'Node-RED with RaspberryPi', '50%'}}}

## Install Bean Nodes

* `mkdir -p ~/.node-red/node_modules`
* `npm install --prefix ~/.node-red node-red-contrib-bean`

{{{img_rel this 'bean-nodes.png' 'Node-RED with RaspberryPi', '50%'}}}

## Configure Node-RED

* Allow BLE adapter to be accessed by non root users
    * `cd ~/.node-red/node_modules/node-red-contrib-bean/`
    * `find -path '*noble*Release/hci-ble' -exec sudo setcap cap_net_raw+eip '{}' \;`
* Put Bean nodes at the top of the Node-RED palette
    * `sudo nano ~/.node-red/settings.js`
    * Enter the following config, and save:

        `module.exports = {
        paletteCategories: [
        'LightBlue_Bean',
        'input',
        'output',
        'social',
        'Raspberry_Pi',
        'function',
        'analysis',
        'storage',
        'advanced'
        ],
        uiPort: 1880,
        mqttReconnectTime: 15000,
        serialReconnectTime: 15000,
        debugMaxLength: 1000
        }`

* Install PM2 to have Node-RED run at startup. If Node-RED ever crashes, PM2 will automagically restart the application.
    * `sudo npm install -g pm2`
    * `pm2 start /usr/local/bin/node-red --node-args="--max-old-space-size=128" -- -v`
    * `pm2 save`
    * `sudo env PATH=$PATH:/usr/local/bin pm2 startup linux -u pi`
* Restart the Pi: 
    * `sudo reboot`

## Use Node-RED

* Go to http://node-red.local:1880/ in your browser. If you've chosen a hostname other than "node-red", replace that with the appropriate hostname. 

## Updating Node-RED

* Update Node-RED: `sudo npm update -g node-red`
* Update Bean nodes: `npm update --prefix ~/.node-red node-red-contrib-bean`
* Allow BLE adapter to be accessed by non root users
    * `cd ~/.node-red/node_modules/node-red-contrib-bean/`
    * `find path '*noble*Release/hci-ble' -exec sudo setcap cap_net_raw+eip '{}' \;`




