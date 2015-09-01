---
title: Accelerometer
layout: basic.hbs
autotoc: true
---

## Introduction

The Bean has a built-in accelerometer that lets you detect its orientation and any changes in velocity. You can access the accelerometer's data from within your Arduino sketches or through any of the Bean platform SDKs.

One Bean user built a wall clock that knows when it's perfectly level on a wall hook. Another Beanie attached the Bean to a paratrooper toy that automatically deployed its parachute when it detects freefall!

In this tutorial, you'll read data from the accelerometer on a Bean and view it in Arduino's Serial Monitor using the Virtual Serial port.

## What You Need

If you haven't completed the following guides, please become familiar with them before starting this one:

* Getting Started
* Feature: Virtual Serial

You will need the following pieces of hardware:

* LightBlue Bean
* Compatible OS X computer

You will also need the following pieces of software installed:

* Bean Loader for OS X ([install guide]())

## Step-by-Step

### 1. Check your Bean

Turn on your Bean by inserting the coin cell battery into its holder. Make sure you see the LED blink green, indicating your battery power is OK:

{{{img_rel this 'blink-green.jpg' 'LED blinking green on power-up'}}}

### 2. Connect to your Bean

Open Bean Loader for OS X. Select your Bean and connect to it:

{{{img_rel this 'connecting.png' 'Connecting to Bean'}}}

Verify your Bean is connected:

{{{img_rel this 'connected.png' 'Connected to Bean'}}}

If there are lots of Beans near you, blink your Bean to make sure you're connected to the right one:

{{{img_rel this 'blink.png' 'Blink your Bean'}}}

{{{img_rel this 'blink-red.jpg' 'Bean blinking red'}}}

### 3. Program the Arduino Sketch

This is an Arduino sketch for your Bean. Here's what it does:

* Reads the accelerometer values
* Prints the X, Y, and Z values to the serial port
* Sleeps for 250 milliseconds
* Loops back to the start

```
void setup()
{
  Serial.begin(57600);
}

void loop()
{
  AccelerationReading reading = Bean.getAcceleration();
  byte x = reading.xAxis / 4;
  byte y = reading.yAxis / 4;
  byte z = reading.zAxis / 4;

  Serial.print(" X: ");
  Serial.print(x);

  Serial.print(" Y: ");
  Serial.print(y);

  Serial.print(" Z: ");
  Serial.print(z);

  Serial.println();
  Bean.sleep(250);
}
```

Open Arduino. Copy and paste the above sketch into Arduino. Save your sketch using **File > Save**:

{{{img_rel this 'save.png' 'Arduino sketch saved'}}}

Make sure you have selected LightBlue Bean as your programming target, then click Upload to send the sketch to Bean Loader:

{{{img_rel this 'upload.png' 'Uploading sketch to Bean Loader'}}}

Program the sketch to your Bean:

{{{img_rel this 'programming.png' 'Programming the Bean with the sketch'}}}

{{{img_rel this 'programmed.png' 'Programming is complete!'}}}

Stay connected to your Bean so you can read data from it in the next steps.

### 4. Enable Virtual Serial

Select your Bean and enable Virtual Serial:

{{{img_rel this 'enabling-vs.png' 'Enabling Virtual Serial'}}}

{{{img_rel this 'vs-enabled.png' 'Virtual Serial enabled'}}}

### 5. Open the Serial Monitor

In Arduino, select the Bean's serial port in **Tools &raquo; Port**:

{{{img_rel this 'select-port.png' "Select the Bean's serial port"}}}

Open the Serial Monitor using the button in the Arduino IDE:

{{{img_rel this 'serial-monitor-button.png' 'Serial Monitor button'}}}

The Serial Monitor displays data received from your Bean when Virtual Serial is enabled. You can read the serial data your Bean is sending to your Mac in the Serial Monitor:

{{{img_rel this 'serial-monitor.png' 'Serial Monitor opened'}}}

Try moving your device around. You should see the X, Y, and Z axis values change as they are printed in the Serial Monitor.

## Conclusion

## Troubleshooting

### Virtual Serial problems

* Your Virtual Serial port is enabled, but you're not seeing any data in the Serial Monitor.
* Arduino IDE doesn't show the LightBlue Bean's serial port.

If you're having problems like these, check out the [Virtual Serial troubleshooting]() steps.

### Everything Else

Having trouble with anything else? Try the steps listed in [General Bean troubleshooting]().

## Additional Notes

Looking to use accelerometer data in a desktop app? Check out our [Processing tutorial](), where you'll build an app that reads accelerometer data from Bean and displays it in a live visualization.
