let serial;
let portName = "/dev/cu.usbmodem143101";
let textXpos = 10;
let toggle = true;


let resolutionX = 8; //horizontal size of the installation in large pixels
let resolutionY = 8; //vertical size of the installation in large pixels
let widthScreen = 800; //width of the software window
let img;
let lightWarm;
let lightCold;
let percentageWarm;
let percentageCold;
let colorPixel;
let msg = [];
let pixelCounter = 0;
let toggleOrder = false;
let lightVersions = ["RGB", "WarmCold", "OnOff"];
let lightVersion = lightVersions[0];
let button, checkbox, checkbox2, checkbox3, checkbox4, checkbox5, input;
let snakeOrder = false;
let orderDirection = "horizontal"
let showImage = false;
let capture;
let showWebcam = false;
let showMarquee = false;
let pg;
let textPosX;
let marqueeText;
let arduinoText = "";
let arduinoTextCompact = "";

function preload() {
  img = loadImage("img/test.png");
  //img = loadImage("img/spaceinvaders.jpg");
}

function setup() {

  // make an instance of the SerialPort object
  serial = new p5.SerialPort();

  // Get a list the ports available
  // You should have a callback defined to see the results. See gotList, below:
  serial.list();

  // Assuming our Arduino is connected,  open the connection to it
  // serial.open(portName, {baudrate: 19200});
  serial.open(portName, { baudRate: 9600 }, onOpen)

  // When you get a list of serial ports that are available
  serial.on('list', gotList);

  // When you some data from the serial port
  serial.on('data', gotData);

  //colorMode(HSL, 360, 100, 100);
  // lightWarm = color(28, 100, 50); //50 is full warm light, 0 is no warm light
  // lightCold = color(225, 100, 50); //50 us full cold light, 0 is no cold light

  let aspectRatio = resolutionX / resolutionY;
  let w, h;
  if (aspectRatio > 1) {
    //its a landscape installation, eg. 8x4
    w = widthScreen;
    h = floor(widthScreen / aspectRatio);
  } else {
    //its a portrait installation, eg 4x8
    w = floor(widthScreen * aspectRatio);
    h = widthScreen;
  }
  const c = createCanvas(w, h);

  c.parent("mycanvas");
  c.drop(gotFile);


  pixelDensity(1);
  image(img, 0, 0, width, height);
  frameRate(2);
  loadPixels();



  checkbox = createCheckbox('snakeOrder', false);
  checkbox.changed(changeSnakeOrder);

  checkbox2 = createCheckbox('orderDirection', false);
  checkbox2.changed(changeOrderDirection);

  checkbox3 = createCheckbox('toggleImage', true);
  checkbox3.id("toggleImage");
  checkbox3.changed(toggleImage);

  checkbox4 = createCheckbox('toggleWebcam', false);
  checkbox4.id("toggleWebcam");
  checkbox4.changed(toggleWebcam);

  input = createInput('put your text here');
  input.size(200);
  input.input(inputMarquee);

  checkbox5 = createCheckbox('toggleMarquee', false);
  checkbox5.id("toggleMarquee");
  checkbox5.changed(toggleMarquee);

  button = createButton('send: rainbow');
  button.position(0, 0);
  button.id("btn")
  button.mousePressed(sendToArduino);

  h2 = createElement('h2', 'Output:');
  pre = createElement('pre', '');
  pre.id("output");
  pre.style('border', '1px solid gray');
  pre.style('padding', '10px');



  textPosX = width;
  pg = createGraphics(width, height);



  noLoop();


}

function onOpen() {
  console.log("open connection!")
}

function sendToArduino() {

  // serial.write("lampje:" + mouseX);

  // serial.write("ABCDEF");
  let btn = document.querySelector(`button#btn`);
  if (toggle) {
    // for (let i = 0; i < 1000; i++) {
    //   serial.write(`${i},`);
    // }
    // serial.write(`
    // myObj[0].order = 1;
    // myObj[0].r = 0;
    // myObj[0].g = 0;
    // myObj[0].b = 0;
    // `);
    serial.write(`255;0;0
255;255;0
`);
    //serial.write("AAAAAAAAAA");
    btn.innerText = "send: strobe"
  }
  else {
    // serial.write("B");
    serial.write(`0;255;0
255;100;50
`);
    btn.innerText = "send: rainbow"
  }
  toggle = !toggle;
}

function gotFile(file) {
  // If it's an image file
  if (file.type === 'image') {
    // Create an image DOM element but don't show it
    img = createImg(file.data).hide();
    image(img, 0, 0, width, height);
    // updatePixels();
    // Draw the image onto the canvas

    loop();
  } else {
    console.log('Not an image file!');
  }
}

function draw() {

  console.log(textXpos);

  if (showWebcam) {
    image(capture, 0, 0, width, height);
    loadPixels();
  }
  if (showImage) {
    image(img, 0, 0, width, height);
    loadPixels();
  }
  if (showMarquee) {
    pg.background(0);
    pg.noStroke();
    pg.textSize(widthScreen);
    pg.textAlign(LEFT, CENTER);
    pg.textStyle(BOLD)
    pg.fill(255);
    pg.text(marqueeText, textPosX, height / 2);
    textPosX -= widthScreen / 30;
    if (textPosX < -pg.textWidth(marqueeText)) textPosX = width;
    image(pg, 0, 0);
    loadPixels();
  }

  renderImage();


}


function renderImage() {
  pixelCounter = 0;
  arduinoText = "";
  arduinoTextCompact = "";
  msg = [];


  let iStep, jStep, iMax, jMax;
  if (orderDirection === "horizontal") {
    iStep = ceil(height / resolutionY);
    jStep = ceil(width / resolutionX);
    iMax = height;
    jMax = width;
  }
  if (orderDirection === "vertical") {
    iStep = ceil(width / resolutionX);
    jStep = ceil(height / resolutionY);
    iMax = width;
    jMax = height;
  }

  for (let i = 0; i < iMax; i += iStep) {
    for (let j = 0; j < jMax; j += jStep) {

      let x, y, xCenter, yCenter;

      if (orderDirection === "horizontal") { x = j; y = i; xCenter = j + int(jStep / 2); yCenter = i + int(iStep / 2); }
      if (orderDirection === "vertical") { x = i; y = j; xCenter = i + iStep / 2; yCenter = j + jStep / 2; }

      pixelCounter++;

      //use the center of each part to determine the color
      let index = (xCenter + yCenter * width) * 4;

      let r = pixels[index + 0];
      let g = pixels[index + 1];
      let b = pixels[index + 2];
      let a = pixels[index + 3];
      let c = color(r, g, b, a);

      fill(c);
      rect(x, y, width / resolutionX, height / resolutionY);

      orderNumber = pixelCounter;
      if (snakeOrder) {
        if (orderDirection === "horizontal") {
          if (ceil(pixelCounter / resolutionX) % 2 === 0) {
            let m = ceil(pixelCounter / resolutionX) / 2 - 1;
            let f = (resolutionX * 3 + 1) + m * (resolutionX * 4)

            orderNumber = f - pixelCounter
          }
        }
        if (orderDirection === "vertical") {
          if (ceil(pixelCounter / resolutionY) % 2 === 0) {
            let m = ceil(pixelCounter / resolutionY) / 2 - 1;
            let f = (resolutionY * 3 + 1) + m * (resolutionY * 4)

            orderNumber = f - pixelCounter
          }
        }
      }

      //numbers
      push();
      stroke(255);
      strokeWeight(2);
      fill(0, 127);
      textAlign(CENTER, CENTER);
      textSize(width / 30);
      text(orderNumber, x + int(width / resolutionX / 2), y + int(height / resolutionY / 2));
      pop();

      //raster
      push();
      stroke(255, 0, 0);
      line(x, 0, x, height);
      line(0, y, width, y);
      line(width - 1, 0, width - 1, height);
      line(0, height - 1, width, height - 1);
      pop();


      // msg.push({
      //   order: orderNumber,
      //   warm: `${red(c)},${green(c)},${blue(c)}`,
      //   cold: 2
      // })

      // testing for arduino code:
      if (showMarquee == false) {
        if (red(c) == 255 && green(c) == 255 && blue(c) == 255) c = color(0, 0, 0);
      }
      //arduinoText += `myObj[${orderNumber - 1}].order = ${orderNumber};myObj[${orderNumber - 1}].r = ${red(c)};myObj[${orderNumber - 1}].g = ${green(c)};myObj[${orderNumber - 1}].b = ${blue(c)};\n`
      arduinoTextCompact += `${red(c)},${green(c)},${blue(c)}+`

    }
  }

  //tips:
  // altijd eindigen met delimeter!
  // niet teveel Serial.println gebruiken, anders worden niet meer alle correcte waardes doorgegeven.
  //baudrate 9600 leest tot 81
  // arduinoTextCompact = `0;0;0|0;0;1|0;0;2|0;0;3|0;0;4|0;0;5|0;0;6|0;0;7|0;0;8|0;0;9|0;0;10|0;0;11|`;
  // als we 3 getallen voor iedere kleur reserveren als max, kunnen we per keer 7 objecten doorsturen (dit werkte iedere keer, dus is een veilige max, die 84 karakters)
  // arduinoTextCompact = `100;100;100|100;100;101|100;100;102|100;100;103|100;100;104|100;100;105|100;100;106|`;
  // serial.write(arduinoTextCompact);    

  //nodig 13 bytes per led
  //dus in arduino 13x100 --> char buf[1300] nodig


  arduinoTextCompact = `<${arduinoTextCompact}>`;
  // for (let i=0;i<100;i++){
  //   arduinoTextCompact += `100,100,${nf(i,3)}+`;
  // }

  // arduinoTextCompact += `>`;
  console.log(arduinoTextCompact)


  serial.write(arduinoTextCompact);

  // saveValues(msg)
  // document.querySelector("#output").innerText = arduinoText;

  // navigator.clipboard.writeText(arduinoText).then(function () {
  //   console.log('Async: Copying to clipboard was successful!');
  // }, function (err) {
  //   console.error('Async: Could not copy text: ', err);
  // });
}


function saveValues(obj) {

  function compare(a, b) {
    if (a.order < b.order) {
      return -1;
    }
    if (a.order > b.order) {
      return 1;
    }
    return 0;
  }

  obj.sort(compare);
  document.querySelector("#output").innerText = JSON.stringify(obj, null, 4);


  //httpGet("http://127.0.0.1/26/on");
}











// if (lightVersion === "RGB") {
//   //fill(hue(c), saturation(c), lightness(c));
//   fill(c);
// }
// if (lightVersion === "WarmCold") {
//   colorPixel = color(0, 100, 0);

//   if (lightness(pixels[index]) > 10 && lightness(pixels[index]) <= 50) colorPixel = lightWarm;
//   if (lightness(pixels[index]) > 50) colorPixel = lightCold;
//   fill(colorPixel);
// }

// if (lightVersion === "OnOff") {

// }





function inputMarquee(event) {
  marqueeText = this.value();
}

function toggleMarquee(event) {


  marqueeText = input.value();

  let label = document.querySelector(`label[for="${event.target.id}"]`);
  if (this.checked()) {

    let image = document.querySelector(`#toggleImage input`);
    let webcam = document.querySelector(`#toggleWebcam input`);
    if (image.checked) image.click();
    if (webcam.checked) webcam.click();

    showMarquee = true;
    label.innerText = "toggleMarquee: show"
  } else {
    showMarquee = false;
    label.innerText = "toggleMarquee: hide"
  }

  loop();
  // noLoop();
  renderImage();
}

function toggleWebcam(event) {
  let label = document.querySelector(`label[for="${event.target.id}"]`);
  if (this.checked()) {

    let image = document.querySelector(`#toggleImage input`);
    let marquee = document.querySelector(`#toggleMarquee input`);
    if (image.checked) image.click();
    if (marquee.checked) marquee.click();

    showWebcam = true;
    label.innerText = "toggleWebcam: show"

    capture = createCapture(VIDEO);
    capture.size(width, height);
    capture.hide();
    loop();

  } else {
    capture = null;
    showWebcam = false;
    label.innerText = "toggleWebcam: hide"
    noLoop();
  }
  renderImage();
}

function toggleImage(event) {
  let label = document.querySelector(`label[for="${event.target.id}"]`);
  if (this.checked()) {

    let webcam = document.querySelector(`#toggleWebcam input`);
    let marquee = document.querySelector(`#toggleMarquee input`);
    if (webcam.checked) webcam.click();
    if (marquee.checked) marquee.click();


    showImage = true;
    label.innerText = "toggleImage: show"
  } else {
    showImage = false;
    label.innerText = "toggleImage: hide"
  }
  renderImage();
}

function changeSnakeOrder(event) {
  let label = document.querySelector(`label[for="${event.target.id}"]`);
  if (this.checked()) {
    snakeOrder = true;
    label.innerText = "snakeOrder: true"
  } else {
    snakeOrder = false;
    label.innerText = "snakeOrder: false"
  }
  renderImage();
}

function changeOrderDirection(event) {
  let label = document.querySelector(`label[for="${event.target.id}"]`);
  if (this.checked()) {
    orderDirection = "horizontal";
    label.innerText = "orderDirection: horizontal"
  } else {
    orderDirection = "vertical";
    label.innerText = "orderDirection: vertical"
  }
  renderImage();
}

// Got the list of ports
function gotList(thelist) {
  print("List of Serial Ports:");
  // theList is an array of their names
  for (let i = 0; i < thelist.length; i++) {
    // Display in the console
    print(i + " " + thelist[i]);
  }
}

let teller = 0;
// Called when there is data available from the serial port
function gotData() {
  let currentString = serial.readLine();  // read the incoming data
  trim(currentString);                    // trim off trailing whitespace
  if (!currentString) return;             // if the incoming string is empty, do no more
  console.log(currentString);
  if (!isNaN(currentString)) {  // make sure the string is a number (i.e. NOT Not a Number (NaN))
    textXpos = currentString;   // save the currentString to use for the text position in draw()
  }








}