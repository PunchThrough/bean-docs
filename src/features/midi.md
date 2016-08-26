---
title: MIDI
layout: basic.hbs
autotoc: true
---

## Introduction

MIDI (Musical Instrument Digital Interface) is a musical encoding protocol invented to help devices, namely electric keyboards, to interact with household computers and other synthetic music devices.

This guide will show you how to turn the Bean into a MIDI controller capable of sending music to MIDI-compatible music programs such as GarageBand.

## About MIDI

MIDI has been around since 1983, and was invented because of a strong demand for a powerful, universal synthesizer protocol. Before MIDI was invented, a host of other digital and analog synthesizer tools were used, such as CV/gates, triggers, DIN syncs, and other less universal, less exhaustive proprietary devices.

Since MIDI is a *digital interface*, it doesn't carry actual sound like a record or digital audio disc; it carries a binary code of which notes are played, and when. The MIDI data, being a string of ones and zeros, has no meaning outside of an interpreter. A MIDI interpreter is able to take the encoded data and translate it into sounds from different instruments.

MIDI itself cannot record or transfer real noises like an etched record, but it can take input from a *MIDI controller*, which is most often a keyboard but can also be other MIDI-compatible instruments (like the Bean). This input is encoded to account for when and which notes were played. Output sounds from the MIDI interpreter can range from pianos, to orchestra instruments, to percussion.

## Before You Begin

{{> snip_req_getting_started}}

You also need to understand how to use Virtual Serial to read data from Bean. If you haven't used this yet, [check out the Virtual Serial guide](../virtual-serial/) before continuing.

### Software

* {{> snip_req_bean_loader}}
* Bean Loader ([install guides](../../getting-started/intro/#next-steps))
* GarageBand, or another audio program capable of MIDI input

### Hardware

* {{> snip_req_bean}}
* Computer (for audio program)

## Program Your Bean

Upload the following sketch to your Bean. This sketch repeatedly plays the C Major scale, and then 3 simultaneous notes, and sends the notes to your computer over Bluetooth.

```cpp
void setup() {
  // We don't have to do anything here
}

char scale[8] = {NOTE_C4, NOTE_D4, NOTE_E4, NOTE_F4,
                 NOTE_G4, NOTE_A4, NOTE_B4, NOTE_C5};

void loop() {
  for (int i = 0; i < 8; i++) {
    BeanMidi.noteOn(CHANNEL1, scale[i], 60);
    Bean.setLedBlue(50);
    delay(500);
    BeanMidi.noteOff(CHANNEL1, scale[i], 60);
    Bean.setLedBlue(0);
    checkMidi();
    delay(500);
  }

  BeanMidi.noteOn(CHANNEL1, NOTE_C4, 60);
  BeanMidi.noteOn(CHANNEL1, NOTE_E4, 60);
  BeanMidi.noteOn(CHANNEL1, NOTE_G4, 60);
  Bean.setLedBlue(50);
  delay(2000);
  BeanMidi.noteOff(CHANNEL1, NOTE_C4, 60);
  BeanMidi.noteOff(CHANNEL1, NOTE_E4, 60);
  BeanMidi.noteOff(CHANNEL1, NOTE_G4, 60);
  Bean.setLedBlue(0);

  BeanMidi.noteOn(CHANNEL1, 60, 70);
  Bean.setLedBlue(50);
  delay(1000);
  BeanMidi.pitchBend(CHANNEL1, 0x2500);
  delay(1000);
  BeanMidi.pitchBend(CHANNEL1, 0x2000);
  delay(1000);
  BeanMidi.noteOff(CHANNEL1, 60, 0);
  Bean.setLedBlue(0);	
  checkMidi();
}

void checkMidi() {
  uint8_t stat, byte1, byte2;
  if (BeanMidi.readMessage(&stat, &byte1, &byte2)) {
    Bean.setLedGreen(130);
    delay(50);
    Bean.setLedGreen(0);
  }
}
```

## For Use In GarageBand

For GarageBand, you'll want to open a new keyboard collection while MIDI data is being transmitted from the Bean. The MIDI data should automatically start playing the notes on topmost instrument in the collection. The video below shows a Bean and a Bean+ transmitting MIDI data over channels 1 and 2. Up to 16 channels can be used simultaneously, and multiple Beans can also transmit data over the same channel. 

{{{video_rel this 'two-beans-midi.mp4'}}}

## Explanation

* **Lines 5-6**: Initialize a character array with the notes of the C Major chord
* **Lines 8-17**: Play the C Major scale by parsing through the character array one at a time, turning on each note for one second and then turning it off again
* **Lines 19-27**: Play three notes at once for two seconds
* **Lines 29-37**: Play an arbitrary note for three seconds while bending the pitch
* **Line 39**: Call the checkMidi void to read a single incoming MIDI message
* **Lines 43**: Declare 8-bit unsigned ints
* **Lines 44-48**: If there exists a MIDI message, briefly blink the green LED

### Functions

`noteOn` takes three parameters: a channel, a note, and a volume. Channels are numbered 0-15, and can be used to input and output multiple fonts at once. Notes and volumes range from 0-127. Channels and notes also have definitions, such as `CHANNEL1` and `NOTE_E4`, which can be used in place of numbers.

`noteOff` simply turns off notes specified by channel, note, and volume.

`pitchBend` distorts channels to adjust their notes' pitches up or down, and takes a channel and a 2-byte value from 0-16383, where 0x2000 (8192 in decimal) is the true middle (normal pitch) of the note.

`readMessage` takes three *pointers*, or memory addresses, and assigns values to them based on the current MIDI message in the serial buffer. MIDI messages are comprised of three bytes, or 8-bit values; the first is the status byte (`stat`) which signifies the type of message. The next two (`byte1` and `byte2`) are the message itself. Message types are as shown below:

```cpp
typedef enum {
    NOTEOFF             = 0x80,
    NOTEON              = 0x90,
    POLYPHONICPRESSURE  = 0xA0,
    CONTROLCHANGE       = 0xB0,
    PROGRAMCHANGE       = 0xC0,
    CHANNELPRESSURE     = 0xD0,
    PITCHBENDCHANGE     = 0xE0,
    SYSTEMCOMMON        = 0xF0,
    SYSTEMREALTIME      = 0xF8
}midiMessageTypes;
```

## Conclusion

In this guide, you learned how to use the Bean as a MIDI controller for your computer. You can use a plethora of related MIDI functions to create endless compositions.

## Troubleshooting

{{> snip_troubleshooting}}