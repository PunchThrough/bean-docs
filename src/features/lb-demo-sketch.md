---
title: LightBlue Demo Sketch
layout: basic.hbs
autotoc: true
---
## Introduction
LightBlue offers some features that enable you to test devices. However, with the Bean, LightBlue also offers a view that allows you set the RGB LED,  probe for acceleration data, digital pin input values, analog, and input values.  We will be exploring with this particular feature of LightBlue in this tutorial.

* [Getting Started](#)

### Software

* LightBlue App([install guides](#))
* Bean Loader App for iOS ([install guides](#))

### Hardware

* LightBlue Bean
* iOS device

## Program the Bean
This tutorial assumes you have completed the [Getting Started guide for iOS Bean Loader](#). It covers tasks such as connecting to and programming the Bean with the iOS Bean Loader. 

Connect to your Bean and upload this sketch:
```
/*
  LightBlue Demo Sketch
 */
 
int d0 = 0;
int d1 = 1;
int d2 = 2;
int d3 = 3;
int d4 = 4;
int d5 = 5;
 
 
void setup() 
{
  // initialize serial communication at 57600 bits per second:
  Serial.begin(57600);
 
  Serial.setTimeout(25);
  
  // Digital pins
  pinMode(d0, INPUT_PULLUP);  
  pinMode(d1, INPUT_PULLUP);  
  pinMode(d2, INPUT_PULLUP);  
  pinMode(d3, INPUT_PULLUP); 
  pinMode(d4, INPUT_PULLUP);
  pinMode(d5, INPUT_PULLUP);
}
 
// the loop routine runs over and over again forever:
void loop() 
{
  char buffer[64];
  size_t readLength = 64;
  uint8_t length = 0;  
         
  length = Serial.readBytes(buffer, readLength);    
  
// Return all the serial pins
  if (0x02 == buffer[0] && 1 == length) {  
      int digital0 = digitalRead(d0);
      int digital1 = digitalRead(d1);
      int digital2 = digitalRead(d2);
      int digital3 = digitalRead(d3);
      int digital4 = digitalRead(d4);
      int digital5 = digitalRead(d5);
      int analog1 = analogRead(A0);
      int analog2 = analogRead(A1);
      
      uint8_t digitalAll = digital0 | ( digital1 << 1 ) | ( digital2 << 2 ) | ( digital3 << 3);
      digitalAll |= ( digital4 << 4 ) | ( digital5 << 5 );
      
      buffer[0] = 0x82;
      buffer[1] = digitalAll;
      buffer[2] = analog1 & 0xFF;
      buffer[3] = analog1 >> 8;
      buffer[4] = analog2 & 0xFF;
      buffer[5] = analog2 >> 8;
    
      uint8_t* (buf) = reinterpret_cast<uint8_t*>(buffer);
      Serial.write(buf, 6); 
    }
 
    Bean.sleep(1000000);  

}

```
* `Line 5-10` assigns the pins to different variables
* `Line 13` is the [setup function](https://www.arduino.cc/en/Reference/Setup). This function is excuted only once during the duration of the program
* `Line 21-26` sets each pin as an output. Checkout the Arduino reference for [pinMode](https://www.arduino.cc/en/Reference/PinMode).
* `Line 32` stores the Serial data in a Serial receive buffer.
* `Line 33` represents that size of the object in bytes.
* `Line 34` represents length as a 8-bit long integer.
* `Line 36` we read the bytes.
* `Line 39` we check to see if the index of buffer is 2 (a hexidecimal 0x02) and the length has a value of 1. 
* `Line 49-50` we read the data from each pin.
* `Line 56-57` we do a bitwise OR operation with a left shift.
* `Line 52-57` we assign the buffer to specific values. 
* `Line 59-60` we type cast buffer to a uint8_t. 
* `Line 60` we send the data to Serial.
* `Line 63` Bean sleeps. Checkout our [Bean API](http://legacy.punchthrough.com/bean/the-arduino-reference/). 

## Understanding the Sketch at a High Level

All of these features other than the digital/analog pin inputs are performed behind-the-scenes using our Apple Bean SDK.  The digital/analog pin inputs are read from a sketch that’s uploaded to the Bean.  These pins use a simple command/response structure.  The client (iPhone) sends the decimal value ‘2’ to request the pin states.  After receiving this command, the Arduino probes the pins and sends the following info back to the client:

* byte 0: 0x82 – Response to 0x02 (decimal value ‘2’ in hexadecimal)
* byte 1: the digital pin values as bits b0 to b5 in the order d0 to d5
* byte 3: the high-byte of analog pin 1
* byte 4: the low-byte of analog pin 2
* byte 5: the high-byte of analog pin 2
The LightBlue application parses the response and places the incoming data on the screen.

## Open the LightBlue App

You can see the values change when you open the LightBlue App and select the Bean you programmed: 

{{{img_rel this 'lb-demo-sketch-image.png'}}}

## Conclusion

In this guide the LightBlue app probes the Bean for acceleration, GPIO, and analog values. 

## Troubleshooting

Having trouble with this guide? Try the steps listed in [General Bean troubleshooting](#). Reach out to [BeanTalk](#) to get directed feedback from our developers and community!