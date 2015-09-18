---
title: Accelerometer
layout: basic.hbs
autotoc: true
---

## Introduction

The Bean has a built-in accelerometer that lets you detect its orientation and any changes in velocity over time. You can access the accelerometer's data from within your Arduino sketches by using specific functions or through any of the Bean platform SDKs.

Our Beantalk users have come up with lots of cool projects that use the accelerometer. One Bean user built a [wall clock that knows when it's perfectly level on a wall hook](#). Another Beanie attached the Bean to a [paratrooper toy that automatically deploys its parachute](#) when it detects freefall! There are endless and fun ways the accelerometer features can be used.  We hope this tutorial will get you started on your own personal projects!

In this tutorial, you'll read data from the accelerometer on a Bean and view it in Arduino's Serial Monitor using the Virtual Serial port.

## What You Need

### Skills

Please make sure you're familiar with the following before starting this guide:

* [Getting Started](#)

### Software

* Bean Loader ([install guides](#))

### Hardware

* LightBlue Bean
* Mobile or Computer device

## Step-by-Step

### Program the Bean

This is an Arduino sketch for that will be compiled and uploaded to the Bean:  
<br>

<div style="background: #f0f3f3; overflow:auto;width:auto;border:solid gray;border-width:.1em .1em .1em .8em;padding:.2em .6em;"><table><tr><td><pre style="margin: 0; line-height: 125%"> 1
 2
 3
 4
 5
 6
 7
 8
 9
10
11
12
13</pre></td><td><pre style="margin: 0; line-height: 125%">void setup()
{
  Serial<span style="color: #555555">.</span>begin(<span style="color: #FF6600">57600</span>);
}

void loop()
{
  AccelerationReading reading <span style="color: #555555">=</span> Bean<span style="color: #555555">.</span>getAcceleration();
  char x <span style="color: #555555">=</span> <span style="color: #336666">abs</span>(reading<span style="color: #555555">.</span>xAxis) <span style="color: #555555">/</span> <span style="color: #FF6600">2</span>;
  char y <span style="color: #555555">=</span> <span style="color: #336666">abs</span>(reading<span style="color: #555555">.</span>yAxis) <span style="color: #555555">/</span> <span style="color: #FF6600">2</span>;
  char z <span style="color: #555555">=</span> <span style="color: #336666">abs</span>(reading<span style="color: #555555">.</span>zAxis) <span style="color: #555555">/</span> <span style="color: #FF6600">2</span>;
  Bean<span style="color: #555555">.</span>setLed(x, y, z);
}
</pre></td></tr></table></div>

<br>
Here's what the code does:


* `Line 1` is the [setup function](https://www.arduino.cc/en/Serial/Begin). This function is excuted only once during the duration of the program.
* `Line 6` is the [loop function](https://www.arduino.cc/en/Reference/Loop).  This function is excuted continuously until the Bean is either turned off or unprogrammed.   
* `Line 8` reads the accelerometer values (range from -512 to 511)
* `Lines 9-11` scales the values to the range 0 to 255.
* `Line 12` sets the LED's red, green and blue values to the scaled X, Y, and Z values
* Executes loop() again. 


Upload and compiled this arduino sketch. Afterwards, connect your Bean and program the Bean with this sketch. If you haven't installed the Bean Loader or don't know how to connect the Bean to the Bean Loader [visit the Getting Started guide for downloads and instructions](#).

### Understanding and Using the Bean's Accelerometer with the Arduino IDE

The Bean accelerometer [datasheet](http://ae-bst.resource.bosch.com/media/products/dokumente/bma250/bst-bma250-ds002-05.pdf) defaults to ±2G sensitivity and has 10-bit accuracy. That means that values within the acceleration range -2G...2G map to -512...511, respectively in our Arduino sketch.

`AccelerationReading` is a struct type. A struct is a [data type used by C-related languages, such as Arduino](http://playground.arduino.cc/Code/Struct), to group together lots of related variables. The AccelerationReading struct holds the X axis, Y axis, and Z axis values, as well as the current accelerometer sensitivity setting.

The `abs` function takes the absolute value of a number. The `abs(reading.xAxis)` takes negative values from -512 to -1 and converts them to positive values from +512 to +1. Now, when we rotate the Bean, the accelerometer values will fluctuate in the range 512...0...511.  Visually, we can observe these values changing over time as the LED transitions smoothly between colors. As we rotate the Bean, the values will change and so will the colors.


The Bean's LED takes 1 byte of information, which has 8 bits. A bit is made of binary digits, namely 0's and 1's. A byte can hold 2^8 possible values.The 2 represents the 2 possible binary digits, 0 and 1, and 8 represents the 8 bits. When you calculate 2^8 you get 256.  When you start counting from 0, you get 0 to 255 possible values, represented as 00000000 and 11111111, respectively.  

Since the Bean's LED can only accept up to 255 in values, we can take the accelerometer data and divide that by 2.  When we do this, no value will exceed 255. For example, 512 is the highest absolute value we  can get for the accelerometer data.  When we divide 512/2 we will get 256. Thus, this gives us 0 to 255 possible values.  Checkout [bytes](https://www.arduino.cc/en/Reference/Byte) to learn more!  

If you want to see that the values will not exceed 255, you can print the characters in serial:

<div style="background: #f0f3f3; overflow:auto;width:auto;border:solid gray;border-width:.1em .1em .1em .8em;padding:.2em .6em;"><table><tr><td><pre style="margin: 0; line-height: 125%"> 1
 2
 3
 4
 5
 6
 7
 8
 9
10
11
12
13
14
15
16
17
18</pre></td><td><pre style="margin: 0; line-height: 125%">void setup()
{
  Serial<span style="color: #555555">.</span>begin(<span style="color: #FF6600">57600</span>);
}

void loop()
{
  AccelerationReading reading <span style="color: #555555">=</span> Bean<span style="color: #555555">.</span>getAcceleration();
  <span style="color: #555555">//</span>Serial<span style="color: #555555">.</span>println(<span style="color: #336666">abs</span>(reading<span style="color: #555555">.</span>xAxis)<span style="color: #555555">/</span><span style="color: #FF6600">2</span>);
  <span style="color: #336666">int</span> x <span style="color: #555555">=</span> <span style="color: #336666">abs</span>(reading<span style="color: #555555">.</span>xAxis) <span style="color: #555555">/</span> <span style="color: #FF6600">2</span>;
  <span style="color: #336666">int</span> y <span style="color: #555555">=</span> <span style="color: #336666">abs</span>(reading<span style="color: #555555">.</span>yAxis) <span style="color: #555555">/</span> <span style="color: #FF6600">2</span>;
  <span style="color: #336666">int</span> z <span style="color: #555555">=</span> <span style="color: #336666">abs</span>(reading<span style="color: #555555">.</span>zAxis) <span style="color: #555555">/</span> <span style="color: #FF6600">2</span>;
  Bean<span style="color: #555555">.</span>setLed(x, y, z);

Serial<span style="color: #555555">.</span>println(x);
<span style="color: #555555">//</span>Serial<span style="color: #555555">.</span>println(y);
<span style="color: #555555">//</span>Serial<span style="color: #555555">.</span>println(z);
}
</pre></td></tr></table></div>

<br>

 * See `Line 15` that shows how to print in serial. To findout more about accessing serial in the Arduino IDE, checkout this tutorial [Using Serial](#)


Your Bean's accelerometer is configured in low power mode.  As a result, when your Bean requests a reading, the accelerometer takes about 5 ms to warm up before it returns a reading. This means that your Bean is able to read the accelerometer at a maximum frequency of 200 Hz.

There are other functions that enable you to utilize the accelerometer. For example, You can change the sensitivity of the accelerometer using [`setAccelerationRange`](#) method. Checkout [`Accelerometer`](#) to see more functions that are available to you. 



### Lets move our Bean to see the LED change colors

Congratulations!  You have successfully programed the Bean to change its LED as the accelerometer reads new values. Try moving your Bean around: picking it up, shaking it, and rotating it in the air. You should see the color of the Bean's LED change.

{{{video_rel this 'accel_to_rgb.mp4'}}}

## Conclusion

In this guide, you learned how to read data from the Bean's accelerometer and use it to change the color of the Bean's LED.

Here are some ideas for projects you could build with the accelerometer:

* Put the Bean on a hanging wall painting and make the LED blink when the painting is perfectly level.
* Use the Bean as an [HID device](#) and use it to control a game on your computer.
* Attach the Bean to a skateboard and measure the acceleration when you kick off.
* Add a buzzer to the Bean, hide it under papers on your desk, and sound an alarm when someone snoops around your stuff and moves the Bean.

Looking to use accelerometer data in a desktop app? Check out our [Processing tutorial](#), where you'll build an app that reads accelerometer data from Bean and displays it in a live visualization.

## Troubleshooting

Having trouble with this guide? Try the steps listed in [General Bean troubleshooting](#).

