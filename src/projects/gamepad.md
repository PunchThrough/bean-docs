---
title: Bean+ Gamepad
layout: basic.hbs
autotoc: true
order: 2
---

{{{img_rel this 'mario.png' 'mario' '100%'}}}

## Before You Begin

{{> snip_req_getting_started}}

### Software

* {{> snip_req_bean_loader}}
* OR {{> snip_req_cli_loader}}

### Hardware

* {{> snip_req_bean_plus}}
* [Bean+ Gamepad](http://store.punchthrough.com/products/bean-gamepad)

## Make It

Put the gamepad shield onto your Bean+:

{{{img_rel this 'shield-on-bean-plus.jpg' 'gamepad shield' '100%'}}}

## Program Your Bean

Program your Bean+ with this code:

```cpp
// Number of buttons on the gamepad
#define NUM_BUTTONS    12

// Button pins
#define B       0
#define A       1
#define X       2
#define Y       3
#define START   4
#define SELECT  5
#define RIGHT   6
#define UP      7
#define DOWN    8
#define LEFT    9
#define LTRIG   A2
#define RTRIG   A3

// Used for marking flags 
static uint8_t flags[NUM_BUTTONS] = {0};

// The pins corresponding to button flags
const uint8_t buttonPins[NUM_BUTTONS] = {
   B, A, X, Y,
   START, SELECT,
   RIGHT, UP,
   DOWN, LEFT,
   LTRIG, RTRIG
};

// The HID messages corresponding to button pins
const uint8_t buttonFunctions[NUM_BUTTONS] = {
  'B', 'A', 'X', 'Y',  // Normal right thumb buttons
  KEY_RETURN, KEY_ESC,  // START and SELECT buttons
  KEY_RIGHT_ARROW, KEY_UP_ARROW,  // RIGHT and UP on d-pad
  KEY_DOWN_ARROW, KEY_LEFT_ARROW,  // DOWN and LEFT on d-pad
  KEY_BACKSPACE, KEY_DELETE  // LEFT TRIGGER and RIGHT TRIGGER
};

void setup() 
{
  //Enable HID library for Bean+
  BeanHid.enable();
  
  // Set all used pins as inputs
  pinMode(B, INPUT_PULLUP);
  pinMode(A, INPUT_PULLUP);
  pinMode(X, INPUT_PULLUP);
  pinMode(Y, INPUT_PULLUP);
  pinMode(START, INPUT_PULLUP);
  pinMode(SELECT, INPUT_PULLUP);
  pinMode(RIGHT, INPUT_PULLUP);
  pinMode(UP, INPUT_PULLUP);
  pinMode(DOWN, INPUT_PULLUP);
  pinMode(LEFT, INPUT_PULLUP);
  pinMode(LTRIG, INPUT_PULLUP);
  pinMode(RTRIG, INPUT_PULLUP);
}

void loop() 
{
  for (int i = 0; i < NUM_BUTTONS; i++)
  {
  	 // For each button, check if the state has changed
    uint8_t buttonState = digitalRead(buttonPins[i]);
    if (buttonState != flags[i])
    {
      // Hold/release the corresponding button accordingly
      if (buttonState == 1)
      {
        BeanHid.holdKey(buttonFunctions[i]);
      }
      else if (buttonState == 0)
      {
        BeanHid.releaseKey(buttonFunctions[i]);
      }
      // Update the last known button state for later use
      flags[i] = buttonState;
    }
  }
}
```

### Explanation:

* **Lines 1-16:** Defines the number of buttons and their respective pins. These numbers correspond to the physical pins of the Bean+ and shouldn't be changed.
* **Lines 21-28:** An array of the Bean+'s pins to read their states from a for-loop.
* **Lines 30-37:** An array of the HID messages sent from the Bean+. HID messages can be either `chars` or `modifierKey`s. The full list of valid HID keys can be found in the [Bean's HID library](https://github.com/PunchThrough/bean-arduino-core/blob/master/hardware/bean/avr/cores/bean/BeanHID.h). These values can be modified to have the Bean+ output different values when the buttons are pressed.
* **Lines 39-57:** Initialize the Bean HID profile and all of the pins associated with the gamepad.
* **Lines 61-79:** Check each button sequentially to see if the pin has changed from high to low, or vice versa, and send the appropriate HID message accordingly.