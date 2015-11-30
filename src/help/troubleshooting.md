---
title: Troubleshooting
layout: basic.hbs
autotoc: true
---

Are you having trouble with your Bean or Bean Loader? We're sorry to hear it. Here are some steps we have found to help users experiencing problems.

## Check Your Battery

When you power on Bean, its LED will blink green if the battery is charged and red if the battery is very low. If the LED does not blink, your Bean's battery is dead.

If your battery is low or dead, replace or recharge it before continuing with further troubleshooting.

## Reset Bluetooth

If you're having trouble discovering your Bean, try power cycling your Bluetooth connection and re-opening your loader.

1. Close your Bean Loader.
2. Turn off your device's Bluetooth.
3. Wait a few seconds.
4. Turn Bluetooth back on.
5. Open your Bean Loader again and see if your Bean appears.

## Power Cycle Your Bean

If your Bean is not connecting, frequently disconnects, or doesn't show up in Bean Loader after resetting Bluetooth, try power cycling your Bean.

* Bean: Remove and replace the coin cell battery.
* Bean+: Flip the power switch off and back on.

## Reset Your Bean's Memory

If you have tried all the other troubleshooting steps and nothing has helped, the sketch loaded on Bean may be at fault. Some sketches may cause Bean to lock up if they send lots of serial data very fast. This may cause you to be unable to connect to Bean to erase the sketch.

To reset Bean's memory, follow these steps. **This will erase any sketch and all settings!**

### Bean

1. Remove the coin cell battery.
2. Connect the **\*** and **BAT** pins with a wire as shown below:  
   TODO image
3. Insert the coin cell battery.
4. After 2 seconds, remove the wire.

TODO video https://www.youtube.com/watch?v=I_4s842e7MU

### Bean+

TODO steps

## Check Arduino IDE's Version

TODO

## Go to Beantalk

TODO

