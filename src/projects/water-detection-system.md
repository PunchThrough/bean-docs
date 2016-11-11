---
title: Water Detection System
layout: basic-top-image.hbs
img: ../../projects/water-detection-system/1IMG_0009.jpeg
autotoc: true
order: 1
---

## Introduction

{{{img_rel this '2leaks.gif' 'Has this ever happened to you?' '100%'}}}

Ever find yourself in this situation…

It’s happened to me. But, worry no more with this water detection system which is fun to build and capable of saving you some $$$ when the plumbing busts.

**This example shows how to use Node-RED on a RaspberryPi to send an email whenever a moisture reading exceeds a threshold. Node-RED connects to the LightBlue Bean once a minute, requests the moisture and sends an email if water is detected.**

## Before You Begin

{{> snip_req_getting_started}}

### Software

* {{> snip_req_bean_loader}}

### Hardware

* {{> snip_req_bean}}
* [Raspberry Pi 2 Model B](http://www.adafruit.com/product/2358)
* [SeeedStudio Grove Moisture Sensor](http://www.seeedstudio.com/depot/Grove-Moisture-Sensor-p-955.html)
* [	SeeedStudio 2xAA Battery Holder](http://www.seeedstudio.com/depot/2xAA-Battery-Holder-p-1109.html)
* [SeeedStudio 4 Pin Male Jumper to Grove Conversion Cable](http://www.seeedstudio.com/depot/Grove-4-pin-Male-Jumper-to-Grove-4-pin-Conversion-Cable-5-PCs-per-Pack-p-1565.html)

### What do the different nodes do?

Node-RED is a visual programming interface for the Internet of things. If you haven’t used Node-RED with the LightBlue Bean before, here is more [information]({{relativeRoot}}guides/node-red/what-is-node-red/).

This example uses a RaspberryPi to run the Node-RED server. The node red server acts as an internet access point for the LightBlue Bean. Here are the full [installation]({{relativeRoot}}guides/node-red/installation/) details for using the LightBlue Bean and Node-RED.

This is what the Node-RED flow for the project looks like:

{{{img_rel this '3flow3.png' 'flow diagram' '100%'}}}

**1 min interval:** Triggers the nodes it’s connected to on a set interval. In this example the interval is 60 seconds.

**Bean serial:** This is a node developed specifically for the LightBlue Bean. It connects to a specified Bean and allows you to send and receive serial messages.

**Moisture threshold:** Compares the current moisture to a high threshold. If it’s too wet it sends a string with the moisture reading to the next node.

**Email:** Sends the string passed from the previous node to a specified address.

## Make It

### Get Node-RED up and running on the RaspberryPi

Follow these [instructions](http://nodered.org/docs/hardware/raspberrypi.html) to set up Node-RED.

{{{img_rel this '4IMG_0006.jpg' 'Raspberry Pi' '105%'}}}

### Gather Other Parts

{{{img_rel this '5IMG_0001.jpg' 'other components' '100%'}}}

### Wire the Bean

Solder the wires accordingly and connect the Grove moisture sensor using the 4 pin male jumper to Grove conversion cable.

{{{img_rel this '6diagram1.png' 'wiring diagram' '100%'}}}

And here's how it should look in real life:

{{{img_rel this '7IMG_0004.jpg' 'how it should look' '60%'}}}

## Program Your Bean

Upload the following sketch to your Bean or Bean+ to measure the moisture:

```cpp
int sensorPin = A0;
int sensorValue = 0;

void setup() {
    Serial.begin(9600);
}

void loop() {
    sensorValue = analogRead(sensorPin);
    Serial.println(sensorValue);
    Bean.sleep(1000000000);
}
```
### Copy File to Clipboard

Copy the following JSON data to your clipboard:

```json
[{"id":"912350e5.6edcb",
  "type":"bean",
  "name":"Water Sensor Bean",
  "uuid":"",
  "connectiontype":"timeout",
  "connectiontimeout":"2"},
  
 {"id":"5ec0d702.a13f28",
  "type":"bean serial",
  "name":"Bean Serial",
  "bean":"912350e5.6edcb",
  "newline":"\\n",
  "bin":"false",
  "out":"char",
  "addchar":true,
  "x":302.5,
  "y":83,
  "z":"ab0aaa47.54f558",
  "wires":[["5bc0a855.a43f58"]]},
  
 {"id":"5bc0a855.a43f58",
  "type":"function",
  "name":"moisture threshold",
  "func":"context.previousMoisture = context.previousMoisture || 0;\n
  		  var moisture = msg.payload;\n\n
  		  var upperThreshold = 400;\n\n
  	      // Check if the new moisture is different from the previous\n
  	      if (context.previousMoisture != moisture) {\n
  	      // Check if moisture outside threshold\n\t
  	      if ( moisture >= upperThreshold){\n
  	      // Compose alert email\n\t\t
  	      msg.payload = \"Water detected! Current moisture is \"
  	                    + (String(moisture)-upperThreshold)
  	                    + \" above threshold.\";\n
  	      return msg;\n\t}\n}",
  "outputs":1,
  "valid":true,
  "x":505.5,
  "y":83,
  "z":"ab0aaa47.54f558",
  "wires":[["918c428b.6e73c"]]},
  
{"id":"6915426.f96eabc",
"type":"inject",
"name":"1 min interval",
"topic":"",
"payload":"!",
"payloadType":"string",
"repeat":"60",
"crontab":"",
"once":false,
"x":143.5,
"y":83,
"z":"ab0aaa47.54f558",
"wires":[["5ec0d702.a13f28"]]},

{"id":"918c428b.6e73c",
"type":"e-mail",
"server":"smtp.gmail.com",
"port":"465",
"name":"",
"dname":"Email",
"x":679.5,
"y":83,
"z":"ab0aaa47.54f558",
"wires":[]}]
```

### Import Project File to Node-RED

Go to `http://<your pi's ip>:1880/` in your  browser. Click the menu in the top right corner and choose `import > clipboard`.

{{{img_rel this '8Screen-Shot-2015-02-02-at-16.08.44-2-e1422924839109.png' 'Node-RED import' '100%'}}}

### Add Your Bean

Double click the Bean serial node and click on the pen to edit the Bean settings. Update the name to be the name of your Bean. It is important you write the exact name as it’s the only way for Node-RED to find and connect to the correct Bean.

{{{img_rel this '9bean-serial-config-5-seconds.png' 'Bean serial config' '100%'}}}

### Set Up Email

Double click the email node and fill in the account details for your email.

{{{img_rel this '10screen-shot-2-1024x558.png' 'set up email' '100%'}}}

### Deploy

Click deploy in the top right corner to update server.

### Test Water Detection System

Place the sensor in water to send the warning email.

{{{video_rel this 'IMG_0013.mp4' '100%' true }}}