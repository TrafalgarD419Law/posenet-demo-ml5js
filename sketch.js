let capture;
let posenet;
let singlepose;
let skeleton;
let specs;

function preload() {
  specs = loadImage("images/Harry-Potter-Glasses-PNG-Images-HD.webp");
}

function setup() {
  createCanvas(640, 480);

  capture = createCapture(VIDEO);
  capture.size(640, 480);
  capture.hide();

  posenet = ml5.poseNet(capture, modelLoaded);
  posenet.on("pose", receivedPoses);
}

function receivedPoses(poses) {
  if (poses.length > 0) {
    singlepose = poses[0].pose;
    skeleton = poses[0].skeleton;
  }
}

function modelLoaded() {
  console.log("PoseNet model loaded");
}

function draw() {
  image(capture, 0, 0, 640, 480);

  if (singlepose) {
    // draw keypoints
    for (let i = 0; i < singlepose.keypoints.length; i++) {
      fill(0, 255, 0);
      noStroke();
      ellipse(
        singlepose.keypoints[i].position.x,
        singlepose.keypoints[i].position.y,
        8,
        8
      );
    }

    // draw skeleton
    for (let j = 0; j < skeleton.length; j++) {
      let partA = skeleton[j][0];
      let partB = skeleton[j][1];
      stroke(255);
      strokeWeight(2);
      line(
        partA.position.x,
        partA.position.y,
        partB.position.x,
        partB.position.y
      );
    }

    // draw glasses on nose
    image(
      specs,
      singlepose.nose.x - 75,
      singlepose.nose.y - 40,
      150,
      50
    );
  }
}
