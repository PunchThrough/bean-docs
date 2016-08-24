---
title: Accelerometer
layout: basic.hbs
autotoc: true
---

## Introduction

Bean has a built-in accelerometer that lets you detect its orientation and any changes in velocity over time. You can access the accelerometer's data from within your Arduino sketches by using specific functions or through any of Bean platform SDKs.

Our Beantalk users have come up with lots of cool projects that use the accelerometer. One Bean user built a [a simple motion dectector](http://beantalk.punchthrough.com/t/simple-motion-detector/149). Another Beanie attached Bean to a [paratrooper toy that automatically deploys its parachute](http://beantalk.punchthrough.com/t/bean-parachute-toy/1328) when it detects freefall! There are endless and fun ways the accelerometer features can be used.  We hope this tutorial will get you started on your own personal projects!

In this tutorial, you'll read data from the accelerometer on a Bean and view it in Arduino's Serial Monitor using the Virtual Serial port.

## Accelerometers

An accelerometer is a device which measures acceleration by reading the forces pulling on a three-axis scale (or in some cases two 2-axis scales). Modern accelerometers are typically micro electro-mechanical systems (MEMS) devices made up of a . Accelerometers can tell which orientation they're in by reading the respective forces of gravity on the x, y, and z axes. They can also be used to detect certain patterns of motion, such as freefall, rapid vibration, or high-g motion.

The Bean and the Bean+ use different, but very similar, accelerometers. The Bean uses the older Bosch [BMA250](http://www1.futureelectronics.com/doc/BOSCH/BMA250-0273141121.pdf) and the Bean+ uses the Bosch [BMA250E](https://ae-bst.resource.bosch.com/media/_tech/media/datasheets/BST-BMA250E-DS004-06.pdf). More detailed information about how accelerometers work and are made can be found [here](https://www.youtube.com/watch?time_continue=91&v=KZVgKu6v808).

## Before You Begin

{{> snip_req_getting_started}}

### Software

* {{> snip_req_bean_loader}}
* Arduino IDE 1.6.8 ([available here](https://www.arduino.cc/en/Main/OldSoftwareReleases))

### Hardware

* {{> snip_req_bean}}
* Computer or mobile device

## Program Your Bean

Connect to your Bean and upload this Arduino sketch:

```
void setup()
{
    Serial.begin(57600);
}

void loop()
{
    AccelerationReading reading = Bean.getAcceleration();
    char x = abs(reading.xAxis) / 2;
    char y = abs(reading.yAxis) / 2;
    char z = abs(reading.zAxis) / 2;

    Bean.setLed(x, y, z);
}
```

Here's what the code does:

* **Line 1**: The [setup function](https://www.arduino.cc/en/Reference/Setup). This function is executed only once when Bean is powered on.
* **Line 6**: The [loop function](https://www.arduino.cc/en/Reference/Loop).  This function is executed continuously until Bean is turned off or its program is cleared.
* **Line 8**: Read the accelerometer values (range from -512 to 511)
* **Lines 9-11**: Scale the values to the range 0 to 255.
* **Line 12**: Set the LED's red, green and blue values to the scaled X, Y, and Z values.

Upload this Arduino sketch to your Bean. If you haven't installed Bean Loader or don't know how to connect to your Bean, [visit the Getting Started guide for downloads and instructions](../../getting-started/intro/#next-steps).

## Understanding and Using Bean's Accelerometer

The accelerometer on Bean defaults to ±2g sensitivity and has 10-bit accuracy. That means that values within the acceleration range -2g...2g map to -512...511 in our Arduino sketch.

`AccelerationReading` is a struct type. A struct is a data type used by C-related languages, such as Arduino, to group together lots of related variables. [Learn more at the Arduino reference for the `struct` data type.](http://playground.arduino.cc/Code/Struct) The `AccelerationReading` struct holds the X axis, Y axis, and Z axis values, as well as the current accelerometer sensitivity setting.

The `abs` function takes the absolute value of a number. The `abs(reading.xAxis)` takes negative values from -512 to -1 and converts them to positive values from +512 to +1. Now, when we rotate Bean, the accelerometer values will fluctuate in the range 512...0...511.  Visually, we can observe these values changing over time as the LED transitions smoothly between colors. As we rotate Bean, the values will change and so will the colors.

Since Bean's LED takes a single byte in the range 0...255, and our accelerometer data is in the range 0...512, we can simply divide our axis data by 2 to ensure no value will exceed 255.

If you want to see that the values will not exceed 255, you can display the values via Virtual Serial:


```
void setup()
{
    Serial.begin(57600);
}

void loop()
{
    AccelerationReading reading = Bean.getAcceleration(); 
    char x = abs(reading.xAxis) / 2;
    char y = abs(reading.yAxis) / 2;
    char z = abs(reading.zAxis) / 2;

    Bean.setLed(x, y, z);

    Serial.println(x);
    //Serial.println(y);
    //Serial.println(z);
}
```

 * **Line 15** is an example of how to print to the Serial Monitor. To find out more about activating Virtual Serial on Bean and viewing incoming data in Arduino IDE's Serial Monitor, check out our [Virtual Serial guide](../virtual-serial).
 * **Lines 16-17** can be uncommented (delete the `//` characters) to see the Y and Z axis values as well.

Your Bean's accelerometer is configured in low power mode.  As a result, when your Bean requests a reading, the accelerometer takes about 5 ms to warm up before it returns a reading. This means that your Bean is able to read the accelerometer at a maximum frequency of 200 Hz.

## Move Bean around

Congratulations!  You have successfully programmed Bean to change its LED as the accelerometer reads new values. Try moving your Bean around: picking it up, shaking it, and rotating it in the air. You should see the color of Bean's LED change.

{{{video_rel this 'accel_to_rgb.mp4'}}}

## Other Functions

Now that you know how to use the accelerometer to read the 3D orientation of the Bean, there are some extra functions you can use to better utilize the accelerometer's capabilties.

This larger, more advanced sketch turns the Bean into a simple LED motion alarm, which is triggered by freefall (`LOW_G_EVENT`), and is reset by shaking the Bean with a force of 8g or more (`HIGH_G_EVENT`):

```
bool alarmOn = false;

void setup()
{
  Bean.setAccelerationRange(8);
  Bean.enableMotionEvent(LOW_G_EVENT);
  Bean.enableMotionEvent(HIGH_G_EVENT);

  uint8_t mode;
  Bean.accelRegisterRead(REG_POWER_MODE_X11, 1, &mode);
  if (mode != VALUE_LOW_POWER_10MS) 
  {
    Bean.accelRegisterWrite(REG_POWER_MODE_X11, VALUE_LOW_POWER_10MS);
  }
}

void loop()
{
  if (Bean.checkMotionEvent(LOW_G_EVENT))
  {
    alarmOn = true;
  }
  else if (Bean.checkMotionEvent(HIGH_G_EVENT) && alarmOn)
  {
    resetAlarm();
  }
  if (alarmOn)
  {
    alarm();
  }
}

void resetAlarm()
{
  alarmOn = false;
  for (uint8_t blinks = 0; blinks <= 5; blinks++)
  {
    Bean.setLed(0, 100, 0);
    Bean.sleep(100);
    Bean.setLed(0, 0, 0);
    Bean.sleep(50);
  }
}

void alarm()
{
  for (uint8_t blinks = 0; blinks <= 3; blinks++)
  {
    Bean.setLed(255, 0, 0);
    Bean.sleep(100);
    Bean.setLed(0, 0, 255);
    Bean.sleep(100);
  }
}
```
Here's what the code does:

* **Line 1:** Initialize the boolean as a global variable, so all functions can see it.
* **Lines 6-7:** Enable the two motion events so the program listens for them.
* **Lines 8:** Initialize a 1-byte-long integer to store the power mode setting and then store the setting, with a length of 1 byte, to the memory address of powerValue. This is the same as `uint8_t value = Bean.getAccelerometerPowerMode();`.
* **Lines 11-14:** If the accelerometer is not in low power mode (10ms), switch it into that mode.
* **Lines 19-22:** If a low-g event is detected, set the global boolean to `true`. This will cause the alarm to go off until the boolean is set to false.
* **Lines 23-26:** If a high-g event is detected *and* the alarm is on, call the reset method to turn it back off.
* **Lines 27-30:** If the global boolean is true, call the alarm lights method.
* **Lines 33-43:** `resetAlarm`: set the global boolean back to false, then blink the green LED five times.
* **Lines 45-54:** `alarm`: blink the LED between red and blue three times (this method will be looped for as long as `alarmOn` is true).

## Other Functions Explained

A `bool`, or boolean, is a binary value which can have only two values: 1 or 0, true or false. In this case, we are using a boolean to keep track of whether or not the alarm is currently active. If the alarm is not active (`alarmOn == false`), the program will not call the `alarm` procedure.

The `setAccelerometerRange` struct takes a number (2, 4, 8, or 16) to set the range of sensitivity on the Bean's accelerometer. For example, putting in 8 will result in a sensitivity of ±8g of force, thus readings from the accelerometer will not go past ±8g.

The Bean's accelerometer has several predefined motion events - actions triggered by specific types of movement. Currently-supported motion events can be found in the [Bean references](https://punchthrough.com/bean/reference), and include:

```
typedef enum AccelEventTypes 
{
    FLAT_EVENT = 0x80,
    ORIENT_EVENT = 0x40,
    SINGLE_TAP_EVENT = 0x20,
    DOUBLE_TAP_EVENT = 0x10,
    ANY_MOTION_EVENT = 0x04,
    HIGH_G_EVENT = 0x02,
    LOW_G_EVENT = 0x01
};
```

`enableMotionEvent` allows specific motion events to be listened for. When `LOW_G_EVENT` is enabled, the firmware will continually listen to the output of the accelerometer. When it detects a low-g event (such as freefall), a flag will be triggered, and will not be reset until the event is checked by another struct. `disableMotionEvent` can be used reciprocally to tell the firmware to stop listening to a specific event.

`checkMotionEvent` is used to see if the motion event(s) you've enabled have occured. If a motion event has occured, its flag will remain up until it is checked. Once checked, the flag will go down until the enabled event occurs again.

`accelRegisterRead` and `accelRegisterWrite` are both used to transfer data directly to and from the accelerometer's register. They can perform the same functions as every other accelerometer stuct, just at a lower level. For example, the following two lines perform the same task:

- `Bean.setAccelerometerPowerMode(VALUE_LOW_POWER_10MS);`

- `Bean.accelRegisterWrite(REG_POWER_MODE_X11, VALUE_LOW_POWER_10MS);`

The `loop` procedure built into the Arduino IDE loops endlessly, but there are other times in the program when we want to make our own loops. Some different types are `while`, `do while`, `for each`, and `for` loops. Typically `for` loops are used when you want something to happen a specific amount of times, which is why we used it to make the LED lights blink exactly 3 times before repeating.

## Conclusion

In this guide, you learned how to read data from Bean's accelerometer and use it to change the color of Bean's LED. If you read the Other Functions sections, you also learned how to use the more advanced functions of the accelerometer, such as setting the sensitivity and reading/writing directly to its register.

Here are some ideas for projects you could build with the accelerometer:

* Put Bean on a hanging wall painting and make the LED blink when the painting is perfectly level.
* Attach Bean to a skateboard and measure the acceleration when you kick off.
* Add a buzzer to Bean, hide it under papers on your desk, and sound an alarm when someone snoops around your stuff and moves Bean.
* Attach Bean to a bicycle or other vehicle to track its motion through 3D space

## Troubleshooting

{{> snip_troubleshooting}}
