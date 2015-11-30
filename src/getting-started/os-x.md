---
title: Bean Loader for OS X
layout: basic.hbs
autotoc: true
order: 2
---

## Introduction

When you use your Mac, writing code for Bean is mostly the same as writing code for an Arduino Uno. You use Arduino IDE to open example sketches, edit sketches, and connect to Bean using the serial monitor.

Bean Loader helps you find, connect to, and program your Beans. When you click Upload in Arduino IDE, the IDE compiles and passes your sketch to Bean Loader. Then Bean Loader uploads your code to Bean over Bluetooth Low Energy.

In this guide, you'll upload an example sketch to your Bean, edit it, and save a copy to your computer. You'll also learn about the different features in Bean Loader for OS X.

## What You Need

To start building with Bean on your OS X computer, you'll need:

* A Mac computer with Bluetooth LE support (built in or with a USB dongle)
* A LightBlue Bean or Bean+

## Get Started

### Install Arduino

Download and install the latest version of [Arduino IDE](https://www.arduino.cc/en/Main/Software).

### Install Bean Loader

Download the latest Bean Loader from the [downloads page](#).

Open the downloaded DMG file, then drag and drop the Bean Loader icon into Applications:

TODO image

Once it's finished copying, double click the **Open me!** icon.

### Associate with Arduino

When you first start Bean Loader, it will ask to associate with your copy of Arduino IDE. This lets Arduino send compiled sketches to Bean Loader. Click "Associate" and select Arduino in your Applications directory:

TODO image

Once you've associated, restart Arduino IDE and you should see Bean listed as a board:

TODO image

## Using Bean Loader

### Find a Nearby Bean

Bean Loader will show a list of Beans in your nearby space. Click Refresh to clear the list and start or restart scanning for Beans.

TODO: picture of refresh button. Maybe gfycat of beans showing up

You should see nearby Beans appear as they're discovered. Each Bean shows an RSSI on the left indicating its signal strength. If you have lots of Beans, you can use the signal strength to help you pick the right Bean to program.

### Blink Bean's LED

Find a Bean that's near you. Then right click its name in Bean Loader and select **Connect** from the context menu:

TODO image

Once your Bean is connected, right click on its name again and select **Blink LED**: 

TODO image

You should see the LED on your Bean blink:

TODO: gif of the Bean blinking

This is a great way to make sure you're connected to the correct Bean right before you program it.

### Rename Your Bean

Now that you've found your Bean, you should name it so you can tell it apart from other Beans. Here are some names we suggest:

* Beantron3000
* Navy Bean Soup
* Knit Wool Beanie
* Sir Beanadict VI

Start by connecting to the Bean you want to rename. Once you're connected, double click on its name. A text box will appear that you can use to enter your Bean's new name:

TODO image

And yes... you can use emoji. 💯

### Add a Pairing PIN

If you're in space with lots of Beans, or concerned about security for a project, adding a pairing PIN is the thing for you. Only people with the pairing code will be able to connect and program the Bean. You'll only need to enter the code when your computer connects for the first time.

Connect to your Bean, right click on it, and select "Pairing PIN Settings". Choose your passcode and enable. 

TODO image

### Ignore Your Neighbor's Beans

Your Bean Loader window may be overwhelmed with nearby Beans. If you want to keep some Beans out of the way, you can right click on uninteresting Beans and select **Ignore**.

Ignored Beans will always be displayed in a light grey color at the bottom of your list:

TODO image

### Open An Example Sketch

Open Arduino IDE. Select **Tools &rarr; Board &rarr; LightBlue Bean** (or **LightBlue Bean+**). This tells Arduino IDE to use the Bean libraries when compiling your Arduino sketch.

TODO image

Once you've selected your board, open the example sketch by selecting **File &rarr; Examples &rarr; LightBlue-Bean &rarr; Bean Blink**.

TODO image

## Programming Your Bean

Now that you have a sketch open, it's time to compiile and upload it to your Bean!

### Send to Bean Loader

Click **Upload** to compile the example sketch and send it to Bean Loader. 

TODO image

You should see the sketch name "Bean Blink" appear in the bottom left corner of Bean Loader:

TODO put a picture showing the sketch name in bottom left

### Upload to Bean

Connect to your Bean. Right click and select "Program Sketch".

Once the sketch upload is complete, you should see your Bean running the Bean Blink sketch. Watch for the blinkenlights! 

### Communicate with the Bean over serial

The Bean talks over Bluetooth LE which is a little different from the serial port you use with an Arduino Uno. To make the Bean work with Arduino IDE's Serial Monitor, we built **Virtual Serial**. This feature takes incoming data from Bean sent over Bluetooth and pipes it to a serial port on your computer. It also takes any data you write to that port and sends it to Bean via Bluetooth.

You need a sketch that sends data to serial to see the Virtual Serial port work. Open the **Temperature** sketch in the LightBlue Bean example sketches. Compile the sketch, connect to your Bean, and upload it.

Right click your connected Bean and select "Use for Virtual Serial". Serial messages from your Bean will now be piped to and from `/dev/cu.LightBlue-Bean`.

In Arduino IDE, select the Virtual Serial port: **Tools -> Port -> /dev/cu.LightBlue-Bean**.

TODO image

Now open Arduino's Serial Monitor:

TODO image

You should see a live log of your Bean's ambient temperature in the Serial Monitor.

## Conclusion

In this guide, you configured your Bean and Bean Loader, programmed your Bean with example sketches, and read data from your Bean with Virtual Serial. You should be ready to start exploring the LightBlue Bean example sketches and try out the Bean's many features!

