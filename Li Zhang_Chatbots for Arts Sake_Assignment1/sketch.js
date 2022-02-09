let data; //variable for json data
let input; //variable for input field
let sendBttn; //variable for send button
let div = "";
let answer = ""; //variable for the answer from the chatbot
let arrow;
let arrow_side;
let font_tamagochi;
let intro = "";


//load the JSON file
function preload() {
  data = loadJSON("chatbots.json");
  font_tamagochi = loadFont('assets/tamagotchi.ttf');
  font_handwritten = loadFont('assets/Baby Doll.ttf');
}


function setup() {
  
  intro = "Chat with me because I don't wanna do homework..."
  
  createCanvas(windowWidth, windowHeight);
   background_img = loadImage('assets/rita_chatbot.png');
  arrow = loadImage('assets/arrow.png');
  arrow_side = loadImage('assets/arrow_side.png');
  //input field
  input = createInput("");
  input.size(width / 2, 40);
  input.position(195,495); 
  //button to send input
  let col = color(200,255,255); //use color instead of fill
  //button.style('font-size', '30px');
  sendBttn = createButton("send");
  sendBttn.size(100, 30);
  sendBttn.style('background-color', col);  
  sendBttn.position(330,380);
  sendBttn.mousePressed(answerMe); //callback to let the chatbot respond
  //sendBttn.fill(255, 204, 0);
  textAlign(CENTER, CENTER);
  rectMode(CENTER);
  console.log(data);
}



function draw() {
  background("white");
  input.style('font-size', '24px', 'font-color', 'pB683B7');
  image(background_img, 0,0 , background_img.width/2.5,                background_img.height/2.5);
    image(arrow, 353,450 );
  image(arrow_side,500,100);
  //textFont(font_tamagochi);
  textFont(font_handwritten);
  textSize(18);
  //textAlign(CENTER);
  text(answer,800, 100);
  
  textSize(13);
  
  fill(206, 48, 127);
  text(intro,400, 450);
  
  
}


function turnOn(){
  console.log("You Pressed the On Button");
  screenOnRec.hide();
}
  

function answerMe() {
  //prepare the input string for analysis
  let inputStr = input.value();
  inputStr = inputStr.toLowerCase();

  //loop through the answers array and match responses to triggers
  loop1: for (let i = 0; i < data.brain.length; i++) {
    loop2: for (let j = 0; j < data.brain[i].triggers.length; j++) {
      if (inputStr.indexOf(data.brain[i].triggers[j]) !== -1) {
        answer = random(data.brain[i].responses);
        break loop1;
      } else {
        answer = random(data.catchall);
        
        
        
      }
    }
  }
}
