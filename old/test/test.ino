// https://forum.arduino.cc/t/serial-input-basics-updated/382007/3
// Example 5 - Receive with start- and end-markers combined with parsing

//const byte numChars = 32;
const int numChars = 1000;
char receivedChars[numChars];
char tempChars[numChars];        // temporary array for use when parsing

boolean newData = false;

class ledColor {
  public:
    int r;
    int g;
    int b;
};
ledColor ledColorArray[100];

//============

void setup() {
  Serial.begin(9600);
  Serial.println("This demo expects 3 pieces of data - text, an integer and a floating point value");
  Serial.println("Enter data in this style <HelloWorld, 12, 24.7>  ");
  Serial.println();
}

//============

void loop() {
  recvWithStartEndMarkers();
  if (newData == true) {
    //strcpy(tempChars, receivedChars);
    // this temporary copy is necessary to protect the original data
    //   because strtok() used in parseData() replaces the commas with \0
    parseData();
    showParsedData();
    newData = false;
  }
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
char *token;
char *mystring = "255,255,1+255,255,2+255,255,3+255,255,4+";
char *delimiter =",";


void parseData() {      // split the data into its parts

  int arrIndex = 0;
  char *strtokIndx; // this is used by strtok() as an index


Serial.print("receivedChars: ");
Serial.println(receivedChars);

  token = strtok(receivedChars, ",");

   while (token != NULL) {
    ledColorArray[arrIndex].r = atoi(token);
      token=strtok(NULL, ",");
      ledColorArray[arrIndex].g = atoi(token);
      token=strtok(NULL, "+");
      ledColorArray[arrIndex].b = atoi(token);
      token=strtok(NULL, ",");
      arrIndex++;
   }


  
}

//============

void showParsedData() {
  Serial.print("Message: ");
  for (int i = 0; i < numChars; i++) {

    Serial.print(ledColorArray[i].r);
    Serial.print("-");
    Serial.print(ledColorArray[i].g);
    Serial.print("-");
    Serial.println(ledColorArray[i].b);
  }

}
