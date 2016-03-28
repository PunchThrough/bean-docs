---
title: Building the UI of Bean Blink
layout: basic.hbs
autotoc: true
---

## Introduction

Ever wanted to build an iOS app that talks to Bean? We've got you covered in this tutorial!

The goal of this tutorial is to show you how to use the Bean SDK in your personal projects. We will guide you through the process of building an app using the iOS SDK. Before we use the SDK, we need to create a UI.  We'll start by creating the storyboard and views.

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
* iOS device

## Preface to Project's Organization

You can find the project located [here](https://github.com/PunchThrough/bean-app-ios-blink). Under the **Releases** tab, you'll find two different releases: v1 and v2. This program is compatible with iOS 9.1 and 9.2.

The first version, v1, sets up the storyboard with the UILabel and UIButton.  We have also written a function that changes the UILabel's text when the button "Press Me" is pressed.

The second version, v2, incorporates v1 and implementation of the Bean's iOS SDK. We will review how each version was created below.

## Create the UI in Storyboard: v1

### Step 1: Create project in Xcode

Open Xcode. Go to File --> New --> Project. Afterwards, choose __Single View Application__.  

{{{img_rel this 'single-view-app.png' 'Choose Single View Application' '80%'}}}

Next, configure your projects name, organization and language. For this tutorial, we will be using Swift as the programming language.

{{{img_rel this 'name-program.png' 'Choose Single View Application' '80%'}}}

Lastly, you will be prompted to save your project. Choose a directory and continue.

### Step 2: Add a View

We are going to add a view to the View Controller.  We will be placing a UILabel and a UIButton inside this view.

Drag the view from the toolbox on the right into the view controller. The view we are using is a little darker to help you visualize its position better.

{{{img_rel this 'create-view.jpg' 'Add a View' '80%'}}}

### Step 3: Add UILabel and UIButton

Let's add a UIButton and UILabel inside this view. Drago those components into the view you just placed. Play with the these views by changing the colors and fonts!

{{{img_rel this 'add-button-and-label.jpg' 'Add a Button and Label' '80%'}}}

### Step 4: Make Views a Stack View

After we add these views, we are going to group them into a **Stack View**. Check the hierarchy in the document outline to make sure the organization is correct.

{{{img_rel this 'create-stack-view.png' 'Make the Button and Label a Stack View' '80%'}}}

### Step 5: Adjust Height and Width of Views

We are going to play with the height and width of these views.  Here, we've set the width to 230 and height to 45.

Go to **Update Frames** and selcet **Items of New Constraints.** This will adjust the images to their new height and width. Then select **Add 4 Constraints.**

{{{img_rel this 'change-height-width.jpg' 'Change the Width and Height of the Views' '80%'}}}

### Step 6: Adjust the Stack View's Constraints

Now that we have all the items we need for this app, we need to fix the Stack View's constraints. We will pin the view's position, height, and width. We don't want the Stack View's distance from the top and bottom margins to change.

Click on the red bars. Make sure the left, right, top, and bottom margins are equally aligned.

Then check the **Width** and **Height** boxes.  Finally, we update the frames for **Items of New Constraints** and select **Add 6 Constraints.**

{{{img_rel this 'adjust-stack-view-constraints.jpg' 'Change Stack View Constraints' '80%'}}}

### Step 7: Adjust the View's Constraints

We want to make sure that the UILabel and UIButton are centered for all devices.  One way to achieve this is to adjust the View's constraints. We want to make sure the view is vertically and horizontally aligned.

Check the boxes to the left of the category **Horizontally in Container** and **Vertically in Container** and enter the number `3`. Go ahead and play with those numbers and see how they change the View.

Finally, select **Update Frames** with **Items of New Constraints** then select **Add 2 Constraints.**

{{{img_rel this 'adjust-view-constraints.jpg' 'Change Stack View Constraints' '80%'}}}

### Step 8: Let's Review

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

### Helpful Debugging Tool:
Another easy way to see if the program is working is to print to the console:

```
@IBAction func pressMeButtonToToggleLed(sender: AnyObject) {
        if ledTextLabel.text == nil {
            print ("Led is: OFF")
        } else if ledTextLabel.text == "Led is: OFF" {
            print("Led is: ON")
        } else {
            print("Led is: OFF")
        }
    }
}

```

Great work! Now that our button works, we can start wiring in Bean functionality.

## Conclusion

In this tutorial, you built the UI in storyboard for iOS and implemented basic logic to change the label's text. The next step is to create logic for the Bean in order to have it blink.

## Next Step

* [Integrate the Bean SDK](../bean-blink-sdk)

## Troubleshooting

{{> snip_troubleshooting}}
