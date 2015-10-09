---
title: Virtual Serial
layout: basic.hbs
autotoc: true
---

## Introduction

Say you have a digital [pushbutton](https://www.sparkfun.com/products/97) soldered onto your Bean. You want your laptop to post a tweet when you push the button. To get that to happen, you need the Bean to read the button and send data to your laptop when you push the button.

How do you get the Bean to send data back to the computer?

In order for any device to communicate with your computer, the device and computer must share a common communication protocol. The Bean and Bean Loader support Virtual Serial, an easy way to start talking to your Bean from the Arduino IDE.

In this guide, we will explore how Virtual Serial allows your computer and Bean to talk to each other. We'll build an example that uses the serial monitor on the Arduino IDE to send and visualize data coming from the Bean.

## Setup

Please make sure you're familiar with the following before starting this guide:

* [Getting Started](#)

### Software

* Bean Loader ([install guides](#))

### Hardware

* LightBlue Bean
* Mobile or Computer device

## How the Bean Communicates to the Computer: 

In contrast to traditional microcontrollers, microcontrollers equipped with Bluetooth Low Energy (BLE), such as the Bean and Bean+, follow a set of standarized rules and communication protocol defined in Bluetooth Core Specification 4.0. To get a better understanding of how some of the BLE network-stack is working, check out our [guide](#)

### Generic Access Profile (GAP) and General Attribute Profile (GATT)

GAP and GATT are two protocols that play a key role in the BLE stack. GAP defines the general topology of the BLE network stack. Essentially, GAP provides a framework that allows two devices to communicate. In contrast, GATT describes in detail how attributes (data) are transferred once devices have a dedicated connection.  All BLE sevices follow GAP and GATT. 

### Virtual-Serial

__Bluetooth Low Energy Doesn't Support Serial Characteristics:__
Unlike Bluetooth Classic, BLE stack doesn't have a Serial Port Profile (SPP).  The Bean Loader creates a virtual serial port:/dev/cu.LightBlue-Bean, and when a specific command is sent from the Atmega, the Bean Loader passes the payload through to the virtual serial port. We can connect to this port on the Arduino IDE. To see data that the Bean is sending, we can use the serial monitor. 

### Bean Connects to the Bean Loader App:

The Bean needs to advertise its presence in order for it to connect to a central device. The way the central device connects to the Bean is through the Bean Loader App. The Bean Loader is also what allows you to disconnect and program your Bean.  

### Bean Transmits Serial Data to the Computer:

The Bean transmits the data packets serially, where only one data packet can sequentially be communicated at a time.  Afterwards, the Bean Loader routes the data packets to the /dev/cu.LightBlue-Bean serial port, seen on the Arduino IDE. The data packets are actually presented to the /dev/cu.LightBlue-Bean.

## Visualizing and Transmitting Serial Data: 

 In order to see the data that is being transferred or send data back to the Bean,  we need a monitor that allows us to read and write values.  

Below is the sequence that describes the process of how you will use serial monitor:

__Bean Connects to Bean Loader:__
Once the battery is in the Bean and enabled, it starts broadcasting to the world letting central devices know that it wants to connect. 


__Upload and Compile A Program on the Arduino IDE:__
Once you have written your program, you need to upload the sketch and compile it. As an example, copy and paste this to the sketch on your computer:

``` 
// Notify the client over serial when a digital pin state changes

static int d0 = 0;
static uint8_t pinValue = 0;

// the setup routine runs once when you press reset:
void setup() 
{
  // initialize serial communication at 57600 bits per second:
  Serial.begin();
  
  // Digital pins
  pinMode(d0, INPUT_PULLUP);  

}

void loop()
{
 bool notify = false;
   uint8_t pinState = digitalRead(d0);
   
   if ( pinState != pinValue)
   {
     notify = true;
     pinValue = pinState;
   } 
 
 if ( notify )
 {
   Serial.write(pinValue);
   notify = false;
   pinState = 0;
 }
 
 // Sleep for half a second before checking the pins again  
 Bean.sleep(500);  
  }
}
```

* `Line 3` states that the pin soldered to GPIO 0 is not pushed.  This means it has a value of 0. Conversely, if the button is pressed, its value will change to 1. 
* `Line 4`  says that the 8-bit pinValue has an off state. This means it has a value of 0. 
* `Line 10` initializes serial communication at 57600 bps.   
Serial communication also comes at a cost. For example, when the module communicates to the Arduino at, there may be errors due to noise.  Take a look at the [Arduino docs](https://www.arduino.cc/en/Serial/Begin) to learn more serial!
* `Line 20`is reading the push button's state. If the state is off, the button is not pressed.  Conversley, if the state is on, the button is pressed. 
* `Line 22` is checking if the pinState is different from the pinValue. For example, if the pin is pressed, the pinValue becomes 1. 
* `Line 28` is checking if notify was set to true. 
* `Line 31` is resetting values so another button press can be detected.
* `Line 30` is writing to the serial monitor the pinValue


__Program the Bean with a Sketch:__
Now that we have the code compiled, we can program the Bean with it.  Right click on the Bean Loader and go to 'Program Sketch.'  


__Enable Virtual Serial on the Bean Loader:__
After we successfully programmed the Bean, we must enable virtual-serial. 


__Open the Serial Monitor on the Arduino IDE:__
The serial monitor is located on the Arduino IDE.  Specifically, it'll be on the right-hand side of your sketch. Since we enabled virtual-serial on the Bean Loader, we should see serial data on the serial monitor. 

## Conclusion

In this guide we took a more detailed approach to explain how the Bean transmits data to the computer by describing how the Bluetooth Low Energy stack operates.  

Knowing how to use the serial monitor provides many advantanges:
* Debugging
* Writing data to the Bean
* Reading data from the Bean

Checkout the [Arduino reference for serial](https://www.arduino.cc/en/Reference/Serial) to learn more about the commands available for serial. 

__References to Learn More About BLE:__

* [Getting Started with Bluetooth Low Energy](http://www.amazon.com/Getting-Started-Bluetooth-Low-Energy-ebook/dp/B00K1N23LA)
* [Bluetooth Low Energy Core Specification 4.0:](https://www.bluetooth.org/en-us/specification/adopted-specifications)


## Troubleshooting

Having trouble with this guide? Try the steps listed in [General Bean troubleshooting](#).







