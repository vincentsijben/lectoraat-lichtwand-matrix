//https://www.tweaking4all.nl/hardware/arduino/adruino-led-strip-effecten/
// https://forum.makerforums.info/t/heres-an-updated-version-of-my-fastled-to-processing-experiment-now-with-the-option/65708

#include "FastLED.h"
#define NUM_LEDS 64
CRGB leds[NUM_LEDS];
#define PIN 6

const int numChars = 1201;
char receivedChars[numChars];
boolean newData = false;

struct color {
    byte r;
    byte g;
    byte b;
};
color ledColorArray[NUM_LEDS];
int ledColorArrayLength = sizeof(ledColorArray) / sizeof(ledColorArray[0]);


void setup()
{
  FastLED.addLeds<WS2811, PIN, GRB>(leds, NUM_LEDS).setCorrection( TypicalLEDStrip );
  Serial.begin(9600);
  Serial.println("hello from setup");

  for (int i = 0; i < NUM_LEDS; i++) {
    ledColorArray[i] = {1, 0, 100};
  }

  setAll(0,1,1);

}


void loop() {

  recvWithStartEndMarkers();
  if (newData == true) {
    // strcpy(tempChars, receivedChars);
    // this temporary copy is necessary to protect the original data
    //   because strtok() used in parseData() replaces the commas with \0
    parseData();
    showParsedData();
    newData = false;
  }
  
 showStrip();
}

//============

void recvWithStartEndMarkers() {
  static boolean recvInProgress = false;
  static int ndx = 0;
  char startMarker = '<';
  char endMarker = '>';
  char rc;

  while (Serial.available() > 0 && newData == false) {
    rc = Serial.read();

    if (recvInProgress == true) {
      if (rc != endMarker) {
        receivedChars[ndx] = rc;
        ndx++;
        if (ndx >= numChars) {
          ndx = numChars - 1;
        }
      }
      else {
        receivedChars[ndx] = '\0'; // terminate the string
        recvInProgress = false;
        ndx = 0;
        newData = true;
      }
    }

    else if (rc == startMarker) {
      recvInProgress = true;
    }
  }
}

//============

void parseData() {      // split the data into its parts

  int arrIndex = 0;
  char *strtokIndx; // this is used by strtok() as an index

  strtokIndx = strtok(receivedChars, ",");

   while (strtokIndx != NULL) {
      int r = atoi(strtokIndx);
      
      strtokIndx=strtok(NULL, ",");
      int g = atoi(strtokIndx);
      
      strtokIndx=strtok(NULL, "+");
      int b = atoi(strtokIndx);

      ledColorArray[arrIndex] = {r, g, b};
      
      strtokIndx=strtok(NULL, ",");
      arrIndex++;
   }
  
}

//============

void showParsedData() {
  // Serial.println("Message: ");
  
  // for (int i = 0; i < ledColorArrayLength-1; i++) {

  //   Serial.print(ledColorArray[i].r);
  //   Serial.print("-");
  //   Serial.print(ledColorArray[i].g);
  //   Serial.print("-");
  //   Serial.println(ledColorArray[i].b);
  // }

  for (int i = 0; i < ledColorArrayLength; i++) {
      setPixel(i, ledColorArray[i].r, ledColorArray[i].g, ledColorArray[i].b);
    }

  showStrip();

}

void showStrip() {
#ifdef ADAFRUIT_NEOPIXEL_H
  // NeoPixel
  strip.show();
#endif
#ifndef ADAFRUIT_NEOPIXEL_H
  // FastLED
  FastLED.show();
#endif
}

void setPixel(int Pixel, byte red, byte green, byte blue) {
#ifdef ADAFRUIT_NEOPIXEL_H
  // NeoPixel
  strip.setPixelColor(Pixel, strip.Color(red, green, blue));
#endif
#ifndef ADAFRUIT_NEOPIXEL_H
  // FastLED
  leds[Pixel].r = red;
  leds[Pixel].g = green;
  leds[Pixel].b = blue;
#endif
}

void setAll(byte red, byte green, byte blue) {
  for (int i = 0; i < NUM_LEDS; i++ ) {
    setPixel(i, red, green, blue);
  }
  showStrip();
}
