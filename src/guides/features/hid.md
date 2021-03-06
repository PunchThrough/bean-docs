---
title: HID
layout: basic.hbs
autotoc: true
---

## Introduction

HID (Human Interface Device) is a bi-directional communication protocol found in many devices: computer mice, keyboards, game controllers, joysticks, and more. Beans can enable HID mode which allows them to communicate and control HID host devices.. HID data can be broadcasted passively, such as with magnetic security fobs and key cards for user identification, and in product shipments to account for lost, missing, or expired goods.

The HID protocol has two entities: **device** and **host**; the device is the entity that interacts directly with the user. When the user interacts with the device, HID commands are sent to the host (mostly commonly a PC), which acts upon the commands and is then in turn able to send data back to the device, to the user.

This guide will show you how to use HID mode in your Bean sketches for use with HID-compliant devices.

## Before You Begin

{{> snip_req_getting_started}}

### Software

* {{> snip_req_bean_loader}}
* Bean Loader ([install guides](../../getting-started/intro/#next-steps))
* Arduino IDE 1.6.8 ([available here](https://www.arduino.cc/en/Main/OldSoftwareReleases))

### Hardware

* {{> snip_req_bean}}
* Computer that supports Bluetooth Low Energy HID

## Program Your Bean

Upload the following sketch to your Bean. This sketch will enable Bean to act like a mouse and control the position of your cursor via changes in position sensed by the accelerometer.

After uploading the sketch, you will need to turn the Bean off, then on again, and then connect to it as a Bluetooth device in your normal computer Bluetooth settings.

When you want to connect to the Bean with Bean Loader to upload a new sketch, you will need to go to your computer's Bluetooth settings and both disconnect and un-pair the Bean. This is because BLE HID requires pairing, and cannot connect to the Bean Loader while being used as a HID peripheral.

```cpp
void setup() {
  BeanHid.enable();
}

void loop() {
  AccelerationReading accel = Bean.getAcceleration();

  int16_t x = accel.xAxis;
  int16_t y = accel.yAxis;
  int16_t z = accel.zAxis;

  if (abs(x) < 20) {
    x = 0;
  }
  if (abs(y) < 20) {
    y = 0;
  }

  int16_t mousex = map(x, -60, 60, -20, 20);
  int16_t mousey = map(y, -60, 60, 20, -20);

  BeanHid.moveMouse(mousex, mousey);
}
```

## Move Bean Around

Congratulations! You can now use your Bean to control your computer cursor.

{{{video_rel this 'hid-cursor-control.mp4' true}}}

## Explanation

* **Line 2**: Enable HID on the Bean
* **Line 6**: Get the acceleration reading from the accelerometer and assign it to `accel`
* **Lines 8-10**: Assign the accelerometer values to their respective axes as single numbers
* **Lines 12-17**: Create a deadzone to be the neutral area where no movement will occur (when the Bean is flat)
* **Lines 19-20**: Map the accelerometer min and max to ??20 pixels, so the cursor will not move more than 20 pixels in any direction at a time
* **Line 22**: Call the procedure to move the mouse based on the distance we calculated above

### Functions

`enable` is a simple void that takes no arguments, returns nothing, and enables HID on the Bean. You can check if HID is enabled by calling the `isEnabled` method.

`getAcceleration` returns the three positional axes as an `AccelerationReading` data type.

The `abs` function returns the absolute value of the number passed in.

`map` takes in five arguments: the number to convert, the smallest possible input value, the greatest possible input value, the smallest possible output value, and the greatest possible output value. It then uses those values to convert the input value to conform to the output range.

The `moveMouse` struct moves the mouse x and y distance in pixels. Negative x values will result in the cursor being moved left, negative y values will result in the cursor being moved down, and then right and up for positive values, respectively.

## Conclusion

In this guide, you learned how to control your computer or other HID device using HID functions enabled on the Bean.

## Troubleshooting

{{> snip_troubleshooting}}
