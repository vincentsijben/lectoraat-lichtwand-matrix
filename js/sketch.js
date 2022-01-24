
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
let checkbox, checkbox2, checkbox3, checkbox4, checkbox5, input;
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

function preload() {
  img = loadImage("img/test.png");
  // img = loadImage("img/spaceinvaders.jpg");
}

function setup() {

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

  h2 = createElement('h2', 'Output:');
  pre = createElement('pre', '');
  pre.id("output");
  pre.style('border','1px solid gray');
  pre.style('padding','10px');
  
  
  textPosX = width;
  pg = createGraphics(width, height);



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
  } 
  if (showImage) {
    image(img, 0, 0, width, height);
    loadPixels();
  }
  if (showMarquee) {
    pg.background(200);
    pg.noStroke();
    pg.textSize(widthScreen);
    pg.textAlign(LEFT, CENTER);
    pg.textStyle(BOLD)
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
      if (red(c)==255 && green(c)==255 && blue(c) ==255) c = color(0,0,0);
      arduinoText += `myObj[${orderNumber-1}].order = ${orderNumber};myObj[${orderNumber-1}].r = ${red(c)};myObj[${orderNumber-1}].g = ${green(c)};myObj[${orderNumber-1}].b = ${blue(c)};\n`
            

    }
  }

  // saveValues(msg)
  document.querySelector("#output").innerText = arduinoText;
}


function saveValues(obj){

  function compare( a, b ) {
    if ( a.order < b.order ){
      return -1;
    }
    if ( a.order > b.order ){
      return 1;
    }
    return 0;
  }

  obj.sort( compare );
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
