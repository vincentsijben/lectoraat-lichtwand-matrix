#include "FastLED.h"
#define NUM_LEDS 64
CRGB leds[NUM_LEDS];
#define PIN 6
int vincent[10] = { 0, 3, 6, 9, 12, 15, 18, 21, 24, 27};

class MyClass {       // The class
  public:             // Access specifier
    int order;        // Attribute (int variable)
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


  for (int i = 0; i < NUM_LEDS; i++) {

    myObj[i].order = 1;
    myObj[i].r = 126;
    myObj[i].g = 8;
    myObj[i].b = 120;
  }
myObj[0].order = 1;myObj[0].r = 206;myObj[0].g = 201;myObj[0].b = 203;
myObj[1].order = 2;myObj[1].r = 206;myObj[1].g = 201;myObj[1].b = 203;
myObj[2].order = 3;myObj[2].r = 206;myObj[2].g = 201;myObj[2].b = 203;
myObj[3].order = 4;myObj[3].r = 206;myObj[3].g = 201;myObj[3].b = 203;
myObj[4].order = 5;myObj[4].r = 206;myObj[4].g = 201;myObj[4].b = 203;
myObj[5].order = 6;myObj[5].r = 206;myObj[5].g = 201;myObj[5].b = 203;
myObj[6].order = 7;myObj[6].r = 206;myObj[6].g = 201;myObj[6].b = 203;
myObj[7].order = 8;myObj[7].r = 206;myObj[7].g = 201;myObj[7].b = 203;
myObj[15].order = 16;myObj[15].r = 206;myObj[15].g = 201;myObj[15].b = 203;
myObj[14].order = 15;myObj[14].r = 206;myObj[14].g = 201;myObj[14].b = 203;
myObj[13].order = 14;myObj[13].r = 8;myObj[13].g = 33;myObj[13].b = 13;
myObj[12].order = 13;myObj[12].r = 5;myObj[12].g = 4;myObj[12].b = 53;
myObj[11].order = 12;myObj[11].r = 60;myObj[11].g = 163;myObj[11].b = 56;
myObj[10].order = 11;myObj[10].r = 145;myObj[10].g = 28;myObj[10].b = 15;
myObj[9].order = 10;myObj[9].r = 206;myObj[9].g = 201;myObj[9].b = 203;
myObj[8].order = 9;myObj[8].r = 206;myObj[8].g = 201;myObj[8].b = 203;
myObj[16].order = 17;myObj[16].r = 206;myObj[16].g = 201;myObj[16].b = 203;
myObj[17].order = 18;myObj[17].r = 103;myObj[17].g = 125;myObj[17].b = 181;
myObj[18].order = 19;myObj[18].r = 3;myObj[18].g = 144;myObj[18].b = 184;
myObj[19].order = 20;myObj[19].r = 0;myObj[19].g = 171;myObj[19].b = 208;
myObj[20].order = 21;myObj[20].r = 145;myObj[20].g = 28;myObj[20].b = 15;
myObj[21].order = 22;myObj[21].r = 25;myObj[21].g = 3;myObj[21].b = 104;
myObj[22].order = 23;myObj[22].r = 251;myObj[22].g = 167;myObj[22].b = 4;
myObj[23].order = 24;myObj[23].r = 206;myObj[23].g = 201;myObj[23].b = 203;
myObj[31].order = 32;myObj[31].r = 206;myObj[31].g = 201;myObj[31].b = 203;
myObj[30].order = 31;myObj[30].r = 60;myObj[30].g = 82;myObj[30].b = 112;
myObj[29].order = 30;myObj[29].r = 7;myObj[29].g = 16;myObj[29].b = 216;
myObj[28].order = 29;myObj[28].r = 67;myObj[28].g = 198;myObj[28].b = 212;
myObj[27].order = 28;myObj[27].r = 25;myObj[27].g = 3;myObj[27].b = 104;
myObj[26].order = 27;myObj[26].r = 251;myObj[26].g = 167;myObj[26].b = 4;
myObj[25].order = 26;myObj[25].r = 251;myObj[25].g = 167;myObj[25].b = 4;
myObj[24].order = 25;myObj[24].r = 206;myObj[24].g = 201;myObj[24].b = 203;
myObj[32].order = 33;myObj[32].r = 206;myObj[32].g = 201;myObj[32].b = 203;
myObj[33].order = 34;myObj[33].r = 21;myObj[33].g = 50;myObj[33].b = 124;
myObj[34].order = 35;myObj[34].r = 3;myObj[34].g = 144;myObj[34].b = 184;
myObj[35].order = 36;myObj[35].r = 7;myObj[35].g = 16;myObj[35].b = 216;
myObj[36].order = 37;myObj[36].r = 25;myObj[36].g = 3;myObj[36].b = 104;
myObj[37].order = 38;myObj[37].r = 251;myObj[37].g = 167;myObj[37].b = 4;
myObj[38].order = 39;myObj[38].r = 251;myObj[38].g = 167;myObj[38].b = 4;
myObj[39].order = 40;myObj[39].r = 206;myObj[39].g = 201;myObj[39].b = 203;
myObj[47].order = 48;myObj[47].r = 206;myObj[47].g = 201;myObj[47].b = 203;
myObj[46].order = 47;myObj[46].r = 103;myObj[46].g = 125;myObj[46].b = 181;
myObj[45].order = 46;myObj[45].r = 103;myObj[45].g = 104;myObj[45].b = 180;
myObj[44].order = 45;myObj[44].r = 145;myObj[44].g = 28;myObj[44].b = 15;
myObj[43].order = 44;myObj[43].r = 228;myObj[43].g = 199;myObj[43].b = 4;
myObj[42].order = 43;myObj[42].r = 25;myObj[42].g = 3;myObj[42].b = 104;
myObj[41].order = 42;myObj[41].r = 251;myObj[41].g = 167;myObj[41].b = 4;
myObj[40].order = 41;myObj[40].r = 206;myObj[40].g = 201;myObj[40].b = 203;
myObj[48].order = 49;myObj[48].r = 206;myObj[48].g = 201;myObj[48].b = 203;
myObj[49].order = 50;myObj[49].r = 206;myObj[49].g = 201;myObj[49].b = 203;
myObj[50].order = 51;myObj[50].r = 5;myObj[50].g = 4;myObj[50].b = 53;
myObj[51].order = 52;myObj[51].r = 5;myObj[51].g = 4;myObj[51].b = 53;
myObj[52].order = 53;myObj[52].r = 181;myObj[52].g = 105;myObj[52].b = 177;
myObj[53].order = 54;myObj[53].r = 118;myObj[53].g = 12;myObj[53].b = 47;
myObj[54].order = 55;myObj[54].r = 206;myObj[54].g = 201;myObj[54].b = 203;
myObj[55].order = 56;myObj[55].r = 206;myObj[55].g = 201;myObj[55].b = 203;
myObj[63].order = 64;myObj[63].r = 206;myObj[63].g = 201;myObj[63].b = 203;
myObj[62].order = 63;myObj[62].r = 206;myObj[62].g = 201;myObj[62].b = 203;
myObj[61].order = 62;myObj[61].r = 206;myObj[61].g = 201;myObj[61].b = 203;
myObj[60].order = 61;myObj[60].r = 206;myObj[60].g = 201;myObj[60].b = 203;
myObj[59].order = 60;myObj[59].r = 206;myObj[59].g = 201;myObj[59].b = 203;
myObj[58].order = 59;myObj[58].r = 206;myObj[58].g = 201;myObj[58].b = 203;
myObj[57].order = 58;myObj[57].r = 206;myObj[57].g = 201;myObj[57].b = 203;
myObj[56].order = 57;myObj[56].r = 206;myObj[56].g = 201;myObj[56].b = 203;

}

// *** REPLACE FROM HERE ***
void loop() {

for (int i = 0; i < NUM_LEDS; i++) {


    //      String text;
    //      text = myObj[i].rgb;
    //
    //      int index1 = text.indexOf(',');
    //      String rr = text.substring(0, index1);
    //      int index2 = text.indexOf(',', index1 + 1 );
    //      String  gg = text.substring(index1 + 1, index2 + 1);
    //      String bb = text.substring(index2 + 1);
    //      byte r = (byte) rr.toInt();
    //      byte g = (byte) gg.toInt();
    //      byte b = (byte) bb.toInt();
    byte r = (byte) myObj[i].r;
    byte g = (byte) myObj[i].g;
    byte b = (byte) myObj[i].b;
    setPixel(i, r, g, b);
  }

  showStrip();

  delay(20);

  
//  rainbowCycle(20);
}

void rainbowCycle(int SpeedDelay) {
  byte *c;
  uint16_t i, j;

  for (j = 0; j < 256 * 5; j++) { // 5 cycles of all colors on wheel
    //    int i=49;
    //    c=Wheel(((i * 256 / NUM_LEDS) + j) & 255);
    //      setPixel(i, *c, *(c+1), *(c+2));
    //for(i=0; i< sizeof(vincent); i++) {
    //  Serial.println(vincent[i]);
    c = Wheel(((vincent[i] * 256 / sizeof(vincent)) + j) & 255);
    //      setPixel(vincent[i], *c, *(c+1), *(c+2));
    //}
    //    for(i=0; i< NUM_LEDS; i++) {
    //      c=Wheel(((i * 256 / NUM_LEDS) + j) & 255);
    //      setPixel(i, *c, *(c+1), *(c+2));
    //    }
    //    showStrip();
    //setAll(*c,*(c+1), *(c+2));
    //setAll(0xFF,0x00,0xFF);
    //setPixel(0, 0xFF,0xFF,0x00);
    //showStrip();



    //"0x15, 0x32, 0x7C"
    //setPixel(myObj[0].myNum, myObj[0].myString.substring(0,4).toInt(),myObj[0].myString.substring(6,10).toInt(),myObj[0].myString.substring(11).toInt());
    
    showStrip();

    delay(SpeedDelay);
  }


  
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
