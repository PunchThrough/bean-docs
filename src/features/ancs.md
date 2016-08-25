---
title: ANCS
layout: basic.hbs
autotoc: true
---

## Introduction

Beans have an advertising mode called **ANCS** (Apple Notification Center Service), which allows them to interface with compatible iOS devices (iPhone 4S and later). The purpose of ANCS is to allow a simplistic and universal way to observe iOS notifications from Bluetooth devices. More detailed information about ANCS in general can be found [here](https://developer.apple.com/library/ios/documentation/CoreBluetooth/Reference/AppleNotificationCenterServiceSpecification).

{{{img_rel this 'ancs-example.png' "Example of ANCS notifications on an iPhone" '50%' }}}

This guide will show you how to use ANCS functions in your Bean sketches.

## Before You Begin

{{> snip_req_getting_started}}

You also need to understand how to use Virtual Serial to read data from Bean. If you haven't used this yet, [check out the Virtual Serial guide](../virtual-serial/) before continuing.

### Software

* {{> snip_req_bean_loader}}
* Arduino IDE 1.6.8 ([available here](https://www.arduino.cc/en/Main/OldSoftwareReleases))
* [Bean Console app](https://itunes.apple.com/us/app/bean-console/id982751969?mt=8) (to see serial output)

### Hardware

* {{> snip_req_bean}}
* iOS device

## Program Your Bean

Upload the following sketch to your Bean. This sketch allows you to use the Bean to detect incoming calls on your iPhone, as well as read ANCS notifications from the [Bean Console app](https://itunes.apple.com/us/app/bean-console/id982751969?mt=8). After Programming the Bean, pair it with the app to see the serial messages.

```cpp
AncsNotification notifications[8];

bool callHappened = false;

void setup() {
  // Serial port is initialized automatically; we don't have to do anything
  BeanAncs.enable();
  Bean.enableMotionEvent(HIGH_G_EVENT);
}

void loop() {
  int msgAvail = BeanAncs.notificationsAvailable();

  if (callHappened) {
    while (!Bean.checkMotionEvent(HIGH_G_EVENT)) {
      incomingCall();
    }
    callHappened = false;
  }
  
  if (msgAvail) {
    Bean.setLedRed(30);

    BeanAncs.getNotificationHeaders(notifications, 8);

    for (int i = 0; i < msgAvail; i++) {
      Serial.print("cat:");
      Serial.println(notifications[i].catID);
      Serial.print("flg:");
      Serial.println(notifications[i].flags);
      Serial.print("evt:");
      Serial.println(notifications[i].eventID);
      Serial.print("cnt:");
      Serial.println(notifications[i].catCount);
      Serial.print("id: ");
      Serial.println(notifications[i].notiUID);
      
      if (notifications[i].catID == 1 || notifications[i].catID == 2) {
        callHappened = true;
      }
      
      char data[64] = {0};
      int len = BeanAncs.getNotificationAttributes(
        NOTI_ATTR_ID_MESSAGE,
        notifications[i].notiUID,
        39,
        (uint8_t *)data,
        5000);

      Serial.print("l: ");
      Serial.print(len);
      Serial.print(" ");
      for (int j = 0; j < len; j++) {
        Serial.print(data[j]);
      }
      Serial.println();
      delay(3000);
    }
    Bean.setLedRed(0);
  }
}

void incomingCall() {
  Bean.setLed(100, 0, 0);
  delay(150);
  Bean.setLed(0, 100, 0);
  delay(150);
  Bean.setLed(0, 0, 100);
  delay(150);
  Bean.setLed(0, 0, 0);
}
```

## Check iOS Notifications

Now that your Bean is programmed, disconnect it from the Bean Loader and connect to it using your iPhone's normal Bluetooth settings. When the Bean asks to pair, tap *yes*. Now try having someone call your phone. After a moment, the Bean will start flashing its LEDs as so:

{{{video_rel this 'incoming-call.mp4'}}}

The lights will stop flashing when you give the Bean a shake:

{{{video_rel this 'shake-off.mp4'}}}

You can also use the [Bean Console](https://itunes.apple.com/us/app/bean-console/id982751969?mt=8) app to view the serial output of your Bean and see exactly which ANCS notifications are coming through:

{{{img_rel this 'bean-console.png' "Example of the Bean Console app on an iPhone"}}}

## Explanation

* **Line 1**: Initialize `notifications` as an array of type `AncsNotifications`, which is a wrapper for the five main pieces of ANCS data, which are described below.
* **Line 3**: Initialize our incoming call trigger, which will act as a persistent alarm.
* **Line 7**: Enable the ANCS profile so the Bean can connect to a compatible Apple device.
* **Line 8**: Enable the high-g motion event so the accelerometer will be listening for it.
* **Line 12**: Set `msgAvail` to be the number of messages currently in the ANCS buffer (there is a maximum of 8 messages at once).
* **Lines 14-19**: If the `callHappened` boolean is true, check to see if a high-g motion event has occurred. If a the boolean is true but no high-g event has occurred, call the `incomingCall()` method to flash the lights.
* **Line 21**: If at least one message is available, do lines 22-60.
* **Line 22**: Set the LED to red.
* **Line 24**: Get the notification headers from the ANCS buffer and store them in the `notifications` array from earlier.
* **Line 26**: For each available message, repeat lines 26-58.
* **Lines 27-36**: Print out the five main ANCS characteristics, which are described below.
* **Lines 38-40**: If the ANCS message category is equal to 1, it means a call is incoming. If it is equal to 2, it means there was a missed call recently. An appendix of ANCS categories can be found [here](https://developer.apple.com/library/ios/documentation/CoreBluetooth/Reference/AppleNotificationCenterServiceSpecification/Appendix/Appendix.html#//apple_ref/doc/uid/TP40013460-CH3-SW1).
* **Lines 42-48**: Create an empty character array `data`, then fill it with the characters from the ANCS message.
* **Lines 50-52**: Print the length of the ANCS message (limited to 39 characters).
* **Lines 53-56**: Print out each character of the `data` array, which will come out as a short sentence.
* **Line 57**: Delay for five seconds before reading next message.
* **Line 59**: Turn off the red LED.
* **Lines 63-71**: Procedure `incomingCall` sets the red, green, and then blue LEDs in quick succession before turning them off.

### Functions and Data Types

`BeanAncs.enable` enables the ANCS service profile. You can also check to see if ANCS is already enabled by calling the `BeanAncs.isEnabled` function.

`AncsNotifications` is a struct of type `ANCS_SOURCE_MSG_T`, which is 8 bytes of information: `eventID` *(1 byte)*, `flags` *(1 byte)*, `catID` *(1 byte)*, `catCount` *(1 byte)*, and `notiUID` *(4 bytes)*. This is the data retrieved when calling the `getNotificationHeaders` function.

`notificationsAvailable` returns the number of notifications in the ANCS buffer, which is between 0 and 8 packets. Every message in the buffer after 8 is lost, and the buffer is cleared when read.

`getNotificationHeaders` returns the current data in the type `AncsNotifications` mentioned above.

`NOTI_ATTR_ID_MESSAGE` is just a value defined in the firmware as part of the enumerated type `NOTI_ATTR_ID_T`.

`getNotificationAttributes` can be used to request details about a particular notification.  It can only be used to access one type of notification at a time and will block the thread until it receives a message.

`Serial.available` checks to see if there is any incoming data in the serial receive buffer. If there is, the function will return the number of bytes (characters) currently in the buffer, which holds a maximum of 64 bytes.

`Serial.read` returns one byte from the serial receive buffer, then removes the byte from the buffer.

`atoi` is a core Arduino function which stands for and is used to convert *ASCII to integer*. Similar functions exist, such as `atof`, which converts to a float and `itoa` which converts an integer into ASCII. ASCII (American Standard Code for Information Interchange) is used to encode normal US alphanumeric characters as well as special characters, with a max table size of 128 (7-bits). This is why the `char` data type is typically 1 byte long. Other encoding schemes exist, such as UTF-8 (Unicode), which is much less compact and stores characters in 4 bytes.

## Conclusion

In this guide, you learned how to use the ANCS profile to monitor iOS notifications in the Bean Console app. You can use this to track certain notifications on your phone, or to alert you when a specific notification is triggered.

## Troubleshooting

{{> snip_troubleshooting}}