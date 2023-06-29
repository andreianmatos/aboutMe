/********************************************
 *                                          *
 *              ˚⋆｡˚⋆｡˚⋆｡˚⋆｡˚⋆｡             *
 * ˚⋆｡˚      ⋆˚      ⋆˚      ⋆˚      ⋆˚⋆｡˚ *
 *                                          *
 ********************************************
 * Title: Draggable Videos
 * Author: Andreia Matos
 * Date: Current date (June 28, 2023)
 *******************************************/

 class DraggableVideo {
  constructor(video) {

    this.vid = video;

    this.x = random(windowWidth/1.5);
    this.y = random(windowHeight/1.5);

    this.w = this.vid.width;
    this.h = this.vid.height;

    this.dragging = false; 
    this.rollover = false; 

  }

  updateSize(size) {
    this.size = size;
    this.vid.size(size);

    this.w = this.vid.width;
    this.h = this.vid.width/2; //.height is 0?
  }

  over() {

    if (mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h) {
      this.rollover = true;
    } else {
      this.rollover = false;
    }

  }

  update() {

    if (this.dragging) {
      this.x = mouseX + this.offsetX;
      this.y = mouseY + this.offsetY;
    }

  }

  pressed() {
    if (mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h) {
      this.dragging = true;
      this.offsetX = this.x - mouseX;
      this.offsetY = this.y - mouseY;
    }
  }

  released() {
    this.dragging = false;
  }

  show() {
    
    image(this.vid, this.x, this.y);

  }

  showFilter(filterName) {

    filter(filterName); // does not apply to image but to canvas
    image(this.vid, this.x, this.y);

  }

}

function preload() {

  vidList = loadJSON('videos.json');

}

let draggableVideos = [];

function setup() {

  createCanvas(windowWidth, windowHeight);

  for (let i = 0; i < vidList.videos.length; i++) {
    draggableVideos[i] = new DraggableVideo(createVideo([vidList.videos[i]]));
    draggableVideos[i].vid.volume(0);
    //draggableVideos[i].vid.hide();
    draggableVideos[i].vid.loop();
  } 

}

function draw() {

  background(250);

  for (let i = 0; i < draggableVideos.length; i++) {
    draggableVideos[i].updateSize(350);
    draggableVideos[i].update();
    draggableVideos[i].over();
    draggableVideos[i].show();
  }

  //filter(THRESHOLD); 

  //blendMode(DODGE);
  //blendMode(BURN);

  blendMode(HARD_LIGHT);

  //vid2.showFilter(GRAY);
  
}

function mousePressed() {
  for (let i = 0; i < draggableVideos.length; i++) {
    draggableVideos[i].pressed();
  }
}

function mouseReleased() {
  for (let i = 0; i < draggableVideos.length; i++) {
    draggableVideos[i].released();
  }
}
