---
title: Scratch Characteristics
layout: basic.hbs
autotoc: true
---

## Introduction

There are 2 ways to send user data over Bluetooth. One involves using Scratch Characteristics, which are explained in this page. Scratch characteristics offer a method of communication that is closer to the structure of Bluetooth Low Energy, and are viewable as part of the Bean's Bluetooth profile. 

The other method is BeanSerial, which is the preferred method for sending large amounts of data or integrating with the LightBlue SDKs or the Sandbox in LightBlue Explorer. 

## When to use Scratch Characteristics 

Scratch Characteristics are preferred when:
* You're not building your own app and just want to send some small data (<20 Bytes) back from the Bean.
* You're using LightBlue Explorer or another general purpose Bluetooth Low Energy tool.

**You probably don't want to use scratch characteristics when you're sending more than 20 Bytes.** A BLE characteristic has a size limit, and sending any more than this amount requires you to split your data into chunks. BeanSerial does this for you and just works. If you're sending more than 20 bytes, you probably want to use BeanSerial.

## What is a Characteristic? 

Bluetooth Low Energy (or Bluetooth Smart) organizes information on a device into Profiles. Profiles are made up of Services, which are made up of Characteristics. Characteristics are the smallest segmentation of data, typically containing one value, or a small array of values. If you're new to Bluetooth Low Energy or want to learn more, here is a great [starting point](https://learn.adafruit.com/introduction-to-bluetooth-low-energy/introduction). 

## Example

This tutorial assumes you have completed the [Getting Started guide](#). It covers tasks such as connecting to and programming the Bean with the Bean Loader. 

Connect to your Bean and upload this Arduino sketch. This example will put the current temperature in scratch characteristic 1. 

```
void setup()
{
}

void loop()
{
	int8_t temperature = Bean.getTemperature();
	Bean.setScratchNumber(1, temperature);
	Bean.sleep(2000);  
}
```


## Using LightBlue Explorer

LightBlue Explorer is an iOS app that allows you to browse any BLE device and it's data. If you don't have it already, get it on the iOS App Store here: 

<a href="https://itunes.apple.com/us/app/lightblue-explorer-bluetooth/id557428110?mt=8">
  <img src="../../_assets/images/getting-started/ios/app_store.svg">
</a>

We will use LightBlue Explorer to view our scratch characteristics. Open the app and find your Bean in the list of nearby devices. Touch it to connect. 

{{{img_rel this 'scratch-chars-1.jpg' 'Connecting to your Bean' '40%' '40%'}}}


Choose the "Options" button on the top of the screen, then select the service view.
{{{img_rel this 'scratch-chars-3.jpg' 'Options menu' '40%'}}}
{{{img_rel this 'scratch-chars-4.jpg' 'Service view' '40%'}}}

Now scroll down to "Scratch1" and select it. 

{{{img_rel this 'scratch-chars-5.jpg' 'Scratch characteristic 1' '40%'}}}

Tap "Listen for Notifications" and your temperature data will start to be received. 

{{{img_rel this 'scratch-chars-6.jpg' 'Scratch characteristic 1' '40%'}}}

The temperature values are currently being displayed as Hexadecimal. This is the default. If you touch on the upper right corner we can change this to an integer representation. 

{{{img_rel this 'scratch-chars-7.jpg' 'Scratch characteristic 1' '40%'}}}

Select the box showing the integer representation. 

{{{img_rel this 'scratch-chars-8.jpg' 'Scratch characteristic 1' '40%'}}}

You can see our office is currently somewhere between 21 and 22 degrees celsius (about 70 degrees fahrenheit). Not bad for winter in San Francisco :) 

{{{img_rel this 'scratch-chars-9.jpg' 'Scratch characteristic 1' '40%'}}}
