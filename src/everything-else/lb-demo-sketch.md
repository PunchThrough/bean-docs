---
title: LightBlue Demo Sketch
layout: basic.hbs
autotoc: true
---

## Introduction

LightBlue Explorer offers lots of features to help you test Bluetooth Low Energy devices. When LightBlue Explorer connects to a Bean, it offers a view that allows you to set the RGB LED. You can also read data from the accelerometer, analog pins, and digital pins.

Bean comes with the LightBlue Demo Sketch pre-programmed at the factory. If you've uploaded a sketch to your Bean, your LightBlue Demo Sketch has been wiped out. Don't worry, it's easy to fix!

In this guide, you'll program your Bean with the LightBlue Demo Sketch, then connect to it with LightBlue Explorer and play with it.

## Before You Begin

{{> snip_req_getting_started}}

### Software

* [LightBlue Explorer for iOS](https://itunes.apple.com/us/app/lightblue-explorer-bluetooth/id557428110)
* {{> snip_req_bean_loader}}

### Hardware

* {{> snip_req_bean}}
* iOS device

## Program the Bean

Connect to your Bean and upload this sketch using Bean Loader:

```
#define BUFFER_SIZE 64

void setup() {
  // Set a timeout so that Bean won't stall indefinitely if something goes wrong
  Serial.setTimeout(25);

  // Configure digital pins as inputs
  pinMode(0, INPUT_PULLUP);
  pinMode(1, INPUT_PULLUP);
  pinMode(2, INPUT_PULLUP);
  pinMode(3, INPUT_PULLUP);
  pinMode(4, INPUT_PULLUP);
  pinMode(5, INPUT_PULLUP);
}

void loop() {
  // Grab up to 64 bytes from Bean's Virtual Serial port
  char buffer[BUFFER_SIZE];
  uint8_t bytes_rcvd = Serial.readBytes(buffer, BUFFER_SIZE);

  if (bytes_rcvd == 1 && buffer[0] == 0x02) {
    // We got a request for data from LightBlue!

    // Read analog pins A0 and A1
    int analog1 = analogRead(A0);
    int analog2 = analogRead(A1);

    // Read digital pins D0 through D5 and join their bits into a single byte
    uint8_t digitalAll = 0;
    digitalAll |= digitalRead(0);
    digitalAll |= digitalRead(1) << 1;
    digitalAll |= digitalRead(1) << 2;
    digitalAll |= digitalRead(1) << 3;
    digitalAll |= digitalRead(1) << 4;
    digitalAll |= digitalRead(1) << 5;

    // Package the data into a 6-byte buffer
    buffer[0] = 0x82;
    buffer[1] = digitalAll;
    buffer[2] = analog1 & 0xFF;
    buffer[3] = analog1 >> 8;
    buffer[4] = analog2 & 0xFF;
    buffer[5] = analog2 >> 8;

    // Send back 6 bytes of data to LightBlue
    Serial.write((uint8_t *)buffer, 6);
  }

  // Sleep until another serial request wakes us up
  Bean.sleep(0xFFFFFFFF);
}
```

## Understanding the Demo Sketch

When you run LightBlue Explorer and connect to a Bean, your app asks Bean for its information by sending the byte `0x02`.

Bean receives `0x02` and interprets it as a request for information from your iOS device. Bean responds with six bytes total:

* **Byte 1:** 0x82 – Response to 0x02 (decimal value ‘2’ in hexadecimal)
* **Byte 2:** the digital pin values, grouped together into one byte
* **Byte 3:** the low byte of analog pin 1
* **Byte 4:** the high byte of analog pin 1
* **Byte 5:** the low byte of analog pin 2
* **Byte 6:** the high byte of analog pin 2

LightBlue Explorer parses the response and visualizes the received data on your screen.

## Open the LightBlue App

You can see the values change when you open the LightBlue App and select the Bean you programmed: 

{{{img_rel this 'lb-demo-image.png' 'LightBlue demo sketch is running!' '40%'}}}

## Conclusion

In this guide, you programmed your Bean with the LightBlue Demo Sketch. You connected to Bean using LightBlue Explorer and learned how Bean's sketch communicates pin values back to your app.

## Troubleshooting

{{> snip_troubleshooting}}
