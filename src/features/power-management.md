---
title: Power Consumption
layout: basic.hbs
autotoc: true
---

## Introduction

The Bean was designed to be very power efficient, so that it can run on a battery for a very long time. There are a few things the user needs to take into account while writing their sketch to achieve longer battery life. This guide will walk you through some best practices for designing low power Bean projects. 

## Good Practices

### Sleep vs Delay

The key to a low power sketch is going to sleep as much as possible. On the Bean there is a simple command to put the Bean to sleep for a set amount of time. 

During `Bean.sleep()`, the entire system is asleep and consuming barely any power. This is much different than a simple delay, where the Bean is still running at full power.

```
Bean.sleep(1000);   //this will put the Bean to sleep for 1 second
                    //Very efficient.
delay(1000);        //this will delay your sketch for 1 second, BUT
                    //it will continue to consume full power. 
                    //NOT efficient.
```

**Events that wake up the Bean**

What actually happens in Bean.sleep is that the Atmega (the Microcontroller running your Arduino sketch) goes fully to sleep, while the Bluetooth chip sleeps in between small periods of Bluetooth stack activity. This means the Bluetooth chip can wake up the Atmega for a variety of events: 

* Bluetooth operation (advertising or connection)
* A received serial message will wake the Atmega
* Any type of interrupt will wake the Atmega. 

A common practice is to have the Bean sleep for as long as possible using `Bean.sleep(0xFFFF)` while knowing that an event will be waking the Bean up. 

**Minimum Sleep Time**
However it is good to keep mind that `Bean.sleep()` has a minimum sleep time of 15ms. If you have to do delays under 15ms, you will have to use `delay()` instead. 

```
Bean.sleep(15);     //this will take 15 ms to complete
Bean.sleep(14);     //this will also take 15ms
Bean.sleep(1);      //this will also take 15ms

delay(15);          //this will delay for 15 ms
delay(5);           //this will delay for 5 ms
delay(1);           //this will delay for 1 ms

```

**

### Interrupt vs Polling

**Polling** is when you are checking to see if something has changed state every iteration of the main loop. For example, if you are waiting on a pin change to trigger an output. This is a less efficent method because you are using power checking the state of that pin on every iteration of the loop. 

The preferred method is to use **interrupts**. With interupts, you specify an event you are interested in, and the system will interrupt from sleep when it occurs. Common interrupt events are: an input pin changing state, accelerometer events, and receiving serial messages. 

## Example: Pin Interrupts vs Polling

### Setup

Please make sure you're familiar with the following before starting this guide:

* [Getting Started](#)

### Software

* Bean Loader ([install guides](#))

### Hardware

* LightBlue Bean
* Mobile or Computer device



## Program the Bean

This tutorial assumes you have completed the [Getting Started guide](#). It covers tasks such as connecting to and programming the Bean with the Bean Loader. 

Connect to your Bean and upload this Arduino sketch:

```
//Make sure you include <PinChangeInt.h> for any interrupts 
#include <PinChangeInt.h> 
 
void setup()
{
   pinMode( 0, INPUT_PULLUP );
   // run pinChanged when something changes on D0 
   // unlike other Bean function, you do not type Bean.attachPinChangeInterrupt(0, pinChanged, CHANGE)
   attachPinChangeInterrupt(0,pinChanged, CHANGE);
}
 
void loop()
{ 
   Bean.sleep(0xFFFF);     //sleep all the time when not handling an interrupt.
}
 
// Interrupt service routine (ISR) needs to return void and accept no arguments
void pinChanged()
{
   Bean.SetLedRed(255);
   Bean.sleep(100);
   Bean.SetLedRed(0);
}
```

Here's what the code does:

* `Line 6` Sets up pin D0 as an input, with an internal pull up resistor (this prevents the pin from floating or bouncing between values).
* `Line 9` Sets up an interrupt on pin D0, that will call the `pinChanged()` function when it's value changes.
* `Line 18` Defines the interrupt service routine (ISR for short) that will run when the pin changes.




## Conclusion

In this guide, you learned how some best practices to keep the Bean's power consumption low and get longer battery life.

Here are some times when you want to use interrupts instead of polling:

* Input pin changes
* Receiving a serial message
* Tapping or checking for orientation change of the accelerometer


## Troubleshooting

Having trouble with this guide? Try the steps listed in [General Bean troubleshooting](#).

