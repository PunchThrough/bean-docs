---
title: iBeacon
layout: basic.hbs
autotoc: true
---

## Introduction

Imagine you are at a sports store looking at a pair of Nike shoes. This store is really tech-savvy—they offer an iOS app to notify you of sales and specials, and you installed it before you went shopping.

When you walk up to a pair of shoes that catches your eye, your iPhone buzzes. The store's app pushed a notification with info on the display you're standing in front of.  How did that happen? How did the app know you were looking at those specific shoes!? It's all thanks to beacons.

In this guide, we will learn about beacons and iBeacons, how they work, and how your Bean can act as an iBeacon.

## What's a Beacon?

A beacon is a device equipped with Bluetooth Low Energy. It's always broadcasting data to any devices listening nearby. They take on a passive role: devices don't need to communicate with beacons to get data from them.

### Differences Between Beacons and GPS Geolocation

In the shoe store example, the app on your iPhone was waiting for the store's beacon to come within range. Once the iPhone "hears" the store's beacon, it wakes up your app to perform a task. In this case, your app knows that you're near the shoe display, so it displays information on those shoes.

Before beacons, most smartphone apps used geographical region monitoring to add location awareness. Geographical region monitoring combines GPS and Wi-Fi data to determine a user's location, then notifies an app when the user enters or exits a region. This is also known as [geofencing](http://whatis.techtarget.com/definition/geofencing).

Unfortunately, GPS geolocation doesn't work well in many situations. For example, in shopping malls, smartphones often can't get GPS reception or accurately determine their location. In an art gallery, GPS doesn't provide high enough resolution to tell one exhibit apart from the one next to it. And most geofencing libraries are designed for static regions, not regions that change location from time to time.

Beacons triumph over geofencing in devices that:

- Want to know when they're very close to a specific object
- Need to work in places where GPS isn't available
- Need better resolution than GPS provides
- Interact with physical objects that change location from time to time

### How Beacons Are Used

Beacons can be used in a variety of ways.  We’ll go over some of the popular ways beacons are used.

Beacons can either be placed in a stationary spot next to a specific item, or on an object that moves from place to place. Here are some examples:

- A hardware store could place a beacon at the end of each aisle and help users find items in nearby aisles.
- An art gallery could place beacons at each exhibit, providing information on specific pieces when a user walks up to them.
- A food discovery app can monitor for iBeacons located on food trucks that move around the city.  When the user is near a food truck with a daily special, the app can tell the user about the special.

iBeacons solve many of the problems with geographical region monitoring. Devices determine their location by proximity to specific beacons, thus GPS location is not necessary for devices to discover iBeacons.

### Advantage of Using iBeacons vs. Location-based Notifications

iBeacon is Apple’s proprietary version of the beacon concept. In the shoe store example above, the beacon we described is an iBeacon.

Apple limits what an iOS device is allowed to do when a user isn't directly using the device. If an app isn't running in the foreground, it must ask the OS to notify it when events occur by registering for a notification. That's the only way for an app to act on data when it's in the background or the device is locked.

In the past, iOS apps could only receive location-based notifications by registering for geographical region monitoring. This is a battery-intensive process for the iPhone. Phones performing geographical region monitoring need to track their location constantly with GPS and Wi-Fi triangulation.

In iOS 7, Apple added iBeacon support for iOS devices. This allowed apps to register for beacon region monitoring as well. Beacon region monitoring allows an app to be woken when they enter or exit the range of an iBeacon.  iBeacons don’t rely on GPS location, which saves battery life. This helps developers build apps that know more about the world around them.

### How does the Bean work with iBeacon?

The Bean can act as an iBeacon. The Bean library for Arduino provides commands to configure iBeacon parameters and turn iBeacon mode on and off.

## Setup

Please make sure you're familiar with the following before starting this guide:

* [Getting Started](../../getting-started/intro/)

### Software

* Bean Loader
* [Node.js](https://nodejs.org/) 5.1.1+

### Hardware

* LightBlue Bean
* Computer for running the Node.js List Beacons script

## An iBeacon + Bean Example

In this example, we'll configure the Bean to act as an iBeacon. Then we'll show that it works by using an iOS app to monitor for iBeacons.

### Program your Bean

Upload this sketch to your Bean:

```
void setup() {
  Bean.enableConfigSave(false);
  Bean.setBeaconParameters(0xDEAD, 0xBEEF, 0xCAFE);
  Bean.setBeaconEnable(true);
}

void loop() {
  Bean.sleep(0xFFFFFFFF);
}
```

Here's what the sketch does:

**Line 2:** Disable saving the Bean's BLE configuration to non-volatile memory.

Bean's LBM313 module stores its BLE configuration in non-volatile memory (NVRAM). NVRAM has a finite number of writes, and after it runs out of writes it's impossible to save new data. We disable saving to NVRAM so that we can preserve those cycles. And since we're configuring the BLE chip when the sketch starts, we don't need to save the advertising data to NVRAM anyway.

**Line 3:** Set the UUID, major, and minor values of the iBeacon.

iBeacons use 128-bit UUIDs, but Bean is limited to selecting 16 of those 128 bits:

`A495____-C5B1-4B44-B512-1370F02D74DE`

In this example, we tell the Bean to use `0xDEAD` in its UUID, so we'll see the following UUID on our iOS device:

`A495DEAD-C5B1-4B44-B512-1370F02D74DE`

The Core Location framework in iOS limits you to monitoring 20 regions at once. Regions are usually specified by a UUID. To differentiate between lots of devices, iBeacons have two 16-bit fields named "major" and "minor". These fields let you identify over 4 million different iBeacons that share the same UUID.

In this example, we tell the Bean to use the major ID `0xBEEF` and the minor ID `0xCAFE`.

**Line 4:** Tells the Bean to start advertising as an iBeacon with the configured values.

**Line 8:** Sleep for an arbitrary time. When we wake up, sleep again. The Arduino isn't used in this sketch, so it doesn't need to consume battery power by being awake.

### Scan for Beacons with Node.js

If you're on OS X or Linux, we recommend you use Node.js to scan for nearby iBeacons. We've put together a simple script that scans for nearby iBeacons and prints their values as they're found.

* Make sure your version of Node.js is up to date. Run `node --version` to check your installed version of Node.js. This script has been tested with v5.1.1 but might still work on older versions of Node.
* If you don't already have Node.js installed, [download the latest version from nodejs.org](https://nodejs.org/) and install it.
* [Download the list-beacons script](https://github.com/PunchThrough/list-beacons/archive/master.zip) and extract it.
* Open your terminal and navigate to the extracted directory **list-beacons-master**.
* Run `npm install` to install its dependencies.
* Finally, run `node index.js` to start the script.

After a few seconds, you should see iBeacon advertisements from your Bean start to appear. You'll also see iBeacon packets from any other iBeacons that may be near you:

{{{img_rel this 'list-beacons.png' 'List Beacons is running' '80%'}}}

The script tries to recognize Beans by matching against the bytes of the UUID common to all Beans. This isn't a reserved set of UUIDs, so other iBeacons might use a similar UUID and make this script think that they're Beans.

### Scan for Beacons with Android

If you have an Android phone, you can use **iBeacon and Eddystone Scanner** by **flurp laboratories** to scan for nearby iBeacons. Download the app on the Play Store:

<a href="https://play.google.com/store/apps/details?id=de.flurp.beaconscanner.app">
  <img src="../../_assets/images/getting-started/android/google_play.svg">
</a>

Once the app is installed, open it. At the main screen, tap the green circle to start scanning for iBeacons.

After a few seconds, you should see an iBeacon advertisement from your Bean appear. You'll also see iBeacon packets from any other iBeacons that may be near you:

{{{img_rel this 'eddystone-main.png' 'Scanner main screen' '40%'}}}

The Eddystone app shows the iBeacon major and minor values as decimal, not hex. In this case, `48879` = `0xBEEF` and `51966` = `0xCAFE`.

Tap the row that shows your Bean's iBeacon packet to get more info:

{{{img_rel this 'eddystone-detail.png' 'Scanner main screen' '40%'}}}

### Scan for Beacons with iOS

Scanning for iBeacons using iOS can be frustrating. Any iOS apps that scan for iBeacons are limited by what iOS allows them to do. To save power, iOS apps must explicitly subscribe to specific iBeacon UUIDs. In addition, iOS limits the number of UUIDs an app can subscribe to, so it's impossible to build a general-purpose iBeacon scan app.

TODO: Complete the iOS guide

## Learn More about iBeacon

[Apple: iBeacon for Developers](https://developer.apple.com/ibeacon/): Resources for developing an iOS app that supports iBeacon. Includes a great [Getting Started](https://developer.apple.com/ibeacon/Getting-Started-with-iBeacon.pdf) guide.

[Beacon Sandwich: What is iBeacon?](http://www.beaconsandwich.com/what-is-ibeacon.html): A great primer on iBeacon, common use cases, and the history of iBeacon.

[AltBeacon](http://altbeacon.org/): An alternate beacon protocol built by Radius Networks. AltBeacon is an open specification for beacons, with implementations for iOS and Android devices.
