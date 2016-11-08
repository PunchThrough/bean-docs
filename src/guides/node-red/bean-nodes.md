---
title: Using Bean Nodes
layout: basic.hbs
autotoc: true
order: 3
---

**Disclaimer:** We are temporarily not offering support for the Node-RED project. The reason for this is because we are focusing our attention on an official [Node.js SDK and CLI Loader](../../node-sdk/overview/), rather than the forked and unsupported libraries that our Bean Node-RED project is currently based on. Once the Node SDKs and CLI Loaders are stable, we will determine if we need to rewrite the Node-RED implementation with the new SDKs, and fully support it again.

## Introduction

In this guide, you'll learn how to use the Bean nodes to build Node-RED flows that talk to your Bean.

## Picking the Right Bean

Every Bean node needs to know which Bean you want to communicate with. To configure a Bean node, double-click on it and the configuration window will pop up:

{{{img_rel this 'config-bean.png' 'Config Bean' '100%'}}}

Clicking on the pencil icon will allow you to configure Bean's name or UUID. Make sure one of these settings is accurate for your Bean.

{{{img_rel this 'config-bean-name.png' 'Config Bean Name' '100%'}}}

## Using Inject and Debug to Understand Flows

Some of the following examples will make use of two important nodes, inject and debug:

{{{img_rel this 'inject.png' 'Inject Node' '25%'}}}

{{{img_rel this 'debug.png' 'Debug Node' '25%'}}}

The inject node allows you to send an event to a node by clicking a button. It can also send events automatically on a timer. Finally, the inject node can send a string of your choice to any node.

The debug node will allow you to view the output from any node. Any data that comes into the debug node will appear under the Debug tab in the right-side pane of the Node-RED interface.

## Bean Node Examples

Here are some basic flows that demonstrate what's possible with Bean and Node-RED.

### LED Node

The Bean LED node allows you to set the red, green and blue values of a Bean's LED. Here is an example using an `inject` node to input a comma delimited RGB string `0,255,0` which is Green!

{{{img_rel this 'example-led-node.png' 'LED Node' '100%'}}}

### Acceleration Node

Sending any message to the acceleration node will result in a query to Bean for accelerometer data. Check out this example where a blank inject node is used to trigger the accelerometer reading.

{{{img_rel this 'example-accel-node.png' 'Accel Node' '100%'}}}

__Note__: The acceleration reading is three fixed point numbers representing g-forces for X, Y and Z axis.

### Temperature Node

This node behaves in a very similar way to the acceleration node. Any message results in a query to Bean for temperature data. Below is an example that uses the inject node to trigger the temperature reading.

{{{img_rel this 'example-temp-node.png' 'Temp Node' '100%'}}}

__Note__: The temperature reading is in __Celsius__.

### Scratch Nodes

This section explains how to use both the `read` and `write` scratch nodes. Bean provides 5 BLE characteristics that can old arbitrary data such as strings, numbers and binary data. The `read scratch` node will allow you to read the current value of any of the scratch characteristics on Bean. The `write scratch` node allows you to write data to any scratch characteristic.

Here is an example of two flows... one writes the string `"hi"` and the other reads it and logs it to the debug pane.

{{{img_rel this 'example-scratch-nodes.png' 'Scratch nodes' '100%'}}}

You can select which scratch characteristic to read/write to by double clicking on the node.

### Serial Node

Bean features a "virtual serial port" which is essentially a pass-through of serial data to and from your Arduino Sketch. The Bean Serial node allows you to read and write arbitrary serial data using this virtual serial port.

To show this functionality, here is an example flow that writes serial data to Bean and then reads the serial data back from Bean and logs it to the debug panel.

{{{img_rel this 'example-serial-node.png' 'Serial node' '100%'}}}

This example assumes there is a serial loopback sketch programmed on Bean. That sketch reads serial bytes and writes them straight back to the connected client. Here's an example you can use on your Bean:

```
void setup() {
  // no setup necessary
}

void loop() {
  if (Serial.available() > 0) {
    byte incomingByte = Serial.read();
    Serial.write(incomingByte);
  }
}
```

The incoming and outgoing messages from the Bean Serial node need to be configured to include a "split" character in order to maintain the original message format:

{{{img_rel this 'example-serial-node-cfg.png' 'Serial node Config' '100%'}}}

## Conclusion

This guide shows you how to start using the 6 custom nodes provided by Punch Through that communicate with Bean. Now go build something amazing!

## Next Steps

Check out some example projects for inspiration:

* [Log Bean data to a CSV file](https://www.hackster.io/punch-through/logging-data-from-the-bean-7653e6)
* [Turn a tweet's sentiment into an LED color](https://www.hackster.io/punch-through/tweet-sentiment-to-led-using-node-red-6a380a)
* [Send an email when Bean gets too hot or cold](https://www.hackster.io/punch-through/email-temperature-warning-system-using-node-red-43723f)

Or learn more about Node-RED at the [official Node-RED docs](http://nodered.org/docs/).
