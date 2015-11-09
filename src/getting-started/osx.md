---
title: Bean Loader for OS X
layout: basic.hbs
autotoc: true
order: 2
---

## Introduction

In this guide, you'll upload an example sketch to your Bean, edit it, and save a copy to your Mac computer. You'll also walk through the different features in Bean Loader for OS X.

## What You Need

To start building with Bean on your OS X computer, you'll need:

* A Mac computer with Bluetooth LE support (built in or with a usb dongle). 
* A LightBlue Bean or Bean+

## Install Arduino

Download the [latest Arduino app](https://www.arduino.cc/en/Main/Software).

Extract the package and install the Arduino app into your Applications folder.


## Install Bean Loader

Download the [latest Bean Loader](http://legacy.punchthrough.com/files/bean/loader/latest.php?download).

Open the downloaded ".dmg" file, then drag and drop the Bean loader icon into the Applications folder.

Double click the “Open me!” icon.

## Associate with Arduino
When the notifier pops up, you will need to associate to the Arduino app in your Applications folder.

If no prompt appears or if you’d like to re-associate, open the Bean Loader, click “Bean Loader” in the menu bar and choose “Associate”.

# The Applications are installed! 

## The Bean Loader's Purpose

The Bean Loader is a utility for finding and programming your Beans. When writing code and testing the Bean on OS X, you mostly interract with the Arduino app. The Arduino app contains example sketches, the code editor, and a serial monitor for testing.  


## Let's find our Bean
The Bean Loader will show a list of Beans in your nearby space. Don't see any?  Press the Refresh button in the bottom left corner of the loader.

// TODO: put picture of refresh button. Maybe gifycat of beans showing up

Beans should start appearing. Their "RSSI" signal strength on the left most column is an indication of how near they are to you. 


## Blink the Bean's LED
OK, found the right one? Let's test out our assumption by blining the Bean's LED.

Right click your Bean in the Loader and select "Connect". When this is done, right click and select "Blink LED".
Your Bean should do a little lightshow for you. 

// TODO: gif of the Bean blinking

## Give your Bean the name it deserves
We've found our Bean, now let's name is something **EPIC**.
Beantron3000, Wool Beanie, and Sir Beanadict VI are all great options. 

To change the name, connect to the Bean, and then double click its name text. An editing box will appear where you can enter your new name. We know what you're thinking... Yes, your name can include emoji. 

// TODO: put emoji in here

## Make the Bean your own
If you're in space with lots of Beans, or concerned about security for a project, adding a pairing PIN is the thing for you. Only people with the pairing code will be able to connect and program the Bean. You'll only need to enter the code once when you're computer first connects. 

Connect to your Bean, right click on it, and select "Pairing PIN Settings". Choose your passcode and enable. 


## Ignore your neighbor's Beans
Your Bean Loader window may be overwhelmed with nearby Beans. In that case, right click on uninteresting Beans and select "Ignore". Ignored Beans will always be displayed in a light grey color at the bottom of your list.

## Open the "BeanBlink" example sketch
In your Arduino application, select **Tools -> Board -> "LightBlue Bean"**. 

Go to **File -> Examples -> LightBlue-Bean -> "Bean Blink"**.

Select the "Upload" button. 

In your Bean Loader you should see the sketch name "Bean Blink" in the bottom left corner. 

// TODO put a picture showing the sketch name in bottom left

## Upload to Bean

Connect to your Bean. Right click and select "Program Sketch".

Once the sketch upload is complete, you should see flashy colors on the Bean. 

## Communicate with the Bean over serial

Go back to the Example sketch folder and this time select "Get Temperature". Program the Bean. 

The Bean talks over Bluetooth LE which is a little different from traditional serial. To bridge the two, we use something called "Virtual Serial". Right click your connected Bean and select "Use for Virtual Serial". You're Bean's Bluetooth LE serial messages will now be piped to and from **/dev/cu.LightBlue-Bean**

In the Arduino application, select **Tools -> Port -> /dev/cu.LightBlue-Bean**

Now open Arduino's Serial Monitor (The magnifier button in the top right).

You should now see a live log of your Bean's ambient temperature. Enjoy this newfound knowledge. 


## Conclusion

In this guide, you configured your Bean and software, programmed your Bean with example sketches, and read data from your Bean with virtual serial. You should be ready to start exploring the LightBlue-Bean example folder and try out the Bean's many features! 

