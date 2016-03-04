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
 In addition, we are assuming you have some familiarity with Xcode, git, and built at least 1 or 2 iOS simple apps. This tutorial is written for someone who is at an advanced beginner/beginning intermediate stage in programming. 

### Software

* Bean Loader for OS X ([install guide](../../getting-started/os-x))
* [Xcode](https://developer.apple.com/xcode/download/)
* [Git](https://www.codeschool.com/learn/git)

### Hardware

* {{> snip_req_bean}}
* OS X Computer

## Preface to Project's Organization
You can find the project located [here](https://github.com/PunchThrough/BeanBlinkOnButtonPress). We created two different releases: v.01 and v.02.  The first version, v.01, sets up the storyboard with the UILabel and UIButton.  We also written a function that changes the UILabel when the button "Press Me" is pressed. 











### Other Problems

{{> snip_troubleshooting}}