---
title: Pumpkin NotiFire
layout: basic-top-video.hbs
vid: ../../projects/fire-pumpkin/PumpkinFirePhone.mp4
loop: true
autotoc: true
order: 1
---

## Introduction

<div>
  <iframe width="703" height="396" src="https://www.youtube.com/embed/ScVQEZZuLLU" frameborder="0" allowfullscreen></iframe>
</div>


The pumpkin NotiFire is a delicious but questionable combination of a Glade aerosol air freshener, fire and text messages. We hacked a Glade air freshener and combined it with our Bean+ to make a pumpkin spit fire based on iOS notifications. 

The Bean+ is connected to the phone over Bluetooth Low Energy using ANCS (Apple Notification Center Service) to receive the phones notifications. The Bean+ sketch filters through the notifications and triggers the air freshener on any new text message. ANCS can be used to trigger on any notification, have fire shoot every time your favorite team scores using the ESPN app or really light your fire when you get a Tinder match. 

Let's start by saying, this is just a horrible idea. One of those horrible ideas that is just so good you can't resist making it. While building this, Mike singed his eye brows, burned his hand and even inhaled flaming hair spray. The upside is your home will have an overwhelming smell of fresh burning linen. 

{{{video_rel this 'HandBurn.mp4' '75%' true }}}

Now that we have warned you of the dangers, let's start creating this fire-breathing Halloween contraption!

## Before You Begin

{{> snip_req_getting_started}}

### Software

* {{> snip_req_bean_loader}}

### Hardware

* {{> snip_req_bean}}
* iOS device
* [Glade Automatic Spray Air Freshener](https://www.amazon.com/GladeAutomatic-Freshener-Hawaiian-Breeze-Starter/dp/B004GCUK8A/)
* [Tea Candles](https://www.amazon.com/Country-Dreams-Unscented-Lights-Pkg-White/dp/B001681QZ8)
* Large Pumpkin & various carving tools

## Make it

### Hack the Glade

The air freshener is controlled through it's one shot switch located on the back of the unit. Normally the air freshener is operated on a timer but glade added a manual one-shot for those especially dank moments. The one-shot button is a micro-switch that connects an active low signal to ground in order to activate the unit. The ones-shot signal from the air freshener is connected to D0 on the Bean+ and is used to trigger the spray.

We removed the batteries that came with the air freshener and opted to power the whole device from the Bean+'s 3.3V regulator. This allows the Pumpkin NotiFire to be re-charged and more importantly there is one power switch. It is really important when you are working with things that breath fire ;)

Originally the Pumpkin NotiFire was going to use a stun gun triggered by the Bean+ to ignite the aerosol stream. After putting together a questionable Amazon cart that included, servos, butane and many different stun guns we forgot to click the order button. After realizing it is pretty hard to find stun guns locally, we fell back on the 1800's classic, a candle. 

{{{img_rel this 'GladeInPackage.jpg' 'New Glade!' '75%'}}}

{{{img_rel this 'GladeOpen.jpg' 'The insides' '75%'}}}

{{{img_rel this 'Candle.jpg' 'New Glade!' '75%'}}}

Glue or place the candle as close to the Glade nozzle as possible.  Protip: Make sure the flame isn't in the path of the stream, otherwise it puts out the candle every time.

### Carve your pumpkin

It is essential that your pumpkin looks amazing otherwise the Halloween gods may punish you with a proper burning (I lost my knuckle hair for my sins). This means making sure you line up the nozzle on the Glade Air Freshener with the mouth of your pumpkin.

{{{img_rel this 'CarvingSettingUp.JPG' 'Get everything you need' '75%'}}}

Get everything together to gut this pumpkin!

{{{img_rel this 'PumpkinCutTop.jpg' 'STAB TOP OFF' '75%'}}}

Safely use a large knife to remove the top.

{{{img_rel this 'PumpkinPullOutGuts.jpg' 'Gutt it!' '75%'}}}

Use hands to cleanly remove insides.

{{{img_rel this 'PumpkinKnifeEyes.jpg' 'REMOVE EYES!' '75%'}}}

Safely hold pumpkin in one hand while using sharp knife to stab eyes out.

{{{img_rel this 'PumpkinOutside.jpg' 'All Done!' '75%'}}}

Admire your creation. It is time to turn this pumpkin into a fire breathing dragon.

## Program Your Bean

In order to get the Pumpkin NotiFire to spit flames whenever you get a text we used [ANCS](/features/ancs/) (Apple Notification Center Service) to receive all the phones notifications. The Bean+ goes through the notifications and triggers if there is a text message. The opportunities are endless, as it can be triggered with any notification or a specific text message!

After the Bean+ is paired with the phone, it will forward all notifications over ANCS. Be careful because it sends all the queued up notifications that you have never looked at. So before you go throwing flames you better clear the notifications for all those tinder matches and the text messages that come with them.

### Code

```cpp
#define FIRE    0

AncsNotification notifications[8];

void setup() {
  // Serial port is initialized automatically; we don't have to do anything
  BeanAncs.enable();
  pinMode(FIRE, OUTPUT);
  digitalWrite(FIRE, HIGH);
}

void loop() {
  int msgAvail = BeanAncs.notificationsAvailable();
  
  if (msgAvail) {
    Bean.setLedRed(30);

    BeanAncs.getNotificationHeaders(notifications, 8);

    for (int i = 0; i < msgAvail; i++) {
      if (notifications[i].catID == 4) {
        Bean.setLedGreen(155);
        delay(500);
        digitalWrite(FIRE, LOW);
        delay(500);
      }
      Bean.setLedGreen(0);
      digitalWrite(FIRE, HIGH);
      delay(3000);
    }
    Bean.setLedRed(0);
  }
}
```

## Add the Fire and Test

{{{video_rel this 'FireTest.mp4' '75%' true }}}

## Bring it all Together!

Place your now working flamethrower inside the pumpkin making sure the nozzle points out of the pumpkin, otherwise you could end up with a Note 7 situation inside.

{{{img_rel this 'InsidePumpkin.jpg' 'New Glade!' '75%'}}}

{{{video_rel this 'PumpkinFireExperiment.mp4' '75%' true }}}

## Learn More
* [Thanks to David Bates and his wonderful idea to use the air freshener!](https://www.hackster.io/Dlbates/iot-flaming-and-talking-pumpkin-using-aws-and-esp8266-49934f)
* [Guide for ANCS on the Bean+](/features/ancs/)
