---
title: iBeacon
layout: basic.hbs
autotoc: true
---

## Introduction

iBeacon is a protocol for building beacons using Bluetooth Low Energy.

Beacons provide new ways for BLE-powered devices to learn more about their positions in real life.

In this guide, we'll discuss what iBeacon is, how it works, and how you can use your Bean as an iBeacon.

## Setup

Please make sure you're familiar with the following before starting this guide:

* [Getting Started](#)

### Software

* Bean Loader ([install guides](#))

### Hardware

* LightBlue Bean
* Mobile or Computer device

## Learn About iBeacons

### What is a beacon?

Beacons are devices that advertise data to anyone nearby. They're passive—they don't need to receive data, and clients don't need to transmit data to them.

Before beacons, most smartphone apps used geographical region monitoring to add location awareness. Geographical region monitoring combines GPS and Wi-Fi data to determine a user's location, then notifies an app when the user enters or exits a region. This is also known as geofencing.

Unfortunately, GPS geolocation doesn't work well in many situations. For example, in shopping malls, smartphones often can't get GPS reception or accurately determine their location. In an art gallery, GPS doesn't provide high enough resolution to tell one exhibit apart from the one next to it. And most geofencing libraries are designed for static regions, not ones that change location from time to time.

### What can I do with an iBeacon?

Beacons work well with apps that:

* Want to know when they're very close to a specific object
* Need to work in places where GPS isn't available
* Need better resolution than GPS provides
* Interact with physical objects that change location from time to time

Beacons are often stationary. For example, a hardware store could place a beacon at the end of each aisle and help users find the items in nearby aisles. And an art gallery could place beacons at each exhibit, providing information on specific pieces when a user walks up to them.

But they don't have to be. A food discovery app could monitor for iBeacons located on local food trucks. When the user is near a truck with a running special, the app could notify the user.

iBeacons solve many of the problems with geographical region monitoring. Devices determine their location by proximity to specific beacons, so they don't need access to GPS. Beacons that change location work just as well as stationary beacons. When indoors, devices can determine location very accurately from the signal strength of nearby beacons.

### Why do iBeacons matter?

Apple limits what an iOS device is allowed to do when a user isn't directly using the device. If an app isn't running in the foreground, it must ask the OS to notify it when events occur by registering for a **notification**. That's the only way for an app to act on data when it's in the background or the device is locked.

In the past, iOS apps could only receive location-based notifications by registering for geographical region monitoring. Apple added iBeacon support to iOS devices in iOS 7, allowing devices to register for **beacon region monitoring** as well.

Beacon region monitoring allows iOS apps to be woken when they enter or exit the range of an iBeacon. Apps that use iBeacon don't have to monitor their GPS location. They simply have to listen passively for nearby Bluetooth Low Energy signals, saving battery life. This makes it easier for developers to build apps that know more about the world around them.

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
