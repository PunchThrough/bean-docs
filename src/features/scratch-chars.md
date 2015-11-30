---
title: Scratch Characteristics
layout: basic.hbs
autotoc: true
---

## Introduction

There are 2 ways to send user data over Bluetooth. One involves using Scratch Characteristics, which are explained in this page. Scratch characteristics offer a method of communication that is closer to the structure of Bluetooth Low Energy, and are viewable as part of the Bean's Bluetooth profile. 

The other method is BeanSerial, which is the preferred method for sending large amounts of data or integrating with the LightBlue SDKs or the Sandbox in LightBlue Explorer. 

## When to use Scratch Characteristics 

Scratch Characteristics are preferred when:
* You're not building your own app and just want to send some small data (<20 Bytes) back from the Bean.
* You're using LightBlue Explorer or another general purpose Bluetooth Low Energy tool.

**You probably don't want to use scratch characteristics when you're sending more than 20 Bytes.** A BLE characteristic has a size limit, and sending any more than this amount requires you to split your data into chunks. BeanSerial does this for you and just works. If you're sending more than 20 bytes, you probably want to use BeanSerial.


## Example

This tutorial assumes you have completed the [Getting Started guide](#). It covers tasks such as connecting to and programming the Bean with the Bean Loader. 

Connect to your Bean and upload this Arduino sketch. This example will put the current temperature in scratch characteristic 1. 

```
static int8_t temp = 0;
void setup()
{
}

void loop()
{
	bool notify = false;

	int8_t newTemp = Bean.getTemperature();

	if ( newTemp != temp )
	{
		temp = newTemp;
		Bean.setScratchNumber(1, (long)temp);
	}

	Bean.sleep(1000);  
}
```

Now open LightBlue Explorer in iOS and choose the "Options" button on the top of the screen. Pick the service view, then scroll down to "Scratch1" and select it. Tap "Listen for Notifications" and your temperature data will be received there.



