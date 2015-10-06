---
title: Temperature Sensor
layout: basic.hbs
autotoc: true
---

## Introduction

This guide will take you through the process of reading the temperature from the Bean's
on-board [BMA250 temperature sensor](http://ae-bst.resource.bosch.com/media/products/dokumente/bma250/bst-bma250-ds002-05.pdf).


## Before you begin

Familiarize yourself with the following Guides:

* [Virtual Serial](#)

Hardware required:

* Bean
* Computer

## Step-by-step

### Program the Bean

Load the following code onto the Bean which will read the temperature and print it
back over the Serial port.

```
static int8_t temp = 0;

// the setup routine runs once when you press reset:
void setup()
{
  // initialize serial communication
  Serial.begin();
}

void loop()
{
 int8_t newTemp = Bean.getTemperature();

 if ( newTemp != temp )
 {
   temp = newTemp;
   Serial.print("Temperature is ");
   Serial.print(temp);
   Serial.println(" degrees Celsius");
 }

 // Sleep for a second before reading the temperature again
 Bean.sleep(1000);
}
```


## Conclusion

TODO

## Troubleshooting

TODO
