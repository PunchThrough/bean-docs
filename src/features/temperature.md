---
title: Temperature Sensor
layout: basic.hbs
autotoc: true
---

## Introduction

This guide will take you through the process of reading the temperature from the Bean's on-board [BMA250 temperature sensor](http://ae-bst.resource.bosch.com/media/products/dokumente/bma250/bst-bma250-ds002-05.pdf).

This temperature reading can be used to detect air temperature to a certain level of accuracy, around +/- 3 degrees celsius.


## Before you begin

Familiarize yourself with the following Guides:

* [Virtual Serial](#)
* [Bean Loader Installation](#)

Hardware required:

* Bean
* Computer

## Step-by-step

### Program the Bean

Load the following sketch onto the Bean which will read the temperature and print it back over the Serial port.

```cpp
static int8_t temp = 0;
 
// The setup routine runs once at the beginning of the program
void setup() {
  Serial.begin();
}

// Main loop
void loop() {
  int8_t newTemp = Bean.getTemperature();

  if (newTemp != temp) {
    temp = newTemp;
    Serial.print("Temperature is ");
    Serial.print(temp);
    Serial.println(" degrees Celsius");
  }

  // Sleep for a second before reading the temperature again
  Bean.sleep(1000);
}
```

### Code Breakdown

* `Line 1` defines a global variable `temp` and initializes it's value to 0.
  * `int8_t` means it is a platform independent 8-bit signed integer.
  * `static` means the variable is global in the context of this file but hidden rom external files.
* `Line 10` is the first line of the main loop, which grabs a new temperature from the Bean API via `Bean.getTemperature()` and saves it to a local variable `newTemp`.
* `Line 12` checks to see if the new temperature is different than the one assigned to the global variable from `line 1`.
* `Line 13` reassigns the global variable `temp` to `newTemp`.
* `Line 14-16` sends a single line of text over the serial port containing the new temperature.
* `Line 20` tells the Bean to sleep for 1 second and the loop is run again.

## Conclusion

This guide shows you the very simple Bean API for reading temperature. You can now use your Bean to monitor temperature and make the next great connected product.

## Troubleshooting

Having trouble with this guide? Try the steps listed in [General Bean troubleshooting](#).

## Related projects

* [Temperature controlled fan](http://www.instructables.com/id/Automatic-desktop-fan/)
