---
title: Virtual Serial (Serial over GATT)
layout: basic.hbs
autotoc: true
---
---
title: Accelerometer
layout: basic.hbs
autotoc: true
---

## Introduction
Let's say I have a [push button](https://www.sparkfun.com/products/97) soldered onto the Bean. I want the computer to know that when I press the push button it should send a tweet. The first step into accomplishing this task is for the Bean to send data to the computer when the button is pressed.  How does the Bean communicate to the computer? 

There are many communication protocols. Regardless, in order for the Bean (or any device for that matter) to communicate to the computer, they must share a common communication protocol. The Bean and the computer need to agree on how the information will be organized and have an appropriate response to the request being made. For example, the data that is sent between both devices can have a header that signifies the start of a message, a body, and a footer that signifies the end of a message.

In this guide, we will focus on Serial Communication and how to use the Serial Monitor on the Arduino IDE to send and receive data from the Bean. 
## Setup

Please make sure you're familiar with the following before starting this guide:

* [Getting Started](#)

### Software

* Bean Loader ([install guides](#))

### Hardware

* LightBlue Bean
* Mobile or Computer device


## Differences between Serial and Parallel Communications

Serial and parallel communication focus on data bits being sent from a hardware device, such as the Bean, to the computer. Serial differs from parallel communication in the way they transfer the data bits to the computer.  Serial communication transfers the data bits synchronously, where only one bit can be communicated at a time.  This is in contrast to Parallel Communication, where multiple bits can be communicated at a time. 

The consequence of using serial communication as opposed to parallel communication is time.  Serial communication is a slower process with respect to parallel commuication.  However, the advantages of using serial communication is that it requires fewer interconnecting wires. This leads to a device having more space and better isolation between the pins.  Also, crosstalk between signals is not likely to occur, where this is more of an issue for parallel communication. 

### Differences between Beacons and GPS geolocation:
