---
title: Accelerometer
layout: basic.hbs
autotoc: true
---

## Introduction

The Bean has a built-in accelerometer that lets you detect its orientation and any changes in velocity. You can access the accelerometer's data from within your Arduino sketches or through any of the Bean platform SDKs.

One Bean user built a wall clock that knows when it's perfectly level on a wall hook. Another Beanie attached the Bean to a paratrooper toy that automatically deployed its parachute when it detects freefall!

In this tutorial, you'll access the accelerometer on a Bean and visualize its data on an OS X computer using Processing.

## What You Need

* LightBlue Bean
* Compatible OS X computer
* Bean Loader for OS X
* Processing for OS X

If you haven't completed the following guides, please become familiar with them before starting this one:

* Getting Started
* Feature: Virtual Serial

## Step-by-Step

### Check your Bean

Turn on your Bean by inserting the coin cell battery into its holder. Make sure you see the LED blink green, indicating your battery power is OK:

{{{img_rel this 'blink-green.jpg' 'LED blinking green on power-up'}}}

### Connect to your Bean

Open Bean Loader for OS X. Select your Bean and connect to it:

Verify your Bean is connected:

If there are lots of Beans near you, blink your Bean to make sure you're connected to the right one:

### Program the Arduino Sketch

This is an Arduino sketch for your Bean. Here's what it does:

* Reads the accelerometer values
* Prints the X, Y, and Z values to the serial port
* Sleeps for 50 milliseconds
* Loops back to the start

```
void setup()
{
  Serial.begin(57600);
}

void loop()
{
  AccelerationReading reading = Bean.getAcceleration();
  byte x = reading.xAxis / 4;
  byte y = reading.yAxis / 4;
  byte z = reading.zAxis / 4;
  Serial.write(x);
  Serial.write(y);
  Serial.write(z);
  Serial.println();
  Bean.sleep(50);
}
```

Open Arduino. Copy and paste the above sketch into Arduino. Save your sketch using **File > Save**:

Make sure you have selected LightBlue Bean as your programming target, then click Upload to send the sketch to Bean Loader:

Program the sketch to your Bean:

Stay connected to your Bean. You'll use the Bean in the upcoming steps.

### Save the Processing Sketch

This is a Processing sketch that talks to your Bean. Here's what it does:

* Reads values coming from the Bean's Virtual Serial port
* Interprets those values as X, Y, and Z accelerometer values
* Visualizes those values to show the Bean's current acceleration on each axis

```
import processing.serial.*;

String portName = "/dev/tty.LightBlue-Bean";
PFont font = createFont("Helvetica Neue", 16, true);
Serial beanSerial;

void setup() {
  size(800, 360);
  background(52, 73, 94);
  noStroke();
  textFont(font);
  drawBarBackgrounds();
  beanSerial = new Serial(this, portName, 57600);
}

void draw() {
  checkForData();
}

void checkForData() {
  if (beanSerial.available() > 0) {
    byte[] received = beanSerial.readBytesUntil('\n');

    if (received == null || received.length < 3) {
      return;
    }
    
    int x = received[0];
    int y = received[1];
    int z = received[2];
    visualizeAccel(x, y, z);
  }
}

void drawBarBackgrounds() {
  fill(44, 62, 80);
  rect(100, 80, 600, 40);
  rect(100, 160, 600, 40);
  rect(100, 240, 600, 40);
}

void drawBars(int widthX, int widthY, int widthZ) {
  fill(231, 76, 60);
  rect(100, 80, widthX, 40);
  fill(46, 204, 113);
  rect(100, 160, widthY, 40);
  fill(52, 152, 219);
  rect(100, 240, widthZ, 40);
}

void drawBarLabels() {
  fill(255);
  text("X", 120, 105);
  text("Y", 120, 185);
  text("Z", 120, 265);
}

void visualizeAccel(int x, int y, int z) {
  drawBarBackgrounds();
  
  int widthX = (x + 128) * 600 / 255;
  int widthY = (y + 128) * 600 / 255;
  int widthZ = (z + 128) * 600 / 255;
  
  drawBars(widthX, widthY, widthZ);
  drawBarLabels();
}
```

Open Processing. Copy and paste the above sketch into Processing. Save your sketch using **File > Save**:

### Enable Virtual Serial

Select your Bean and enable Virtual Serial:

### Run the Processing Sketch

Click the Play button to run your Processing sketch. You'll see the sketch canvas open.

As you move your Bean around and rotate it in the air, the Bean's accelerometer will read new values. You should see the colored bars move up and down to visualize these changes:



## Conclusion

## Troubleshooting

## Additional Notes