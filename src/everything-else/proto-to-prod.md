---
title: Prototype to Production
layout: basic.hbs
autotoc: true
---

## Introduction

Are you prototyping with the Bean, but looking to build a production optimized design? 

The Bean is built upon the LightBlue Platform. The core components of the Bean are the Bluetooth SoC and microcontroller. You can redesign these components into your own product for a more production optimized design and cost.

The Platform supports multiple Bluetooth SoCs and microcontrollers. The Bean is based on our LBM313 module and an Atmega328p microcontroller, but you can also replace them with other parts we support. 

## Hardware

The core of the Bean is the LBM313 Bluetooth Module and the Atmega328p microcontroller. You can design these 2 parts into your project, and along with the Bean firmware, it will implement Bean features. 

{{{img_rel this 'bean-proto-to-prod.jpg' 'Core components' '84%'}}}

For a reference of how to hook up the parts, you can refer to the Bean's open source [Hardware Files]((../hardware-files). 

The LightBlue Platform is hardware agnostic, and we are striving to support a variety of Bluetooth components. Currently we support both TI CC254x and Nordic nRF51822 components. You can use certified modules or go chip-down.

## Firmware

You can buy LBM313 modules pre-programmed with the Bean firmware at our store. Alternatively, if you're using another module or have a chip-down design, [contact us](info@punchthrough.com) to get the firmware binary. 

## Single Chip Design

If your design requires the smallest form factor and lowest cost, you can use just the Bluetooth SoC. [Contact us](info@punchthrough.com) to help build your project. 
