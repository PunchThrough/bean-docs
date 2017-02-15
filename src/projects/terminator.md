---
title: Bean+ Terminator
layout: basic-top-video.hbs
vid: ../../projects/terminator/terminator.mp4
loop: true
autotoc: true
order: 2
---

## Introduction

What did the giant mess of wires say to the Bean+ Terminator shield? "I'll be back." Except they won't be back because the Terminator shield is the ultimate solution for tidying up a giant mess of wires.

We connected an Adafruit NeoPixel strip to the Bean+ Terminator shield in this example and programmed the Bean+ to control the strip. The Bean+ sketch simply turns the NeoPixels on and off. The Bean+ with the Terminator shield could also be used to add a decorative flare to a light up gift box, or to let you know when your friend, Ron, is calling.

{{> snip_req_getting_started}}

### Software

* {{> snip_req_bean_loader}} or {{> snip_req_cli_loader}}

### Hardware

* {{> snip_req_bean_plus}}
* Bean+ Terminator
* [Adafruit NeoPixel Strip](https://www.adafruit.com/products/1138)
* Small flat-head screwdriver

## Program Your Bean

Program your Bean+ with this code:

```cpp
#include <Adafruit_NeoPixel.h>
#ifdef __AVR__
  #include <avr/power.h>
#endif

#define PIN 6

// Parameter 1 = number of pixels in strip
// Parameter 2 = Arduino pin number (most are valid)
// Parameter 3 = pixel type flags, add together as needed:
//   NEO_KHZ800  800 KHz bitstream (most NeoPixel products w/WS2812 LEDs)
//   NEO_KHZ400  400 KHz (classic 'v1' (not v2) FLORA pixels, WS2811 drivers)
//   NEO_GRB     Pixels are wired for GRB bitstream (most NeoPixel products)
//   NEO_RGB     Pixels are wired for RGB bitstream (v1 FLORA pixels, not v2)
//   NEO_RGBW    Pixels are wired for RGBW bitstream (NeoPixel RGBW products)
Adafruit_NeoPixel strip = Adafruit_NeoPixel(60, PIN, NEO_GRB + NEO_KHZ800);

// IMPORTANT: To reduce NeoPixel burnout risk, add 1000 uF capacitor across
// pixel power leads, add 300 - 500 Ohm resistor on first pixel's data input
// and minimize distance between Arduino and first pixel.  Avoid connecting
// on a live circuit...if you must, connect GND first.

void setup() {
  strip.begin();
  strip.show(); // Initialize all pixels to 'off'
}

void loop() {
  // Each NeoPixel can draw up to 60mA when displaying bright 
  // white (red AND green AND blue LEDs at full birghtness).
  // Care should be taken to ensure average current drawn from 
  // the Bean+ battery is less than 600mA when using the NeoPixel strip.

  // We set the brightness to 32 here to minimize current draw.
  colorWipe(strip.Color(0, 32, 0), 50); // Green
  colorWipeReverse(strip.Color(0, 0, 0), 50); // Turn off LEDs
}

// Fill dots one after the other with a color
// Skip ever other dot to minimize current draw from the battery on Bean+
void colorWipe(uint32_t c, uint8_t wait) {
  for(uint16_t i=0; i<strip.numPixels(); i=i+2) {
    strip.setPixelColor(i, c);
    strip.show();
    delay(wait);
  }
}

// Fill the dots one after the other with a color
// Skip ever other dot to minimize current draw from the battery on Bean+
void colorWipeReverse(uint32_t c, uint8_t wait) {
  for(int16_t i=(strip.numPixels()); i>=0; i=i-2) {
    strip.setPixelColor(i, c);
    strip.show();
    delay(wait);
  }
}
```

## Make It

Put the terminator shield onto your Bean+:

{{{img_rel this 'terminator-top.jpg' 'terminator shield' '100%'}}}

Attach the NeoPixel strip to the following terminals using a flat-head screwdriver:

* D6 – White wire (Din)
* 5V – Red wire (5V)
* GND - Black wire (GND)

{{{img_rel this 'terminator-top-wood.png' 'Bean+ Terminator' '100%'}}}

You will want to make sure that the NeoPixel strip is facing the correct way, with Din from the NeoPixel strip connecting to D6 on the Bean+. You will also want to be sure that your Bean+ is in 5V mode by flipping the 3.3V/5V switch to 5V.

After you've programmed your Bean+ and made the above connections, you can grab the popcorn, your 3D glasses, and turn on your Terminator-outfitted Bean+. 

## Learn More
* [Adafruit NeoPixel Uberguide](https://learn.adafruit.com/adafruit-neopixel-uberguide)
* For issues and troubleshooting, check out the [BeanTalk forums](http://beantalk.punchthrough.com/).