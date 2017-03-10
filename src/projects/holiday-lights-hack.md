---
title: Holiday Light Hack
layout: basic-top-video.hbs
vid: ../../projects/holiday-lights-hack/307329768.mp4
loop: true
autotoc: true
---

## Introduction

The holidays are coming up and what better way to spend it than diving in to a hardware hacking project!

In this tutorial you will learn how to hack holiday lights, and control it through an iOS device. Make the lights blink to the beat of your favorite holiday music or work as a warning system if someone fiddles with the presents?

{{{img_rel this '1christmas-lights1.jpg' 'Holiday Lights Hack!' '100%'}}}

**IMPORTANT!** In this project we will use a string of lights that runs off of 120V. The voltage can seriously harm you, so if you're unsure of what you're doing, don't follow this tutorial. Always make sure that the lights are unplugged when you're modifying the electronics, and be sure to follow our instructions carefully!

## Before You Begin

{{> snip_req_getting_started}}

### Software

* {{> snip_req_bean_loader}}

### Hardware

{{> snip_bean_part}}

{{> snip_bean_plus_part}}

{{{part this 'iOS device' '1' 'http://www.apple.com/iphone'}}}

{{{part this 'Resistor 10k ohm' '1' 'http://octopart.com/mfr-25fbf52-10k-yageo-8100639'}}}

{{{part this 'Controllable RGB lights' '1' 'https://www.amazon.com/Zofei-Christmas-lights-String-Colorful/dp/B01FU1WC18/ref=sr_1_59?ie=UTF8&qid=1478291640&sr=8-59&keywords=rgb+holiday+lights'}}}

### Tools

* Soldering iron
* Wire cutter/stripper

## Make It

### Cut fet pins

Make sure that the string of lights are unplugged. Open the little white box. In there you have a simple microcontroller that controls the lights through three fets. One fet controls the yellow LEDs, one the red and one controls both blue and green.

{{{img_rel this '2christmas-lights2-1024x680.jpg' 'fets' '100%'}}}

The middle pins of the fets are the ones controlling the current to the LEDs. Use a pair of pliers to cut of these pins as close to the circuit board as you can to make it easier to solder resistors to them.

{{{img_rel this '3christmas-lights3-1024x680.jpg' 'clip the fets' '100%'}}}

### Solder resistors

Cut one side of the 10k Ohm resistors to about half its length. Solder the resistors to the middle pins of the fets, the ones we just cut off. Insulate all the uncovered parts with heat shrink tubing.

{{{img_rel this '4christmas-lights4.jpg' 'exposed resistors' '100%'}}}

{{{img_rel this '5christmas-lights5.jpg' 'shrink-wrapped' '100%'}}}

These resistors will later be connect to pins 0-2 on the Bean, and by setting them to HIGH/LOW we can turn the LEDs of that specific color ON/OFF.

### Solder to ground

Solder one wire to the far right leg of one of the fets. This is ground that we will connect the Bean to.

{{{img_rel this '62014-11-17-14.50.031-1024x712.jpg' 'close-up' '100%'}}}

### Pull wires through button hole

This string of lights have a button that changes the mode of the lights. Remove the white cap of the button from the case and pull the three resistors and the ground wire through the hole. Close the case.

{{{img_rel this '7christmas-lights6.jpg' 'exposed wires' '100%'}}}

### Solder wires to Bean

Solder one of the resistors to pin 0 on the Bean, one to pin 1 and the last one to pin 2. Then solder the black wire to GND on the Bean.

{{{img_rel this '8christmas-lights7.jpg' 'final product' '100%'}}}

*This is what the final wiring should look like:*

{{{img_rel this '9christmas-lights.png' 'wiring diagram' '100%'}}}


## Program Your Bean

Upload the following code below to your Bean.:

```cpp
/*  
  This sketch controls a string of holiday lights using
  the LigthBlue Bean and the iOS app LightBlue.

  This code is in the public domain.
 */

// The control inputs we will use from LightBlue
#define button1  13
#define button2  14
#define button3  15

void setup() 
{
  Serial.begin();
  Serial.setTimeout(5);

  // Set the pins connected to the holiday lights to OUTPUT
  pinMode(0, OUTPUT);
  pinMode(1, OUTPUT);
  pinMode(2, OUTPUT);
 }

void loop() {
  // Check for serial messages from LightBlue
  char buffer[64];
  size_t length = 64; 
  length = Serial.readBytes(buffer, length);    

  if ( length > 0 )
  {
    for (int i = 0; i < length - 1; i += 2 )
    {
      // Check if button1 has been pressed or released...
      if ( buffer[i] == button1 )
      {
        // If the button is held down, buffer[i+1] will be 0
        // If it's released, buffer[i+1] is 1
        // Set pin 0 to 1 when the button is held down
        // and to 0 when released
        digitalWrite(0,1-buffer[i+1]);
      }
      else if ( buffer[i] == button2 )
      {
        digitalWrite(1,1-buffer[i+1]);
      }
      else if ( buffer[i] == button3 )
      {
        digitalWrite(2,1-buffer[i+1]);
      }
    }
  }
}
```

## Test It Out!

Open the app LightBlue and connect to your Bean. Click options and choose Sandbox. If everything has been set up correctly, you can turn the lights on and off by pressing the buttons in the third view.

{{{img_rel this '10iphone6-sandbox2_wide.png' 'Bean iOS sandbox' '100%'}}}


## Learn More

If you have any questions about this project, the best place to ask is the [Beantalk community forum](http://beantalk.punchthrough.com/).