---
title: Integrate the Bean's iOS SDK 
layout: basic.hbs
autotoc: true
---

## Introduction

Ever wanted to make a button that can be pressed in order to make a Bean blink?  We've got you covered in this tutorial! 

We will gently guide you from creating the storyboard to implementing the Bean's iOS SDK. The goal of this tutorial is to guide you on how to implement the Bean's SDK so you can implement it in your personal projects or prototypes. 

In order to demostrate the SDK, we will be building a simple app.  We will be creating a UILabel and a UIButton that will be centered for all devices.  From there, we will incorporate logic that will check the LED's state and send the appropriate serial data to the Bean.  The Bean will check the serial data that is being transmitted and toggle it with its onboard RGB LED.   

After this tutorial, you should have a good step forward in implementing our SDK.

## Setup

{{> snip_req_getting_started}}
 In addition, we are assuming you have some familiarity with Xcode, git, and built at least 1 or 2 simple iOS apps. This tutorial is written for someone who is at an advanced beginner/beginning intermediate stage in programming. 

### Software

* Bean Loader for OS X ([install guide](../../getting-started/os-x))
* [Xcode](https://developer.apple.com/xcode/download/)
* [Git](https://www.codeschool.com/learn/git)

### Hardware

* {{> snip_req_bean}}
* OS X Computer

## Preface to Project's Organization
You can find the project located [here](https://github.com/PunchThrough/BeanBlinkOnButtonPress). We created two different releases: v.01 and v.02.  The first version, v.01, sets up the storyboard with the UILabel and UIButton.  We have also written a function that changes the UILabel's text when the button "Press Me" is pressed. The second version, v.02, incorporates v.01 and implementation of the Bean's iOS SDK. We will go over how we did each version in a sequence of steps. 

# First Release: v.01 
## Create the UI in Storyboard

### Step 1: Add a View
We are going to add a view to the View Controller.  We will be placing a UILabel and a UIButton inside this view. The view is a little darker to help you visualize better.

{{{img_rel this 'create-view.jpg' 'Lets Add a View' '40%'}}}

### Step 2: Add UILabel and UIButton
Lets add a UIButton and UILabel inside this view. Play with the these views by changing the colors and fonts! 

{{{img_rel this 'add-button-and-label.jpg' 'Lets Add a Button and Label' '40%'}}}

### Step 3: Make Views a Stack View
After we add these views, we are going to make them a "Stack View." Check the hierarchy in the document outline to make sure the organization is correct. 

{{{img_rel this 'create-stack-view.png' 'Make the Button and Label a Stack View' '40%'}}}

### Step 4: Adjust Height and Width of Views
We are going to play with the height and width of these views.  You can set the width to 230 and height to 45.  Make sure you pick under "Update Frames": "Items of New Contraints."  This will adjust the images to its new height and width. Afterwords, click on "Add 4 Constraints."

{{{img_rel this 'change-height-width.jpg' 'Change the Width and Height of the Views' '40%'}}}

### Step 5: Adjust the Stack View's Constraints
Now we have all the items we need for this app, we need to fix the Stack View's constraints. We will pin the constraints, height, and width. By pinning, the Stack View's distance from the top margin, bottom margin, and such will not change. 

We will click on the red bars, and make sure the left, right and top, bottom margins are equally aligned. From there, we check the "Width" and "Height" boxes.  Finally we update the frames for "Items of New Constraints". Afterwards, we click on "Add 6 Constraints." 

{{{img_rel this 'adjust-stack-view-constraints.jpg' 'Change Stack View Constraints' '40%'}}}

### Step 6: Adjust the View's Constraints

We want to make sure that the UILabel and UIButton are centered for all devices.  One way to achieve this is to adjust the View's constraints.  All we want to do is to make sure it is vertically and horizontally aligned. Check the boxes to the left of the category "Horizontally in Container" and "Vertically in Container" and put the number 3.   Go ahead and play with those numbers and see how this changes the View.  Afterwards, we want to "Update Frames" with "Items of New Constraints."  Click on "Add 2 Constraints." 

{{{img_rel this 'adjust-view-constraints.jpg' 'Change Stack View Constraints' '40%'}}}

### What your UI in Storyboard should look like 

After you add these 2 contraints, your UI should look like this:

{{{img_rel this 'final-storyboard.jpg' 'Final UI in Storyboard' '40%'}}}

## Implement logic in the ViewController
### Step 1: Connect the Label to the ViewController Class
The overall goal with the button press is to send serial data to the Bean. Before we get to that point, it would be ideal to see that when the button is pressed, the UILabel changes its text to reflect the press.

 Press 'control', to drag the UILabel just slightly below the class ViewController declaration: 

```
class ViewController: UIViewController {
// UILable connection goes here

}
```

{{{img_rel this 'label-outlet.jpg' 'Connect the UIButton to the ViewController' '40%'}}}


### Step 2: Connect the Button to the ViewController Class
We need to connect the UIButton to the ViewController Class so we can implement some of this logic. Click on the Press Me Button only (make sure that on the Document Outline, the button is highlighed.) Once you 'control' drag it to the ViewController, the button is going to be an action (we are going to click on it). The name is the name of the function, in this case, I named it pressMeButtonToToggleLED. 

{{{img_rel this 'add-button.jpg' 'Connect the UIButton to the ViewController' '40%'}}}


### Step 3: Write Logic to Change the UILabel's text
When we press the button, we want to change the ledTextLabel's text. 

```
    @IBAction func pressMeButtonToToggleLed(sender: AnyObject) {
        if ledTextLabel.text == nil {
            ledTextLabel.text = "Led is: OFF"
        } else if ledTextLabel.text == "Led is: OFF" {
            ledTextLabel.text = "Led is: ON"
        } else {
            ledTextLabel.text = "Led is: OFF"
        }
    }

}

```

{{{img_rel this 'button-logic.jpg' 'button-logic.jpg' '40%'}}}

### What your ViewController.swift file should look like 

```
import UIKit

class ViewController: UIViewController {
    
    @IBOutlet weak var ledTextLabel: UILabel!
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }


    @IBAction func pressMeButtonToToggleLed(sender: AnyObject) {
        if ledTextLabel.text == nil {
            ledTextLabel.text = "Led is: OFF"
        } else if ledTextLabel.text == "Led is: OFF" {
            ledTextLabel.text = "Led is: ON"
        } else {
            ledTextLabel.text = "Led is: OFF"
        }
    }

}
```

# Second Release: v.02
## Implement iOS SDK
Check out our [Bean Doc References](https://punchthrough.com/files/bean/sdk-docs/index.html)
### Step 1: Install Cocoa Pods
Go through our [Getting Started Guide for Cocoa Pods](https://github.com/PunchThrough/Bean-iOS-OSX-SDK/wiki) and follow the instructions.  However, for the __Podfile__, you want to put this instead:
```
use_frameworks!

pod 'Bean-iOS-OSX-SDK'

```
then on terminal run:
```
$ pod install
```
afterwards you can open your project:
```
$ open <YourProjectName>.xcworkspace
```

### Step 2: Edit the AppMessageTypes.h in the Pods
Open Pods/Bean-iOS-OSX-SDK/AppMessageTypes.h  and replace the contents with: 

```
#ifndef APPMESSAGETYPES_H
#define APPMESSAGETYPES_H

typedef UInt32 PTD_UINT32;
typedef UInt16 PTD_UINT16;
typedef UInt8  PTD_UINT8;
typedef SInt16 PTD_INT16;

#endif

```

For more information, check out this [GitHub Issue](https://github.com/PunchThrough/Bean-iOS-OSX-SDK/issues/24#issuecomment-172148681)

### Step 3: Include the Classes We'll be Using
We will have to import the Bean iOS SDK in the ViewController.swift file and include the classes we will use. Afterwards we will create variables that have a __type annotation__. This is to ensure we know about the kind of values these variables can store. 

```
import Bean_iOS_OSX_SDK

class ViewController: UIViewController, PTDBeanManagerDelegate, PTDBeanDelegate {
    
    var beanManager: PTDBeanManager?
    var yourBean: PTDBean?

    // some code 
}

``` 
### Step 4: Create an Instance of BeanManager

We'll create an instance of BeanManager in the viewDidLoad function.  The reason why we are putting it here is because that is when the view is loaded into memory (anytime before that will not be helpful). Afterwards, we'll assign ourselves as the delegate. By doing this, we can respond to an action or retrieve data from an external source without knowing how that source is implemented. 

```
    override func viewDidLoad() {
        super.viewDidLoad()
        beanManager = PTDBeanManager()
        beanManager!.delegate = self
	}
```
### Step 5: Check to see Bluetooth is On

When you initially run the app on your phone, Bluetooth is off. After several seconds have passed, Bluetooth is on. A good thing to do is to keep checking the Bluetooth status until it is on.  When it is on, to start scanning for Beans (since Beans are Bluetooth Low Energy devices).  If there are errors, we can print those out. 

```
    func beanManagerDidUpdateState(beanManager: PTDBeanManager!) {
        var scanError: NSError?
        
        if beanManager!.state == BeanManagerState.PoweredOn {
            startScanning()
            if var e = scanError {
                print(e)
            } else {
                print("Please turn on your Bluetooth")
            }
        }
    }
```
__Reference:__ [BeanManagerState](https://punchthrough.com/files/bean/sdk-docs/Constants/BeanManagerState.html)

### Step 6: Scan For Beans
Now that we have Bluetooth on, we can scan for Beans.  If there is an error, we can print the error: 

```
    
    func startScanning() {
        var error: NSError?
        beanManager!.startScanningForBeans_error(&error)
        if let e = error {
            print(e)
        }
    }
```
### Step 7: When we Discover Beans
After we scan for beans, it will automatically call "DidDiscoverBean:"

```
	func beanManager(beanManager: PTDBeanManager!, didDiscoverBean bean: PTDBean!,
    	error: NSError!) {

    	// some code

    }
```

When we discover a bean, we want to connect to it. The way we are going to identify the Bean, in this version, is by the Bean's name.  If you changed your Bean's name, then use that name. If we get errors, we can print those out. 

```
    func beanManager(beanManager: PTDBeanManager!, didDiscoverBean bean: PTDBean!,
        error: NSError!) {
        if let e = error {
            print(e)
        }
            
        print("Found a Bean: \(bean.name)")
        if bean.name == "yourBean" {
            yourBean = bean
            connectToBean(yourBean!)
        }
    }

 ```

 On line 8, you can change "yourBean" to your actual Bean's name.

### Step 8: Connecting to a Bean
We can write our own function connectToBean, and implement the BeanManager's instance methods inside it:

```
    func connectToBean(bean: PTDBean) {
        var error: NSError?
        beanManager?.connectToBean(bean, error: &error)
    }
```
__Reference__: [BeanManager connectToBean instance method](https://punchthrough.com/files/bean/sdk-docs/Classes/PTDBeanManager.html#//api/name/connectToBean:error:)

### Step 9: Button Logic
Once we are connected to a Bean, data is able to flow bidirectionally from the Bean to the mobile, and from the mobile to the Bean. At this point, when we can now implement the button press logic.

What we want to accomplish with the button press is:
* Change the light's state
* Change the UILabel's text
* Send serial data to the Bean so it knows when to Blink

Compared to v.01, we are going to rewrite our button logic to reflect these current changes. 


Our button function will look something like this:
```
    @IBAction func pressMeButtonToToggleLED(sender: AnyObject) {
        lightState = !lightState
        updateLedStatusText(lightState)
        let data = NSData(bytes: &lightState, length: sizeof(Bool))
        sendSerialData(data)
    
    }
}

```
On line 4 __sendSerialData(data)__ is part of the __PTDBean Class__. The parameter takes a Data object. Essentially, we are taking the lightState which is a boolean type and type casting it to NSData type. We call sendSerialData() when the button is pressed, so the Bean can receive serial data. 

Under where we have the ViewController class declaration, we are going to set lightState as false:

```
class ViewController: UIViewController, PTDBeanManagerDelegate, PTDBeanDelegate{
    
    // Declare variables we will use throughout the app
    var beanManager: PTDBeanManager?
    var yourBean: PTDBean?
    var lightState: Bool = false
```

### Step 10: Send Serial Data to the Bean
We will write our own function to send serial data to the Bean and implement an instance method that the PTDBean Class provides:

```
    // Bean SDK: Send serial datat to the Bean
    func sendSerialData(beanState: NSData) {
        yourBean?.sendSerialData(beanState)
    }
```

### Step 11: Change the UILabel's text
When we press the button this function is called.  In this function, we are going to update the text:

```
    func updateLedStatusText(lightState: Bool) {
        let onOffText = lightState ? "ON" : "OFF"
        ledTextLabel.text = "Led is: \(onOffText)"
    }

```

### Step 12: What your ViewController should look like

```
import UIKit
import Bean_iOS_OSX_SDK

class ViewController: UIViewController, PTDBeanManagerDelegate, PTDBeanDelegate {
    
    // Declare variables we will use throughout the app
    var beanManager: PTDBeanManager?
    var yourBean: PTDBean?
    var lightState: Bool = false

    // MARK: Properties
    @IBOutlet weak var ledTextLabel: UILabel!
    
    // After view is loaded into memory, we create an isntance of PTDBeanManager
    // and assign ourselves as the delegate
    override func viewDidLoad() {
        super.viewDidLoad()
        beanManager = PTDBeanManager()
        beanManager!.delegate = self
    }
    
    // After the view is added we will start scanning for Bean peripherals
    override func viewDidAppear(animated: Bool) {
        startScanning()
    }
    
    // Bean SDK: We check to see if Bluetooth is on.
    func beanManagerDidUpdateState(beanManager: PTDBeanManager!) {
        var scanError: NSError?
        
        if beanManager!.state == BeanManagerState.PoweredOn {
            startScanning()
            if var e = scanError {
                print(e)
            } else {
                print("Please turn on your Bluetooth")
            }
        }
    }
    
    // Scan for Beans
    func startScanning() {
        var error: NSError?
        beanManager!.startScanningForBeans_error(&error)
        if let e = error {
            print(e)
        }
    }
    
    // We connect to a specific Bean
    func beanManager(beanManager: PTDBeanManager!, didDiscoverBean bean: PTDBean!,
        error: NSError!) {
            if let e = error {
                print(e)
        }

        print("Found a Bean: \(bean.name)")
        if bean.name == "yourBean" {
            yourBean = bean
            print("got your bean")
            connectToBean(yourBean!)
        }
    }
    
    // Bean SDK: connects to Bean
    func connectToBean(bean: PTDBean) {
        var error: NSError?
        beanManager?.connectToBean(bean, error: &error)
    }
    
    // Bean SDK: Send serial datat to the Bean
    func sendSerialData(beanState: NSData) {
        yourBean?.sendSerialData(beanState)
    }
    
    // Change LED text when button is pressed
    func updateLedStatusText(lightState: Bool) {
        let onOffText = lightState ? "ON" : "OFF"
        ledTextLabel.text = "Led is: \(onOffText)"
    }
    
    // Mark: Actions
    // When we pressed the button, we change the light state and
    // We update date the label, and send the Bean serial data
    @IBAction func pressMeButtonToToggleLED(sender: AnyObject) {
        lightState = !lightState
        updateLedStatusText(lightState)
        let data = NSData(bytes: &lightState, length: sizeof(Bool))
        sendSerialData(data)
    
    }
}
```

### Step 13: Writing the Arduino Code
In the Arduino code, we only want to see if the Bean is getting serial data.  If it is, we want to check if it is receiving a 0 (False) or a 1 (True). The serial data is being sent as a Hex. If the light state is ON (True), we make the Bean blink. 

```
void setup() {
  // Open serial communications and wait for port to open:
  Serial.begin(9600);
}

void loop() {
    while (Serial.available() > 0) {
       char data = Serial.read();
       if (data == 1) {
         Bean.setLed(0,255,0);
         delay(1000);
         Bean.setLed(0,0,255);
         delay(1000);
         Bean.setLed(255,0,0);
         delay(1000);
         Bean.setLed(0,0,0);
         delay(1000);
       } else {
         Bean.setLed(0,0,0);
     }
  }

        delay(1000);
}

```
## Conclusion
In this tutorial, we guided you in implementing the Bean's SDK by building a simple app. With respect to the SDK, we hoped you learned how to install and modify the pods, import the main classes, and use the instance methods that these classes provide.  In the future, we will show you how to use a UITable to select your Bean instead of changing your Bean's name to connect to it. 

### Other Problems

{{> snip_troubleshooting}}