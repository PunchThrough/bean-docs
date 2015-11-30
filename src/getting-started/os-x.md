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

### Ignore your neighbor's Beans

Your Bean Loader window may be overwhelmed with nearby Beans. In that case, right click on uninteresting Beans and select "Ignore". Ignored Beans will always be displayed in a light grey color at the bottom of your list.

## Open the "BeanBlink" example sketch

In your Arduino application, select **Tools -> Board -> "LightBlue Bean"**. 

Go to **File -> Examples -> LightBlue-Bean -> "Bean Blink"**.

Select the "Upload" button. 

In your Bean Loader you should see the sketch name "Bean Blink" in the bottom left corner. 

// TODO put a picture showing the sketch name in bottom left

## Programming Your Bean

### Upload to Bean

Connect to your Bean. Right click and select "Program Sketch".

Once the sketch upload is complete, you should see flashy colors on the Bean. 

### Communicate with the Bean over serial

Go back to the Example sketch folder and this time select "Get Temperature". Program the Bean. 

The Bean talks over Bluetooth LE which is a little different from traditional serial. To bridge the two, we use something called "Virtual Serial". Right click your connected Bean and select "Use for Virtual Serial". You're Bean's Bluetooth LE serial messages will now be piped to and from **/dev/cu.LightBlue-Bean**

In the Arduino application, select **Tools -> Port -> /dev/cu.LightBlue-Bean**

Now open Arduino's Serial Monitor (The magnifier button in the top right).

You should now see a live log of your Bean's ambient temperature. Enjoy this newfound knowledge. 


## Conclusion

In this guide, you configured your Bean and software, programmed your Bean with example sketches, and read data from your Bean with virtual serial. You should be ready to start exploring the LightBlue-Bean example folder and try out the Bean's many features! 

