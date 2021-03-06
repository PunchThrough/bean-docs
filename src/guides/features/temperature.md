---
title: Temperature Sensor
layout: basic.hbs
autotoc: true
---

## Introduction

This guide will take you through the process of reading the temperature from Bean's on-board [BMA250 temperature sensor](http://ae-bst.resource.bosch.com/media/products/dokumente/bma250/bst-bma250-ds002-05.pdf).

This temperature sensor can be used to read air temperature near Bean with an accuracy of ±3°C.

## Before You Begin

{{> snip_req_getting_started}}

You also need to understand how to use Virtual Serial to read data from Bean. If you haven't used this yet, [check out the Virtual Serial guide](../virtual-serial/) before continuing.

### Software

* {{> snip_req_bean_loader}}
* Bean Loader ([install guides](../../getting-started/intro/#next-steps))

### Hardware

* {{> snip_req_bean}}
* Computer (for Virtual Serial)

## Program Your Bean

Upload the following sketch to your Bean. This sketch reads Bean's temperature and prints it over Virtual Serial. Connect to your Bean and enable Virtual Serial to see the sketch in action.

```cpp
int8_t lastTemp = 0;

void setup() {
  Serial.begin();
}

void loop() {
  int8_t currTemp = Bean.getTemperature();

  if (lastTemp != currTemp) {
    Serial.print("Temperature is ");
    Serial.print(currTemp);
    Serial.println(" degrees Celsius");
    lastTemp = currTemp;
  }

  Bean.sleep(1000);
}
```
Here's what the code does:

* **Line 1** defines a global variable `temp` and initializes its value to 0.
  * `int8_t` means it is an 8-bit signed integer. This is the same type as `Bean.getTemperature()`.
  * It's declared outside of the loop function, so it will maintain its value even after `loop()` completes.
* **Line 8** reads the current temperature via `Bean.getTemperature()` and saves it to a local variable called `currTemp`.
* **Line 10** checks to see if the new temperature is different from the last recorded temperature.
* **Lines 11-13** send a single line of text over Virtual Serial with the new temperature reading. This line looks like this: `Temperature is 23 degrees Celsius`
* **Line 14** saves the current temperature to `lastTemp` if it has changed since last time.
* **Line 27** tells Bean to sleep for one second before checking the temperature again.

## Conclusion

In this guide, we read a temperature from Bean's temperature sensor and sent it to your computer via Virtual Serial.

Check out this related project to see another application of Bean's thermometer:

* [Temperature-controlled fan](http://www.instructables.com/id/Automatic-desktop-fan/): This fan turns on to cool people down when Bean detects the room is getting too hot.

## Troubleshooting

{{> snip_troubleshooting}}

