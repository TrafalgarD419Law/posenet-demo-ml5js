let capture;
let posenet;
//let noseX, noseY;
let singlepose;
let skeleton;
let specs;
function setup() 
{
    createCanvas(640, 480);
    background(20);
    capture = createCapture(VIDEO); 
    capture.hide();
    posenet = ml5.poseNet(capture, modelLoaded);
    posenet.on('pose', receivedPoses);
    specs=loadImage('images/Harry-Potter-Glasses-PNG-Images-HD.webp');
}
function receivedPoses(poses){
    console.log(poses);
    if(poses.length > 0){
       singlepose = poses[0].pose;
       skeleton = poses[0].skeleton;
        // noseX = poses[0].pose.nose.x;
        //noseY = poses[0].pose.nose.y;
        //console.log("nose x = " + noseX);
       // console.log("nose y = " + noseY);
    }
}
function modelLoaded()
{
    console.log("model is loaded");
}
function draw() 
{
    image(capture,0,0,640,480);
    //ellipse(noseX, noseY, 20, 20);
    if(singlepose){
        for(let i=0; i<singlepose.keypoints.length; i++){
            fill(0,255,0);
            ellipse(singlepose.keypoints[i].position.x, singlepose.keypoints[i].position.y, 10, 10);
        }
    }
    if(skeleton){
        for(let j=0; j<skeleton.length; j++){
            let partA = skeleton[j][0];
            let partB = skeleton[j][1];
            stroke(255,255,255);
            strokeWeight(2);
            line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
        }

}
   image(specs,singlepose.nose.x-75,singlepose.nose.y-50,150,50);
}
