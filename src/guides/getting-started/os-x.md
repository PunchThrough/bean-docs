---
title: Bean Loader for OS X
layout: basic.hbs
autotoc: true
order: 4
---

## Introduction

When you use your Mac, writing code for Bean is mostly the same as writing code for an Arduino Uno. You use Arduino IDE to open example sketches, edit sketches, and connect to Bean using the serial monitor.

Bean Loader helps you find, connect to, and program your Beans. When you click Upload in Arduino IDE, the IDE compiles and passes your sketch to Bean Loader. Then Bean Loader uploads your code to Bean over Bluetooth Low Energy.

In this guide, you'll upload an example sketch to your Bean, edit it, and save a copy to your computer. You'll also learn about the different features in Bean Loader for OS X.

**Note:** We also have a CLI Loader that works great on OS X!

[CLI Loader >>](../cli-loader/)

## What You Need

To start building with Bean on your OS X computer, you'll need:

* A Mac computer with Bluetooth LE support (built in or with a [USB dongle](http://punchthrough.myshopify.com/collections/all/products/bluetooth-smart-usb-dongle-iogear))
* [LightBlue Bean](http://punchthrough.myshopify.com/products/bean)

## Get Started

### Install Arduino

[Download and install **version 1.6.8** of Arduino IDE.](https://www.arduino.cc/en/Main/OldSoftwareReleases) The latest version of Arduino IDE has problems discovering the Virtual Serial port used by Bean.

### Install Bean Loader

[Download the latest Bean Loader.](http://punchthrough.com/files/bean/loader/latest.php?download)

Open the downloaded DMG file, then drag and drop the Bean Loader icon into Applications:

{{{video_rel this 'install.mp4' '60%' true}}}

Once it's finished copying, double click the **Open me!** icon.

### Associate with Arduino

When you first start Bean Loader, it will ask to associate with your copy of Arduino IDE. This lets Arduino send compiled sketches to Bean Loader. Click "Associate" and select Arduino in your Applications directory:

{{{img_rel this 'associate.png' 'Associate with Arduino' '60%'}}}

Once you've associated, restart Arduino IDE and you should see Bean listed as a board:

{{{img_rel this 'bean-in-menu.png' 'Bean board is installed' '60%'}}}

## Program Your Bean For The First Time

### Select Your Bean

Bean Loader's main view shows a list of nearby Beans. Click Refresh to clear the list and start scanning for Beans:

{{{video_rel this 'refresh.mp4' '60%' true}}}

You should see nearby Beans appear as they're discovered. Each Bean has a signal strength indicator to the left of its name.

If you have lots of Beans nearby, you can use the signal strength to help you pick the right Bean to program. Just bring your Bean close to your Mac, click Refresh, and see which Bean has the strongest signal.

Once you've found your Bean, right-click on it and select **Connect**:

{{{img_rel this 'connect.png' 'Connect to Bean' '60%'}}}

Your Bean will show **Connecting...** followed by **Connected**. Once your Bean is connected, you're ready to keep going.

**Be careful!** If you start programming the wrong Bean by mistake, you will overwrite its sketch. Try [blinking your LED](#blink-bean-s-led) to make sure you have the right Bean. You can also [rename your Bean](#rename-your-bean) to make sure you don't mix it up with other Beans in the future.

### Open An Example Sketch

Open Arduino IDE. Select **Tools &rarr; Board &rarr; LightBlue Bean**. This tells Arduino IDE to use the Bean libraries when compiling your Arduino sketch.

Once you've selected your board, open the example sketch by selecting **File &rarr; Examples &rarr; LightBlue-Bean &rarr; 1.Basics &rarr; BeanBlink**:

{{{img_rel this 'arduino-blink.png' 'Arduino: BeanBlink &rarr; LightBlue-Bean' '60%'}}}

Now that you have a sketch open, it's time to upload it to your Bean!

### Send to Bean Loader

Click **Upload** (the **&#10140;** icon in the upper-left of Arduino IDE) to compile the example sketch and send it to Bean Loader.

You should see the sketch name **BeanBlink** appear in the bottom-left corner of Bean Loader:

{{{img_rel this 'sketch-name.png' 'Sketch transferred from Arduino IDE to Bean Loader' '60%'}}}

### Upload to Bean

Connect to your Bean. Right click and select **Program Sketch**. You'll see the progress as your sketch is programmed and get a notification when it's done:

{{{video_rel this 'upload.mp4' '60%' true}}}

Once the sketch upload is complete, you should see your Bean running the Bean Blink sketch. Once your Bean's LED is blinking, you're done!

Congratulations. You have programmed your Bean wirelessly for the first time.

## Conclusion

In this guide, you installed Bean Loader, set up Arduino IDE and your Bean, and programmed your Bean with an example sketch. You should be ready to start exploring the LightBlue Bean example sketches and try out the Bean's many features!

One of the cool features in Bean Loader for OS X is Virtual Serial. This lets you connect to a Bean wirelessly and use it with Arduino IDE's Serial Monitor just like a wired board. [Check out our guide on using Virtual Serial.](../../features/virtual-serial/)

## Troubleshooting

### Can't Send Sketches From Arduino To Bean Loader

When you select Upload in Arduino IDE, does Bean Loader not receive the sketch? You may need to re-associate your Bean Loader with Arduino.

* Open Bean Loader.
* Press **Cmd + A** to open the Associate window.
* Select your copy of Arduino IDE, then select **Associate.**
* Restart Arduino IDE and Bean Loader.
* Finally, select Upload in Arduino IDE to send your sketch to Bean Loader.

### Bean Loader Doesn't Work After An Arduino IDE Update

Did Bean Loader stop working after you updated Arduino IDE? First, try re-associating Bean Loader with the steps under **Trouble Uploading from Arduino to Bean Loader**.

If you're still having trouble, it is likely that the Arduino IDE update broke compatibility with Bean Loader. Try [downloading the previous release](https://www.arduino.cc/en/Main/Software) and installing that one, then re-associating.

Please drop us a line on [Beantalk](http://beantalk.punchthrough.com) if something breaks. We want to know right away so we can get a fix to you!

### Known Issues

Pairing, which is required for ANCS, HID, and MIDI, creates a special bond between the OS and the Bean. Two known issues exist when the Bean is paired with the computer.

* Regular Bluetooth devices, such as headsets, being used at the same time are unstable due to a bug in some version of OS X. Connections may be interrupted or result in unexpected behavior.
* Connection states between the Bean Loader and Bluetooth Preferences are not the same. When a Bean is paired with the computer and you disconnect from it in the Bean Loader, the OS will remain connected to the Bean. If you want to connect to the Bean with another device or remove pairing, you will need to open Bluetooth Preferences and unpair by removing the device from the list of connected devices. 

### Other Issues

{{> snip_troubleshooting}}

## Other Features

Bean Loader for OS X comes with a few other features to improve your Bean-programming experience.

### Blink Bean's LED

Once you're connected to a Bean, right-click its name and select **Blink LED**:

{{{img_rel this 'blink.png' 'Blink Bean' '60%'}}}

You should see the LED on your Bean blink red briefly. This is a great way to make sure you're connected to the correct Bean before you program it.

### Rename Your Bean

Now that you've found your Bean, you should name it so you can tell it apart from other Beans. Here are some names we suggest:

* Beantron3000
* Navy Bean Soup
* Knit Wool Beanie
* Sir Beanadict VI

Start by connecting to the Bean you want to rename. Once you're connected, click on your Bean's row to select it, then click the name once more. A text box will appear that you can use to enter your Bean's new name:

{{{img_rel this 'rename.png' 'Rename Bean' '60%'}}}

And yes... you can use emoji. 💯

### Add a Pairing PIN

If you're in space with lots of Beans, or concerned about security for a project, adding a pairing PIN is the thing for you. Only people with the pairing code will be able to connect and program the Bean. You'll only need to enter the code when your computer connects for the first time.

Connect to your Bean, right click on it, and select "Pairing PIN Settings". Choose your passcode and enable.

{{{img_rel this 'set-pin.png' 'Set a Bean Pairing PIN' '60%'}}}

### Ignore Your Neighbor's Beans

Your Bean Loader window may be overwhelmed with nearby Beans. If you want to keep some Beans out of the way, you can right click on uninteresting Beans and select **Ignore**.

Ignored Beans will always be displayed in grey at the bottom of the list:

{{{img_rel this 'ignore.png' 'Ignored Beans are in grey' '60%'}}}
