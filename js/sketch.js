
let resolutionX = 10; //horizontal size of the installation in large pixels
let resolutionY = 10; //vertical size of the installation in large pixels
let aspectRatio = resolutionX/resolutionY;
let widthScreen = 800; //width of the software window
let img;
let lightWarm;
let lightCold;
let colorPixel;

function preload(){
  img = loadImage("img/spaceinvaders.jpg");
}

function setup() {

  lightWarm = color(255, 228, 204);
  lightCold = color(223, 231, 255);

  if (aspectRatio > 1) {
    //its a landscape installation, eg. 8x4
    createCanvas(widthScreen, int(widthScreen/aspectRatio));
  } else {
    //its a portrait installation, eg 4x8
    createCanvas(int(widthScreen*aspectRatio), widthScreen);
  }

  // createCanvas(800, 800);
  pixelDensity(1);
  image(img, 0, 0, width, height);
  loadPixels();
  noStroke();

  background(240);
  print(width/resolutionX);
  for (let x = 0; x < width; x += int(width/resolutionX)) {
    for (let y = 0; y < height; y += int(height/resolutionY)) {
      
      let i = (x + y * width) * 4;
      
      colorPixel = color(0);
      if (brightness(pixels[i]) > 10 && brightness(pixels[i]) <= 50) colorPixel = lightWarm;
      if (brightness(pixels[i]) > 50) colorPixel = lightCold;

      fill(colorPixel);
      // let r = pixels[i + 0];
      // let g = pixels[i + 1];
      // let b = pixels[i + 2];
      // let a = pixels[i + 3];

      // fill(r, g, b, a);
      rect(x, y, width/resolutionX, height/resolutionY);
    }
  }
}

function draw() {
  stroke(255,0,0);
  for (let x = 0; x < width; x += width/resolutionX) {
    line(x, 0, x, height);
    for (let y = 0; y < height; y += height/resolutionY) {
      line(0, y, width, y);
    }
  }
  line(width-1, 0, width-1, height);
  line(0,height-1, width, height-1);
}
