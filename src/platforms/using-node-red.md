---
title: Using Node-RED
layout: basic.hbs
autotoc: true
---

Now that you have Node-RED installed, it's time to get familiar with building flows along with how to use the Bean nodes. 

### Starting the Server

Open your terminal. Navigate to your Node-RED folder. Type `node red` unless you are ssh'ed into a Raspberry Pi, then use `node-red-pi --max-old-space-size=128`.

{{{img_rel this 'terminal.png' 'Starting Node-RED' '100%'}}}


### Creating a Flow

Go to http://localhost:1880/ in your  browser. There you will see the visual programming interface used for working with Node-RED.

{{{img_rel this 'interface.png' 'Visual Node-RED Interface' '100%'}}}

__Drag and Drop:__

From the left pane, you can drag and drop nodes into the workspace. Then, use the small gray boxes on the ends of the nodes to connect them. Double click on nodes to set specific attributes. 

__Importing JSON:__

Another way to build a flow is by importing a Node-RED flow in JSON format. This is often how we provide the flows for our Node-RED example projects. Select the menu in the top right corner, scroll down to import -> clipboard to paste the JSON. 


### Injecting and Debugging Flows

Two inportant nodes for creating flows are the Inject and Debug nodes. The Inject node allows you to start a flow by clicking a button or with a set time interval. The Debug node allows you to view the messages that are passed from node to node. 

{{{img_rel this 'inject.png' 'Inject Node' '100%'}}}

{{{img_rel this 'debug.png' 'Debug Node' '100%'}}}


### Using the Bean Nodes

Here are the nodes for communicating with the LightBlue Bean:

* __Bean Acceleration__ - Get accelerometer data from the Bean.
* __Bean Serial__ - Send or recieve serial messages to or from the Bean.
* __Bean Temperature__ - Get the ambient temperature from the Bean.
* __Bean Read Scratch__ - Read scratch data set by the Bean. 
* __Bean RGB LED__ - Set the Bean's LED to a specified color.
* __Bean Write Scratch__ - Write scratch data for the Bean. 

{{{img_rel this 'bean_nodes.png' 'LightBlue Bean Nodes' '100%'}}}


### Setting the Bean Node Config

Update the config settings for Bean nodes so that Node-RED can connect to the Bean name you specify. Double click on a Bean node and hit the edit icon to add the name of your Bean. 

{{{img_rel this 'bean_node_config.png' 'Bean Node Config' '100%'}}}


### Deploying Flows

Hit the red deploy button on the top right corner to push your flow to the server and put it into action. Check out our Node-RED example projects for more guidance! 




