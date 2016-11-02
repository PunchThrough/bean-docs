---
title: Scratch Characteristics
layout: basic.hbs
autotoc: true
---

## Introduction

There are two ways to communicate with Bean over Bluetooth Low Energy. One way is to send and receive data using Scratch Characteristics. Scratch Characteristics offer a method of communication that more closely matches the "under-the-hood" structure of Bluetooth Low Energy devices. Scratch Characteristics are viewable as part of Bean's BLE profile.

The other method is Virtual Serial, which is the preferred method for sending large amounts of data or integrating with the LightBlue SDKs or the Sandbox in LightBlue Explorer. If you're interested in this method, check out [our guide on Virtual Serial](../virtual-serial/).

In this guide, you'll learn how to use Scratch Characteristics to receive structured data from Bean.

## About Scratch Characteristics
Below we'll describe what scratch characteristics are and how to use them. 

### What is a Characteristic?

Bluetooth Low Energy organizes information on a device into Profiles. Profiles are made up of Services, which are made up of Characteristics. Characteristics are the smallest division of data. They typically contain one value or a small array of values. If you're new to Bluetooth Low Energy or want to learn more, here is a great [intro to BLE by Adafruit](https://learn.adafruit.com/introduction-to-bluetooth-low-energy/introduction). 

### When to use Scratch Characteristics 

You might prefer Scratch Characteristics over Virtual Serial when:
* You're not building your own app and just want to send a small amount of data (<20 Bytes) to/from Bean.
* You're using LightBlue Explorer or another general-purpose Bluetooth Low Energy tool to communicate with Bean.

You probably don't want to use scratch characteristics when you're sending more than 20 bytes of data at once. A BLE characteristic has a size limit, and sending more than this amount of bytes requires you to split your data into chunks. Virtual Serial does this for you and works without any extra effort. If you're sending more than 20 bytes, you probably want to use Virtual Serial.

## Before You Begin

{{> snip_req_getting_started}}

### Software

* {{> snip_req_bean_loader}}
* [LightBlue Explorer for iOS](https://itunes.apple.com/us/app/lightblue-explorer-bluetooth/id557428110)

### Hardware

* {{> snip_req_bean}}
* Computer or mobile device (for uploading sketches)
* iOS device (for LightBlue Explorer)

## Program Your Bean

Connect to your Bean and upload this Arduino sketch. This example will put the current temperature in scratch characteristic 1:

```
void setup()
{
  // We don't need to set anything up
}

void loop()
{
	int8_t temperature = Bean.getTemperature();
	Bean.setScratchNumber(1, temperature);
	Bean.sleep(2000);  
}
```

Here's what the code does:

* **Line 8:** Get the current temperature and save it to the 8-bit signed integer variable `temperature`
* **Line 9:** Set the value of Scratch Characteristic #1 to the value of the `temperature` variable
* **Line 10:** Sleep for 2 seconds before repeating

## Talk to Bean with LightBlue Explorer

LightBlue Explorer is an iOS app that allows you to browse any BLE device and it's data. If you don't have it already, install it from the iOS App Store here: 

<a href="https://itunes.apple.com/us/app/lightblue-explorer-bluetooth/id557428110?mt=8">
  <img src="../../_assets/images/getting-started/ios/app_store.svg">
</a>

We will use LightBlue Explorer to view our scratch characteristics. Open the app and find your Bean in the list of nearby devices. Touch it to connect. 

{{{img_rel this 'scratch-chars-1.jpg' 'Connecting to your Bean' '40%' '40%'}}}

Choose the **Options** button on the top of the screen, then select the service view.

{{{img_rel this 'scratch-chars-3.jpg' 'Options menu' '40%'}}}
{{{img_rel this 'scratch-chars-4.jpg' 'Service view' '40%'}}}

Now scroll down to **Scratch1** and select it. 

{{{img_rel this 'scratch-chars-5.jpg' 'Selecting Scratch1' '40%'}}}

Tap **Listen for Notifications** and LightBlue will start listening for updates from Bean.

{{{img_rel this 'scratch-chars-6.jpg' 'Listening for notifications' '40%'}}}

As the temperature values appear, you'll see them being displayed as hex values. This is the default. If you touch **Hex** in the upper right corner, you can change the display mode to integer:

{{{img_rel this 'scratch-chars-7.jpg' 'Temperatures appear as hex' '40%'}}}

Select the box showing the integer representation (**4 Bit Unsigned Int Little Endian**).

{{{img_rel this 'scratch-chars-8.jpg' '4 Bit Unsigned Int Little Endian' '40%'}}}

You can see our office is currently somewhere between 21 and 22 degrees Celsius (about 70 degrees Fahrenheit). Not bad for winter in San Francisco! :)

{{{img_rel this 'scratch-chars-9.jpg' '21 to 22 degrees Celsius!' '40%'}}}

## Conclusion

In this guide, you used LightBlue Explorer with Bean's Scratch Characteristics to read simple data without having to write a custom app.

Scratch Characteristics work the other way too. If you want to send data to Bean, you can set Scratch Characteristics using LightBlue Explorer or another app and read them inside your Arduino sketch. See the [Arduino reference](/bean/reference/) for more details.
