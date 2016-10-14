---
title: Grove Modules
layout: basic.hbs
autotoc: true
---

## Introduction

This guide will show you how to utilize Grove modules for the Bean+, especially those included in the [Grove Starter Kit](http://store.punchthrough.com/collections/all/products/grove-starter-kit-pre-order).

As the name would suggest, [Grove modules](http://wiki.seeed.cc/Grove_System) are modular sensors, actuators, displays, or other devices that can interface with the Bean+ directly through the `A2/A3` and `I2C` ports (shown below). With over 120 different Grove devices available, from CO2 sensors to serial MP3 players, the possibilities are endless!

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

Here is a diagram of how to attach the modules from the [Grove Starter Kit](http://store.punchthrough.com/collections/all/products/grove-starter-kit-pre-order). This project will use the [touch sensor](http://wiki.seeed.cc/Grove-Touch_Sensor), [potentiometer](http://wiki.seeed.cc/Grove-Rotary_Angle_Sensor), and [buzzer](http://wiki.seeed.cc/Grove-Buzzer) modules.

## Program Your Bean

Upload the following sketch to your Bean. This sketch will 

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

## Conclusion

In this guide, we read a temperature from Bean's temperature sensor and sent it to your computer via Virtual Serial.

Check out this related project to see another application of Bean's thermometer:

* [Temperature-controlled fan](http://www.instructables.com/id/Automatic-desktop-fan/): This fan turns on to cool people down when Bean detects the room is getting too hot.

## Troubleshooting

{{> snip_troubleshooting}}

