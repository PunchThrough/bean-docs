---
title: Bean Loader for Windows
layout: basic.hbs
autotoc: true
order: 2
---

## Introduction

In this guide, you'll install Bean Loader for Windows and wirelessly program a sketch to your Bean. You'll also learn how to interact with your Bean using Bean Loader. 

{{{img_rel this 'windows_surf_reporter.PNG' 'Windows Bean Loader' '60%'}}}

## What You Need

### Hardware

* LightBlue Bean
* Windows PC or tablet with BLE support

If your computer does not have BLE support built in, you can use a [USB BLE dongle](http://punchthrough.myshopify.com/collections/all/products/bluetooth-smart-usb-dongle-iogear) instead.

### Software

* Windows 8.1 or above
* Access to the Microsoft Store for downloading apps

## Install Arduino

Download the [latest Arduino app](https://www.arduino.cc/en/Main/Software) and install it into the default location:

{{{img_rel this 'windows_install_arduino.PNG' 'Install Arduino'}}}

## Install Bean Loader

Download Bean Loader from the Microsoft Store:

<div class="guide-img-holder"><a href="https://www.microsoft.com/store/apps/9nblggh0xfmh"><img src="../../_assets/images/getting-started/windows/get-it-from-ms.png" alt="Get it from Microsoft" width="30%" class="guide-img"></a></div>

After downloading the application, follow the installer instructions to complete the installation.

## Install the Arduino IDE Addon

The Arduino IDE addon sets up the Arduino libraries that you need to get started building with Bean.

* Download the [Bean Arduino IDE patch](http://punchthrough.com/files/bean/loader/windows/WindowsBeanLoader_ArduinoIDEAddOn.zip).
* Extract the archive and run the installer.
* Make sure the installer finds the correct directory for Arduino IDE. The installer assumes that **C:\Program Files (x86)\Arduino** is the correct installation directory, so you may need to change this.
* Make sure that the **Typical** install is selected and complete the installation.

After you install the patch, Arduino IDE will copy compiled sketches to the following folder so Bean Loader can access them:

**./Documents/WindowsBeanLoader/**

The addon will automatically create the folder for you after you finish building your first sketch.

## Connect to Your Bean

Managing connections to Beans is done through the **PC Settings** screen:

{{{img_rel this 'windows_devices.PNG' 'Windows 10 Settings Screen' '60%'}}}

* Open PC Settings through the Windows Start Screen
* Select **Devices**
* Select **Bluetooth**
* Select your Bean
* Select **Pair**

{{{img_rel this 'windows_bluetooth_devices.PNG' 'Windows 10 Bluetooth Devices' '60%'}}}

A screen will appear asking you for a passcode. Enter '0' to continue.

{{{img_rel this 'windows_device_passcode.PNG' 'Windows 10 Passcode Screen' '60%'}}}

It may take a while for Windows to connect to your Bean at first. Watch the status bar for progress. If the connection was successful, the Bean's status will read **Connected.**

{{{img_rel this 'windows_bean_paired.PNG' 'Connected Bean' '60%'}}}

## Using the Windows Bean Loader

The Windows Bean Loader allows for wireless programming of Arduino sketches to your Bean or Bean+.

{{{img_rel this 'windows_sketch_compiled.PNG' 'Windows Bean Loader'}}}

### Select Your Connected Bean

Your connected Beans will appear in the list on the right side of the screen.

{{{img_rel this 'windows_loader_bean.PNG' 'Windows Loader Beans'}}}

Select the Bean that you wish to use.

### Update Your Bean

Once connected, you may be prompted to update the firmware on the Bean. You need to do this to reliably program Arduino sketches!

{{{img_rel this 'windows_loader_update.PNG' 'Bean Firmware Update'}}}

* Select "Update Firmware" to begin. The first update may take up to 8 minutes.
* After the update completes, you will need to disconnect and then re-connect your Bean using PC Settings.
* You can choose to update the firmware through the menu at any time.

## Open the Blink Example

* Open the Arduino app.
* Select the LightBlue Bean or Bean+ as the Board you are using.
  * Click Tools ->
  * Go to Boards -> 
  * Select LightBlue Bean or Bean+. 
* Now you can select the BeanBlink sketch.
  * Click File ->
  * Go to Examples -> 
  * Open LightBlue-Bean ->
  * Choose the sketch "BeanBlink."
* Click the “Upload” button in the top left corner to compile the Sketch [Note: this has changed from “Verify” in older versions].

{{{img_rel this 'windows_arduino_beanblink.PNG' 'BeanBlink Arduino Sketch'}}}

## Select Your Sketch in the Bean Loader
* Your compiled sketch will appear in the WindowsBeanLoader document folder.
* Click “Select Sketch Folder” near the top of the Bean Loader screen and select the WindowsBeanLoader folder.
* **Important:** This needs to be done every time the application is opened (not every time a sketch is compiled), as Windows Store apps cannot access folders without permission.

## Program Your Bean

* The “BeanBlink” sketch you verified in Arduino is ready for loading and is shown in grey text on the top of the Bean loader app.
* Click Program to start uploading your sketch.

{{{img_rel this 'windows_programming_bean.PNG' 'Windows Loader Programming'}}}

Once the sketch finishes uploading, your Bean will start running it!

{{{img_rel this 'windows_programmed_bean.PNG' 'Programmed Bean'}}}

Nice job! You have successfully installed the Windows Bean Loader and programmed your Bean with the BeanBlink sketch. 

## Conclusion

In this guide, you installed the Windows Bean Loader and programmed your Bean with an example sketch. You should be ready to get started uploading sketches to your Bean using Windows!

## Troubleshooting

### No Beans are Appearing in my PC Settings
It may take a while for your Bean to appear in the PC settings, but usually less than 30 seconds. If no Beans appear, you may want to check the battery, and reconnect any BLE dongle you may be using.

### No Beans are Appearing in my Bean Loader

If a Bean is not appearing in the list on your Bean Loader, ensure you have run through the steps above in [Connect to Your Bean](#connect-to-your-bean).

### Further Troubleshooting
If you are having other problems with the Windows Bean Loader, use the [Troubleshooting page](http://legacy.punchthrough.com/bean/support/troubleshooting/) or ask in the [Beantalk forum](http://beantalk.punchthrough.com/).

## Windows Bean Loader Tips

* If you have multiple Beans, you can blink an LED from the Windows Bean Loader to locate the Bean that you are connected to.  Choose “Commands” then “Blink LED” to do this.
* The “BeanBlink” sketch uses the LED and is therefore power hungry. To preserve your battery when you are finished, connect to your Bean and toggle the "Arduino on/off" button.
