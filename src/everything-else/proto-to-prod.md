---
title: Prototype to Production
layout: basic.hbs
autotoc: true
order: 3
---

## Introduction

Are you prototyping with the Bean and looking to build a production-optimized design?

Bean is built upon the LightBlue Platform. The core components of the Bean are the Bluetooth SoC and microcontroller. You can build these components into your own product for a production-optimized design.

The LightBlue Platform supports many different Bluetooth SoCs and microcontrollers. Bean is based on our LBM313 module and an ATmega328p microcontroller, but you can also replace them with other parts we support.

## Hardware

Bean's heart is the LBM313 Bluetooth module and the ATmega328p microcontroller. Once the LBM313 has Bean firmware loaded, you can design these parts into your project to implement Bean functionality.

{{{img_rel this 'bean-proto-to-prod.jpg' 'Core components' '84%'}}}

For a reference of how Bean's components are connected, check out our open-source [hardware files]((../hardware-files).

The LightBlue Platform is hardware agnostic and we strive to support a variety of Bluetooth components. We currently support TI CC254x and Nordic nRF51822 components. You can use certified modules or go chip-down.

## Firmware

You can buy LBM313 modules pre-programmed with the Bean firmware [at our store](http://punchthrough.myshopify.com/collections/all/products/lbm313-with-bean-firmware). Alternatively, if you're using another module or have a chip-down design, [contact us](mailto:info@punchthrough.com) to get a copy of our firmware binaries.

## Single Chip Design

If your design requires the smallest form factor and lowest cost, you can use the Bluetooth SoC on its own. [Contact us](mailto:info@punchthrough.com) and we can help you build your project.
