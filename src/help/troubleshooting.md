---
title: Troubleshooting
layout: basic.hbs
autotoc: true
---

Are you having trouble with your Bean or Bean Loader? Here are some steps that might help you if you're experiencing problems.

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

## Reset Your Bean's Memory

If you have tried all the other troubleshooting steps and nothing has helped, the sketch loaded on Bean may be at fault. Some sketches may cause Bean to lock up if they send lots of serial data very fast. This may cause you to be unable to connect to Bean to erase the sketch.

To reset Bean's memory, follow these steps. **This will erase any sketch and all settings!**

1. Remove the coin cell battery.
2. Connect the **\*** and **BAT** pins with a wire as shown below:  
   {{{img_rel this 'reset-bent-wire.png' 'Connect * and BAT' '70%'}}}
3. Insert the coin cell battery.
4. After 2 seconds, remove the wire.

Here's a video by Beantalk user Nonsanity that shows how to reset Bean's memory:

<iframe width="560" height="315" src="https://www.youtube.com/embed/I_4s842e7MU" frameborder="0" allowfullscreen></iframe>

## Check Arduino IDE's Version

If you're using Bean Loader on your desktop, make sure you're running the latest version of Arduino IDE. If you need to update your copy, you can download the latest version on [the Arduino website](https://www.arduino.cc/en/Main/Software). After you update Arduino IDE, you will need to re-associate Bean Loader.

Occasionally, updates to Arduino IDE will break Bean Loader's integration. If you update Arduino IDE and your Bean Loader stops working, please [let us know on Beantalk](http://beantalk.punchthrough.com).

## Go to Beantalk

If none of the steps above have fixed the problem you're seeing, [ask for help on Beantalk](http://beantalk.punchthrough.com)! Beantalk is our community forum where people talk about Bean and ask questions when they need help. Our developers visit frequently, so it's the best place to go for help.
