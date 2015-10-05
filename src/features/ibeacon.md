---
title: iBeacon
layout: basic.hbs
autotoc: true
---

@swstack @mplewis  Here are my initial editing suggestions! Let me know what you guys think.

## Introduction 
Imagine you are at a sports store looking at a pair of Nike’s. This sport store is really tech savvy, so it also offered an iOS app that you can open when you go there.  When you go near a pair of shoes that struck your fancy, all of a sudden, information about the shoes you are glancing is displayed on your phone.  How did that happen!? How did the app know you were looking at those shoes!? Beacons. A Beacon is a technology that is equipped with Bluetooth LE and broadcasts small amounts of data per unit of time.  A Beacon is also referred to as the transmitter because it keeps broadcasting.  The iPhone and the app are the receivers because both are listening for specific information that the Beacon is broadcasting.  Once the iPhone and app receive the relevant information, they execute a task.  In this case, information about the shoes are displayed on the app.

In this guide, we will take a deeper dive on what beacons are, how they work, and how your Bean can act as an iBeacon.  An iBeacon is Apple’s version of the beacon concept.   In the sample example above, the beacon is actually an iBeacon.

What is a beacon?
Beacons are devices that advertise data to anyone nearby. They're passive—they don't need to receive data, and clients don't need to transmit data to them.

## Setup

Please make sure you're familiar with the following before starting this guide:

* [Getting Started](#)

### Software

* Bean Loader ([install guides](#))

### Hardware

* LightBlue Bean
* Mobile or Computer device

## Learn About iBeacons

### Differences between Beacons and GPS geolocation:

Beacons are devices that advertise data to anyone nearby. They're passive meaning they don't need to receive data, and clients don't need to transmit data to them.

Before beacons, most smartphone apps used geographical region monitoring to add location awareness. Geographical region monitoring combines GPS and Wi-Fi data to determine a user's location, then notifies an app when the user enters or exits a region. This is also known as [geofencing] (http://whatis.techtarget.com/definition/geofencing).

Unfortunately, GPS geolocation doesn't work well in many situations. For example, in shopping malls, smartphones often can't get GPS reception or accurately determine their location. In an art gallery, GPS doesn't provide high enough resolution to tell one exhibit apart from the one next to it. And most geofencing libraries are designed for static regions, not regions that change location from time to time.

Beacons triumph over geofencing in situations where GPS location fails to properly work, such as:

- Want to know when they're very close to a specific object
- Need to work in places where GPS isn't available
- Need better resolution than GPS provides
- Interact with physical objects that change location from time to time

## How iBeacons are used

Beacons can be used in a variety of ways.  We’ll go over some of the popular situations of how people use Beacons.

Beacons can be placed in a stationary spot where customers or users can get more information about a specific item. Here are some examples:

- A hardware store could place a beacon at the end of each aisle and help
    users find the items in nearby aisles
- An art gallery could place beacons at each exhibit, providing information
   on specific pieces when a user walks up to them.

A food discovery app can monitor for iBeacons that is placed near food truck.  When the user is near a  food truck with a daily special, the app can notify the user of the special.

iBeacons solve many of the problems with geographical region monitoring. Devices determine their location by proximity to specific beacons, thus GPS location is not necessary for devices to discover iBeacons.

## Advantage of Using iBeacons vs. Location-based Notifications

Apple limits what an iOS device is allowed to do when a user isn't directly using the device. If an app isn't running in the foreground, it must ask the OS to notify it when events occur by registering for a notification. That's the only way for an app to act on data when it's in the background or the device is locked. In the past, iOS apps could only receive location-based notifications by registering for geographical region monitoring. This is battery intensive process for the iPhone.

In iOS7, Apple added iBeacon support for iOS devices. This allowed devices to register for beacon region monitoring as well. Beacon region monitoring allows iOS apps to be woken when they enter or exit the range of an iBeacon.  Since iBeacons don’t need to monitor GPS location, the iPhone battery is conserved. iBeacons simply have to listen to nearby Bluetooth Low Energy signals.  The conservation of battery life on the iPhone allows developers to build apps that know more about the world around them.

### How does the Bean work with iBeacon?

The Bean can act as an iBeacon. The [Bean library for Arduino](#) provides commands to configure iBeacon parameters and turn iBeacon mode on and off.

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

**Line 2:** [enableConfigSave](#): Disable saving the Bean's BLE configuration to non-volatile memory.

Bean's LBM313 module stores its BLE configuration in non-volatile memory (NVRAM). NVRAM has a finite number of writes, and after it runs out of writes it's impossible to save new data. We disable saving to NVRAM so that we can preserve those cycles. And since we're configuring the BLE chip when the sketch starts, we don't need to save the advertising data to NVRAM anyway.

**Line 3:** [setBeaconParameters](#): Set the UUID, major, and minor values of the iBeacon.

iBeacons use 128-bit UUIDs, but Bean is limited to selecting 16 of those 128 bits:

`A495____-C5B1-4B44-B512-1370F02D74DE`

In this example, we tell the Bean to use `0xDEAD` in its UUID, so we'll see the following UUID on our iOS device:

`A495DEAD-C5B1-4B44-B512-1370F02D74DE`

**Line 4:** [setBeaconEnable](#): Tells the Bean to start advertising as an iBeacon with the configured values.

**Line 8:** Sleep for an arbitrary time. When we wake up, sleep again. The Arduino isn't used in this sketch, so it doesn't need to consume battery power by being awake.

### View the iBeacon with iOS

(To be written!)

## Learn More about iBeacon

[Apple: iBeacon for Developers](https://developer.apple.com/ibeacon/): Resources for developing an iOS app that supports iBeacon. Includes a great [Getting Started](https://developer.apple.com/ibeacon/Getting-Started-with-iBeacon.pdf) guide.

[Beacon Sandwich: What is iBeacon?](http://www.beaconsandwich.com/what-is-ibeacon.html): A great primer on iBeacon, common use cases, and the history of iBeacon.

[AltBeacon](http://altbeacon.org/): An alternate beacon protocol built by Radius Networks. AltBeacon is an open specification for beacons, with implementations for iOS and Android devices.
