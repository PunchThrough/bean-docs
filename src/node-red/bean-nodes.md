---
title: Bean Nodes
layout: basic.hbs
autotoc: true
order: 3
---

## Introduction

---

This guide will walk you through how to use the custom nodes for communicating with the Bean.

## Using Bean Nodes

---

When using any of the Bean nodes you will have to tell the flow which Bean you want to communicate with. To do this, begin by double clicking on any of the Bean nodes. You will see the following menu.

{{{img_rel this 'config-bean.png' 'Config Bean' '100%'}}}

Clicking on the pencil icon will allow you to configure the Bean name or UUID. Make sure one of these settings is accurate for your Bean.

{{{img_rel this 'config-bean-name.png' 'Config Bean Name' '100%'}}}

### Injecting and Debugging Flows 

Some of the following examples will make use of two important nodes, `inject` and `debug`. 

{{{img_rel this 'inject.png' 'Inject Node' '70%'}}}

{{{img_rel this 'debug.png' 'Debug Node' '70%'}}}

The inject node allows you to start a flow by clicking a button or by firing a timer. If you need to input test data such as a string the inject node is also used for that purpose. The Debug node will allow you to view the output from any node.

## Bean Node Examples

---

Check out the following sections to get an understanding on how to use the Bean nodes.

### LED Node

The Bean LED node allows you to set the red, green and blue values of a Bean's LED. Here is an example using an `inject` node to input a comma delimited RGB string `0,255,0` which is Green!

{{{img_rel this 'example-led-node.png' 'LED Node' '100%'}}}

### Acceleration Node

Sending any message to the accel node will result in a query to the Bean for accelerometer data. Check out this example where a blank inject node is used to trigger the accelerometer reading.

{{{img_rel this 'example-accel-node.png' 'Accel Node' '100%'}}}

__Note__: The acceleration reading is three fixed point numbers representing g-forces for X, Y and Z axis.

### Temperature Node

This node behaves in a very similar way to the accel node. Any message results in a query to the Bean for temperature data. Below is an example that uses the inject node to trigger the temperature reading.

{{{img_rel this 'example-temp-node.png' 'Temp Node' '100%'}}}

__Note__: The temperature reading is in __celsius__.

### Scratch Nodes

This section explains how to use both the `read` and `write` scratch nodes. The Bean provides 5 BLE characteristics that can old arbitrary data such as strings, numbers and binary data. The `read scratch` node will allow you to read the current value of any of the scratch characteristics on the Bean. The `write scratch` node allows you to write data to any scratch characteristic. 

Here is an example of two flows... one writes the string `"hi"` and the other reads it and logs it to the debug pane.

{{{img_rel this 'example-scratch-nodes.png' 'Scratch nodes' '100%'}}}

You can select which scratch characteristic to read/write to by double clicking on the node.

### Serial Node

The Bean features a "virtual serial port" which is essentially a pass-through of serial data to and from your Arduino Sketch. The `bean serial` node allows you to read and write arbitrary serial data using this virtual serial port. 

To show this functionality, here is an example flow that writes serial data to the bean and then reads the serial data back from the bean and logs it to the debug panel.

{{{img_rel this 'example-serial-node.png' 'Serial node' '100%'}}}

This example assumes there is a dead-simple serial loopback sketch programmed on the Bean which reads serial bytes and writes them back unadulterated. Like so:

```
int incomingByte = 0;

void setup() {
}

void loop() {
    if (Serial.available() > 0) {
        incomingByte = Serial.read();
        Serial.write(incomingByte);
    }
}
```

Also, the incoming and outgoing messages from the `bean serial` node need to be configured to include a "split" character in order to maintain the original message format.

{{{img_rel this 'example-serial-node-cfg.png' 'Serial node Config' '100%'}}}


## Conclusion

TODO

## Next Steps

* Check out some examples projects!
	* [Logging Bean data](https://www.hackster.io/punchthrough/projects)
	* [Tweet sentiment to LED](https://www.hackster.io/punchthrough/projects)
	* [Email temperature warning system](https://www.hackster.io/punchthrough/projects)
* [Official Node-RED docs](http://nodered.org/docs/)
