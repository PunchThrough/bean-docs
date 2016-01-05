---
title: Technical Specs
layout: basic.hbs
autotoc: true
order: 2
---

## System Architecture

**It just works.** Bean was designed to provide a magical experience where you don't have to know anything about Bluetooth to use it. However, if you're interested in digging deeper, here's a diagram detailing Bean's architecture:

{{{img_rel this 'bean-block-diagram.png' 'Bean system architecture'}}}

The advantages of this system design are:
* **More pins for the user:** The accelerometer and RGB LED don't take up any pins or peripherals of the ATmega.
* **Impossible to brick:** Since the CC2540 handles the BLE stack instead of the ATmega, you can't get Bean into a state where it's impossible to reprogram.
* **Bean works without an Arduino sketch:** You can access peripherals connected to the CC2540 independently of any Arduino code. For example, an iOS app can access the accelerometer directly without requiring the user to program a sketch that reads the accelerometer.

## LightBlue Bean

{{{img_rel this 'bean-diagram.jpg' 'Bean features' '80%'}}}

### Features

* __Built-In Protoboard:__ Making something with just a couple components? Solder and wire them right on Bean's prototyping area.
* __Small Size:__ The perfect size for tiny projects, Bean is really small! Need more space? It's totally OK to cut off the protoboard.
* __Coin Cell Battery:__ Bean ships with a coin cell battery included. You can start hacking before you even take it out of the box.
* __Program Wirelessly:__ No more digging your board out of your project enclosure: Bean is programmed wirelessly over Bluetooth Low Energy!
* __Cross-Platform:__ Compile and upload sketches with Bean Loader for Windows, OS X, iOS, and Android. Bean also has SDKs for iOS, OS X, and Android for native app development.
* __Arduino-Compatible:__ Bean Loader integrates with the Arduino IDE for Windows and OS X. Your favorite Arduino libraries work on Bean too.
* __Built-In Peripherals:__ Bean comes with an accelerometer, a temperature sensor, and an RGB LED. Start building right away—no soldering necessary.

### Microcontroller Specifications

Arduino sketches run on the ATmega328p microcontroller. This is the same part that is common to most original Arduinos and provides the most compatibility with example code.

* ATmega328p microcontroller @ 8 MHz
* 32KB Flash memory, 2KB SRAM
* 8 GPIO pins
* 2 analog input pins on a 10-bit ADC
* 4 pins with PWM support
* 1 SPI port
* 1 I²C port

{{{img_rel this 'bean-ard-diagram-flush.png' 'Bean Arduino Reference' '60%'}}}

### Electrical Specifications

Bean is powered directly from the onboard CR2032 coin cell battery.

* Recommended Operating Voltage Range: 2.6 to 3.6V
* Maximum Operating Voltage Range: 2.0 to 3.6V.  
  *Note: Below 2.6V, the blue and green LEDs may not turn on.*
* Operating Temperature Range: -40°C to 85°C

