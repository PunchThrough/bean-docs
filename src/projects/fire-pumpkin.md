---
title: Pumpkin NotiFire
layout: basic-top-video.hbs
vid: ../../projects/fire-pumpkin/PumpkinFirePhone.mp4
loop: true
autotoc: true
order: 1
---

## Introduction

<iframe width="560" height="315" src="https://www.youtube.com/embed/ScVQEZZuLLU" frameborder="0" allowfullscreen></iframe>

The pumpkin NotiFire is a delicious but questionable combination of a Glade aerosol air freshener, fire and text messages. We hacked a Glade air freshener and combined it with our Bean+ to make a pumpkin spit fire based on iOS notifications. 

The Bean+ is connected to the phone over Bluetooth Low Energy using ANCS (Apple Notification Center Service) to receive the phones notifications. The Bean+ sketch filters through the notifications and triggers the air freshener on any new message. ANCS can be used to to trigger on any notification, have fire shoot every time your favorite team scores using the ESPN app or really light your fire when you get a Tinder match. 

Let's start by saying, this is just a horrible idea. One of those horrible ideas that is just so good you can't resist making it. Building this Mike singed his eye brows, burned his hand and even inhaled flaming hair spray. The upside is your home will have an overwhelming smell of fresh burning linen. 

Now that we got that warning out of the way, let's make this horrible Halloween contraption!

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

The air freshener is controlled through it's one shot switch located on the back of the unit. Normally the air freshener is operated on a timer but glade added a manual one-shot for those especially dank moments. The one-shot button is a micro-switch that connects an active low signal to ground in order to activate the unit. The signal from the air freshener is connected to D0 on the Bean+. 

We removed the batteries that came with the air freshener and opted to power the whole device from the Bean+'s 3.3V regulator. This allows the Pumpkin NotiFire to be re-charged and more importantly there is one power switch. Which is really important when you are working with things that breath fire ;)

Originally the Pumpkin NotiFire was going to use a stun gun that is triggered by the Bean+ to ignite the aerosol stream. After putting together a questionable Amazon cart that included, servos, butane and many different stun guns we forgot to click the order button. After realizing it is pretty hard to find stun guns locally we fell back on the 1800's classic, a candle. 

{{{img_rel this 'GladeInPackage.jpg' 'New Glade!' '75%'}}}

{{{img_rel this 'GladeOpen.jpg' 'The insides' '75%'}}}

{{{img_rel this 'Candle.jpg' 'New Glade!' '75%'}}}

Glue the candle to the front of the glade or find a way to set it in front of it.  It is best to place the candle as close to the nozzle on the Glade air fresher as possible. Make sure the flame isn't in the path of the stream, otherwise it puts out the candle every time.

### Carve your pumpkin

It is essential that your pumpkin looks amazing otherwise the Halloween gods may punish you with a proper burning. ( I lost my knuckle hair for my sins. ) Really this means making sure you line up the nozzle on the Glade Air Freshener with the mouth of your pumpkin.

{{{img_rel this 'CarvingSettingUp.JPG' 'Get everything you need' '75%'}}}

Get everything together to gut this puppy!

{{{img_rel this 'PumpkinCutTop.jpg' 'STAB TOP OFF' '75%'}}}

Safely use a large knife to remove the top.

{{{img_rel this 'PumpkinPullOutGuts.jpg' 'Gutt it!' '75%'}}}

Use hands to cleanly remove insides.

{{{img_rel this 'PumpkinKnifeEyes.jpg' 'REMOVE EYES!' '75%'}}}

Safely hold pumpkin in one hand while using sharp knife to stab eyes out.

{{{img_rel this 'PumpkinOutside.jpg' 'All Done!' '75%'}}}

Admire your creation. It is time to turn this pumpkin into a fire breathing dragon.

## Program Your Bean

In order to get the Pumpkin NotiFire to spit flames whenever you get a text we used [ANCS ](/features/ancs/) (Apple Notification Center Service) to receive all the phones notifications. The Bean+ goes through the notifications and triggers if there is a text message notifications. This could be done with any notification or a specific text message!

After the Bean+ is paired with your phones ANCS sends all notifications that you receive. Be careful because it sends all the qued up notifications that you have never looked at. Before you go throwing flames it's time to clear all those tinder match notifications and the text messages that come with them.

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

## Add the Fire & Test

{{{video_rel this 'FireTest.mp4' '75%' true }}}

## Bring it all Together!

Place your now working flamethrower inside the pumpkin making sure the nozzle points out of the pumpkin. Otherwise you could end up with a Note 7 situation inside the pumpkin.

{{{img_rel this 'InsidePumpkin.jpg' 'New Glade!' '75%'}}}

{{{video_rel this 'PumpkinFireExperiment.mp4' '75%' true }}}

## Conclusion

## Learn More
* [Thanks to David Bates and his wonderful idea to use the air freshener!](https://www.hackster.io/Dlbates/iot-flaming-and-talking-pumpkin-using-aws-and-esp8266-49934f)
