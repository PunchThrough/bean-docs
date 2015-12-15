---
title: Virtual Serial
layout: basic.hbs
autotoc: true
---

## Introduction

Say you have a digital [pushbutton](https://www.sparkfun.com/products/97) soldered onto your Bean. You want your laptop to post a tweet when you push the button. To get that to happen, you need Bean to read the button and send data to your laptop when you push the button.

How do you get Bean to send data back to the computer?

In order for any device to communicate with your computer, the device and computer must share a common communication protocol. Bean and Bean Loader support Virtual Serial, an easy way to start talking to your Bean from the Arduino IDE.

In this guide, we will explore how Virtual Serial allows your computer and Bean to talk to each other. We'll build an example that uses the serial monitor on the Arduino IDE to send and visualize data coming from Bean.

## Setup

Please make sure you're familiar with the following before starting this guide:

* [Getting Started](#)

### Software

* Bean Loader ([install guides](#))

### Hardware

* LightBlue Bean
* OS X computer

## Bean-Computer Communication

In contrast to boards like the Arduino Uno, Bean and Bean+ don't support USB. Instead, all their communication is done via Bluetooth 4.0, also known as Bluetooth Smart or Bluetooth Low Energy. To learn more about how the BLE stack works with Bean, check out our [detailed guide](#).

### How Virtual Serial Works

Bluetooth Low Energy doesn't natively support serial communication.

Unlike Bluetooth Classic, BLE doesn't have a Serial Port Profile (SPP). Instead, Bean's firmware sends serial messages over BLE using the [LightBlue Platform](#) protocol. On the other end, your computer parses LightBlue Platform messages and converts them back into serial.

When an Arduino sketch writes serial data, Bean Loader receives it, parses it, and passes the data through to the virtual serial port. To see data that Bean is sending, we can use the serial monitor in Arduino IDE.

## Step-by-Step

### Upload a Sketch

This sketch sends a message over Virtual Serial when the state of digital pin 0 changes. Upload the following sketch to your Bean.

```cpp
bool lastState = 0;

void setup() {
  // Initialize serial communication
  Serial.begin(57600);

  // Set D0 to pullup mode
  pinMode(0, INPUT_PULLUP);
}

void loop() {
  bool newState = digitalRead(0);

  if (lastState != newState) {
    lastState = newState;
    Serial.print("Pin changed: ");
    Serial.println(newState);
  }

  // Sleep for half a second before checking the pins again
  Bean.sleep(500);
}
```

* **Line 1** declares a variable, `lastState`, that keeps track of the last read value from pin 0.
* **Line 5** sets up serial communication so your Bean can start sending data.
* **Line 8** sets pin 0 to pullup mode. This means that the microcontroller will connect an internal high-impedance resistor between the high logic level (3.3v or 5v) and pin 0. Pin 0 will default to HIGH. To change pin 0 to LOW, pull this pin low by connecting it to ground.
* **Line 12** checks the current state of pin 0.
* **Lines 14-18** check if the latest state of pin 0 is different from the one last recorded. If it is, it sends a message over serial.

### Select the Virtual Serial Port

To read the Virtual Serial port in Arduino IDE, go to the Arduino IDE menu bar and select **Tools** > **Port** > `/dev/cu.LightBlue-Bean`.

{{{img_rel this 'vs-port.png'}}}

### Enable Virtual Serial

After uploading your sketch to Bean, enable Virtual Serial. Right-click on your connected Bean in Bean Loader and click **Use for Virtual Serial**.

{{{img_rel this 'enable-vs.png'}}}

### Open the Serial Monitor

The button that opens Serial Monitor is located in the upper-right corner of the Arduino IDE. Click this button to open it.

{{{img_rel this 'sm-button.png'}}}

### Toggle Pin 0

To toggle digital pin 0, you need to connect it to ground. Connecting a pin to ground is also called *grounding a pin*. The easiest way to do this is to connect a jumper wire between the `0` and `GND` pins. You could also solder a button to ground pin 0 when pressed.

{{{img_rel this 'bean-button.svg' 'Bean with a pulldown switch on D0' '30%'}}}

Since we enabled Virtual Serial in Bean Loader, we should see serial data appear in the serial monitor when we ground pin 0:

{{{img_rel this 'serial-monitor.png'}}}

## Conclusion

In this guide, we learned how Bean uses Virtual Serial to read and write serial data just like any other Arduino dev board.

Knowing how to use the serial monitor and Virtual Serial lets you do things like:

* Read data directly from Bean
* Write all sorts of data to Bean
* Debug your sketches

Check out the [Arduino Serial reference](https://www.arduino.cc/en/Reference/Serial) to learn more about the commands available for serial communication.

### Learn More about BLE

* [Our Guide](#)
* [Getting Started with Bluetooth Low Energy](http://www.amazon.com/Getting-Started-Bluetooth-Low-Energy-ebook/dp/B00K1N23LA)
* [Bluetooth Low Energy Core Specification 4.0](https://www.bluetooth.org/en-us/specification/adopted-specifications)

## Troubleshooting

{{> snip_troubleshooting}}
