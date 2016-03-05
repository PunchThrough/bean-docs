---
title: Integrate the Bean's iOS SDK 
layout: basic.hbs
autotoc: true
---

## Introduction

Ever wanted to make a button that can be pressed in order to make a Bean blink?  We've got you covered in this tutorial! 

We will gently guide you on how to create the storyboard to implementing the Bean's iOS SDK. The goal of this tutorial is to guide you on how to implement the Bean's SDK so you can implement it in your projects or prototypes. 

In order to demostrate the SDK, we will be building a simple app.  We will be creating a UILabel and a UIButton that will be centered for multi devices.  From there, we will incorporate logic that will check the LED's state and send the appropriate serial data to the Bean.  The Bean will check the serial data that is being transmitted and toggle its onboard RGB LED accordingly.   

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
You can find the project located [here](https://github.com/PunchThrough/BeanBlinkOnButtonPress). We created two different releases: v.01 and v.02.  The first version, v.01, sets up the storyboard with the UILabel and UIButton.  We also written a function that changes the UILabel's text when the button "Press Me" is pressed. The second version, v.02, incorporates v.01 and implementation of the Bean's iOS SDK. We will go over how we did each version in a sequence of steps. 

# First Release: v.01
## Create the UI in Storyboard

### Step 1: Add a View
We are going to add a view to the View Controller.  We will be placing a UILabel and a UIButton inside this view. The view is a little darker to help you visualize better.

{{{img_rel this 'create-view.jpg' 'Lets Add a View' '40%'}}}

### Step 2: Add UILabel and UIButton
Lets add a UIButton and UILabel inside this view. Play with the these views by changing the colors and fonts! 

{{{img_rel this 'add-button-and-label.jpg' 'Lets Add a Button and Label' '40%'}}}

### Step 3: Make Views a Stack View
After we add these views, we are going to make them a "Stack View"

{{{img_rel this 'create-stack-view.jpg' 'Make the Button and Label a Stack View' '40%'}}}

### Step 4: Adjust Height and Width of Views
We are going to play with the height and width of these views. We can just picked an arbitrary number to set the width and height. Make sure you pick under "Update Frames": "Items of New Contraints."  This will adjust the images to its new height and width.  

{{{img_rel this 'change-height-width.jpg' 'Change the Width and Height of the Views' '40%'}}}

### Step 5: Adjust the Stack View's Constraints
Now we have all the items we need for this app, we need to fix the Stack View's constraints. We will pin the constraints, height, and width. By pinning, the Stack View's distance from the top margin, bottom margin, and such will not change. 

We will click on the red bars, and make sure the left, right and top, bottom margins are equally aligned. From there, we check the "Width" and "Height" boxes.  Finally we updat the frames for "Items of New Constraints". Afterwards, we click on "Add 6 Constraints".  

{{{img_rel this 'adjust-stack-view-constraints.jpg' 'Change Stack View Constraints' '40%'}}}

### Step 6: Adjust the View's Constraints

We want to make sure that the UILabel and UIButton are centered for all devices.  One way to achieve this is to adjust the View's constraints.  All we want to do is to make sure it is vertically and horizontally aligned. Check the boxes to the left of the category "Horizontally in Container" and "Vertically in Container" and put the number 3.   Go ahead and play with those numbers and see how this changes the View.  Afterwards, we want to "Update Frames" with "Items of New Constraints."  Click on "Add 2 Constraints." 

{{{img_rel this 'adjust-view-constraints.jpg' 'Change Stack View Constraints' '40%'}}}

### What your UI in Storyboard should look like 

After you add these 2 contraints, your UI should look like this:

{{{img_rel this 'final-storyboard.jpg' 'Final UI in Storyboard' '40%'}}}

### Other Problems

{{> snip_troubleshooting}}