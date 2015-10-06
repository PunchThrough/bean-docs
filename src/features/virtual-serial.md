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

In this guide, we will focus on serial communication and how to use the Serial Monitor on the Arduino IDE to send and receive data from the Bean. 
## Setup

Please make sure you're familiar with the following before starting this guide:

* [Getting Started](#)

### Software

* Bean Loader ([install guides](#))

### Hardware

* LightBlue Bean
* Mobile or Computer device

## Differences between Serial and Parallel Communication 

There are many types of communication protocols, however, they can generally be split up to two different categories:  serial or parallel. Specifically, serial and parallel communication focus on data bits (0's and 1's) being sent from a hardware device, such as a microcontroller to the computer. Serial differs from parallel communication in the way they transfer the data bits to the computer.  Serial transfers the data bits, where only one bit can be communicated at a time, sequentially.  This is in contrast to parallel communication, where multiple bits can be transmitted at a time. 

The consequence of using serial communication as opposed to parallel communication is time.  Serial communication is a slower process with respect to parallel commuication.  However, the advantages of using serial communication is that it requires fewer interconnecting wires. This leads to a device having more space and better isolation between the pins.  Also, crosstalk between signals is not likely to occur, where this is more of an issue for parallel communication. 

## Data Can Flow in Three Different Ways:

Once the a microcontroller and the computer communicate serially through a specific protocol, data can simultaneously flow in three possible ways:
* Simple duplex: Data flows in a unidirectional manner. A good example is a television or radio. The consequence of simple duplex is that an error signal can't be sent back to the transmitter end, such as the radio.
* Half duplex: Data can flow bidirectinally, however, it is unidirectional at any given moment of time (unlike full duplex).  A good example is a talk-back radio. One person talks on the radio and then says 'over'.  The 'over' signifies the other person on the other end to talk. Both people can't talk at the same time. Unlike simple duplex, if data arrives corrupted, the receiver can ask the sender to retransmit the data. 
* Full duplex: Data can flow simultaneously in a bidirectinal manner at any moment of time. A good example is when two people are talking on the phone. Both parties can listen and talk at the same time.

## Synchronus and Asynchronus Serial Communication: 

Now that we understand the differences between serial and parallel communication, we're going to take a closer look at the different serial communication protocols. Serial communication can have two different types of protocols: synchronus and asynchronus. 
Synchronus Serial Communication: 
