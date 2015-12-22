---
title: Bean Loader for Android
layout: basic.hbs
autotoc: true
order: 2
---

## Introduction

In this guide, you'll upload an example sketch to your Bean, edit it, and save a copy to your Android device. You'll also walk through the different features in Bean Loader for Android.

## Before You Begin

To start building with Bean on your Android device, you'll need:

* An Android device
* Access to the Play Store
* A LightBlue Bean

## Install Bean Loader

Download Bean Loader from the Play Store here:

<a href="https://play.google.com/store/apps/details?id=com.punchthrough.bean.loader">
  <img src="../../_assets/images/getting-started/android/google_play.svg">
</a>

Once Bean Loader is installed on your Android device, launch it to get started!

## Main Menu

Bean Loader opens to the list of example sketches. From here, you can select a sketch to upload from the included examples. You can also load an Arduino sketch from your phone's filesystem.

{{{img_rel this 'main.png' 'Main Menu' '40%'}}}

The toolbar icons, from left to right, are:

* Settings: Visit Beantalk, get more info about Bean, read our privacy policy, and check the app's version number.
* Bluetooth: Select a Bean to upload sketches to. You can also rename or blink a nearby Bean.

The sketch list is divided into three sections:

* Sketch Files: Select a sketch to upload from your phone's filesystem
* Examples: Example sketches that come with Bean Loader

## Programming an Example Sketch

### Open the Blink example

Tap the **BeanBlinkPowerSaving** sketch under the **Examples** header to open the power-saving Blink example sketch.

### Select Your Bean

Tap the Bluetooth icon in the upper right to open the Select Bean menu.

{{{img_rel this 'select-bean.png' 'Select Bean' '40%'}}}

Your Beans are listed with signal strength on the left. This helps you figure out which Bean you're connecting to.

To rename or blink a Bean, tap the 3 vertical dots icon to the right of a Bean in the list. If you are renaming a Bean and there are many Beans around, it's a good idea to first blink your Bean's LED to make sure you have selected the right device.

If your Bean doesn't change its name right away, try closing Bean Loader and opening it again. It may take some time for you too see the proper name on your device.  This is particularly due to caching on iOS and Android devices, which is unavoidable. 

{{{img_rel this 'bean-actions.png' 'Rename or Blink' '40%'}}}

Once you're ready to continue, tap your Bean to select it for programming.

{{{img_rel this 'bean-selected.png' 'Bean selected' '40%'}}}

### Upload to Bean

In the Sketch Editor, tap **Upload to Bean** to verify and upload your sketch to Bean:

{{{img_rel this 'uploading.png' 'Upload' '40%'}}}

Once your sketch uploads, your Bean will start running the Blink sketch and you'll get a success message. Hooray! Watch your Bean's LED and make sure it's blinking cyan every 10 seconds.

If your sketch upload fails for some reason, Bean Loader will display an error instead:

{{{img_rel this 'upload-failed.png' 'Detailed Upload Error' '40%'}}}

## Programming Your Own Sketches

Using example sketches can be fun, but you probably want to write your own code and upload that to Bean. We'll download a text editor for code, open the example sketch in it, save a modified copy, and upload that to Bean.

### Download DroidEdit

There are lots of Android text editors meant for editing code, but our favorite is DroidEdit. It's a simple code editor that does a good job.

Download DroidEdit Free from the Play Store here:

<a href="https://play.google.com/store/apps/details?id=com.aor.droidedit">
  <img src="../../_assets/images/getting-started/android/google_play.svg">
</a>

### Open the Blink Sketch in DroidEdit

Go back to Bean Loader and select the **BeanBlinkPowerSaving** sketch we used earlier. Then select **Export to Editor** to open the sketch in a different application, and select **DroidEdit Free:**

{{{img_rel this 'select-editor.png' 'Detailed Upload Error' '40%'}}}

The contents of the BeanBlinkPowerSaving example sketch will open in DroidEdit.

### Edit the Sketch and Save It

Let's change the blink cycle to be 1 second between blinks instead of 10 seconds. That way, it will be easy to tell if our sketch has been uploaded properly.

Change **line 9** from `Bean.sleep(9750);` to `Bean.sleep(750);`:

{{{img_rel this 'edit-sketch.png' 'Editing Sketch' '40%'}}}

Once that's done, tap the **drive** icon above the keyboard on the left, then select **Save**:

{{{img_rel this 'save-button.png' 'Save Button' '40%'}}}

DroidEdit will ask you where you want to save your sketch. Select **Local** to save to your phone's local filesystem:

{{{img_rel this 'save-local.png' 'Save to Local Filesystem' '40%'}}}

DroidEdit opens to your Android phone's home directory. Most apps open to the same directory, so it's a safe place to put files you want to find later.

Enter the filename **FasterBlink.ino** and select **Create** to save your sketch:

{{{img_rel this 'save-filename.png' 'Save as FasterBlink.ino' '40%'}}}

### Load, Compile and Upload Your New Sketch

Close DroidEdit and return to Bean Loader. (You can just hit the Back button a few times too.)

On the main screen of Bean Loader, select **Choose Sketch...**. A file browser will pop up.

{{{img_rel this 'open-sketch.png' 'File Browser' '40%'}}}

Select **FasterBlink.ino** and tap **OK** to select it for uploading. You'll see your sketch show up in the main menu:

{{{img_rel this 'sketch-selected.png' 'FasterBlink selected' '40%'}}}

Select **FasterBlink**, then tap **Upload to Bean** to send your new sketch to Bean.

Once the upload completes, your Bean's LED should be blinking every second instead of every 10 seconds!

## Conclusion

In this guide, you programmed your Bean with an example sketch, copied the example to your local sketches, and edited and saved your own version of Blink. You should be ready to get started writing and uploading sketches to your Bean!

### The Bean Cloud Compiler

Bean Loader for Android doesn't have Arduino installed locally. Instead, it sends sketches to the Bean Cloud Compiler to compile them into hex code for your Bean.

If you're working on a sketch and you need to use a library, it might be available on the Bean Cloud Compiler. Check out [this thread on Beantalk](http://beantalk.punchthrough.com/t/cloud-compiler-library-requests/1101) to see what libraries are available and to request new libraries for the Cloud Compiler.
