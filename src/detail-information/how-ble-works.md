## How Bluetooth Low Energy (BLE) stack works:
The Bluetooth Protocol Stack is divided into two categories: the controller and the host.  Each category has sub-categories, which perform specific roles.  The two subcategories we are going to look at is the Generic Acess Profile (GAP) and the Generic Attribute Profile (GATT).  

### Generic Access Profile (GAP)
There are two mechanisms that a BLE device can communicate to the outside world: broadcasting or connecting. These mechanisms are subjected to the Generic Access Profile (GAP) guidelines. GAP defines how BLE-enabled devices can make themselves available and how two devices can communicate directly with each other.  A device can join a BLE network by adoping these roles specified in GAP: 

__Broadcasting__: 
_Main Idea_- Data packets are sent at fixed intervals in a unidirectional manner from the broadcaster to the observer. 
* __Broadcaster:__ A device that publicly broadcast advertising data packets, such as how long the push button has been pressed.  No connection happens between the broadcaster and observer. An example is when the battery is already put into the Bean, it automatically broadcast data packets to the observer. 
* __Observer:__  A devices that listens to the data in the advertising packets being broadcasted from the broadcaster. An example of a device that listens to the Bean is the computer.

__Connecting__: 
_Main Idea_ - A peripheral device that sends specific advertising data packets that inform the central device that it wants to connect. Once the peripheral connects, it no longer broadcasts data packets to the world until the connection is closed. 
* __Peripheral:__ A device that used advertising data packets to establish a connection with a central device. After connecting, peripherals no longer broadcast data to other central devices and stay connected to the device that accepted connectection request.  An example of a peripheral is when the Bean connects to the Bean Loader.  
* __Central:__ A device that initiates a connection with a peripheral device by first listenting to the advertising packets. A central device can connect to many other peripheral devices. An example of a central device is the computer.

__After Connection is Established__: 
_Main Idea_ - Additional procedures can occur once the peripheral device is exclusivley communicating to one central device by transmitting data packets: 

* __Data Packets Can Send the Device Name:__
Packets that are being sent from the peripheral to the central device carry general information.  Information that is transmitted can possibly contain a UTF-8 string of the device name. If the device name is not transmitted here, it'll be transmitted over GATT. 

* __Central Devices Can Update Connection Parameters:__ The central device typically establishes the connecting parameters between the peripheral device and itself.  The central device can only modify the connecting parameters.  However, the peripheral device can request the central device to change the connecting parameters. When the central device finds a data packet that has specific information that says it wants to connect, it sends a request connection data packet to the peripheral device.  If the peripheral device accepts the request from the central device, a connection is established.

* __Peripheral or Central Devices Can Terminate Connection:__ Connection termination can happen for a variety of reasons: battery dies on the device, network issues,  and the likes. 

### Generic Attribute Profile (GATT):

__Differences between GAP and GATT:__
It is important to differentiate between GAP and GATT. GAP defines the general topology of the BLE network stack. GATT describes in detail how attributes (data) are transferred once devices have a dedicated connection.  All BLE sevices follow GATT. The section below will cover some of the fundamental concepts of GATT.

GATT specifically focuses on how data is formatted, packaged, and sent according to its described rules.  In the BLE network stack, the Attribute Protocol (ATT) is closely aligned with GATT, where GATT directly sits ontop of ATT.  GATT actually uses ATT to describe how data is exchanged from two connected devices. Data, also called attributes when transported as described by ATT, is organized into services and characteristics. A group of related characteristics constitute a service. 

 Similiar to GAP, there are certain roles that interacting devices can adopt:

* __Client:__ Typically sends a request to the GATT server. The client can read and/or write attributes found in the server. 

* __Server:__ One of the main roles of the server is to store attributes. Once the client makes a request, the server must make the attributes available. 

* __Example of client/server relationship:__ When I push a button on the Bean and I want the computer to read that information, the Bean acts as a server (stores the time information) and the computer acts as a client, reading that information. 

Peripheral or central devices can BOTH act as a server or client, depending on how data is flowing.  In contrast to the above example, if I wanted to send an update from from the computer to the Bean, the computer acts as a server and the Bean acts as a client.  <strong>Essentially, GAP and GATT roles are independent of each other. </strong>

This concludes the basic information with the BLE network stack.  Don't worry!  There is a lot more that is occurring.  Checkout our references at the bottom to learn more!
