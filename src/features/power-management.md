---
title: Power Consumption
layout: basic.hbs
autotoc: true
---

## Introduction

Bean was designed to be power-efficient so it can run on a battery for a very long time. There are a few things you need to take into account to achieve a longer battery life with your sketches. This guide will walk you through some best practices for designing low-power Bean projects. 

## What You Need

Please make sure you're familiar with the following before starting this guide:

* [Getting Started](../../getting-started/intro)

### Software

* Bean Loader ([install guides](../../getting-started/intro/#next-steps))

### Hardware

* [LightBlue Bean](http://punchthrough.myshopify.com/products/bean)
* Computer or mobile device

## Best Practices
We will describe the difference between `Bean.sleep()` and Arduino `delay()` and how that relates to power consumption. 

### Bean.sleep vs. Arduino Delay

The key to a low-power sketch is putting Bean to sleep whenever it's not actively doing something. Bean has a simple command to sleep for a set amount of time: `Bean.sleep()`.

During Bean sleep, the entire system is asleep and consumes barely any power. With a simple delay, Bean is still running at full power but does nothing while it waits for the delay to expire.

Using Bean sleep puts your Bean to sleep for 1 second (1000 milliseconds) and is very efficient:

```
Bean.sleep(1000);  // wake me up after a short nap
```

If you use `delay` to simply wait for 1 second, you will consume power the entire time:

```
delay(1000);  // I'm not doing anything, but I'm fully awake and using battery
```

### What wakes up Bean?

What actually happens in Bean sleep is that the ATmega (the microcontroller running your Arduino sketch) goes fully to sleep. Meanwhile, the Bluetooth chip sleeps in between small periods of Bluetooth stack activity. This means the Bluetooth chip can wake up the ATmega for a variety of events: 

* A client connecting to Bean can wake the ATmega if Bean is configured for wake-on-connect
* A received serial message will wake the ATmega
* Any type of interrupt will wake the ATmega

A common practice is to have Bean sleep for as long as possible using `Bean.sleep(0xFFFFFFFF)`. This way, Bean will stay asleep indefinitely, and you can wake up Bean with a serial message or interrupt.

### Minimum Sleep Time

It's important to keep in mind that `Bean.sleep()` has a minimum sleep time of 15 ms. If you need delays under 15 ms, you will have to use [delay](https://www.arduino.cc/en/Reference/Delay) or [delayMicroseconds](https://www.arduino.cc/en/Reference/DelayMicroseconds) instead. 

```
Bean.sleep(15);     // This will sleep for 15 ms
Bean.sleep(14);     // This will also sleep for 15 ms
Bean.sleep(1);      // This will also sleep for 15 ms

delay(15);          // This will delay for 15 ms
delay(5);           // This will delay for 5 ms
delay(1);           // This will delay for 1 ms
```

### Polling vs. Interrupts

**Polling** is when you read the value of something frequently to see if it has changed state. For example, if you are waiting on a pin change to trigger an output, you might read the value of the pin during `loop()` and compare it to the last-read value. This is an inefficient method of watching for a change. You consume power checking the state of that pin every time `loop()` runs.

The preferred method is to use **interrupts**. With interupts, you specify an event you are interested in, and the system will wake from sleep when it occurs. Common interrupt events include:

* an input pin changing state
* accelerometer events
* receiving serial messages

## Example: Pin Interrupts vs Polling

This tutorial assumes you have completed the [Getting Started guide](../../getting-started/intro), which covers tasks such as connecting to and programming Bean with Bean Loader. 

### Program Your Bean

Connect to your Bean and upload this Arduino sketch:

```
// PinChangeInt.h handles pin change interrupts
#include <PinChangeInt.h> 
 
void setup() {
   pinMode(0, INPUT_PULLUP);
   // run pinChanged when something changes on D0 
   // This is an external library, so you don't need the prefix "Bean"
   attachPinChangeInterrupt(0, pinChanged, CHANGE);
}
 
void loop() { 
  // Sleep all the time when not handling an interrupt
  Bean.sleep(0xFFFFFFFF);
}
 
// Interrupt service routine (ISR) needs to return void and accept no arguments
void pinChanged() {
   Bean.setLed(255, 0, 0);
   Bean.sleep(100);
   Bean.setLed(0, 0, 0);
}
```

Here's what the code does:

* **Line 6** sets up pin D0 as an input with an internal pull-up resistor. This prevents the pin from floating or bouncing between values.
* **Line 9** sets up an interrupt on pin D0 that will call the `pinChanged()` function when its value changes.
* **Line 18** defines the ISR that will run when the pin changes.

### Toggle Pin D0

Use a jumper wire to connect pin D0 to ground. You can also solder a pushbutton switch between D0 and ground and press that.

When you ground pin D0, you should see Bean's LED blink red briefly. This means it's executing the code in the interrupt, then going straight back to sleep.

## Conclusion

In this guide, you learned some best practices to keep Bean's power consumption low and get longer battery life.

Here are some times when using interrupts instead of polling can save battery power:

* Waiting for an input pin to change state
* Listening for accelerometer events
* Receiving serial messages

## Troubleshooting

{{> snip_troubleshooting}}
