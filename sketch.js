//Create variables here
var dog, happyDog;
var database;
var foodS, foodStock;
var dogImage;
var happydogImage;
var addFoodButton, foodDogButton;
var hour;
var fedTime, lastFed;
var foodObj;
function preload()
{
  //load images here
  dogImage = loadImage("images/dogImg.png")
  happydogImage = loadImage("images/dogImg1.png")
  //foodS = 0;
  
}

function setup() {
  createCanvas(1000, 500);
  database = firebase.database();

  dog = createSprite(500, 290, 50, 50);
  dog.addImage(dogImage);
  dog.scale = 0.20;

  foodObj = new Food();
  
  var food = database.ref('Food');
  food.on("value", readPosition, showError);

  feed = createButton("Feed the Dog");
  feed.position(700, 95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800, 95);
  addFood.mousePressed(addFoods);

}


function draw() {  
  background(46, 139, 87);
  foodObj.display();

  // if(keyWentDown(UP_ARROW)){
  //   writeStock(foodS);
  //   dog.addImage(happydogImage);
  // }
 
  drawSprites();
  textSize(20);
  fill("white");
 drawSprites();

  text("Food Stock:" , 20, 100);
  text(foodS, 140, 100); 
  hour = database.ref('Hour');
  hour.on("value", readHour);
  text("Last Feed: " + hour + " o' clock", 700, 100);
 
  //add styles here

 
 }

 function readPosition(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}

function readHour(data){
  hour = data.val();

}


function showError(){
  console.log("Error in writing to the database");
}

async function feedDog(){
  dog.addImage(happydogImage);

  var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
  var responseJSON = await response.json();
  console.log(responseJSON);
  console.log(responseJSON.datetime);
  
  var datetime = responseJSON.datetime;
  hour = datetime.slice(11,13);
  console.log(hour)
  // database.ref('/').update({
  //   Hour:hour
  // })

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);

  database.ref('/').update({
   Food:foodObj.getFoodStock(),
   Hour:hour 
  })
  
}

function addFoods(){
  foodS++;
    database.ref('/').update({
    Food:foodS
  })
}


