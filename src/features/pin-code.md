---
title: PIN Code Security
layout: basic.hbs
autotoc: true
---

## Introduction

Out of the box, your Bean can be programmed by any device with BLE running Bean Loader. If you’d like to ensure you are the only one who can program your Bean, you can configure Bean to require a PIN code on connection.

In this guide, you'll set up PIN code security on your Bean. Only your authorized devices will be able to connect to, program, and update your Bean.

## Setup

{{> snip_req_getting_started}}

### Software

* Bean Loader for OS X ([install guide](../../getting-started/os-x))

### Hardware

* {{> snip_req_bean}}
* Computer or mobile device

## Enabling PIN Code Security

### Set the Bean's PIN Code

Open Bean Loader for OS X. Scan for and connect to your Bean.

Once you have connected to your Bean, right-click on it and select **Pairing PIN Settings**:

{{{img_rel this 'Pairing-PIN-Settings.JPG' 'Pairing PIN Settings' '60%'}}}

Now you can set your Bean's PIN code:

{{{img_rel this 'PinCodeSetting.JPG' "Set Bean's PIN code"}}}

Valid PIN codes are 6-digit numbers in the range 000000 to 999999.

Once you enter a valid PIN and click Enable, Bean Loader will set your Bean's PIN code and secure your Bean. You'll see a padlock by your Bean:

{{{img_rel this 'BeanLocked.JPG' 'Bean is PIN protected'}}}

After entering your PIN, both your Bean and your device will save the connection information. The next time you connect to your Bean with the same device, it will bypass PIN code authorization and connect immediately.

If you don’t enter the correct PIN when you connect another device, you will be disconnected from the Bean. No information can be read from the Bean unless a device connects with the correct PIN.

Now you can upload a sketch to your Bean just like you normally do!

### Verify Authentication Works

To test your Bean's new PIN code, disconnect from your Bean, then reconnect. OS X should prompt you to provide a PIN for your Bean:

{{{img_rel this 'PinRequest.JPG' 'OS X pairing request' '80%'}}}

Enter the PIN you assigned and press Enter to connect to your Bean.

You will notice that the next time you connect to your Bean with the loader, you will not be prompted to enter your PIN code. This is normal! The Bean knows it connected to your computer last and will not prompt again for a PIN code. In the BLE world, this authentication step is known as **bonding**.

### Disabling Authentication

If you’d like to remove authorization protection from your Bean, perform the following steps.

* Connect to your Bean with the loader. Enter your PIN code if the pairing prompt appears.
* Right-click on your Bean and select **Pairing PIN Settings**.
* Click the **Disable** button on the PIN code configuration screen.

The lock icon should disappear. You can now connect to your Bean without a PIN code.

## Conclusion

In the guide, you learned how to enable and disable Bean's PIN code protection. This can help keep your device secure if it's somewhere public where lots of people can connect to it wirelessly.

## Troubleshooting

### I Forgot My PIN Code

If you cannot remember your PIN code, or don’t have access to the loader application, you can erase your PIN code by following the steps provided on the Troubleshooting page under [Reset your Bean](../../help/troubleshooting/#reset-your-bean-s-memory). This will erase any sketch loaded on your Bean!

### Bean Doesn't Remember My Device

If you are constantly being asked to enter a PIN code, Bean's list of bonded devices may have grown too large to authorize your device. Setting a new PIN code will clear Bean's device bonding table so it can keep track of your device.

Bean's bonded device list will be cleared if you do any of the following:

1. Set a new PIN code
2. Disable PIN code authorization
3. Reset your Bean

### Other Problems

{{> snip_troubleshooting}}
