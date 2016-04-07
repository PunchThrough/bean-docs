---
title: 'v2: Integrate the Bean SDK'
layout: basic.hbs
autotoc: true
---

## Introduction
This guide builds on our [first guide](../beanBlink-ui), where we built the UI of Bean Blink.  In this tutorial, we will implement the label's, button's, and SDK's logic in order to get the Bean to blink its onboard RGB LED.

We'll start from the previous tutorial's app with a button and a label.  At the start of the tutorial, pressing the button will change the text of the label, but nothing else.  By the end of this tutorial, the app will connect to the Bean iOS SDK, and communicate with the Bean via Bluetooth LE.  We'll put a small sketch on the Bean, and it will toggle the LED based on the messages from our app.

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

You'll want to keep the [Bean SDK reference](https://punchthrough.com/files/bean/sdk-docs/index.html) handy while you work with the Bean SDK for iOS and OS X.

## Step 1: Install CocoaPods

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

## Step 2: Edit the AppMessageTypes.h in the Pods

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

## Step 3: Include the Classes We'll Be Using
We will have to import the Bean iOS SDK in the ViewController.swift file and include the classes we will use. Afterwards we will create variables that have a __type annotation__. This is to ensure we know about the kind of values these variables can store.

```
import Bean_iOS_OSX_SDK

class ViewController: UIViewController, PTDBeanManagerDelegate, PTDBeanDelegate {

    var beanManager: PTDBeanManager?
    var yourBean: PTDBean?

    // some code
}

```
## Step 4: Create an Instance of BeanManager

We'll create an instance of BeanManager in the viewDidLoad function.  The reason why we are putting it here is because that is when the view is loaded into memory (anytime before that will not be helpful). Afterwards, we'll assign ourselves as the delegate. By doing this, we can respond to an action or retrieve data from an external source without knowing how that source is implemented.

```
    override func viewDidLoad() {
        super.viewDidLoad()
        beanManager = PTDBeanManager()
        beanManager!.delegate = self
	}
```
## Step 5: Check to see Bluetooth is On

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

## Step 6: Scan For Beans

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
## Step 7: Handle Beans We Discovered

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

## Step 8: Connecting to a Bean

We can write our own function `connectToBean` and call BeanManager's instance methods inside it:

```
    func connectToBean(bean: PTDBean) {
        var error: NSError?
        beanManager?.connectToBean(bean, error: &error)
    }
```

__Reference__: [BeanManager connectToBean instance method](https://punchthrough.com/files/bean/sdk-docs/Classes/PTDBeanManager.html#//api/name/connectToBean:error:)

## Step 9: Button Logic

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

## Step 10: Send Serial Data to the Bean

We will write our own function to send serial data to the Bean and call an instance method on the PTDBean object:

```
    func sendSerialData(beanState: NSData) {
        yourBean?.sendSerialData(beanState)
    }
```

## Step 11: Change the UILabel's text

When we press the button, this function is called. We want to update the text here so the user knows what the LED is doing:

```
    func updateLedStatusText(lightState: Bool) {
        let onOffText = lightState ? "ON" : "OFF"
        ledTextLabel.text = "Led is: \(onOffText)"
    }

```

## Step 12: Let's Review

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

## Step 13: Writing the Arduino Code

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

Whew! You built your first Bean iOS App! In this guide, we implemented what we did in v1, installed the SDK, and integrated the Bean SDK's methods with the program logic. Congratulations! You now have the foundation to integrate the Bean's SDK into your personal projects.

## Troubleshooting

{{> snip_troubleshooting}}
