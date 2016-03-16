---
title: Tweeting from Bean
layout: basic.hbs
autotoc: true
---

## Introduction

Say you want to build an app that tweets Bean's temperature. Normally, you'd have to go through the process of writing software that can speak to both Twitter and your Bean. If you use Node-RED, you can avoid having to write that software since it understands how to communicate with both Twitter and your Bean!

In this tutorial, you'll build a Node-RED flow that connects your Bean's temperature sensor to a Twitter account.

## Before You Begin

{{> snip_req_getting_started}}

### Software

* {{> snip_req_bean_loader}}
* Node-RED ([install guides](../installation))

### Hardware

* {{> snip_req_bean}}
* Computer

## Program Your Bean

Connect to your Bean and upload this Arduino sketch using Bean Loader:

```
int8_t temp = 0;

void setup() {
  // We don't need to do anything here; Serial is configured automatically on Bean
}

void loop() {
  int8_t newTemp = Bean.getTemperature();
  if (newTemp != temp) {
    temp = newTemp;
    Serial.println(temp);
  }

  Bean.sleep(10000);
} 

```
Here's what the code does:

* **Line 1**: Declare `temp` as an 8-bit long integer. Declaring it outside `loop` causes it to keep its value between loops.
* **Line 7**: The [loop function](https://www.arduino.cc/en/Reference/Loop). This function is executed continuously until Bean is either turned off or unprogrammed.
* **Line 8**: Read the temperature value from bean.
* **Line 9**: Check if the temperature has changed since the last loop.
* **Line 10**: If the temperature has changed, save the new value for reference next time.
* **Line 11**: Send the temperature information back to Node-RED followed by a newline character `\n`. This allows Node-RED to separate the messages.
* **Line 14**: Sleep for 10 seconds. This prevents Twitter from being bombarded with tweets from Bean.

## Program Bean on Node-RED

Once you have programmed Bean, disconnect from your Bean in Bean Loader. Then start Node-RED and open it in your browser:

{{{img_rel this 'Node-RED.jpg'}}}

Add a **Bean serial** node to your flow. Double-click it to configure it. Ensure your Bean is selected and the node is splitting incoming data on the character `\n`:

{{{img_rel this 'Read-Bean-Serial-Data.JPG'}}}

Notice the `\n` character is configued as the input delimiter. This matches our Arduino sketch, since we use `Serial.println` to add `\n` to our temperature data.

Next, add a **Tweet** node to your flow. Join the two nodes by clicking and dragging a connection line between the two:

{{{img_rel this 'Tweet-info.JPG'}}}

Notice that the connector for the **Tweet** node is on the left side. Some nodes have connectors on both sides, indicating they can both receive incoming messages AND send outgoing messages.

Fill out the information for your Twitter login. Once that's done, click **Deploy** in the upper-right corner. 

{{{img_rel this 'Deploy-Node-RED.jpg'}}}

Now, go ahead and check your Twitter account to see tweets from your Bean!

## Conclusion

In this guide, we showed you how to implement the Bean's iOS SDK.  This guide should be served as a stepping stone for other projects you may want to create! 

## Troubleshooting

{{> snip_troubleshooting}}
