---
title: Accelerometer
layout: basic.hbs
autotoc: true
---

## Introduction

Bean has a built-in accelerometer that lets you detect its orientation and any changes in velocity over time. You can access the accelerometer's data from within your Arduino sketches by using specific functions or through any of Bean platform SDKs.

Our Beantalk users have come up with lots of cool projects that use the accelerometer. One Bean user built a [a simple motion dectector](http://beantalk.punchthrough.com/t/simple-motion-detector/149). Another Beanie attached Bean to a [paratrooper toy that automatically deploys its parachute](http://beantalk.punchthrough.com/t/bean-parachute-toy/1328) when it detects freefall! There are endless and fun ways the accelerometer features can be used.  We hope this tutorial will get you started on your own personal projects!

In this tutorial, you'll read data from the accelerometer on a Bean and view it in Arduino's Serial Monitor using the Virtual Serial port.

## Setup

Please make sure you're familiar with the following before starting this guide:

* [Getting Started](../../getting-started/intro)

### Software

* Bean Loader [install guides](../../getting-started/intro/#next-steps)

### Hardware

* [LightBlue Bean](http://punchthrough.myshopify.com/products/bean)
* Mobile or Computer device


## Program Your Bean

This tutorial assumes you have completed the [Getting Started guide](../../getting-started/intro). It covers tasks such as connecting to and programming Bean with Bean Loader. 

Connect to your Bean and upload this Arduino sketch:

```
void setup()
{
    Serial.begin(57600);
}

void loop()
{
    AccelerationReading reading = Bean.getAcceleration();
    char x = abs(reading.xAxis) / 2;
    char y = abs(reading.yAxis) / 2;
    char z = abs(reading.zAxis) / 2;

    Bean.setLed(x, y, z);
}
```

Here's what the code does:

* **Line 1**: The [setup function](https://www.arduino.cc/en/Reference/Setup). This function is executed only once when Bean is powered on.
* **Line 6**: The [loop function](https://www.arduino.cc/en/Reference/Loop).  This function is executed continuously until Bean is turned off or its program is cleared.
* **Line 8**: Read the accelerometer values (range from -512 to 511)
* **Lines 9-11**: Scale the values to the range 0 to 255.
* **Line 12**: Set the LED's red, green and blue values to the scaled X, Y, and Z values.

Upload this Arduino sketch to your Bean. If you haven't installed Bean Loader or don't know how to connect to your Bean, [visit the Getting Started guide for downloads and instructions](../../getting-started/intro/#next-steps).

## Understanding and Using Bean's Accelerometer

The accelerometer on Bean [datasheet](http://ae-bst.resource.bosch.com/media/products/dokumente/bma250/bst-bma250-ds002-05.pdf) defaults to ±2g sensitivity and has 10-bit accuracy. That means that values within the acceleration range -2g...2g map to -512...511 in our Arduino sketch.

`AccelerationReading` is a struct type. A struct is a data type used by C-related languages, such as Arduino, to group together lots of related variables. [Learn more at the Arduino reference for the `struct` data type.](http://playground.arduino.cc/Code/Struct) The `AccelerationReading` struct holds the X axis, Y axis, and Z axis values, as well as the current accelerometer sensitivity setting.

The `abs` function takes the absolute value of a number. The `abs(reading.xAxis)` takes negative values from -512 to -1 and converts them to positive values from +512 to +1. Now, when we rotate Bean, the accelerometer values will fluctuate in the range 512...0...511.  Visually, we can observe these values changing over time as the LED transitions smoothly between colors. As we rotate Bean, the values will change and so will the colors.

Since Bean's LED takes a single byte in the range 0...255, and our accelerometer data is in the range 0...512, we can simply divide our axis data by 2 to ensure no value will exceed 255.

If you want to see that the values will not exceed 255, you can display the values via Virtual Serial:


```
void setup()
{
    Serial.begin(57600);
}

void loop()
{
    AccelerationReading reading = Bean.getAcceleration(); 
    char x = abs(reading.xAxis) / 2;
    char y = abs(reading.yAxis) / 2;
    char z = abs(reading.zAxis) / 2;

    Bean.setLed(x, y, z);

    Serial.println(x);
    //Serial.println(y);
    //Serial.println(z);
}
```

 * **Line 15** is an example of how to print to the Serial Monitor. To find out more about activating Virtual Serial on Bean and viewing incoming data in Arduino IDE's Serial Monitor, check out our [Virtual Serial guide](../virtual-serial).
 * **Lines 16-17** can be uncommented (delete the `//` characters) to see the Y and Z axis values as well.

Your Bean's accelerometer is configured in low power mode.  As a result, when your Bean requests a reading, the accelerometer takes about 5 ms to warm up before it returns a reading. This means that your Bean is able to read the accelerometer at a maximum frequency of 200 Hz.

There are other functions that enable you to utilize the accelerometer. For example, You can change the sensitivity of the accelerometer using [`setAccelerationRange`](#) method. Checkout [`Accelerometer`](http://legacy.punchthrough.com/bean/the-arduino-reference/) to see more functions that are available to you. 

## Move Bean around

Congratulations!  You have successfully programed Bean to change its LED as the accelerometer reads new values. Try moving your Bean around: picking it up, shaking it, and rotating it in the air. You should see the color of Bean's LED change.

{{{video_rel this 'accel_to_rgb.mp4'}}}

## Conclusion

In this guide, you learned how to read data from Bean's accelerometer and use it to change the color of Bean's LED.

Here are some ideas for projects you could build with the accelerometer:

* Put Bean on a hanging wall painting and make the LED blink when the painting is perfectly level.
<!-- * Use Bean as an [HID device](../hid) and use it to control a game on your computer. -->
* Attach Bean to a skateboard and measure the acceleration when you kick off.
* Add a buzzer to Bean, hide it under papers on your desk, and sound an alarm when someone snoops around your stuff and moves Bean.

<!-- Looking to use accelerometer data in a desktop app? Check out our [Processing tutorial](#), where you'll build an app that reads accelerometer data from Bean and displays it in a live visualization. -->

## Troubleshooting

{{> snip_troubleshooting}}
