---
title: Bean Boo Alert
layout: basic-top-video.hbs
vid: ../../projects/boo-alert/boo-alert-phone.mp4
loop: true
autotoc: true
---

## Introduction

The Bean Boo Alert is a great way to light up your love (woo puns)! Never miss those special messages again with this simple, yet very romantic Bean+ project. We connected a [NeoPixel](https://www.adafruit.com/products/1138) strip to a Bean+ and made it illuminate based on iOS notifications.

The Bean+ is connected to the phone over Bluetooth Low Energy using ANCS (Apple Notification Center Service) to receive the phone's notifications. The Bean+ sketch filters through the notifications and causes the NeoPixel strip to light on any new text message!

## Before You Begin

{{> snip_req_getting_started}}

### Software

* {{> snip_req_bean_loader}}

### Hardware

* [Bean+](http://store.punchthrough.com/collections/bean-family/products/lightblue-bean-plus)
* iOS device
* [Adafruit NeoPixel Strip](https://www.adafruit.com/products/1138)

## Make it

First you'll want to cut the NeoPixel strip to be 12 LEDs long. This will ensure that you don't use more current than the Bean+'s battery can handle. After the strip has been cut, make the following connections to Bean+:

* D6 – White wire (Din)
* 5V – Red wire (5V)
* GND - Black wire (GND)

You will want to make sure that the NeoPixel strip is facing the correct way, with Din from the NeoPixel strip connecting to D6 on the Bean+. You will also want to be sure that your Bean+ is in 5V mode by flipping the 3.3V/5V switch to 5V.

We wanted to make our Boo Alert as cute as possible, so we used some cable ties to turn the strip into a heart shape!

{{{img_rel this 'boo-alert-heart.png' 'totes adorbs' '100%'}}}

## Program Your Bean

In order to get the Boo Alert to work its magic we used [ANCS](../../features/ancs/) (Apple Notification Center Service) to receive notifications from the phone. The Bean+ goes through the notifications and triggers if there is a text message.

After the Bean+ is paired with the phone, it will forward all notifications over ANCS.

Program your Bean+ with this code:

```cpp
#include <Adafruit_NeoPixel.h>

// Parameter 1 = number of pixels in strip
// Parameter 2 = Arduino pin number (most are valid)
// Parameter 3 = pixel type flags, add together as needed:
//   NEO_KHZ800  800 KHz bitstream (most NeoPixel products w/WS2812 LEDs)
//   NEO_KHZ400  400 KHz (classic 'v1' (not v2) FLORA pixels, WS2811 drivers)
//   NEO_GRB     Pixels are wired for GRB bitstream (most NeoPixel products)
//   NEO_RGB     Pixels are wired for RGB bitstream (v1 FLORA pixels, not v2)

Adafruit_NeoPixel strip = Adafruit_NeoPixel(12, 6, NEO_GRB + NEO_KHZ800);

AncsNotification notifications[8];

void setup() {
  // Serial port is initialized automatically; we don't have to do anything
  BeanAncs.enable();

  strip.begin();
  strip.show();  // Initialize all pixels to 'off'
}

void loop() {
  int msgAvail = BeanAncs.notificationsAvailable();

  if (msgAvail) {
    BeanAncs.getNotificationHeaders(notifications, 8);

    for (int i = 0; i < msgAvail; i++) {
      if (notifications[i].catID == 4) {
        colorWipe(strip.Color(255, 0, 0), 50);  // Red wipe
        fadeInAndOut(255, 0, 0, 2);  // First red fade
        fadeInAndOut(255, 0, 0, 2);  // Second red fade
        colorWipe(strip.Color(0, 0, 0), 50); // Turn all pixels off
        delay(50);
      }
    }
  }
}

// Fill the dots one after the other with a color
void colorWipe(uint32_t c, uint8_t wait) {
  for(uint16_t i = 0; i < strip.numPixels(); i++) {
      strip.setPixelColor(i, c);
      strip.show();
      delay(wait);
  }
}

void fadeInAndOut(uint8_t red, uint8_t green, uint8_t blue, uint8_t wait) {
  for(uint8_t b = 0; b < 255; b++) {
     for(uint8_t i = 0; i < strip.numPixels(); i++) {
        strip.setPixelColor(i, (red * b) / 255, (green * b) / 255, (blue * b) / 255);
     }
     strip.show();
     delay(2);
  }

  for(uint8_t b = 255; b > 0; b--) {
     for(uint8_t i = 0; i < strip.numPixels(); i++) {
        strip.setPixelColor(i, (red * b) / 255, (green * b) / 255, (blue * b) / 255);
     }
     strip.show();
     delay(1);
  }
}
```

## Bring it all Together! ( 📱 + ✉️ = ❤️ )

Place your Boo Alert on your desk and ensure that it has been paired with your phone through the normal Bluetooth menu. Then you just have to wait to get that lovely message. Or you can do what we did and send yourself a message. Don't worry; it's not sad.

{{{img_rel this 'boo-alert.png' 'Aww for cute!' '100'}}}

💋 With Love, Punch Through

## Learn More
* [Punch Through ANCS Reference](https://punchthrough.com/bean/reference#ANCS)
* [Adafruit NeoPixel Uberguide](https://learn.adafruit.com/adafruit-neopixel-uberguide)
* For issues and troubleshooting, check out the [BeanTalk forums](http://beantalk.punchthrough.com/)
