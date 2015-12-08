---
title: Bean-Tweet
layout: basic.hbs
autotoc: true
---

## Introduction
Lets say we want to tweet the Bean's temperature. We would have to go through the process of building a server and transferring the Bean's information to it, either through an iOS application or a rasberry pi. Node-RED is used to connect the Bean to the internet that mitigates the need of building a server. In this tutorial, I will guide you in how to tweet the Bean's temperature through Node-RED. 

## Setup

Please make sure you're familiar with the following before starting this guide:

### Software
* Bean Loader ([install guides](#))
* Node-RED installation ([install Node-RED](#))

### Hardware

* LightBlue Bean
* Computer device

## Program the Bean
This tutorial assumes you have completed the [Getting Started guide](#). It covers tasks such as connecting to and programming the Bean with the Bean Loader.

Connect to your Bean and upload this Arduino sketch:
```
static int8_t temp = 0;

// the setup routine runs once when you press reset:
void setup() 
{
  // initialize serial communication
  Serial.begin(); 
}

void loop()
{ 
  int8_t newTemp = Bean.getTemperature();
 
  if ( newTemp != temp )
  {
    temp = newTemp;
   
    Serial.print(temp);
    Serial.print("\n");
  }

  Bean.sleep(10000);
}

```
Here's what the code does:

* `Line 1` esentially declares that temp is an 8-bit long integer. 
* `Line 4` is the [setup function](https://www.arduino.cc/en/Reference/Setup). This function is excuted only once during the duration of the program.
* `Line 10` is the [loop function](https://www.arduino.cc/en/Reference/Loop).  This function is excuted continuously until the Bean is either turned off or unprogrammed.
* `Line 12` reads the temperature value. Checkout the ([Bean Arduino reference guide](http://legacy.punchthrough.com/bean/the-arduino-reference/))
* `Lines 14` checks to make sure that the last value of temperature is not the current value.  This prevents the same temperature information from being reported.
* `Line 16`if the two values are not the same, temp is reassigned. 
* `Line 18` sends the temperature information through Serial.
* `Line 19`sends a blank line to Serial. When Node-RED is reading the Bean's value, the "\n" will be the delimiter.  This allows Node-RED to separate the messages.
* `Line 22`sets the Bean sleep for 10 seconds.  This prevents twitter from being bombarded with the Bean's tweets. 

* Executes loop() again. 


