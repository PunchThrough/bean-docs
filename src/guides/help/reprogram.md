---
title: Reprogram Malicious Sketch
layout: basic.hbs
autotoc: true
order: 3
---

## The Problem

It is possible that a Sketch could prevent further uploads to the Bean. This is unlikely, and never intentional, but it can happen under the right circumstances or when using some advanced features of the Bean. However, it is possible to recover devices in this state. Theoretically, the recovery process can be done using any Loader app on any platform. Here is the high level process that is required to recover the Bean:

1. Hold ATmega MCU in "reset" by connecting RST to GND using a jumper wire.
2. Reboot the Bean
3. Start the sketch upload process.
4. Remove the jumper within a specific ~100ms window.
5. Profit

This video shows how to do this using the OS X loader.

<iframe width="560" height="315" src="https://www.youtube.com/embed/I_4s842e7MU" frameborder="0" allowfullscreen></iframe>

However, there is a MUCH easier way to do this that makes the timing way easier, using our CLI Loader...see the next section.

## Using the CLI Loader (Recommended)

The CLI Loader provides an optional argument to the `program_sketch` command called `--oops`. This will pause the sketch upload progress and prompt the user for input to the console before continuing. This allows the user to press "enter" on the keyboard and remove the jumper "simultaneously" making the timing required much easier!

Example:

```
bean program_sketch <sketchname> -n <beanname> --oops
```

Here is the prompt you will be looking for, when you see it, pull the jumper wire out of the Bean and press "enter" on your keyboard a split-second after (or at the same time should work).

{{{img_rel this 'cli-oops.png' 'CLI Oops' '100%'}}}
