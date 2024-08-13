
let video;
let objectDetector;
let status = "";
let objects = [];

function setup() {
  canvas = createCanvas(380, 380);
  canvas.center();
  video = createCapture(VIDEO);
  video.size(380, 380);
  video.hide();
  objectDetector = ml5.objectDetector('yolo', modelLoaded);
  document.getElementById("status").innerHTML = "Estado: detectando objetos";
}

function modelLoaded() {
  console.log("Model Loaded!");
  status = true;
  detectObjects();
}

function detectObjects() {
  objectDetector.detect(video, function(error, results) {
    if (error) {
      console.log(error);
    }
    objects = results;
    detectObjects(); // Llamada recursiva para seguir detectando
  });
}

function draw() {
  image(video, 0, 0, 380, 380);
  if (status != "") {
    for (let i = 0; i < objects.length; i++) {
      let r = random(255);
      let g = random(255);
      let b = random(255);

      fill(r, g, b);
      noStroke();
      textSize(24);
      text(objects[i].label + " " + nf(objects[i].confidence * 100, 0, 2) + "%", objects[i].x, objects[i].y);
      
      noFill();
      stroke(r, g, b);
      strokeWeight(2);
      rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
    }

    document.getElementById("status").innerHTML = "Estado: objeto detectado";
    document.getElementById("number_of_objects").innerHTML = "El número de objetos detectados es: " + objects.length;
  }
}
