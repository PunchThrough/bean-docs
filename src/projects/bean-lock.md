---
title: Bean Lock
layout: basic-top-image.hbs
img: ../../projects/bean-lock/1beanlockphoto_copy.png
autotoc: true
---

## Introduction

Ever been looking for your keys, and wanted to call them, before you realize that they are hideously analog pieces of metal? Or wanted to let someone into your house when you’re not at home, without having to lend them your keys?

Lockitron was the solution that descended from hardware heaven – a device that fits over the lock on your door and that is controlled via an app. It raised $2.2M on Kickstarter but missed its original shipping deadline by 1.5 years, leaving its backers in a deadlock (pun!).

Are you one of them? Stop glaring at your empty mailbox and channel all your frustration into making your own awesome smartphone connected lock – The Bean Lock.

<div>
  <iframe width="703" height="396" src="https://player.vimeo.com/video/105260444" frameborder="0" allowfullscreen></iframe>
</div>

## Before You Begin

{{> snip_req_getting_started}}

### Software

* {{> snip_req_bean_loader}}

### Hardware

* {{> snip_req_bean}}
* iOS device
* [Electronic deadbolt](http://www.amazon.com/gp/product/B000FBU2KW/ref=oh_aui_detailpage_o01_s00?ie=UTF8&psc=1)
* [H-Bridge motor driver](http://www.sparkfun.com/products/9457)
* [3.3V linear voltage regulator](http://www.sparkfun.com/products/526)
* [	Ceramic capacitor (0.1uF)](http://www.sparkfun.com/products/8375)
* [Electrolytic decoupling capacitor (10uF)](http://www.sparkfun.com/products/523)

{{{img_rel this '3FI21FO5I0462QJM.jpg' 'wiring (image developed using Fritzing.org)' '100%'}}}

## Make It

### Tweaking The Deadbolt

The Bean Lock is built around an electronic wireless deadbolt for a standard door. Almost any electronic deadbolt should work but some might need a bit of extra oomph. [The deadbolt we picked](http://www.amazon.com/gp/product/B000FBU2KW/ref=oh_aui_detailpage_o01_s00?ie=UTF8&psc=1) uses a motor to slide it in and out of position, with a small switch that indicates when it’s locked.

We will use the [LightBlue Bean](http://punchthrough.com/bean/) to control the deadbolt motor because hey, it’s what we make, and because it’s pretty darn awesome. To connect the Bean to the electronic deadbolt you will need to cut almost all wires and electronics from the lock – the only electronics that you need to keep are the motor, position switch and the battery pack.

{{{img_rel this '2FT7MHJDI0462PCF.jpg' 'materials' '100%'}}}

The Bean cannot operate at the same voltage as the motor, so we need to use a [voltage regulator](https://www.sparkfun.com/products/526) to step down battery voltage for the Bean to 3.3V. We also need a [motor controller board](https://www.sparkfun.com/products/9457) to control the electronic deadbolt motor.

## Program Your Bean

To open the lock, we will use the [LightBlue app](https://itunes.apple.com/us/app/lightblue-bluetooth-low-energy/id557428110?mt=8). It has a section called the Sandbox, that lets you control the Bean without having to program your own iOS app. When the Bean receives a serial message, it checks the bytes received against the keycode saved inside the sketch. If the keycode matches the buttons pressed in the sandbox, the Bean Lock will unlock or lock.

{{{img_rel this '4F2AJEK4HZZRKYEQ.jpg' 'Sandbox in LightBlue app' '75%'}}}

### Code

Program the Bean with this code:

```
/* 
  LightBlue Latch - Sandbox Keycode 
  
  For motor control using Sparkfun:
  https://www.sparkfun.com/products/9457
  Motor Driver 1A Dual TB6612FNG
  P/N: ROB-09457
  
  Using Lock:
  http://www.amazon.com/dp/B000FBU2KW/ref=pe_385040_30332200_TE_item
  Morning Industry RF-01SN Radio Frequency Remote Deadbolt
  P/N: RF-01SN
  
  Motor Controller Pin Connections:
  PWMA:  1
  AIN1:  0
  AIN2:  2
  STBY:  3
  
  Switch Pin Conneciton: (Active Low)
  SW1:  5
  
  Switch High = Locked
  Switch Low = Unlocked
 
  
*/
/*************************************************************************/
/* Defines */
/*************************************************************************/
#define UNLOCK_TIMEOUT_MS    300
#define LOCK_TIMEOUT_MS      275
#define KEYCODE_SIZE         sizeof(keycode)
/*************************************************************************/
/* Pin Defines */
/*************************************************************************/
// Motor Controller
int PWMA = 1; //Speed control 
int AIN1 = 0; //Direct ion
int AIN2 = 2; //Direction
int STBY = 3; //standby

// Switch
int SW1 = 5;
/*************************************************************************/
/* Global Variables */
/*************************************************************************/
/* Define the unlock keycode from the sandbox */
const char keycode[] = {13, 14, 15, 16};
/*************************************************************************/
void setup(){
  Serial.begin(57600);  
  Serial.setTimeout(25);
  
  // Motor Controller Setup
  pinMode(STBY, OUTPUT);
  pinMode(PWMA, OUTPUT);
  pinMode(AIN1, OUTPUT);
  pinMode(AIN2, OUTPUT);

  // Switch Setup
  pinMode(SW1, INPUT);
  digitalWrite(SW1, HIGH); // Enable internal pullup
  digitalWrite(STBY, LOW); //enable standby
}
/*************************************************************************/
void loop(){
  char buffer[10];
  size_t length = 10;
  static char last_value = 0;
  static char index = 0;
  static char lock_state = 0;
  
  length = Serial.readBytes(buffer, length); 
  
  if( length > 0 ){
    if(buffer[0] != last_value){  // Check to see if it is the same value
        if(buffer[0] == keycode[index]){
          index++;
          if(index == KEYCODE_SIZE){
            // Lock / Unlock door
            if(lock_state)
              LockTheDoor();
            else
              UnlockTheDoor();
            lock_state = !lock_state;
          index = 0;  
          }
        }else{
          index = 0;
        }
    }
    last_value = buffer[0];
  }
  Bean.sleep(0xFFFFFFFF); // Sleep until a serial message wakes us up
}  
/*************************************************************************/
void move(int speed, int direction){
//Move motor at speed and direction
//speed: 0 is off, and 255 is full speed
//direction: 0 clockwise, 1 counter-clockwise

  boolean inPin1 = LOW;
  boolean inPin2 = HIGH;

  if(direction == 1){
    inPin1 = HIGH;
    inPin2 = LOW;
  }
    digitalWrite(AIN1, inPin1);
    digitalWrite(AIN2, inPin2);
    analogWrite(PWMA, speed);
}

/*************************************************************************/
void LockTheDoor(void){
  if(digitalRead(SW1) == HIGH){
     digitalWrite(STBY, HIGH); //disable standby
     move(255,0);
     while(digitalRead(SW1) == HIGH);
     delay(LOCK_TIMEOUT_MS);
     move(0,0);
     digitalWrite(STBY, LOW); //enable standby
  }
}
/*************************************************************************/
void UnlockTheDoor(void){
  if(digitalRead(SW1) == LOW){
     digitalWrite(STBY, HIGH); //disable 
     move(255,1);
     while(digitalRead(SW1) == LOW);
     delay(UNLOCK_TIMEOUT_MS);
     move(0,1);
     digitalWrite(STBY, LOW); //enable standby
  }
}
/*************************************************************************/
```

A few wires and lines of codes later and boom, you have a lock that you can open using your smartphone! Good job. We are proud of you. 

<div>
  <iframe width="703" height="396" src="https://player.vimeo.com/video/105260443" frameborder="0" allowfullscreen></iframe>
</div>

## Security Flaws

The Bean Lock would be a terrible lock if it were hackable enough to let people right into your home. Until you can be sure this is secure, we wouldn’t recommend you replace your home’s standard deadbolt with the Bean Lock. The Bean was designed to be very easy to program, but in the case of a lock, you may not want your neighbors having the same access as you have. To avoid this, we have added [pincode protection](http://punchthrough.com/bean/protect-your-bean-with-authentication) to the latest firmware release. It will prevent anyone without the pincode from reprogramming your Bean.

{{{img_rel this '5FP3HRNSI0462R2G.jpg' 'Bean PIN' '100%'}}}

If you want to be even safer, you can keep the BLE module from reprogramming the on-board Arduino by cutting the trace linking the reset line on the Arduino to the BLE module. Without the reset line, the LBM313 module can’t reset the Arduino chip for reprogramming. Optionally, you could solder a switch to this line, so only someone with physical access to the inside of the lock is able to reprogram the Bean.

Another suggestion is to add shared-key encryption. If you are using something small, like a 5-digit pin instead of a 128-bit key, an attacker could decide to brute-force your lock by trying every combination, one after the other. If you include a lockout – turn off the lock for 60 seconds after 3 incorrect codes are entered, for example – brute-forcing the lock’s combo would be too time-consuming to be practical.

## Learn More

This is only a prototype and not a secure solution yet. But we are sure that it can be developed further to work just as well as commercially available smartphone controlled locks, like the Lockitron. For a more thorough description on how to build this, check out our [Make Magazine blog post](http://wp.me/p22K2I-1ReD).

Make sure to post in the [BeanTalk forum](http://beantalk.punchthrough.com/) if you have any questions, ideas or contributions you want to share. We love reading what you’re up to!