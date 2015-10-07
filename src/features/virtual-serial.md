---
title: Virtual Serial (Serial over GATT)
layout: basic.hbs
autotoc: true
---
---
title: Accelerometer
layout: basic.hbs
autotoc: true
---

## Introduction
Let's say I have a [push button](https://www.sparkfun.com/products/97) soldered onto the Bean. I want the computer to know that when I press the push button it should send a tweet. The first step into accomplishing this task is for the Bean to send data to the computer when the button is pressed. How does the Bean communicate to the computer? 

There are many communication protocols. Regardless, in order for the Bean (or any device for that matter) to communicate to the computer, they must share a common communication protocol. The Bean and the computer need to agree on how the information will be organized and have an appropriate response to the request being made. For example, the data that is sent between both devices can have a header that signifies the start of a message, a body, and a footer that signifies the end of a message.

In this guide, we will focus on network specifications of Bluetooth Low Energy, how serial communication works, and how to use the serial monitor on the Arduino IDE to send and visualize data from the Bean. 

## Setup

Please make sure you're familiar with the following before starting this guide:

* [Getting Started](#)

### Software

* Bean Loader ([install guides](#))

### Hardware

* LightBlue Bean
* Mobile or Computer device

## How the Bean Communicates to the Computer: 

In contrast to traditional microcontrollers, microcontrollers equipped with Bluetooth Low Energy (BLE), such as the Bean and Bean+, follow a set of standarized rules and communication protocol defined in Bluetooth Core Specification 4.0. We will cover the fundamentals of the network stack involved. 

### Generic Access Profile (GAP)
There are two mechanisms that a BLE device can communicate to the outside world: broadcasting or connecting. These mechanisms are subjected to the Generic Access Profile (GAP) guidelines. GAP defines how BLE-enabled devices can make themselves available and how two devices can communicate directly with each other.  A device can join a BLE network by adoping these roles specified in GAP: <br><br>
__Broadcasting__: <br>
_Main Idea_- Data packets are sent at fixed intervals in a unidirectional manner from the broadcaster to the observer. 
* __Broadcaster:__ A device that can publically broadcasts advertising data packets, such as how long the push button has been pressed, to the outside world.  No connection happens between the broadcaster and observer.  The Bean is an example of a broadcaster.
* __Observer:__  A device that listens to the data in the advertising packets being broadcasted from the broadcaster. An example of a device that listens to the Bean is the computer<br><br>

__Connecting__: <br>
_Main Idea_ - Peripheral devices send specific advertising data packets that specifically inform the central device that it wants to connect. Once the peripheral connects, it no longer broadcasts data packets to the world until the connection is closed. 
* __Peripheral:__ Devices that used advertising data packets to establish a connection with a central device. After connecting, peripherals no longer broadcast data to other central devices and stay connected to the device that accepted connectection request.  An example of a peripheral is when the Bean connects to the Bean Loader.  
* __Central:__ A device that initiates a connection with a peripheral device by first listenting to the advertising packets. A central device can connect to many other peripheral devices. An example of a central device is the computer.<br><br>

__After Connection is Established__: <br>
_Main Idea_ - Additional procedures can occur once the peripheral device is exclusivley communicating to one central device by transmitting data packets: 

* __Data Packets Can Send the Device Name:__
Packets that are being sent from the peripheral to the central devices carry general information.  Information that is transmitted can possibly contain a UTF-8 string of the device name. If the device name is not transmitted here, it'll be transmitted over GATT. 

* __Central Devices Can Update Connection Parameters:__ The central device typically establishes the connecting parameters between the peripheral device and itself.  The central device can only modify the connecting parameters.  However, the peripheral device can request the central device to change the connecting parameters. When the central device finds a data packet that has specific information that says it wants to connect, it sends a request connection data packet to the peripheral device.  If the peripheral device accepts the request from the central device, a connection is established.  There are different ways of how a central device can connect to a peripheral device, all of which the central device defines. 

* __Peripheral or Central Devices Can Terminate Connection:__ Connection termination can happen for a variety reasons: battery dies on the device, network issues,  and the likes. 

### Generic Attribute Profile (GATT):

__Differences between GAP and GATT:__
It is important to differentiate between GAP and GATT. GAP defines the general topology of the BLE network stack. GATT describes in detail how attributes (data) are transferred once devices have a dedicated connection.  All BLE sevices follow GATT. The section below will cover some of the fundamental concepts of GATT.

GATT specifically foucses on how data is formatted, packaged, and sent according to the its described rules. Similiar to GAP, there are certain roles that interacting devices can adopt:
* __Client:__ Typically sends a request to the server and the server sends back a response according to a security protocol.  The client can read and/or write attributes found in the server. 
* __Server:__ One of the main roles of the server is to store data. Once the client makes a request to see te data, the server must make that data available. 
* __Example of client/server relationship:__ When I push the button on the Bean and I want the computer to read that information, the Bean acts as a server (stores the time information) and the computer acts as a client, reading that information. <br><br>

Peripheral or central devices can BOTH act as a server or client, depending on how data is flowing.  In the above example, if I wanted to send an update from from the computer to the Bean, the computer acts as a server and the Bean acts as a client.  Essentially, GAP and GATT roles are independent. 


