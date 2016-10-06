---
title: Battery Functions
layout: basic.hbs
autotoc: true
---

## Introduction

The Bean uses 3V to run its sketches, which can be provided by a 3V coin cell battery or any other 3V power source, such as two 1.5V AA batteries. The Bean+ can run off either its included lithium battery, or a microUSB charging cable, which respectively range from 3V to 5V.

This guide will show you how to read the approximate voltage and remaining battery level in your Bean.

## Coin Cell Batteries

Also called button cell or watch cell bateries, these are used primarily to power small electronics, and come in a variety of dimensions and materials. Each battery is a single anode-cathode cell. Anodes and cathodes refer to the positive and negative terminals used in the battery, which allow current to flow one or two ways depending on the type of battery. The coin cell battery used by Bean is called CR2032, and is a 3-volt lithium-manganese dioxide battery. CR2032s are most commonly used in the motherboards of computers as CMOS batteries. They store ~225mAh of power, and typically last a long time because of their low power output. The lifetime of the battery, however, will depend entirely on its usage and application.

## Lithium Polymer Batteries

The Bean+ has a rechargeable lithium-ion polymer (LiPo) battery which stores 600mAh of power and discharges between 2.45 and 4.20 volts, depending on how full it is. The term *polymer* refers to the polymer electrolyte used as a means of generating and dispelling a charge instead of the more conventional liquid electrolyte. It also refers to the flexible case for the batteries' components, as opposed to the more common rigid case needed to ensure no leaks occur. The polymer electrolyte also allows for batteries to be made in virtually any shape and size.

The battery for the Bean+ also includes a protection circuit that stops the charge or discharge or power to avoid several scenarios that would cause a decrease in battery lifetime, including:

* If voltage surpasses 4.20V (checks every 1.2s)
* If voltage drops below 2.45V (checks every 120ms)
* If incoming voltage is greater than 150mV (checks every 10ms)

The battery also stops charging after being plugged in for 8 consecutive hours, and will not charge again until being replugged in.

## Before You Begin

{{> snip_req_getting_started}}

### Software

* {{> snip_req_bean_loader}}
* Bean Loader ([install guides](../../getting-started/intro/#next-steps))
* Arduino IDE 1.6.8 ([available here](https://www.arduino.cc/en/Main/OldSoftwareReleases))

### Hardware

* {{> snip_req_bean}}
* Computer (for Virtual Serial)

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