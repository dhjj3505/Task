let rain = [];
var sqaure;
var playerimg, earthimg, trashimg;
var trashes = [];

function preload() {
  bgimg = loadImage('assets/bg.jpg')
  playerimg = loadImage('assets/Recycle.png')
  earthimg = loadImage('assets/Earth.png')
  trashes[0]= loadImage('assets/Trash0.png')
  trashes[1]= loadImage('assets/Trash1.png')
  trashes[2] = loadImage('assets/Trash2.png')
  trashes[3] = loadImage('assets/Trash3.png')
  trashimg = random(trashes);
  for (let f=0; f<4; f++) {
     trashes[f] = loadImage('assets/Trash' + f + '.png')
  }


}

function setup() {
  background(255,255,255);
  var cnv = createCanvas(1000, 600);
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);
  score = new Score();
  sqaure = new Player();
  sqaure.setStart();
  noStroke();
  rain.push(new Rain());


}

function draw() {
  background(bgimg);
  sqaure.render();
  score.render();
  for(var j = 0; j < rain.length; j++){
    rain[j].render();
  }
   if(frameCount%500 == 0){
        addRain()
    }

     fill(0,0,0);
    textSize(20);
    text("Ari", windowWidth/2 -500, 590);
}


class Player{

    constructor(){
      this.x = 0;
      this.y = 0;
      this.size = 100;
      this.speed = 6;
      this.hp = 100;
      this.img = playerimg;

    }

    render(){

      textSize(10);
      textAlign(CENTER);
      fill(0, 0, 0);
      text("Player", this.x + this.size / 2 , this.y - 10);


      this.health();
      this.update();
      fill(0,0,0);
      image(this.img, this.x, this.y, this.size, this.size);


    }

    update(){
      this.controller();
      if(this.x > width + this.size){
          this.x = 0;
      }else if(this.x < -20){
          this.x = width - this.size;
      }
    }

    controller(){
       if(keyIsDown(LEFT_ARROW)){
            this.x -= this.speed;
        }
        if(keyIsDown(RIGHT_ARROW)){
            this.x += this.speed;
        }
    }

    setStart(){
        this.x = width/2 - this.size / 2;
        this.y = height - this.size - 2;
    }

    health(){
        fill(132,212,255);
        rect(20 , 20 , this.hp * 3 , 30);
        strokeWeight(2);
        stroke(50)

    }

}

class Score{
    constructor(){
        this.count = 0;
    }

    render(){
        fill(0,0,0);
        textSize(30);
        textAlign(CENTER);
        text(this.count, width/2 , 80);

        if(sqaure.hp == 0){
            this.count = 'Save Environment';
            push();
        }


    }
}

class Rain{
    constructor(){
        this.x = random(10 , width -10);
        this.y = -100;
        this.w = 5;
        this.h = 30;
        this.m = this.h / this.w;
        this.size = 60;
        this.img = trashimg;
        this.img2 = earthimg;

    }


    render(){
        this.update();
        fill(5,164,250);
       if(sqaure.hp == 0){
         image(this.img2, this.x, this.y, this.size, this.size);
       }
      else{
        image(this.img, this.x, this.y, this.size, this.size);
      }
    }

    update(){
        this.y += this.m;

        if(this.y > height + this.h){
            this.x = random(10 , width -10);
            this.y = -200;
        }

        if(sqaure.y < this.y + this.h + 10 ){
            if(sqaure.hp != 0){
                if(sqaure.x < this.x && sqaure.x + sqaure.size > this.x + this.w){
                    this.stop();
                    score.count += 5;
                }else{
                    if(this.y > height){
                    score.count -= 1;
                    sqaure.hp -= 2;
                    }
                }
            }
        }
    }

    stop(){
        this.x = random(10 , width +10);
        this.y = -100;
    }
}


function addRain(){
    for(var i = 0; i < 1; i++){
       rain.push(new Rain());
    }
}
