---
title: Bean Loader for iOS
layout: basic.hbs
autotoc: true
order: 2
---

## Introduction

In this guide, you'll upload an example sketch to your Bean, edit it, and save a copy to your iOS device. You'll also walk through the different features in Bean Loader for iOS.

## Before You Begin

To start building with Bean on your iOS device, you'll need:

* An iOS device
* Access to the App Store
* A LightBlue Bean or Bean+

## Install Bean Loader

Download Bean Loader from the App Store here:

<a href="https://itunes.apple.com/us/app/bean-loader-lightblue-bean/id936509473?mt=8">
  <img src="../../_assets/images/getting-started/ios/app_store.svg">
</a>

Once Bean Loader is installed on your iOS device, launch it to get started!

## Main Menu

Bean Loader opens to the list of sketches. From here, you can select a sketch to edit or create a new sketch.

{{{img_rel this 'main.PNG' 'Main Menu' '40%'}}}

The toolbar icons, from left to right, are:

* Settings: Change font size or link/unlink with Dropbox here.
* Announcements: If we have something cool to share with you, this icon will appear red. Tap it to read our message!
* New Sketch: Create a new blank Arduino sketch.

The sketch list is divided into three sections:

* Local: Sketches on the iOS device
* Dropbox: Sketches synced between this device and your Dropbox account
* Examples: Example sketches that come with Bean Loader

## Open the Blink example

Tap the **Blink** sketch under the **Examples** header to open the Blink example sketch.

## Sketch Editor

Bean Loader for iOS comes with its own text editor. We've built it specifically for editing Bean Arduino code, so you'll get pretty syntax highlighting and keyboard macros to help you write code easily.

Tap the Verify (checkmark) button in the upper right to verify that your sketch compiles and you'll get a **Sketch OK** message:

{{{img_rel this 'sketch-ok.PNG' 'Verify Sketch' '40%'}}}

Tap the red X to close the message.

## Select Your Bean

Tap the Bluetooth icon in the lower right to open the Select Bean menu.

{{{img_rel this 'select-bean.PNG' 'Select Bean' '40%'}}}

Your Beans are listed with signal strength on the left. This helps you figure out which Bean you're connecting to.

To rename or blink a Bean, tap the **info** logo to the right of a Bean in the list.

{{{img_rel this 'bean-actions.PNG' 'Rename or Blink' '40%'}}}

Once you're ready to continue, tap your Bean to select it for programming.

## Upload to Bean

In the Sketch Editor, tap the Upload (right arrow) button in the upper right to verify and upload your sketch to Bean:

{{{img_rel this 'uploading.PNG' 'Upload' '40%'}}}

Once your sketch uploads, your Bean will start running the Blink sketch and you'll get a success message. Hooray!

If your sketch upload fails for some reason, Bean Loader will display an error message. Tap **Show Error** to see any detailed info:

{{{img_rel this 'other-error.PNG' 'Detailed Upload Error' '40%'}}}

## Duplicate the Example Sketch

The **info** button in the lower left of the Sketch Editor opens the **File Properties** menu. This lets you rename or move sketches.

Tap the info button to open the File Properties menu.

{{{img_rel this 'file-props-example.PNG' 'File Properties: Example Sketch' '40%'}}}

Example sketches can't be edited, so tap **Copy to Local Storage** to add this sketch to your local sketches. The File Properties window will change to show that it's now your sketch.

{{{img_rel this 'file-props-sketch.PNG' 'File Properties: Local Sketch' '40%'}}}

## Edit the Local Blink Sketch

Now that Blink is in your local sketches, you can edit it, rename it, delete it, or move it to Dropbox.

Tap **Done** to return to the Sketch Editor. Once you're there, tap inside the sketch to start editing the text. Then add an empty line under `void loop() {`.

{{{img_rel this 'kb-toolbar.PNG' 'Keyboard Toolbar' '40%'}}}

You'll notice that the keyboard has a fancy toolbar on top. This toolbar has macros to help you save time typing text. It also has quick access to special characters that are normally buried in your soft keyboard. You can swipe left and right through these symbols!

Tap **Macros** to open the Macros menu.

{{{img_rel this 'macros.PNG' 'Macros' '40%'}}}

Tap **Serial** to open the list of Serial macros.

{{{img_rel this 'macros-sub.PNG' 'Serial Macros' '40%'}}}

Tap `Serial.println();` to insert that line into your sketch.

{{{img_rel this 'macro-post.PNG' 'After inserting a macro' '40%'}}}

Now you can work with that line as if it were text you typed manually.

To save your sketch, simply press **Done** to close the keyboard.

## Conclusion

In this guide, you programmed your Bean with an example sketch, copied the example to your local sketches, and edited and saved your own version of Blink. You should be ready to get started writing and uploading sketches to your Bean!

### The Bean Cloud Compiler

Bean Loader for iOS doesn't have Arduino installed locally. Instead, it sends sketches to the Bean Cloud Compiler to compile them into hex code for your Bean.

If you're working on a sketch and you need to use a library, it might be available on the Bean Cloud Compiler. Check out [this thread on Beantalk](http://beantalk.punchthrough.com/t/cloud-compiler-library-requests/1101) to see what libraries are available and to request new libraries for the Cloud Compiler.
