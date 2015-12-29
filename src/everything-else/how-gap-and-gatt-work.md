---
title: How GAP and GATT Work
layout: basic.hbs
autotoc: true
order: 6
---

The LightBlue Bean runs on BLE, or Bluetooth Low Energy. BLE is a protocol developed by [Bluetooth SIG](https://www.bluetooth.org/) that builds on the lessons learned from building lots of Bluetooth Classic devices. Compared to Bluetooth Classic, BLE consumes less power, requires less time and effort to pair devices, and provides lower connection speeds.

The Bluetooth Protocol Stack is divided into two categories: the controller and the host. Each category has sub-categories, which perform specific roles. The two subcategories we are going to look at is the **Generic Access Profile** (GAP) and the **Generic Attribute Profile** (GATT).

## How do GAP and GATT differ?

It is important to differentiate between GAP and GATT.

* **GAP** defines the **general topology** of the BLE network stack.
* **GATT** describes in detail **how attributes (data) are transferred** once devices have a dedicated connection.

GATT specifically focuses on how data is formatted, packaged, and sent according to its described rules. In the BLE network stack, the Attribute Protocol (ATT) is closely aligned with GATT, where GATT sits directly on top of ATT. GATT actually uses ATT to describe how data is exchanged from two connected devices.

## Generic Access Profile (GAP)

There are two mechanisms a BLE device can use to communicate to the outside world: broadcasting or connecting. These mechanisms are subjected to the Generic Access Profile (GAP) guidelines. GAP defines how BLE-enabled devices can make themselves available and how two devices can communicate directly with each other.

### Getting Connected

A device can join a BLE network by adoping these roles specified in GAP:

__Broadcasting__: These roles don't have to explicitly connect to one another to transfer data.

* __Broadcaster:__ A device that broadcasts public advertising data packets, such as how long a button has been pressed.
* __Observer:__ A devices that listens to the data in the advertising packets sent by the broadcaster. No connection happens between the broadcaster and observer.

__Connecting__: These roles must explicitly connect and handshake to transfer data. These roles are more commonly used than the broadcasting roles.

* __Peripheral:__ A device that advertises its presence so central devices can establish a connection. After connecting, peripherals no longer broadcast data to other central devices and stay connected to the device that accepted connectection request.
  * Peripherals are low-power because they only have to send beacons periodically. Central devices are responsible for starting communication with peripherals.
  * Bean is an example of a BLE peripheral.
* __Central:__ A device that initiates a connection with a peripheral device by first listenting to the advertising packets. A central device can connect to many other peripheral devices.
  * When the central device wants to connect, it sends a request connection data packet to the peripheral device. If the peripheral device accepts the request from the central device, a connection is established.
  * Your computer is an example of a BLE Central device when it connects to Bean.

### Once You're Connected

__Central Devices Can Update Connection Parameters:__ The central device typically establishes the connecting parameters between the peripheral device and itself. The central device can only modify the connecting parameters. However, the peripheral device can ask the central device to change the connection parameters.

__Peripheral or Central Devices Can Terminate Connections:__ Connections might end for a variety of reasons: a device's battery might die or network interference might cause the connection to fail. Devices can also intentionally disconnect from their peers.

## Generic Attribute Profile (GATT)

### Roles

Similiar to GAP, there are certain roles that interacting devices can adopt:

* __Client:__ Typically sends a request to the GATT server. The client can read and/or write attributes found in the server.
* __Server:__ One of the main roles of the server is to store attributes. Once the client makes a request, the server must make the attributes available.

### Client-Server Relationships

One example of a client-server relationship is as follows: I push a button on Bean and I want the computer to read that information. Bean acts as a server and provides information. The computer acts as a client, reading that information.

GAP and GATT roles are essentially independent of one another. Peripheral or central devices can BOTH act as a server or client, depending on how data is flowing. In contrast to the above example, if I wanted to send an update from from the computer to Bean, the computer acts as a server and Bean acts as a client.

## Learn More

Our guide focuses primarily on how GAP and GATT work. If you're interested on learning more about BLE in general, check out some of the resources below:
* [Getting Started with Bluetooth Low Energy](http://www.amazon.com/Getting-Started-Bluetooth-Low-Energy-ebook/dp/B00K1N23LA)
* [Bluetooth Low Energy Core Specification 4.0](https://www.bluetooth.org/en-us/specification/adopted-specifications)
