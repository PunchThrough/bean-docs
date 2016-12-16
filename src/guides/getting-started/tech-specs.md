---
title: Technical Specs
layout: basic.hbs
autotoc: true
order: 2
---

## System Architecture

**It just works.** Bean and Bean+ were designed to provide a magical experience where you don't have to know anything about Bluetooth to use it. However, if you're interested in digging deeper, here are diagrams detailing their architectures:

### Bean

{{{img_rel this 'bean-block-diagram.png' 'Bean system architecture'}}}

### Bean+

{{{img_rel this 'bean+-block-diagram.png' 'Bean system architecture'}}}

The advantages of this system design are:

* **More pins for the user:** The accelerometer and RGB LED don't take up any pins or peripherals of the ATmega.
* **Impossible to brick:** Since the CC2540 handles the BLE stack instead of the ATmega, you can't get Bean into a state where it's impossible to reprogram.
* **Bean works without an Arduino sketch:** You can access peripherals connected to the CC2540 independently of any Arduino code. For example, an iOS app can access the accelerometer directly without requiring the user to program a sketch that reads the accelerometer.

## LightBlue Bean and Bean+

{{{img_rel this 'bean-diagram.jpg' 'Bean features' '80%'}}}

### Features

* __Built-In Protoboard:__ Making something with just a couple components? Solder and wire them right on Bean's prototyping area.
* __Small Size:__ The perfect size for tiny projects, Bean is really small! Need more space? It's totally OK to cut off the protoboard.
* __Coin Cell Battery:__ Bean ships with a coin cell battery included. You can start hacking before you even take it out of the box.
* __Program Wirelessly:__ No more digging your board out of your project enclosure: Bean is programmed wirelessly over Bluetooth Low Energy!
* __Cross-Platform:__ Compile and upload sketches with Bean Loader for Windows, OS X, iOS, and Android. Bean also has SDKs for iOS, OS X, and Android for native app development.
* __Arduino-Compatible:__ Bean Loader integrates with the Arduino IDE for Windows and OS X. Your favorite Arduino libraries work on Bean too.
* __Built-In Peripherals:__ Bean comes with an accelerometer, a temperature sensor, and an RGB LED. Start building right away—no soldering necessary.

### Bean+ Additional Features

*Bean+ has all the features of the original Bean, plus these extras*

* __Rechargeable LiPo:__ It's easy to keep Bean+ going. The included lithium polymer battery charges via Micro USB, so power is never out of reach.

* __Boosted Range:__ With a new RF amplifier, the Bean+ can communicate with other Bean+'s from up to 400 meters (1,300 ft) under ideal conditions, or 250 meters (820 ft) to your smartphone. 

* __Grove Connectors:__ Just connecting a couple of components? Bean+ has two built-in Grove ports for easy and quick component connection.

* __Addon Board Support:__ We make addon boards to add more functionality to your Bean+. If you want to connect your own parts, you can assemble and plug in your custom addon board.

* __Dual-Voltage Operation:__ Bean+ operates at a user-selectable 3.3V or 5V. No more adding logic level converters just to talk to your fancy graphic LCD.

### Microcontroller Specifications

Arduino sketches run on the ATmega328p microcontroller. This is the same part that is common to most original Arduinos and provides the most compatibility with example code.

#### Bean

* ATmega328p microcontroller @ 8 MHz
* 32KB Flash memory, 2KB SRAM
* 8 GPIO pins
* 2 analog input pins on a 10-bit ADC
* 4 pins with PWM support
* 1 SPI port
* 1 I²C port

{{{img_rel this 'bean-ard-diagram-flush.png' 'Bean Arduino Reference' '60%'}}}

#### Bean+

* ATmega328p microcontroller @ 8 MHz
* 32KB Flash memory, 2KB SRAM
* 16 accessible I/O pins
* 6 analog input pins on a 10-bit ADC
* 4 pins with PWM support
* 1 SPI port
* 1 I²C port

{{{img_rel this 'bean+-ard-diagram-flush.png' 'Bean Arduino Reference' '40%'}}}

### Electrical Specifications

**Bean** is powered directly from the onboard CR2032 coin cell battery.

* Recommended Operating Voltage Range: 2.6 to 3.6V
* Maximum Operating Voltage Range: 2.0 to 3.6V.  
  *Note: Below 2.6V, the blue and green LEDs may not turn on.*
* Operating Temperature Range:  -40°C to 85°C 

**Bean+** can be powered from the included rechargeable battery or directly from a USB cable. It supports 2 operating voltages: 5V and 3.3V.

* Battery Specifications 3.7V 600maH LiPo Rechargeable Battery
* Operating Voltage Range (USB): 5V +/- 10%
* Maximum Current @ 5V: .6A
* Maximum Current @ 3.3V: 1A
* Operating Temperature Range:
	- Charging: 0°C to 45°C
	- Discharging: -20C to 45C

### Bean+ RF Specifications

* Maximum Output Power: 8dBm
* Maximum Range(Bean+ to Bean+): 400 m
* Maximum Range(Bean+ to smartphone): 250 m
