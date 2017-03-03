---
title: Surf Report Notifier
layout: basic-top-image.hbs
img: ../../projects/surf-report/1diagram21.png
autotoc: true
---

## Introduction

Punch Through is a company filled with surfers, always keeping track of the surf reports from all the nearby spots. This used to involve pulling up a bunch of tabs in a browser. Now, we just glance at the wall!

We enjoy seeing technology added to things in a subtle way. With this surf map, when the LEDs are off, you’d never know they are there. This surf map displays the report for the upcoming week, along with tide times, by use of LEDs behind the canvas. The report is pulled from the web by a Python script on my computer, then sent to the artwork over BLE using the Bean’s virtual serial port. Finally the Bean parses the report and displays the LEDs accordingly.

{{{video_rel this '281916134.mp4' '100%' false }}}

### Wave heights vs. quality

When you start surfing you learn that there are a ton of variables that create ‘good’ surf conditions. Wave size is only one of them. A 5 foot wave from wind-swell with on-shore wind is a lot different than a 5 foot wave from a nice ground swell with off-shore wind. This is why the example reads both the wave heights and the surf quality.  Surf quality is a function with many inputs: wind, tide, swell direction and swell size. Luckily for us, Surfline does a lot of this calculation, and they come out with a layman’s rating: Flat, Poor, Fair, Good, and EPIC. If you’re tuned into your local spots, you could pull the raw readings from the off shore buoys and formulate your own ratings.

{{{img_rel this '2conditions_scale1.png' 'scale' '100%'}}}

So our first step is to find a way to get these surf ratings in a format that we can send to our Bean. By using Surfline’s API, we get a JSON object back with all the info we need. Our Python code formats both the surf report and tide times, then sends over a virtual serial port to the Bean. If you’ve used Python with a serial port before, you’re right at home.

## Make It

Behind the canvas are a handful of NeoPixel LED arrays, a LiPo Battery, and a LiPo Charger. The Bean has an LDO Voltage regulator to keep its voltage at 3V, but the LED Array can run on the full battery voltage.

{{{img_rel this '3DSC00868-1280.jpg' 'inside the canvas' '100%'}}}

{{{img_rel this '4DSC00856-1280.jpg' 'neopixel setup' '100%'}}}

This is what the final wiring should look like:

{{{img_rel this '5surf-report-notifier.png' 'wiring diagram' '100%'}}}

The LEDs are placed behind the canvas. The artwork is a print we created, based on actual satellite images of the bay area, with some photoshop filters and 1980s California license plate inspired title.

{{{img_rel this '6CaliforniaGoldenState2GAT123.jpeg' 'the 1982 license plate design that inspired the title' '100%'}}}

{{{img_rel this '7norcal-satellite.jpg' 'an actual satellite image of the bay area' '100%'}}}

{{{img_rel this '8tumblr_inline_my0jslTuzt1qebopi.jpg' 'after a little photoshop' '100%'}}}


## Program Your Bean

All of the code for this project is available [on Github](https://github.com/PunchThrough/BeanSurfMap).

Upload the following code to your Bean:

```cpp
#include <Adafruit_NeoPixel.h>

/*
  Receive surf conditions, send them to the neopixel
  
 */
#define FORECASTDAYS 6
#define DATA_PIN 5
#define PIXELS_IN_STRIP 88//56
#define PIXELS_PER_ROW 8
#define PIXELS_PER_RING 16    


#define FADE_ITERATIONS  50
#define FADE_SLEEP_MS    30
#define FADE_INCREMENT_VALUE 2
#define SPOT_REPORT_SIZE 16

// Parameter 1 = number of pixels in strip
// Parameter 2 = pin number (most are valid)
// Parameter 3 = pixel type flags, add together as needed:
//   NEO_KHZ800  800 KHz bitstream (most NeoPixel products w/WS2812 LEDs)
//   NEO_KHZ400  400 KHz (classic 'v1' (not v2) FLORA pixels, WS2811 drivers)
//   NEO_GRB     Pixels are wired for GRB bitstream (most NeoPixel products)
//   NEO_RGB     Pixels are wired for RGB bitstream (v1 FLORA pixels, not v2)
Adafruit_NeoPixel strip = Adafruit_NeoPixel(PIXELS_IN_STRIP, DATA_PIN, NEO_GRB + NEO_KHZ800);

static uint8_t waveHeights[FORECASTDAYS];
static uint8_t waveConditions[FORECASTDAYS];
uint32_t pixels[PIXELS_IN_STRIP];
uint8_t brightness;
uint8_t loopCount;
bool receivedConditions=false;
uint8_t offSeconds=10;
uint8_t onSeconds=4;
void setAllPixelsRGB(int r, int g, int b){
  for (int i=0; i< PIXELS_IN_STRIP; i++){
    pixels[i]=((uint32_t)r << 16) | ((uint32_t)g <<  8) | b;
  }
}
void  setAllPixels(uint32_t p){
  for (int i=0; i< PIXELS_IN_STRIP; i++){
    pixels[i]=p;
  }
}
void setNPixelsAtIndex(uint8_t index, uint8_t n, uint32_t color){
    for (int i=index; i< index+n; i++){
    pixels[i]=color;
  }
}

void updateStripWithBrightness(uint8_t br){
  for (int i=0; i< PIXELS_IN_STRIP; i++){
    uint8_t
      r = (uint8_t)(pixels[i] >> 16),
      g = (uint8_t)(pixels[i] >>  8),
      b = (uint8_t)pixels[i];
      r = (r * br) >> 8;
      g = (g * br) >> 8;
      b = (b * br) >> 8;
    //pixels[i]=((uint32_t)r << 16) | ((uint32_t)g <<  8) | b;
    //Serial.println(g);
    strip.setPixelColor(i,r,g,b);
  }
  strip.show();
}  
void updateStripWithPixels(){
  for (int i=0; i< PIXELS_IN_STRIP; i++){
    strip.setPixelColor(i, pixels[i]);
  }
  strip.show();  
}


void setup() {
  
  // initialize serial communication 
  Serial.begin(57600);
  // this makes it so that the arduino read function returns
  // immediatly if there are no less bytes than asked for.
  Serial.setTimeout(25);
  for (int i=0; i++; i<FORECASTDAYS){
   waveHeights[i]=0;
   waveConditions[i]=0; 
  }
  strip.begin();
  //setAllPixelsRGB(201,0,0);
  brightness=0;
  loopCount=0;
  setAllPixels(strip.Color(0, 0, 0));
  updateStripWithBrightness(brightness);
}

void loop() 
{
  //16 bytes per surf spot, 7 spots, 112 total bytes
  char buffer[128];
  uint8_t lastSpotUpdated=0;  
  
    if ( Serial.available() >= SPOT_REPORT_SIZE )
    {
      Serial.readBytes(buffer, SPOT_REPORT_SIZE);
      if (buffer[1]==0x00 && buffer[2]==FORECASTDAYS){       //0 denotes wave heights
      lastSpotUpdated=buffer[0];
      if (lastSpotUpdated>3 && lastSpotUpdated<8){ //skip over the ring LEDs (16 each, 32 total / 8 == 4. The tide times index is 8
        lastSpotUpdated+=4; 
      }

      for (int i=0; i<FORECASTDAYS; i++){
         waveHeights[i]=buffer[i+3];
       }
       for (int i=0; i<FORECASTDAYS; i++){        //surf conditions
         waveConditions[i]=buffer[i+10];
       }
       receivedConditions=true;
      for (int i=0; i<FORECASTDAYS; i++){
        int ht=waveHeights[i]*waveHeights[i]*4;
        if (ht>255){
          ht=255;
        }
        if (waveConditions[i]<2){                 //flat or no forecast
          strip.setPixelColor(i+lastSpotUpdated*8,0,0,10 );
        }
        else if (waveConditions[i]>=2 && waveConditions[i]<4){ //poor = blue. The color of the summer here in NorCal
          pixels[i+lastSpotUpdated*8]=strip.Color(0, 0, ht);
        }
        else if (waveConditions[i]==4){           //poor to fair = bluegreen. Let's be optimistic here... ;)
          pixels[i+lastSpotUpdated*8]=strip.Color(0, ht/2+20, ht);
        }
        else if (waveConditions[i]>=5 && waveConditions[i]<7){ //fair = green
          pixels[i+lastSpotUpdated*8]=strip.Color(0,ht,0 );         
        }
        else if (waveConditions[i]>=7 && waveConditions[i]<9){ //good = orange
          pixels[i+lastSpotUpdated*8]=strip.Color(ht,ht,0 );         
        }
        else if (waveConditions[i]>=9){           //EPIC!! Stop what you're doing and go surf!!1
          pixels[i+lastSpotUpdated*8]=strip.Color(ht,0,00 );         
        }
        if (i==FORECASTDAYS-1){
          pixels[i+lastSpotUpdated*8+1]=pixels[i+lastSpotUpdated*8];    //have the next 2 pixels match the last day in the forecast
          pixels[i+lastSpotUpdated*8+2]=pixels[i+lastSpotUpdated*8];
        }
      }
    }
    else if (buffer[1]==0x02 ){  //tides
      lastSpotUpdated=buffer[0];
      if (buffer[3]>12) //if PM
        setNPixelsAtIndex(lastSpotUpdated*8,PIXELS_PER_RING,strip.Color(0,60,0));     //dimly turn on all ring LEDs so the ring shape comes through.
      else 
        setNPixelsAtIndex(lastSpotUpdated*8,PIXELS_PER_RING,strip.Color(0,0,80));     //dimly turn on all ring LEDs so the ring shape comes through.
      if (buffer[5]>12) //if PM
        setNPixelsAtIndex(lastSpotUpdated*8+PIXELS_PER_RING,PIXELS_PER_RING,strip.Color(0,60,0));     //dimly turn on all ring LEDs so the ring shape comes through.
      else 
        setNPixelsAtIndex(lastSpotUpdated*8+PIXELS_PER_RING,PIXELS_PER_RING,strip.Color(0,0,80));     //dimly turn on all ring LEDs so the ring shape comes through.

      //low tide first 
      uint8_t pixelHour,pixelMinute;
      
      if (buffer[3]==0 && buffer[4]==0){
        buffer[3]=1;
        buffer[4]=20;
        pixelHour= (buffer[3]%12)*(16.0/12.0);     //mod 12 to remove 24hr time, 16/12 to go from 12 values to 16 LEDs. 
        pixels[pixelHour+lastSpotUpdated*8]=strip.Color(200,0,0);
        pixelMinute= buffer[4]*(16.0/60.0); //
        pixels[pixelMinute+lastSpotUpdated*8]=strip.Color(0,200,0);
      }
      else{
        pixelHour= (buffer[3]%12)*(16.0/12.0);     //mod 12 to remove 24hr time, 16/12 to go from 12 values to 16 LEDs. 
        pixels[pixelHour+lastSpotUpdated*8]=strip.Color(200,0,0);
        pixelMinute= buffer[4]*(16.0/60.0); //
        pixels[pixelMinute+lastSpotUpdated*8]=strip.Color(0,200,0);          
      }
      //high tide next
      if (buffer[5]==0 && buffer[6]==0){//no high tide

      }
      else{
        pixelHour= (buffer[5]%12)*(16.0/12.0);    //mod 12 to remove 24hr time, 16/12 to go from 12 values to 16 LEDs. 
        pixels[pixelHour+lastSpotUpdated*8+PIXELS_PER_RING]=strip.Color(200,0,0);
        pixelMinute= buffer[6]*(16.0/60.0); //
        pixels[pixelMinute+lastSpotUpdated*8+PIXELS_PER_RING]=strip.Color(0,200,0);     
      }
    }
    else if (buffer[1]=0x03){ //set up 
      offSeconds=buffer[2];
      onSeconds=buffer[3];
      
    }
    updateStripWithPixels();
   }
   //fade on
   for (int i=0;i<FADE_ITERATIONS;i++){
    if (Serial.available()>=SPOT_REPORT_SIZE){      //don't sleep or fade if you have another report waiting.
     break; 
    }
    brightness+=FADE_INCREMENT_VALUE;
    Bean.sleep(FADE_SLEEP_MS);
    updateStripWithBrightness(brightness);
   }
   brightness=FADE_INCREMENT_VALUE*FADE_ITERATIONS;
   updateStripWithBrightness(brightness);
   if (Serial.available()<SPOT_REPORT_SIZE){        //don't sleep or fade if you have another report waiting.
     Bean.sleep(onSeconds*1000);
   }
    
   //fade off
   for (int i=0;i<FADE_ITERATIONS;i++){
   if (Serial.available()>=SPOT_REPORT_SIZE){       //don't sleep or fade if you have another report waiting.
     break; 
    }
    brightness-=FADE_INCREMENT_VALUE;
    Bean.sleep(FADE_SLEEP_MS);
    updateStripWithBrightness(brightness);
   }
   brightness=0;
   updateStripWithBrightness(brightness);
    if (Serial.available()<SPOT_REPORT_SIZE){       //don't sleep or fade if you have another report waiting.
     Bean.sleep(offSeconds*1000);
   }
      
}

 /* The Surfline Surf Quality Scale
 © Copyright 2000-2010 Surfline/Wavetrak, Inc.
 http://www.surfline.com/surf-science/rating-of-surf-heights-and-quality_31942/
 1 = FLAT: Unsurfable or flat conditions. No surf.
 2 = VERY POOR: Due to lack of surf, very poor wave shape for surfing, bad surf due to other conditions like wind, tides, or very stormy surf.
 3 = POOR: Poor surf with some (30%) FAIR waves to ride.
 4 = POOR to FAIR: Generally poor surf many (50%) FAIR waves to ride.
 5 = FAIR: Very average surf with most (70%) waves rideable.
 6 = FAIR to GOOD: Fair surf with some (30%) GOOD waves.
 7 = GOOD: Generally fair surf with many (50%) GOOD waves.
 8 = VERY GOOD: Generally good surf with most (70%) GOOD waves.
 9 = GOOD to EPIC: Very good surf with many (50%) EPIC waves.
 10 = EPIC: Incredible surf with most (70%) waves being EPIC to ride and generally some of the best surf all year.
 */
```

### Python on the computer

Copy the following code to your favorite Python IDE:

```python
# Surf Report Parser
# Written by Colin Karpfinger
# Uses a LightBlue Bean to display report in LEDs on a surf-map
# http://punchthrough.com/bean
# http://punchthrough.com/bean/examples/surf-report-notifier/
# https://github.com/PunchThrough/BeanSurfMap
import datetime
import urllib2
import simplejson as json
import time
import serial
from decimal import *
import config

daysInReport = 6
readingsToAverage = 4
earliestSurfHour=5 #ignore tide times earlier than 5am
latestSurfHour=21   #and later than 9pm
conditionTypes=["","flat", "very poor", "poor","poor to fair","fair","fair to good","good","very good","good to epic","epic"]

lowTides=[]
highTides=[]

tideUrl="http://api.wunderground.com/api/APIKEY/tide/settings/q/CA/94019.json"
tideUrl=tideUrl.replace("APIKEY",config.wundergroundApiKey)
webreq = urllib2.Request(tideUrl)
opener = urllib2.build_opener()
f = opener.open(webreq)
fstr = f.read()
fstr = fstr.strip() #remove any whitespace in start/end
tideReport=json.loads(fstr)	

for eachDay in tideReport["tide"]["tideSummary"]:
	if int(eachDay["date"]["mday"])==datetime.datetime.now().day and int(eachDay["date"]["hour"])>earliestSurfHour and int(eachDay["date"]["hour"])<latestSurfHour: #only add tide times during the day
		if eachDay["data"]["type"]=="Low Tide":
			lowTides.append(eachDay)
		elif eachDay["data"]["type"]=="High Tide":
			highTides.append(eachDay)

if len(lowTides)>0:

	#print "low tides: "+str(self.lowTides)
	print "Low Tide at: "+str(lowTides[0]["date"]["hour"])+":"+str(lowTides[0]["date"]["min"])
if len(highTides)>0:
	#print "Number of high tides: "+str(len(self.highTides))
	#print "high tides: "+str(self.highTides)
	print "High Tide at: "+str(highTides[0]["date"]["hour"])+":"+str(highTides[0]["date"]["min"])



class SurfSpot:
	baseUrl="http://api.surfline.com/v1/forecasts/0000?resources=surf,analysis&days=6&getAllSpots=false&units=e&interpolate=false&showOptimal=false"
	heightsMax=[]
	heightsMin=[]

	surflineUrl=""
	tideUrl=""
	surflineRegionalUrl=""
	surflineName=""
	textConditions=[]
	spotName =""
	todaysLocalCondition=0
	regionalConditions=[]
	def __init__(self, spotName, spotID, regionalID):
		self.spotName = spotName
		self.surflineUrl=self.baseUrl.replace("0000",spotID)
		self.surflineRegionalUrl=self.baseUrl.replace("0000",regionalID)

		self.heightsMax=[]
		self.heightsMin=[]
		self.regionalConditions=[]
	def getReport(self):
		webreq = urllib2.Request(self.surflineUrl, None, {'user-agent':'syncstream/vimeo'})
		opener = urllib2.build_opener()
		f = opener.open(webreq)
		fstr = f.read()
		fstr = fstr.replace(')','') #remove closing )
		fstr = fstr.replace(';','') #remove semicolon
		fstr = fstr.strip() #remove any whitespace in start/end
		rep = json.loads(fstr)

		webreq = urllib2.Request(self.surflineRegionalUrl, None, {'user-agent':'syncstream/vimeo'})
		opener = urllib2.build_opener()
		f = opener.open(webreq)
		fstr = f.read()
		fstr = fstr.replace(')','') #remove closing )
		fstr = fstr.replace(';','') #remove semicolon
		fstr = fstr.strip() #rem3ove any whitespace in start/end
		regionalReport=json.loads(fstr)


		self.surflineName=rep["name"]
		for day in range(0,daysInReport):
			daysAvgMax=0
			daysAvgMin=0
			self.regionalConditions.append(conditionTypes.index(regionalReport["Analysis"]["generalCondition"][day]))
			if len(rep["Surf"]["surf_max"])==6:
				for reading in range(0,readingsToAverage):
					if daysAvgMax==0:
						daysAvgMax=rep["Surf"]["surf_max"][day][reading]
					else:
						daysAvgMax=(daysAvgMax+rep["Surf"]["surf_max"][day][reading])/2.0
					if daysAvgMin==0:
						daysAvgMin=rep["Surf"]["surf_min"][day][reading]
					else:
						daysAvgMin=(daysAvgMin+rep["Surf"]["surf_min"][day][reading])/2.0
			else: #don't need to average, since the report doesn't have multiple readings. 
				daysAvgMax=rep["Surf"]["surf_max"][0][day]
				daysAvgMin=rep["Surf"]["surf_min"][0][day]
 
			self.heightsMax.append(Decimal(daysAvgMax).quantize(Decimal('1'), rounding=ROUND_UP))
			self.heightsMin.append(Decimal(daysAvgMin).quantize(Decimal('1'), rounding=ROUND_UP))
	def printReport(self):
		reportText=self.spotName+" Forecast: "
		for day in range(0,daysInReport):
			reportText=reportText+str(self.heightsMin[day])+"-"+str(self.heightsMax[day])+" ft. "+str(conditionTypes[self.regionalConditions[day]])+"  "
		print reportText
	
bolinas = SurfSpot("Bolinas", "5091","2949")
lindamar = SurfSpot("Linda Mar", "5013","2957")
mavericks = SurfSpot("Mavericks", "4152", "2957")
oceanBeach = SurfSpot("Ocean Beach", "4127", "2957")
fourMile = SurfSpot("Four Mile", "2958", "2958")
steamerLane = SurfSpot("Steamer Lane", "4188", "2958")
pleasurePoint = SurfSpot("Pleasure Point","4190", "2958")

spots = [lindamar,bolinas,mavericks,oceanBeach,fourMile,steamerLane,pleasurePoint] #same order as the surf artwork

ser = serial.Serial('/tmp/tty.LightBlue-Bean', 9600, timeout=0.25)
spotindex=0
for spot in spots:
	sendBytes=[]
	spot.getReport()
	sendBytes.append(spotindex)
	sendBytes.append(0)
	sendBytes.append(daysInReport)
	for dayindex in range(0,daysInReport):
		sendBytes.append(spot.heightsMax[dayindex])
	sendBytes.append(1)
	for dayindex in range(0,daysInReport):
		sendBytes.append(spot.regionalConditions[dayindex])
	buff=[chr(i) for i in sendBytes]
	if ser:
		ser.write(buff)
		ser.flush()
	else:
		print "Serial port not open."
	time.sleep(.1)
	spot.printReport()
	spotindex+=1


#now send tides 
#[0,0,6,1,2,3,4,5,5,1,4,5,5,7,5,5]
#[4,2,length of tides(2), low tide hour, low tide min, high tide hour, high tide min, 0,0, remainder zeros ]

sendBytes=[]
sendBytes.append(4)  #starts at 4th neopixel array	
sendBytes.append(2)  #tide iD is 2
sendBytes.append(len(lowTides)+len(highTides))
if (len(lowTides)>0):
	sendBytes.append(int(lowTides[0]["date"]["hour"]))
	sendBytes.append(int(lowTides[0]["date"]["min"]))
else:
	sendBytes.append(0)
	sendBytes.append(0)
if (len(highTides)>0):
	sendBytes.append(int(highTides[0]["date"]["hour"]))
	sendBytes.append(int(highTides[0]["date"]["min"]))
else:
	sendBytes.append(0)
	sendBytes.append(0)
while len(sendBytes)< 16:
	sendBytes.append(0) #fill reaminder with zeros 

buff=[chr(i) for i in sendBytes]
ser.write(buff)
ser.flush()

# sendBytes=[0,3,1,11]
# while len(sendBytes)< 16:
# 	sendBytes.append(0) #fill reaminder with zeros 
# buff=[chr(i) for i in sendBytes]
# print buff #debug
# ser.write(buff)
# ser.flush()

time.sleep(.25)
ser.close()
print "Finished."
```

Create a new file called `config.py` and put this code in it:

```python
wundergroundApiKey="derpaderp"
```

Make sure `config.py` is in the same folder as the other Python program!

## Learn More

Having trouble with this guide?  Reach out to [BeanTalk](http://beantalk.punchthrough.com/) to get directed feedback from our developers and community!

