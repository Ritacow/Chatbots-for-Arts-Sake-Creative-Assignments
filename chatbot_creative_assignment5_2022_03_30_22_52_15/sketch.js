let myFont;
let rm;
let neoLines,
  userLines = [];
let hiroLines;
let response = "";
let inputField, generateBttn;
let sendDataBttn; //this button sends user lines to the database


//for speech recognition
let botVoice = new p5.Speech();

let database; //variable for an instance for firebase database
let ref; //variable for path to the data object

let image_hz;


function preload() {
  neoLines = loadStrings("neo_lines.txt");
  hiroLines = loadStrings("hiro_lines.txt");
   myFont = loadFont('assets/terminal.ttf');
  
  image_hz = loadImage("assets/hirozuker.png");
  
  
}
function setup() {
  //textFont('Georgia');
  createCanvas(windowWidth, windowHeight);
  //createCanvas(710, 400, WEBGL);
   glitch = new Glitch();
  
  //glitch.loadImage('assets/hirozuker.png'); 
  
  

  configFirebase(); //configure firebase
  database = firebase.database(); //make an instance for firebase database
  ref = database.ref("lines"); //specify a path to the data object
  ref.on("value", gotData);

  //input field
  inputField = createInput("");
  inputField.size(width / 4,25);
  inputField.position(width / 2- inputField.width / 2+150, height / 5 -15);

  //button to generate text
  generateBttn = createButton("Listen to What He Just Learned");
  generateBttn.size(250, 30);
  generateBttn.style("color:salmon; background-color: powderblue;font:terminal");
  generateBttn.position(
   150,
    height / 5 - generateBttn.height / 2
  );
  generateBttn.mousePressed(talkToMe); //callback to let the chatbot talk

  //button to send data to the firebase database
  sendDataBttn = createButton("Teach him by yourself!");
  sendDataBttn.size(250, 30);
  sendDataBttn.position(windowWidth/1.5-50, height / 5 - sendDataBttn.height / 2);
  sendDataBttn.mousePressed(sendData);
  sendDataBttn.style("color:salmon; background-color: powderblue;font:terminal");

  textAlign(CENTER, CENTER);
  rectMode(CENTER);
  fill(255);
  rm = RiTa.markov(3);
  rm.addText(neoLines);
  rm.addText(hiroLines);
}

function draw() {
  
  background(250);
  textFont(myFont);
  textSize(width / 3);
  textAlign(CENTER, CENTER);
  
  /*
  
    for (var i = 0; i < width; i += 10) {
  	line(i, 0, i, height);
  	line(width, i, 0, i);
  
  }
  
  */
 
   //image_hz.resize(windowWidth/2, windowHeight/2);
  image(image_hz, 0, 200);
  
  textSize(17);
  text(
    "Neal Stephson just taught Zukerberg how to be a metaverse Samuri.",
    width / 2,
    height / 8,
    width - 20
  );
  
fill("grey");
  
  text(
    "By clicking this button, you will send your data to metaverse",
    width / 1.2,
    220, width - 90
  );

  textSize(1);
  text(response, width / 2+10, height - height / 3, width -10);
  fill("blue");

  

  
  

  
  
  
  
  
  
}

function talkToMe() {
  if (inputField.value()) {
    userLines.push(inputField.value());
    rm.addText(userLines);
    print(userLines);
  }
  response = rm.generate(1, { temperature: 50 });
  
  botVoice.speak(response);
}

function sendData() {
  console.log(userLines);
  ref.push(userLines);
}

function gotData(data) {
  let incomingData = data.val();
  console.log(incomingData);
  let keys = Object.keys(incomingData);
  console.log(keys);
  let lastKey = keys[keys.length - 1];
  userLines = incomingData[lastKey];
  console.log(userLines);
  rm.addText(userLines);
  
  
  
  
}

function configFirebase() {
  
  const firebaseConfig = {
  apiKey: "AIzaSyBAsflOS1KeSCqa14C0Cm9b3kuejsB4QHo",
  authDomain: "chatbot11-509bd.firebaseapp.com",
  projectId: "chatbot11-509bd",
  storageBucket: "chatbfireot11-509bd.appspot.com",
  messagingSenderId: "546728110136",
  appId: "1:546728110136:web:5fde9eb8f53a1fc9305ecd"
  };
  
  /*
const firebaseConfig = {
  apiKey: "AIzaSyAK9yGzUJBCVS9EICH5a0AW-P4Z3XBZu-w",
  authDomain: "hirozukerberg-chatbot.firebaseapp.com",
  projectId: "hirozukerberg-chatbot",
  storageBucket: "hirozukerberg-chatbot.appspot.com",
  messagingSenderId: "474076011593",
  appId: "1:474076011593:web:4db5d4618f4e25d0253398",
  *?
 
};
   */ 

  firebase.initializeApp(firebaseConfig);
}
