---
title: Bean+ Slack Messenger
layout: basic-top-video.hbs
vid: ../../projects/starter-kit-messenger/starter-kit-slack.mp4
loop: true
autotoc: true
---

## Introduction

Looking for ways to save time typing? Want to increase efficiency and maximize your time thinking of catchy buzzwords? Or perhaps you're just looking to automate your "LOLs" and 😬 emoji Slack responses. Whatever the case, we have the solution for you.

Use the Bean+ starter kit to send messages with the press of a button. Choose from up to 10 messages to send. The LED bar keeps track of which message you have selected and the button sends the message to your phone, computer, or tablet via a press and hold!

## Before You Begin

{{> snip_req_getting_started}}

### Software

* {{> snip_req_bean_loader}}

### Hardware

{{{part this 'LightBlue Bean+ Start Kit' '1' 'http://store.punchthrough.com/collections/kits/products/bean-starter-kit'}}}

<br>
#### OR

{{{part this 'Bean+' '1' 'http://store.punchthrough.com/collections/bean-family/products/lightblue-bean-plus'}}}

{{{part this 'Bean+ Accessory Kit' '1' 'http://store.punchthrough.com/collections/kits/products/bean-accessory-kit'}}}

## Make it

Connect the button to the Grove connector on the Bean+ that's labeled "I2C" and connect the LED bar to the Grove connector that's labeled "A2/A3".

{{{video_rel this 'starter-kit-assemble.mp4' '100%' true}}}

## Program Your Bean

* Download and extract the Grove LED Bar Library as shown on the [Grove LED Bar Wiki](http://wiki.seeed.cc/Grove-LED_Bar).
* Program your Bean+ with this code:

```cpp
/*
Grove LED Bar

dec    hex     binary
0    = 0x0   = 0b000000000000000 = all LEDs off
5    = 0x05  = 0b000000000000101 = LEDs 1 and 3 on, all others off
341  = 0x155 = 0b000000101010101 = LEDs 1,3,5,7,9 on, 2,4,6,8,10 off
1023 = 0x3ff = 0b000001111111111 = all LEDs on
                      |        |
                      10       1

The bits >10 are ignored, shown here as x: 0bxxxxx0000000000
*/

#include <Grove_LED_Bar.h>

Grove_LED_Bar bar(A2, A3, 0);  // Clock pin, Data pin, Orientation
const int buttonPin = A5;      // The number of the pushbutton pin

// Variables will change:
int buttonPushCounter = 0;    // Counter for the number of button presses
int buttonState = 0;          // Current state of the button
int lastButtonState = 0;      // Previous state of the button
unsigned long buttonDownTime; // How long since the button was first pressed 
unsigned long buttonUpTime;   // How long since the button was first pressed 

#define debounce 20   // ms debounce period
#define holdTime 500  // ms hold period for press and hold

int ledBits = 0b000000000000000; // Keep track of the LEDs to light

void setup() {
  BeanHid.enable();

  pinMode(buttonPin, INPUT);  // Initialize the pushbutton pin as an input

  bar.begin();
  bar.setBits(0);  // turn off all LEDs
}

void loop() {
  // Read the pushbutton input pin
  buttonState = digitalRead(buttonPin);

  // Compare the buttonState to its previous state
  if (buttonState == HIGH && lastButtonState == LOW && (millis() - buttonUpTime) > long(debounce)) {
    buttonPushCounter++;
    buttonDownTime = millis();
  }

  // Check for press and release
  if(buttonState == LOW && lastButtonState == HIGH && (millis() - buttonDownTime) > long(debounce)) {
    lightLedBar(buttonPushCounter);
    buttonUpTime = millis();
  }

  // Check for press and hold
  if(buttonState == HIGH && (millis() - buttonDownTime) > long(holdTime)) {
    sendMessage(buttonPushCounter);
    buttonDownTime = millis();
  }

  // Reset the counter if pressed over 10 times
  if(buttonPushCounter > 10) {
    buttonPushCounter = 0; 
  }

  lastButtonState = buttonState;
}

//=================================================
// Cycle through LEDs on LED bar
//=================================================
void lightLedBar(int ledToLight) {
  if(ledToLight == 0) {
    bar.setBits(0);  // Turn off all LEDs
    ledBits = 0;
  }
  else {
    ledBits = ledBits | ( 0b000010000000000 >> ledToLight);
    bar.setBits(ledBits);
  }
}

//=================================================
// Send HID message
//=================================================      
void sendMessage(int messageNumber) {
  if(messageNumber == 1) {
    ledBits = 0b000001000000000;  // Light the first LED
    bar.setBits(ledBits); 
    BeanHid.sendKeys("laugh meter: 1/10 - not funny.");
    BeanHid.sendKeys("\r\n");
  }
  else if(messageNumber == 2) {
    // ADD YOUR OWN MESSAGE HERE
  }
  else if(messageNumber == 3) {
    // ADD YOUR OWN MESSAGE HERE
  }
  else if(messageNumber == 4) {
    // ADD YOUR OWN MESSAGE HERE
  }
  else if(messageNumber == 5) {
    // ADD YOUR OWN MESSAGE HERE
  }
  else if(messageNumber == 6) {
    // ADD YOUR OWN MESSAGE HERE
  }
  else if(messageNumber == 7) {
    // ADD YOUR OWN MESSAGE HERE
  }
  else if(messageNumber == 8) {
    // ADD YOUR OWN MESSAGE HERE
  }
  else if(messageNumber == 9) {
    // ADD YOUR OWN MESSAGE HERE
  }
  else if(messageNumber == 10) {
    ledBits = 0b000001111111111;  // Light all LEDs
    bar.setBits(ledBits); 
    BeanHid.sendKeys("laugh meter: 10/10 - maximum laughter.");
    BeanHid.sendKeys("\r\n");
  }
}
```

## Using the Bean+ Slack Messenger

Now that your Bean+ is programmed and you have the button and LED bar connected, disconnect your Bean+ from Bean Loader and connect it to your computer, phone, or tablet through the normal Bluetooth menu. If you have issues connecting your Bean+ through the Bluetooth settings, ensure all other Bluetooth devices are disconnected.

{{{img_rel this 'bp-connected.png' 'connect Bean+ in Bluetooth settings menu' '100%'}}}

After everything is set up and connected, the Bean+ will work like a standard keyboard through the HID profile. You can cycle through different messages by pressing the button. If you press & hold the button, a message will be sent to your computer, phone, or tablet using HID! Pretty slick.

{{{img_rel this 'starter-kit.JPG' 'Assembled Bean Messenger' '100%'}}}

## Learn More
* [Grove LED Bar Wiki](http://wiki.seeed.cc/Grove-LED_Bar/)
* For issues and troubleshooting, check out the [BeanTalk forums](http://beantalk.punchthrough.com/).
* To learn more about how HID works on the Bean and Bean+, check out [our guide on HID]({{relativeRoot}}guides/features/hid).

😬 See you next time!
