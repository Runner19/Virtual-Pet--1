var Dog, FoodStock, DB, foodS;

function preload()
{
  DogI = loadImage("dogImg.png");
  DogHappyI = loadImage("dogImg1.png");
}

function setup() {
  DB = firebase.database();
  createCanvas(500, 500);
  Dog = createSprite(250,230,10,5);
  Dog.scale = 0.3
  FoodStock = DB.ref('Food');
  FoodStock.on("value", readStock);
}

function draw() {  
  background("grey");
  if (foodS!==undefined){
    fill("orange");
    textSize(22)
    text("Press up arrow to feed Bruno", 187, 378);
    text("Remaining food : "+foodS, 187, 408);

    if(keyWentDown(UP_ARROW)){
      writeStock(foodS);
      Dog.addImage(DogHappyI);
    }

    if(keyWentUp(UP_ARROW)){
      Dog.addImage(DogI);
    }

    if (foodS === 0){
     foodS = 50;
    }

    drawSprites();
    fill("orange");
    textSize(32)
    text("BRUNO", 200, 68);
  }
}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){
  if(x<=0){
    x = 0;
  }
  else{
    x = x - 1
  }
  DB.ref('/').update({
    Food:x
  })
}
