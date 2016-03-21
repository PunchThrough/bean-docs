---
title: Integrate the Bean's iOS SDK
layout: basic.hbs
autotoc: true
---

## Introduction

Ever wanted to build an iOS app that talks to Bean? We've got you covered in this tutorial!

The goal of this tutorial is to show you how to use the Bean SDK in your personal projects. We will gently guide you through the process of building an app using the iOS SDK. We'll start by creating the storyboard and views. From there, we will incorporate logic that will check the LED's state and send the appropriate serial data to the Bean.  The Bean will check the serial data that is being transmitted and display it with its onboard RGB LED.

## Setup

{{> snip_req_getting_started}}

In addition, we are assuming you have some familiarity with Xcode, git, and built at least 1 or 2 simple iOS apps. This tutorial is written for someone who is at an advanced beginner/beginning intermediate stage in programming.

### Software

* Bean Loader for OS X ([install guide](../../getting-started/os-x))
* [Xcode](https://developer.apple.com/xcode/download/)
* [Git](https://www.codeschool.com/learn/git)

### Hardware

* {{> snip_req_bean}}
* OS X computer

## Preface to Project's Organization
You can find the project located [here](https://github.com/PunchThrough/BeanBlinkOnButtonPress). Under the **Releases** tab, you'll find two different releases: v.01 and v.02.

The first version, v.01, sets up the storyboard with the UILabel and UIButton.  We have also written a function that changes the UILabel's text when the button "Press Me" is pressed.

The second version, v.02, incorporates v.01 and implementation of the Bean's iOS SDK. We will review how each version was created below.

## First Release: v.01

## Create the UI in Storyboard

### Step 1: Add a View
We are going to add a view to the View Controller.  We will be placing a UILabel and a UIButton inside this view.

Drag the view from the toolbox on the right into the view controller. The view we are using is a little darker to help you visualize its position better.

{{{img_rel this 'create-view.jpg' 'Add a View' '80%'}}}

### Step 2: Add UILabel and UIButton
Let's add a UIButton and UILabel inside this view. Drago those components into the view you just placed. Play with the these views by changing the colors and fonts!

{{{img_rel this 'add-button-and-label.jpg' 'Add a Button and Label' '80%'}}}

### Step 3: Make Views a Stack View
After we add these views, we are going to group them into a **Stack View**. Check the hierarchy in the document outline to make sure the organization is correct.

{{{img_rel this 'create-stack-view.png' 'Make the Button and Label a Stack View' '80%'}}}

### Step 4: Adjust Height and Width of Views
We are going to play with the height and width of these views.  Here, we've set the width to 230 and height to 45.

Go to **Update Frames** and selcet **Items of New Constraints.** This will adjust the images to their new height and width. Then select **Add 4 Constraints.**

{{{img_rel this 'change-height-width.jpg' 'Change the Width and Height of the Views' '80%'}}}

### Step 5: Adjust the Stack View's Constraints
Now that we have all the items we need for this app, we need to fix the Stack View's constraints. We will pin the view's position, height, and width. We don't want the Stack View's distance from the top and bottom margins to change.

Click on the red bars. Make sure the left, right, top, and bottom margins are equally aligned.

Then check the **Width** and **Height** boxes.  Finally, we update the frames for **Items of New Constraints** and select **Add 6 Constraints.**

{{{img_rel this 'adjust-stack-view-constraints.jpg' 'Change Stack View Constraints' '80%'}}}

### Step 6: Adjust the View's Constraints

We want to make sure that the UILabel and UIButton are centered for all devices.  One way to achieve this is to adjust the View's constraints. We want to make sure the view is vertically and horizontally aligned.

Check the boxes to the left of the category **Horizontally in Container** and **Vertically in Container** and enter the number `3`. Go ahead and play with those numbers and see how they change the View.

Finally, select **Update Frames** with **Items of New Constraints** then select **Add 2 Constraints.**

{{{img_rel this 'adjust-view-constraints.jpg' 'Change Stack View Constraints' '80%'}}}

### Step 7: Let's Review

After you add these 2 constraints, your UI should look like this:

{{{img_rel this 'final-storyboard.jpg' 'Final UI in Storyboard' '80%'}}}

Next, we'll start adding the program logic that controls the View we just made.

## Implement logic in the ViewController

### Step 1: Connect the Label to the View Controller

The overall goal with the button press is to send serial data to the Bean. Before we get to that point, it would be ideal to see that when the button is pressed, the UILabel changes its text to reflect the press.

Hold the **Control key**. Click on the UILabel, then drag your cursor into the code, just slightly below the `class ViewController` declaration.

When you release your click, Xcode will prompt you to connect the UILabel and create a variable for you. Name this variable `ledTextLabel`:

```
class ViewController: UIViewController {
// UILabel connection goes here

}
```

{{{img_rel this 'label-outlet.jpg' 'Connect the UIButton to the ViewController' '80%'}}}

### Step 2: Connect the Button to the View Controller

We need to connect the UIButton to the View Controller so we can implement some of this logic. Click on the Press Me Button only (make sure that on the Document Outline, the button is highlighed.)

Once you **Control**-drag it to the View Controller, the button is going to be an action (we are going to click on it). Select a name for the function – in this case, I named the function `pressMeButtonToToggleLED`.

{{{img_rel this 'add-button.jpg' 'Connect the UIButton to the ViewController' '80%'}}}

### Step 3: Write Logic to Change the UILabel's text

When we press the button, we want to change the `ledTextLabel`'s text.

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

{{{img_rel this 'button-logic.jpg' 'button-logic.jpg' '80%'}}}

### Step 4: Let's Review

Your `ViewController.swift` should look like this:

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

Great work! Now that our button works, we can start wiring in Bean functionality.

## Second Release: v.02

## Implement iOS SDK

You'll want to keep the [Bean SDK reference](https://punchthrough.com/files/bean/sdk-docs/index.html) handy while you work with the Bean SDK for iOS and OS X.

### Step 1: Install CocoaPods

Check out the [Installation with CocoaPods](https://github.com/PunchThrough/Bean-iOS-OSX-SDK#installation-with-cocoapods) instructions in the Bean SDK.

Since you're using a Swift project, you will need to use the following in your `Podfile`:

```
use_frameworks!

pod 'Bean-iOS-OSX-SDK'
```

Next, open Terminal. In your project directory, install the Pod for the Bean SDK:

```
$ pod install
```

Finally, open your project's new workspace:

```
$ open <YourProjectName>.xcworkspace
```

### Step 2: Edit the AppMessageTypes.h in the Pods

The Bean SDK isn't fully compatible with Swift yet. Right now, there's one bug that needs to be fixed manually to get the SDK working with your project.

Open `Pods/Bean-iOS-OSX-SDK/AppMessageTypes.h` and replace the contents with the following

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

### Step 3: Include the Classes We'll Be Using
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

When your app starts for the first time, Apple's Bluetooth interface might not be ready. To listen for changes in the Bluetooth state, we use `beanManagerDidUpdateState`. Once Bluetooth is on and ready, we can start scanning for nearby Beans.

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

Now let's implement the `startScanning` method. If there is an error, we can print the error:

```
    func startScanning() {
        var error: NSError?
        beanManager!.startScanningForBeans_error(&error)
        if let e = error {
            print(e)
        }
    }
```
### Step 7: Handle Beans We Discovered

After we scan for Beans, `PTDBeanManager` will automatically call `didDiscoverBean`:

```
    func beanManager(beanManager: PTDBeanManager!, didDiscoverBean bean: PTDBean!, error: NSError!) {
        // some code
    }
```

When we discover a Bean, we want to connect to it. We will identify the Bean we want to connect to using its name.

If you've changed your Bean's name, then use that name on line 8 – otherwise, just use "Bean". If we get errors, we can print those out.

```
    func beanManager(beanManager: PTDBeanManager!, didDiscoverBean bean: PTDBean!,
        error: NSError!) {
        if let e = error {
            print(e)
        }

        print("Found a Bean: \(bean.name)")
        if bean.name == "Bean" {
            yourBean = bean
            connectToBean(yourBean!)
        }
    }
```

### Step 8: Connecting to a Bean

We can write our own function `connectToBean` and call BeanManager's instance methods inside it:

```
    func connectToBean(bean: PTDBean) {
        var error: NSError?
        beanManager?.connectToBean(bean, error: &error)
    }
```

__Reference__: [BeanManager connectToBean instance method](https://punchthrough.com/files/bean/sdk-docs/Classes/PTDBeanManager.html#//api/name/connectToBean:error:)

### Step 9: Button Logic

Once we are connected to a Bean, data is able to flow bidirectionally from the Bean to your phone as well as from your phone to the Bean. At this point we can implement the button press logic.

What we want to accomplish with the button press is:
* Change the light's state
* Change the UILabel's text
* Send serial data to the Bean so it knows when to blink

We'll rewrite our button logic to reflect these changes.

Our button function will look something like this:
```
    @IBAction func pressMeButtonToToggleLED(sender: AnyObject) {
        lightState = !lightState
        updateLedStatusText(lightState)
        let data = NSData(bytes: &lightState, length: sizeof(Bool))
        sendSerialData(data)
    }
```

On line 4 `sendSerialData(data)` is part of the `PTDBean` class. The method takes a Data object. We need to take `lightState`, which is a Bool type, and cast it to type Data. We call `sendSerialData` when the button is pressed so the Bean gets our serial data.

Under the `ViewController` class declaration, we are going to set `lightState` to false:

```
class ViewController: UIViewController, PTDBeanManagerDelegate, PTDBeanDelegate{

    // Declare variables we will use throughout the app
    var beanManager: PTDBeanManager?
    var yourBean: PTDBean?
    var lightState: Bool = false
```

### Step 10: Send Serial Data to the Bean

We will write our own function to send serial data to the Bean and call an instance method on the PTDBean object:

```
    func sendSerialData(beanState: NSData) {
        yourBean?.sendSerialData(beanState)
    }
```

### Step 11: Change the UILabel's text

When we press the button, this function is called. We want to update the text here so the user knows what the LED is doing:

```
    func updateLedStatusText(lightState: Bool) {
        let onOffText = lightState ? "ON" : "OFF"
        ledTextLabel.text = "Led is: \(onOffText)"
    }

```

### Step 12: Let's Review

Your `ViewController.swift` should look like this:

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

    // After view is loaded into memory, we create an instance of PTDBeanManager
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

In the Arduino code, we want to check if Bean has received any data. If it has, we want to check if the data is 0 (False) or 1 (True). If we get True, that means the iOS app wants the LED to turn on. False turns the LED off.

```
void setup() {
  // We don't need to do anything here
}

void loop() {
  while (Serial.available() > 0) {
    char data = Serial.read();
    if (data == 1) {
      Bean.setLed(0, 255, 255);
    } else {
      Bean.setLed(0,0,0);
    }
  }
  Bean.sleep(250);
}

```
## Conclusion

In this tutorial, you built a simple app using the Bean SDK for iOS. You built the interface and wired it to program logic. Finally, you installed the SDK and integrated the Bean SDK's methods with your program logic. Congratulations – you just built a full app with Bean!

## Troubleshooting

{{> snip_troubleshooting}}
