---
title: Grove Modules
layout: basic.hbs
autotoc: true
---

## Introduction

This guide will show you how to utilize Grove modules for the Bean+, specifically those included in the [Grove Starter Kit](http://store.punchthrough.com/collections/all/products/grove-starter-kit-pre-order).

As the name would suggest, [Grove modules](http://wiki.seeed.cc/Grove_System) are modular sensors, actuators, displays, or other devices that can interface with the Bean+ directly through the `A2/A3` and `I2C` ports (pictured below). With over 120 different Grove devices available, from CO2 sensors to serial MP3 players, the possibilities are endless!

{{{img_rel this 'bean-plus-grove-ports.png' "Grove ports on Bean+"}}}

## Before You Begin

{{> snip_req_getting_started}}

You also need to understand how to use Virtual Serial to read data from Bean. If you haven't used this yet, [check out the Virtual Serial guide](../virtual-serial/) before continuing.

### Software

* {{> snip_req_bean_loader}}

### Hardware

* {{> snip_req_bean}}
* Computer (for Virtual Serial)

## Grove Module Communication

Grove modules' I/O pins can be broken down into several categories, depending on the complexity of the module:

**Single Data Pin:** For the simpler sensors, the pins are VCC (power), GND (ground), SIG (data), and NC (not connected; not to be confused with *normally-closed*). These essentially use just the three pins mentioned first, as NC is not connected to anything and has no electronic function. Some modules will not even have an NC pin.

{{{img_rel this 'basic-module1.jpg' "An example of a basic module (active buzzer module)"}}}

**Two Data Pins:** Basic sensors with more than one I/O pin will still have VCC and GND pins, but the NC/blank pin will be replaced by another data pin. In the image below, the sensor's data pins are labeled *SUR* and *OBJ* to identify them as *surface temperature* and *object temperature*.

{{{img_rel this 'basic-module2.jpg' "An example of a basic sensor with two data pins (infrared temperature sensor)"}}}

**I2C:** Also known as inter-integrated circuit, this standard allows for multiple inputs and outputs through single pins by forcing the incoming/outgoing data (SDA, or Serial Data Line) to take turns based on pre-specified clock intervals (SCL, or Serial Clock Line). I2C modules also have VCC and GND pins for power and ground.

{{{img_rel this 'i2c-module1.jpg' "An example of an I2C module (I2C touch sensor hub)"}}}

{{{img_rel this 'i2c-module2.png' "Another I2C example, this one has an NC pin (NunChuck module)"}}}

**Shift Registers:** Like I2C, shift registers are used for sending or receiving input or output from a number of devices through a turn-based process. Shift registers also have VCC, GND, data (D), and clock (DCK) pins. They differ in that they can send multiple commands at a time using bit-shifted values. The example below shows the Grove LED bar, which has its own [library](http://wiki.seeed.cc/Grove-LED_Bar) to circumvent the need to send raw bit-shifted data. In addition to the 4-pin Grove port, this module also has data-out and data-in pins, which can be used to daisy-chain several of them together.

{{{img_rel this 'shift-register-module1.jpg' "An example of a chainable shift register (LED bar module)"}}}

## Attach Grove Modules

Now we will connect some of the Grove modules from the [Grove Starter Kit](http://store.punchthrough.com/collections/all/products/grove-starter-kit-pre-order). This project will use the [touch sensor](http://wiki.seeed.cc/Grove-Touch_Sensor), [potentiometer](http://wiki.seeed.cc/Grove-Rotary_Angle_Sensor), and [buzzer](http://wiki.seeed.cc/Grove-Buzzer) modules.

{{{img_rel this 'grove-modules1.png' "Grove modules for this project"}}}

Plug the included 4-wire header cables into the modules:

{{{img_rel this 'grove-modules2.png' "Grove modules with cables connected"}}}

Next, connect the potentiometer to the `A2/A3` port and the buzzer into the buzzer into the `I2C` port as shown below:

{{{img_rel this 'grove-modules-connected.png' "Plug the Grove modules into the Bean+"}}}

If we run out of Grove ports like we have just now, there is an easy workaround; connect some wires to the touch sensor (the colors of the wires do not matter, but matching wire colors will help us kep track of which ones go where):

{{{img_rel this 'touch-sensor-wires.png' "Attach wires to the touch sensor cable"}}}

Now connect the wires from the touch sensor cable to the Bean+ as pictured below:

{{{img_rel this 'module-pins-closeup.png' "Closeup of the pins connecting to the touch sensor"}}}

Everything should be connected now. Make sure your Bean+ looks like the one in the image below:

{{{img_rel this 'all-modules-connected.png' "Your Bean+ should look like this one"}}}

## Program Your Bean

Now that all the hardware is connected, upload the following sketch to your Bean. This sketch will emit noises from the buzzer whenever the touch sensor is pressed, and the frequency of the noise can be altered with the potentiometer.

```cpp
#define TOUCH_SENSOR     0
#define POTENTIOMETER    A3
#define BUZZER           A5

#define NOTE_ON_TIME     50
#define NOTE_OFF_TIME    100

#define MIN_POT_VAL      0
#define MAX_POT_VAL      1023
#define MIN_TONE         2000
#define MAX_TONE         4400

int note, potential;

void setup() 
{
  pinMode(TOUCH_SENSOR, INPUT);
  pinMode(POTENTIOMETER, INPUT);
  pinMode(BUZZER, OUTPUT);
}

void loop()
{
  if (digitalRead(TOUCH_SENSOR) == HIGH)
  {
    potential = analogRead(POTENTIOMETER);
    note = map(potential, MIN_POT_VAL, MAX_POT_VAL, MIN_TONE, MAX_TONE);
    
    //Serial.print("\n");
    //Serial.print(note);
  
    tone(BUZZER, note, NOTE_ON_TIME);
  }
  
  delay(NOTE_OFF_TIME);
}
```
Here's what the code does:

* **Line 1:** Define the touch sensor as a digital pin, which will read as 1 or 0.
* **Lines 2-3:** Define the potentiometer and buzzer as analog pins, which will read/write as a range of values.
* **Lines 5-6:** Define the constant times for the amount of time a note is played, and the delay between notes, respectively.
* **Lines 8-11:** Define the minimums and maximums for the potentiometer and tone frequencies.
	* The potentiometer is an analog *input* device, so it will have an effective range of 0-1023 (2<sup>10</sup>).
	* The buzzer is an analog *output* device, and has an effective range of 31-65535, in hertz (the average human ear can only hear up to around 20,000 Hz).
* **Lines 15-20:** Our setup void, where we initialize the three signal pis as input or output. Certain devices, such as pizeoelectric buzzers, can be used for both input and output.
* **Lines 24-33:** If the touch sensor is currently being touched, do the following:
	* **Line 26:** Read the analog value of the potentiometer.
	* **Line 27:** Map `potential`, our analog value between 0 and 1023, to `note`, our audio frequency between 2000 and 4400.
	* **Lines 29-30:** Print the current audio frequency to serial.
	* **Line 32:** Play the tone on the `BUZZER` pin, at the frequency of `note`, for `NOTE_ON_TIME` milliseconds.
* **Line 35:** Pause the program for `NOTE_OFF_TIME` milliseconds before looping back through again.

## Conclusion

In this guide, we learned how to use the Grove ports on the Bean+. The Grove modules from this demo are available [here]().

## Troubleshooting

{{> snip_troubleshooting}}

