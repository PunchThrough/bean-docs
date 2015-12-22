---
title: Security with Pin Codes
layout: basic.hbs
autotoc: true
---

## Introduction
Out-of-the-box, your Bean can be programmed by any device with bluetooth 4.0 that has the Bean Loader application installed. If you’d like to protect your Bean from unauthorized tampering, you can configure the Bean to require the device to authenticate the connection. Then, only your authorized devices can connect to, program, and update your Bean.

## Setup

Please make sure you're familiar with the following before starting this guide:

* [Getting Started](../../getting-started/intro)

### Software

* Bean Loader [install guides](../../getting-started/intro/#next-steps)

### Hardware

* [LightBlue Bean](http://punchthrough.myshopify.com/products/bean)
* Mobile or Computer device

## Configuring the Pin Code
### Set the Bean's Pin Code
This tutorial assumes you are familiar with [Getting Started](../../getting-started/intro). 

Once you have connected to your Bean, you can right click and choose **Pairing PIN Settings**:

{{{img_rel this 'Pairing-PIN-Settings.JPG'}}}

Afterwards, you can set your secret pin.  The pin code you enter will be one of your choosing. It can be a number from 000000 – 999999 (6 digits). After entering your pin, your Bean will store information about the device you’re connecting to the Bean with; the next time you connect to your Bean with the same device, it will bypass the pin code authorization screen and connect immediately.

If you don’t enter the correct pin, you will eventually be disconnected from the Bean. No information can be read from the Bean unless the device you are connecting to it with has been authorized!

{{{img_rel this 'PinCodeSetting.JPG'}}}

Now, your Bean is locked.  If someone is trying to pair with your Bean, they will have to enter the pin in order for a device to connect to it. If your Bean does not have a lock next to it, ensure that you are running the latest firmware, and try running through the pin code configuration process again.

Now you can program a sketch on your Bean!

{{{img_rel this 'BeanLocked.JPG'}}}

### Connecting with Authentication Enabled
To test if your Bean was successfully configured, disconnect from the Bean and reconnect. You should receive the OS X pin code authorization screen show earlier. Enter your six digit code and press Enter to connect to your Bean. You will notice that the next time you connect to your Bean with the loader, you will not be prompted to enter your pin code. This is normal! The Bean stored information about the computer you used to connect to it last and will not prompt for a pin code to make your life easier. In the BLE world, this authentication step is known as “bonding.” Your computer has “bonded” with your Bean and can bypass the pin code process. 

{{{img_rel this 'PinRequest.JPG'}}}

### Disabling Authentication

If you’d like to remove authorization protection from your Bean, perform the following steps.

1. If you know your pincode, or are connecting to a device that has bonded with your Bean, connect to your Bean with the loader.
2. Right-click on your Bean to bring up the context menu and choose “Pairing PIN Settings”
3. On the pin code configuration screen, click the “Disable” button on the lower-right of the screen.
4. The lock icon should not be present and you can now connect to your Bean without using pin codes

If you cannot remember your pin code, or don’t have access to the loader application, you can reset your Bean using using the steps provided on the Troubleshooting page under [Reset your Bean](../../help/troubleshooting/#reset-your-bean-s-memory)

### Notes on Bonding
Any devices you have bonded with will be removed from the bonded device list if you do one of the following:

1. Set a new pin code
2. Disable pin code authorization
3. Reset your Bean

If you are constantly being asked to enter a pin code, the list of bonded devices may have grown too large. Try setting a new pin code to reset the bond table and try again.

## Conclusion
In the guide, you learned how to secure your Bean so no intruders can read your Bean's data. 

## Troubleshooting

{{> snip_troubleshooting}}