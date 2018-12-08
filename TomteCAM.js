let video;
let poseNet;
let noseX = 0;
let noseY = 0;
let eyelX = 0;
let eyelY = 0;

let eyel2X = 0;
let eyel2Y = 0;

let learX = 0;
let learY = 0;

let rearX = 0;
let rearY = 0;
 
function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.hide();
  poseNet = ml5.poseNet(video, modelReady);
  poseNet.on('pose', gotPoses);
}

function gotPoses(poses) {
  //console.log(poses);
  if (poses.length > 0) {
		let pose = poses[0].pose
    let nX = pose.keypoints[0].position.x;
    let nY = pose.keypoints[0].position.y;
    let eX = pose.keypoints[1].position.x;
    let eY = pose.keypoints[1].position.y;
		let e2X = pose.keypoints[2].position.x;
    let e2Y = pose.keypoints[2].position.y;
		
		let le3X = pose.keypoints[3].position.x;
		let le3Y = pose.keypoints[3].position.y;
		let re4X = pose.keypoints[4].position.x;
		let re4Y = pose.keypoints[4].position.y;
    noseX = lerp(noseX, nX, 0.4);
    noseY = lerp(noseY, nY, 0.4);
    eyelX = lerp(eyelX, eX, 0.5);
    eyelY = lerp(eyelY, eY, 0.5);
		eyel2X = lerp(eyel2X, e2X, 0.5);
    eyel2Y = lerp(eyel2Y, e2Y, 0.5);
		
		learX = le3X;
    learY = le3Y;

		rearX = p4x;
    rearY = p4y;

  }
}

function modelReady() {
  console.log('model ready');
}

function draw() {
  image(video, 0, 0);
  
  let d = dist(noseX, noseY, eyelX, eyelY);

	noStroke()
  fill(255, 0, 0);
  ellipse(noseX, noseY, d);
	fill(255,255,255)
	ellipse(eyelX, eyelY, d)
	fill(0,0,0)
	ellipse(eyelX, eyelY,(d*0.2), 4)
	fill(255,255,255)
	ellipse(eyel2X, eyel2Y, d)
  fill(0,0,0)
	ellipse(eyel2X, eyel2Y,(d*0.2), 4)
	
	stroke(255, 0, 0)
	noFill()
	triangle(learX, learY, rearX, rearY, (learX-rearX/2), 75);

}

//https://github.com/tensorflow/tfjs-models/tree/master/posenet