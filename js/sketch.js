/*

Todo:
- must have: use 2 8bit colors for controlling both a warm and cold LED
- nice to have: For the rgb leds, add the tweakers library functionality
- nice to have: change order by manually clicking the canvas
- nice to have: add motion, so very quickly send all the data as http requests

Notes:
- By default, the noLoop() is set, so every time the user interacts, everything is recalculated. That is
  much more performant as to do this 60 fps.
- You can drag 'n drop images to the canvas.

*/


let resolutionX = 10; //horizontal size of the installation in large pixels
let resolutionY = 10; //vertical size of the installation in large pixels
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
let checkbox, checkbox2;
let snakeOrder = false;
let orderDirection = "horizontal"
let showImage = false;
let capture;
let showWebcam = false;

function preload() {
  img = loadImage("img/test.png");
  // img = loadImage("img/spaceinvaders.jpg");
}

function setup() {

  //colorMode(HSL, 360, 100, 100);
  lightWarm = color(28, 100, 50); //50 is full warm light, 0 is no warm light
  lightCold = color(225, 100, 50); //50 us full cold light, 0 is no cold light

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
  c.drop(gotFile);
  print(width, height);

  pixelDensity(1);
  image(img, 0, 0, width, height);

  loadPixels();

  background(240);

  checkbox = createCheckbox('snakeOrder', false);
  checkbox.changed(changeSnakeOrder);

  checkbox2 = createCheckbox('orderDirection', false);
  checkbox2.changed(changeOrderDirection);

  checkbox3 = createCheckbox('toggleImage', false);
  checkbox3.changed(toggleImage);

  checkbox4 = createCheckbox('toggleWebcam', false);
  checkbox4.changed(toggleWebcam);

  noLoop();


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

  if (showWebcam) {
    image(capture, 0, 0, width, height);
    loadPixels();
  } else {
    image(img, 0, 0, width, height);
    loadPixels();
  }

  renderImage();

}


function toggleWebcam(event) {
  let label = document.querySelector(`label[for="${event.target.id}"]`);
  if (this.checked()) {
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


function renderImage() {
  pixelCounter = 0;
  // msg = [];


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

      if (orderDirection === "horizontal") { x = j; y = i; xCenter = j + jStep / 2; yCenter = i + iStep / 2; }
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
      if (showImage) image(img, 0, 0, width, height)
      else rect(x, y, width / resolutionX, height / resolutionY);

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



      // msg.push({
      //   order: pixelCounter,
      //   warm: int(map(percentageWarm, 0, 100, 0, 50)),
      //   cold: int(map(percentageCold, 0, 360, 0, 50))
      // })


    }
  }
}



// function sendValues() {

//   if (lightVersion === "RGB") {

//   }
//   if (lightVersion === "WarmCold") {

//   }

//   if (lightVersion === "OnOff") {

//   }

//   console.log(msg);
// }
