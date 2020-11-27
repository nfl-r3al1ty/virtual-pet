//Create variables here
var dog, happyDog;
var database;
var foodS, foodStock;
var dogImg,feed,fedTime,food,lastFed,addFood;
var bedroom,washroom,garden, gameState = "Hungry", currentTime;

function preload()
{
  //load images here
  dogImg = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
  garden=loadImage("images/Garden.png");
  washroom=loadImage("images/Wash Room.png");
  bedroom=loadImage("images/Bed Room.png");
}

function setup() {
  createCanvas(500, 500);
  database=firebase.database();
  
  dog=createSprite(250,300,150,150);
  dog.addImage(dogImg);
  dog.scale=0.15;

  feed = createButton('Feed the Dog');
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(500,95);
  addFood.mousePressed(addFoods);

  food = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",function(data){
    foodS=data.val();
    food.updateStock(foodS);
  });
  textSize(20); 
}


function draw() {  

  background("lightblue") ;

  food.display();


  stroke("black");
  text("Food remaining : "+foodS,170,450);
  text("Note: Press the Button To Feed Kojo some Milk!",130,10,300,20);

  fedTime = database.ref('feedTime');
  fedTime.on("value",function(data){
    lastFed = data.val();
  })
  fill(0);
  textSize(15); 
  if(lastFed>=12){
    text("Last feed : "+ lastFed%12 + "PM",320,400);
  }
  else if(lastFed === 0){
    text("Last feed : 12 AM",320,400);
  }
  else{
    text("Last feed : "+ lastFed + "AM",320,400);
  }

  currentTime = hour();
  if(currentTime===(lastFed+1)){
    update("Playing");
    food.garden();

 }else if(currentTime==(lastFed+2)){
  update("Sleeping");
  food.bedroom();

 }else if(currentTime>(lastFed+2) && currentTime<=(lastFed+4)){
  update("Bathing");
  food.washroom();

 }else{
   //if(currentTime>lastFed+4){
      update("Hungry")
dog.addImage(dogImg);
//}
dog.visible=true;
    food.display();
 }
 
 if(gameState!=="Hungry" ){
   feed.hide();
   addFood.hide();
   //dog.remove();
dog.visible=false;
 }else{
  feed.show();
  addFood.show();
  dog.visible=true;
  //if(gameState!="Fed")
    //dog.addImage(dogImg);
 }

  drawSprites();
}


function feedDog(){
  dog.addImage(happyDog);
  if(food.stock>0){
    food.updateStock(food.stock-1);
  }
  database.ref('/').update({
    Food : food.stock,
    feedTime : hour()
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
  
function update(state){
  database.ref('/').update({
    gameState:state
  })
}



