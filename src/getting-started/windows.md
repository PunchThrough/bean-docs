---
title: Bean Loader for Windows
layout: basic.hbs
autotoc: true
order: 4
---

## Introduction

In this guide, you'll install Bean Loader for Windows and wirelessly program a sketch to your Bean. You'll also learn how to interact with your Bean using Bean Loader. 

{{{img_rel this 'windows_surf_reporter.PNG' 'Bean Loader for Windows' '60%'}}}

## Before You Begin

{{> snip_req_getting_started}}

### Software

* Windows 8.1 or above
* Access to the Microsoft Store for downloading apps

### Hardware

* {{> snip_req_bean}}
* Windows PC or tablet with BLE support

If your computer does not have BLE support built in, you can use a [USB BLE dongle](http://punchthrough.myshopify.com/collections/all/products/bluetooth-smart-usb-dongle-iogear) instead.

## Install Arduino

Download [Arduino 1.6.5](https://www.arduino.cc/en/Main/OldSoftwareReleases) and install it into the default location:

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

A screen will appear asking you for a passcode. Enter **0** to continue:

{{{img_rel this 'windows_device_passcode.PNG' 'Windows 10 Passcode Screen' '60%'}}}

It may take a while for Windows to connect to your Bean at first. Watch the status bar for progress. If the connection was successful, the Bean's status will read **Connected**:

{{{img_rel this 'windows_bean_paired.PNG' 'Connected Bean' '60%'}}}

## Open Bean Loader

Bean Loader allows for wireless programming of Arduino sketches to your Bean. Open it from the Windows Start Screen:

{{{img_rel this 'windows_sketch_compiled.PNG' 'Bean Loader for Windows' '80%'}}}

### Select Your Connected Bean

Your connected Beans will appear in the list on the right side of the screen. Select the Bean you paired with in PC Settings:

{{{img_rel this 'windows_loader_bean.PNG' 'Windows Loader Beans' '60%'}}}

### Update Your Bean

Once connected, you may be prompted to update the firmware on the Bean. Firmware updates come with new features and stability fixes. It's important to install these to reliably program Bean.

* Select **Update Firmware** to begin. The first update may take up to 8 minutes.
* After the update completes, disconnect and reconnect your Bean in PC Settings.

You can update a Bean's firmware manually in the menu:

{{{img_rel this 'windows_loader_update.PNG' 'Bean Firmware Update' '60%'}}}

## Open the Blink Example

Open the Arduino IDE. Select the LightBlue Bean as your target board:
  * Select **Tools**
  * Select **Boards** 
  * Select **LightBlue Bean**

Open the BeanBlink example sketch:
  * Select **File**
  * Select **Examples** 
  * Select **LightBlue-Bean**
  * Choose the sketch **BeanBlink**

Select the **Upload** button in the top left corner to compile the Sketch:

{{{img_rel this 'windows_arduino_beanblink.PNG' 'BeanBlink Arduino Sketch' '60%'}}}

## Select Your Sketch in the Bean Loader

Your compiled sketch will appear in the **WindowsBeanLoader** document folder.

* Select **Select Sketch Folder** near the top of the Bean Loader screen
* Select the **WindowsBeanLoader** folder

**Important:** This needs to be done every time the application is opened (not every time a sketch is compiled), as Windows Store apps cannot access folders without permission.

## Program Your Bean

The **BeanBlink** sketch you verified in Arduino is ready for loading. You can see **BeanBlink.hex** at the top of the Bean Loader window.

Select **Program** to start uploading your sketch:

{{{img_rel this 'windows_programming_bean.PNG' 'Bean Loader Programming' '80%'}}}

Once the sketch finishes uploading, your Bean will start running it!

{{{img_rel this 'windows_programmed_bean.PNG' 'Programmed Bean' '80%'}}}

Nice job! You have successfully programmed your Bean with the BeanBlink sketch using Bean Loader.

## Conclusion

In this guide, you installed Bean Loader for Windows and programmed your Bean with an example sketch. You should be ready to get started writing and uploading sketches to your Bean!

## Bean Loader Tips

If you have multiple Beans, you can blink Bean's LED from Bean Loader to locate the Bean that you are connected to.  Connect to a Bean, then select **Commands**, and finally select **Blink LED**.

The **BeanBlink** sketch uses the LED and is therefore power hungry. To preserve your battery when you are finished, you can turn off the onboard Arduino. Connect to your Bean and select the **Arduino on/off** menu item.

## Troubleshooting

### No Beans are appearing in PC Settings.

It may take a while for your Bean to appear in the PC settings, but Beans usually appear in less than 30 seconds. If no Beans appear, you may want to check the battery on your Bean. You should also try cycling the power on your BLE hardware.

### No Beans are appearing in Bean Loader.

If a Bean is not appearing in the list on your Bean Loader, ensure you have run through the steps above in [Connect to Your Bean](#connect-to-your-bean).

### No Beans are appearing in Bluetooth Settings When Beans are in iBeacon Mode.
If your Bean is in iBeacon mode, Windows will not see it. You have to [reset the Bean's memory](../../help/troubleshooting/#reset-your-bean-s-memory)  in order for Windows to recognize your Bean. 

### Further Troubleshooting

{{> snip_troubleshooting}}
