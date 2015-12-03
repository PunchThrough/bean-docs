---
title: Technical Specs
layout: basic.hbs
autotoc: true
order: 2
---

## System Architecture

**It just works.** The Bean was designed to provide a magical experience where you don't have to know anything about Bluetooth to use it. However, if you're interested in digging deeper, here's a diagram detailing Bean's architecture:

{{{img_rel this 'bean-block-diagram-guide.png' 'Bean system architecture'}}}

The advantages of this system design are:
* **More pins for the user:** The accelerometer and RGB LED don't take up any pins or peripherals of the ATmega. 
* **Impossible to brick:** Since the CC2540 handles the BLE stack instead of the ATmega, you can't get the Bean into a state where it's impossible to reprogram.
* **Bean works without an Arduino sketch:** You can access peripherals connected to the CC2540 independently of any Arduino code. For example, an iOS app can access the accelerometer directly without requiring the user to program a sketch that reads the accelerometer.

## Bean and Bean+

Bean and Bean+ are two different flavors of the same software, the [LightBlue Platform](http://punchthrough.com/platform). Here's what they have in common:

{{{img_rel this 'bean-and-plus-comparison.jpg' 'Bean and Bean+ feature comparison'}}}

### Features

__Program Wirelessly:__ No more digging your board out of your project enclosure: Bean is programmed wirelessly over Bluetooth Low Energy!

__Cross-Platform:__ Compile and upload sketches with Bean Loader for Windows, OS X, iOS, and Android. Bean also has SDKs for iOS, OS X, and Android for native app development.

__Arduino-Compatible:__ Bean Loader integrates with the Arduino IDE for Windows and OS X. Your favorite Arduino libraries work on Bean too.

__Built-In Peripherals:__ Both Bean and Bean+ come with an accelerometer, a temperature sensor, and an RGB LED. Start building right away—no soldering necessary.

### Microcontroller Specifications

Arduino sketches run on the ATmega328p microcontroller. This is the same part that is common to most original Arduinos and provides the most compatibility with example code.

Bean and Bean+ both use the ATmega328p. Each board has a slightly different configuration. Here's what the two have in common:

* 8-bit CPU
* 32KB Flash memory
* 2KB SRAM
* 10-bit ADC
* 1 SPI port
* 1 I²C port

## Bean

{{{img_rel this 'bean-diagram.jpg' 'Bean features' '84%'}}}

### Features

__Built-In Protoboard:__ Making something with just a couple components? Solder and wire them right on the Bean's prototyping area.

__Small Size:__ The perfect size for tiny projects, Bean is really small! Need more space? It's totally OK to cut off the protoboard.

__Coin Cell Battery:__ Bean ships with a coin cell battery included. You can start hacking before you even take it out of the box.

### Microcontroller Specifications

* 8 MHz operating frequency
* 8 accessible I/O pins
* 2 analog input pins
* 6 PWM pins

### Electrical Specifications

Bean is powered directly from the onboard CR2032 coin cell battery. 
* Recommended Operating Voltage Range: 2.6 to 3.6V
* Maximum Operating Voltage Range: 2.0 to 3.6V. *Note: Below 2.6V, the blue and green LEDs may not turn on.*
* Operating Temperature Range: -40°C to 85°C

## Bean+

{{{img_rel this 'bean-plus-diagram.jpg' 'Bean+ features'}}}

### Features

__Rechargeable LiPo:__ It's easy to keep Bean+ going. The included lithium polymer battery charges via Micro USB, so power is never out of reach.

__Grove Connectors:__ Just connecting a couple of components? Bean+ has two built-in Grove ports for easy and quick component connection.

__Addon Board Support:__ We make addon boards to add more functionality to your Bean+. If you want to connect your own parts, you can assemble and plug in your custom addon board.

__Dual-Voltage Operation:__ Bean+ operates at a user-selectable 3.3V or 5V. No more adding logic level converters just to talk to your fancy graphic LCD.

### Microcontroller Specifications

* 16 MHz operating frequency
* 16 accessible I/O pins
* 6 analog input pins
* 4 PWM pins

### Electrical Specifications

The Bean+ can be powered from the included rechargeable battery or directly from a USB cable. It supports 2 operating voltages: 5V and 3.3V.

* Operating Voltage Range (Battery): TBA
* Operating Voltage Range (USB): TBA
* Maximum Current @ 5V: TBA
* Maximum Current @ 3.3V: TBA
* Operating Temperature Range: -40°C to 85°C

### RF Specifications

* Maximum Output Power: 8dBm
* Maximum Range: 200 m
* Typical Range: 150 m
