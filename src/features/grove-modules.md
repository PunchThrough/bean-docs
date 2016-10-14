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

## Attach Grove Modules

Now we will connect some of the Grove modules from the [Grove Starter Kit](http://store.punchthrough.com/collections/all/products/grove-starter-kit-pre-order). This project will use the [touch sensor](http://wiki.seeed.cc/Grove-Touch_Sensor), [potentiometer](http://wiki.seeed.cc/Grove-Rotary_Angle_Sensor), and [buzzer](http://wiki.seeed.cc/Grove-Buzzer) modules.

{{{img_rel this 'grove-modules1.png' "Grove modules for this project"}}}

Before starting, make sure the Bean+ is in 5V mode; 5V is required to power the Grove modules.

{{{img_rel this 'bean-plus-5-or-3.png' "Make sure the Bean+ is in 5V mode"}}}

Plug the included 4-wire header cables into the modules:

{{{img_rel this 'grove-modules2.png' "Grove modules with cables connected"}}}

Next, connect the potentiometer to the `A2/A3` port and the buzzer into the buzzer into the `I2C` port as shown below:

{{{img_rel this 'grove-modules-connected' "Plug the Grove modules into the Bean+"}}}

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

