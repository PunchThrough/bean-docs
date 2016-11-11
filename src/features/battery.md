---
title: Battery Functions
layout: basic.hbs
autotoc: true
---

## Introduction

The Bean operates from 2.6V-3.6V and can be powered directly by a 3V coin cell battery or a external power source connected to the VBAT pin. The Bean has no internal voltage regulators so it is important not to connect a power source outside of the operating voltage range. 

The Bean+ offers the convenience of an included rechargeable lithium battery and 3.3V and 5V voltage regulators. This flexibility allows the Bean+ to work with higher power accessories right out of the box. 

This guide will show you how to read the approximate voltage and remaining battery level in your Bean.

## Coin Cell Batteries

The coin cell battery used by Bean is called CR2032, and is a 3-volt lithium-manganese dioxide battery. CR2032s store ~225mAh of power, and typically last a long time because of their low power output. The lifetime of the battery, however, will depend entirely on its usage and application. CR2032 batteries do not work will in higher current applications due to their high internal resistance. If the Bean is going to be used with motors or high brightness LED's you will more than likely want to use an external power source such as a AA battery pack. 

## Lithium Polymer Batteries

The Bean+ has a rechargeable lithium-ion polymer (LiPo) battery which stores 600mAh of power and operates from from ~2.45 and 4.20 volts, depending on its state of charge. This battery is rechargeable from a 5V Micro USB cable and takes approximately 1.5 hours to recharge.

{{{img_rel this 'BeanPlus_Charging.JPG' 'Bean+ Charging' '40%'}}}

There is an orange LED on the underside of the Bean+ that indicates that the battery is being charged and will turn off when charging is complete.

The battery for the Bean+ also includes a protection circuit that stops the charge or discharge or power to avoid damage to the battery.

## Before You Begin

{{> snip_req_getting_started}}

### Software

* {{> snip_req_bean_loader}}
* Bean Loader ([install guides](../../getting-started/intro/#next-steps))
* Arduino IDE 1.6.8 ([available here](https://www.arduino.cc/en/Main/OldSoftwareReleases))
* [OSX Virtual serial](../virtual-serial) or [log_serial on CLI loader](../../node-sdk/overview)

### Hardware

* {{> snip_req_bean}}

## Program Your Bean

Upload the following sketch to your Bean. This sketch reads the battery voltage and writes values to the virtual serial output, and visualizes the values with the RGB LED.

```cpp
void setup() {
  // Serial port is initialized automatically; we don't have to do anything
}

void loop() {
  int batteryPercentage = Bean.getBatteryLevel();
  int batteryVoltage = Bean.getBatteryVoltage();
  Serial.print("The remaining battery life is: %");
  Serial.println(batteryPercentage);
  blinkLedBasedOnBatteryLevel(batteryPercentage);
  Serial.print("The current battery voltage is: ");
  Serial.print((double) batteryVoltage / 100);
  Serial.println("V");
  Bean.sleep(5000);
}

void blinkLedBasedOnBatteryLevel(int batteryPercentage) {
  if (batteryPercentage > 80) {
    Bean.setLed(0, 255, 0);
  } else if (batteryPercentage > 60) {
    Bean.setLed(255, 255, 0);
  } else if (batteryPercentage > 40) {
    Bean.setLed(255, 150, 0);
  } else if (batteryPercentage > 20) {
    Bean.setLed(255, 75, 0);
  } else {
    Bean.setLed(255, 0, 15);
  }
  Bean.sleep(100);
  Bean.setLed(0, 0, 0);
}
```

## Explanation

* **Line 6**: Get the battery's level in percentage and assign the value to `batteryPercentage`.
* **Line 7**: Get the battery's level in volts and assign it to `batteryVoltage`
* **Lines 8-9**: Print the battery percentage in the virtual serial monitor
* **Line 10**: Pass the battery percentage to the `blinkLedBasedOnBatteryLevel` procedure
* **Lines 11-13**: print the battery voltage value divided by 100 and cast as a `double` for the real value
* **Line 14**: Put the Bean to sleep for five seconds before rechecking to save battery power
* **Lines 18-28**: If/else method of visualizing the battery level:
	* `setLed(0, 255, 0)` is the RGB value for pure green
	* `setLed(255, 255, 0)` is the RGB value for pure yellow
	* `setLed(255, 150, 0)` is the RGB value for yellow-orange
	* `setLed(255, 75, 0)` is the RGB value for red-orange
	* `setLed(255, 0, 15)` is the RGB value for red-magenta
* **Lines 29-30**: Put the Bean to sleep for 100 milliseconds before turning off the LED. This means the blink durations of the LED is 100ms, and will be easier to see than by simply turning it on and then immediately off again.
	
### Functions and Data Types

`getBatteryVoltage` returns a value from 195-353, which corresponds to the voltage multiplied by 100. As the battery contents deplete, the voltage will decrease. The voltage reading is accurate to ±0.01 volts.

`getBatteryLevel` returns the current voltage mapped to 0-100. The same battery percentages can be found by using the useful `map` struct as below:

```cpp
int batteryVoltage = Bean.getBatteryVoltage();
int batteryPercentage = map(batteryVoltage, 195, 353, 0, 100);
```

## Conclusion

In this guide, we set the Bean up to read its battery level and voltage, and map the remaining battery life to colored LEDs. This can be used to alert you when the battery is low, or automatically switch to low-power functions when the battery is drained to an extent.

## Troubleshooting

{{> snip_troubleshooting}}