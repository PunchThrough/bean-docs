---
title: Technical Specs
layout: basic.hbs
autotoc: true
order: 2
---

## System Architecture

**It just works.** The Bean was designed to provide a magical experience where you don't have to know anything about Bluetooth to use it. However, if you're interested in digging deeper, some architectural details are provided below. 

{{{img_rel this 'bean-block-diagram-guide.png' 'Bean system architecture'}}}

The advantages of this system design are: 
* The accelerometer and RGB LED don't take up any pins or peripherals of the Atmega. 
* Safe from 'bricking'. You can't get the Bean into a state where you can't reprogram it, since the BLE stack is handled outside the Atmega.
* Compiled Arduino Sketches are small. 
* You can access the Bean over BLE independently of the Arduino code. For example, an iOS app can access the Accelerometer directy without requiring any Arduino code.

## Bean and Bean+ Features

Bean and Bean+ are two different flavors of the same software, the [LightBlue Platform](http://punchthrough.com/platform). Here's what they have in common:

{{{img_rel this 'bean-and-plus-comparison.jpg' 'Bean and Bean+ feature comparison'}}}

__Program Wirelessly:__ No more digging your board out of your project enclosure: Bean is programmed wirelessly over Bluetooth Low Energy!

__Cross-Platform:__ Compile and upload sketches with Bean Loader for Windows, OS X, iOS, and Android. Bean also has SDKs for iOS, OS X, and Android for native app development.

__Arduino-Compatible:__ Bean Loader integrates with the Arduino IDE for Windows and OS X. Your favorite Arduino libraries work on Bean too.

__Built-In Peripherals:__ Both Bean and Bean+ come with an accelerometer, a temperature sensor, and an RGB LED. Start building right away—no soldering necessary.

## Bean Specs

{{{img_rel this 'bean-diagram.jpg' 'Bean features' '84%'}}}

__Built-In Protoboard:__ Making something with just a couple components? Solder and wire them right on the Bean's prototyping area.

__Small Size:__ The perfect size for tiny projects, Bean is really small! Need more space? It's totally OK to cut off the protoboard.

__Coin Cell Battery:__ Bean ships with a coin cell battery included. You can start hacking before you even take it out of the box.

__Microcontroller Specifications:__

Bean user code runs on the Atmega328p microcontroller. This is the same part that is common to most original Arduinos and provides the most compatibility with example code. 

Atmega328p Microcontroller
* 8 bit CPU @ 8MHz 
* 32KB Flash memory
* 2KB SRAM
* 8 accessible I/O (2 Analog)
* 10 bit ADC
* SPI, i2c, PWM peripherals

__Electrical Specifications:__

The Bean is powered directly from the onboard CR2032 coin-cell battery. 
* Recommended Operating Voltage Range: 2.6 to 3.6V. 
* Maximum Operating Voltage Range: 2.0 to 3.6V. *Below 2.6V the Blue and Green LEDs may not turn on.*
* Operating Temperature Range: -40c to 85c


## Bean+ Specs

{{{img_rel this 'bean-plus-diagram.jpg' 'Bean+ features'}}}

__Rechargeable LiPo:__ It's easy to keep Bean+ going. The included lithium polymer battery charges via Micro USB, so power is never out of reach.

__Grove Connectors:__ Just connecting a couple of components? Bean+ supports the solderless Grove connector for easy and quick component connection.

__Addon Board Support:__ We make addon boards to add more functionality to your Bean+. If you want to connect your own parts, you can assemble and plug in your custom addon board.

__Dual-Voltage Operation:__ Bean+ operates at a user-selectable 3.3V or 5V. No more adding logic level converters just to talk to your fancy graphic LCD.


__Microcontroller Specifications:__

Bean+ user code runs on the Atmega328p microcontroller. This is the same part that is common to most original Arduinos and provides the most compatibility for example code available on the internet. 

Atmega328p Microcontroller
* 8 bit CPU @ 8MHz 
* 32KB Flash memory
* 2KB SRAM
* 8 accessible I/O (2 Analog)
* 10 bit ADC
* SPI, i2c, PWM peripherals

__Electrical Specifications:__

The Bean+ can be powered from the included rechargeable battery or directly from a USB cable. In addition it offers 2 operating voltages, 5V and 3.3V. 
* Operating Voltage Range (Battery): TBA
* Operating Voltage Range (USB): TBA
* Maximum Current @5V: TBA
* Maximum Current @3.3V: TBA
* Operating Temperature Range: -40c to 85c

__RF Specifications:__
* Maximum output power: 8dBm 
* Maximum Range: 200m
* Typical Range: 150m
