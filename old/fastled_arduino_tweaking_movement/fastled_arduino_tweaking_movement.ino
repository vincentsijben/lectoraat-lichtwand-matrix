#include "FastLED.h"
#define NUM_LEDS 64
CRGB leds[NUM_LEDS];
int lf = 10;
int incomingByte;
#define PIN 6
int vincent[10] = { 0, 3, 6, 9, 12, 15, 18, 21, 24, 27};
String myString = "";
String hoi = "";
String first = "";
String second = "";
String third = "";
String fourth = "";
String fifth = "";
String inputString = "";         // a string to hold incoming data
boolean stringComplete = false;  // whether the string is complete

class MyClass {       // The class
  public:             // Access specifier
    //int order;        // Attribute (int variable)
    int r;
    int g;
    int b;

};
MyClass myObj[NUM_LEDS];  // Create an object of MyClass

//https://www.tweaking4all.nl/hardware/arduino/adruino-led-strip-effecten/
// https://forum.makerforums.info/t/heres-an-updated-version-of-my-fastled-to-processing-experiment-now-with-the-option/65708

void setup()
{
  FastLED.addLeds<WS2811, PIN, GRB>(leds, NUM_LEDS).setCorrection( TypicalLEDStrip );
  Serial.begin(9600);
  Serial.println("hello from setup");

  for (int i = 0; i < NUM_LEDS; i++) {

    //myObj[i].order = i + 1;
    myObj[i].r = 0;
    myObj[i].g = 0;
    myObj[i].b = 0;
  }


}


int counter = 0;
void serialEvent() {
  
  Serial.println("serialEvent triggered");
  Serial.println(Serial.available());

  while (Serial.available()) {
    //Serial.println("serial available");
    char inChar = (char)Serial.read();
    // add it to the inputString:
    inputString += inChar;

    // if the incoming character is a newline, set a flag
    // so the main loop can do something about it:
    if (inChar == '|') {

      stringComplete = true;

      String tempString = inputString;
      int koppelTeken = tempString.indexOf(";");

      first = tempString.substring(0, koppelTeken);//T
      tempString = tempString.substring(koppelTeken + 1);
      koppelTeken = tempString.indexOf(";");

      second = tempString.substring(0, koppelTeken);//Y
      tempString = tempString.substring(koppelTeken + 1);
      koppelTeken = tempString.indexOf("|");

      third = tempString.substring(0, koppelTeken);//P
      //            inputString = "";

      //            Serial.println("=== BEGIN ===");
      Serial.println(counter);
      Serial.println(first + "-" + second + "-" + third);
      //            Serial.println(second);
      //            Serial.println(third);
      //            Serial.println("=== END ===");

      myObj[counter].r = first.toInt();
      myObj[counter].g = second.toInt();
      myObj[counter].b = third.toInt();
      counter++;
      Serial.println("inputString: " + inputString);
      inputString = "";
      //      delay(50);

    }


  }
  
}

// *** REPLACE FROM HERE ***
void loop() {
  //  colorWipe(0x00,0xff,0x00, 50);
  //  colorWipe(0x00,0x00,0x00, 50);
  //  Serial.println("hello from loop");
  if (stringComplete) {
    //    Serial.println(counter);
    //    Serial.println(second);
    //    Serial.println(third);
    //    Serial.println("===");
    //    Serial.println(myObj[0].r);
    //    Serial.println(myObj[0].g);
    //    Serial.println(myObj[0].b);
    //    Serial.println(myObj[1].r);
    //    Serial.println(myObj[1].g);
    //    Serial.println(myObj[1].b);
    // clear the string:

    inputString = "";
    stringComplete = false;


    //myObj[1].order = second.toInt();
    //    myObj[1].r = first.toInt();
    //    myObj[1].g = second.toInt();
    //    myObj[1].b = third.toInt();


    for (int i = 0; i < NUM_LEDS; i++) {
      //      if (i == 1) {
      //      Serial.println(myObj[i].r);
      //      Serial.println(myObj[i].g);
      //      Serial.println(myObj[i].b);
      //      }

      //    setPixel(i, 0, 255, 0);
      setPixel(i, myObj[i].r, myObj[i].g, myObj[i].b);
    }
  }


  showStrip();
  //  Serial.println(first);
  //    int koppelTeken = myString.indexOf(":");
  //    String mySensor = myString.substring(0, koppelTeken);
  //    String myData = myString.substring(koppelTeken + 1);
  //    if (mySensor == "AAAAAAAAAA") {
  //      int dataOmgezet = myData.toInt();
  //      if (dataOmgezet < 325) {
  //        rainbowCycle(20);
  //      }
  //      if(dataOmgezet > 325){
  //        Strobe(0xff, 0xff, 0xff, 10, 50, 1000);
  //      }
  //    }
  //Strobe(0xff, 0xff, 0xff, 10, 50, 1000);
  //Serial.flush();

  //    // read the oldest byte in the serial buffer:
  //    incomingByte = Serial.read();
  //    Serial.println(incomingByte);
  //    // if it's a capital H (ASCII 72), turn on the LED:
  //    if (incomingByte == 'A') {
  //      Serial.println("arduino: got A");
  //      rainbowCycle(20);
  //    }
  //    // if it's an L (ASCII 76) turn off the LED:
  //    if (incomingByte == 'B') {
  //      Serial.println("arduino: got B");
  //      Strobe(0xff, 0xff, 0xff, 10, 50, 1000);
  //    }
  //  } else {
  //    //rainbowCycle(20);
  //  }

}

void Strobe(byte red, byte green, byte blue, int StrobeCount, int FlashDelay, int EndPause) {
  for (int j = 0; j < StrobeCount; j++) {
    setAll(red, green, blue);
    showStrip();
    delay(FlashDelay);
    setAll(0, 0, 0);
    showStrip();
    delay(FlashDelay);
  }

  delay(EndPause);
}

void rainbowCycle(int SpeedDelay) {
  byte *c;
  uint16_t i, j;

  for (j = 0; j < 50; j++) { // 5 cycles of all colors on wheel
    for (i = 0; i < NUM_LEDS; i++) {
      c = Wheel(((i * 256 / NUM_LEDS) + j) & 255);
      setPixel(i, *c, *(c + 1), *(c + 2));
    }
    showStrip();

    delay(SpeedDelay);
  }
  delay(SpeedDelay);
  setAll(0, 0, 0);
  showStrip();
}

byte * Wheel(byte WheelPos) {
  static byte c[3];

  if (WheelPos < 85) {
    c[0] = WheelPos * 3;
    c[1] = 255 - WheelPos * 3;
    c[2] = 0;
  } else if (WheelPos < 170) {
    WheelPos -= 85;
    c[0] = 255 - WheelPos * 3;
    c[1] = 0;
    c[2] = WheelPos * 3;
  } else {
    WheelPos -= 170;
    c[0] = 0;
    c[1] = WheelPos * 3;
    c[2] = 255 - WheelPos * 3;
  }

  return c;
}

void colorWipe(byte red, byte green, byte blue, int SpeedDelay) {
  for (uint16_t i = 0; i < NUM_LEDS; i++) {
    setPixel(i, red, green, blue);
    showStrip();
    delay(SpeedDelay);
  }
}
// *** REPLACE TO HERE ***

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
