var points = [];
var grayPath = [];

var globalRecordDistance = Infinity;
var recordDistance = Infinity;
var bestEver;
var currentBest;

var nearest_neighbor_button;
var nearest_insertion_button;
var farthest_insertion_button;
var two_opt_inversion_button;

var stop_button;
var delay;
var slider;
var shuffleButton;
var speedSlider;
var delay;

var bgcolor = 0;

function setup() {
	createCanvas(windowWidth, windowHeight);
	
	two_opt_inversion_button = createButton("Two Opt Inversion");
	two_opt_inversion_button.position(width/2 + 500, height/2 + 105);
	two_opt_inversion_button.mousePressed(slowedTOI);

	stop_button = createButton("Stop");
	stop_button.position(width, height);

	slider = createSlider(1, 50, 25);
	slider.position(width/2 - 600, height/2 + 100);


	shufflePoints(slider.value());
	
	shuffleButton = createButton("Shuffle Cities")
	shuffleButton.position(width/2- 450, height/2 + 100);
	shuffleButton.mousePressed(function() { shufflePoints(slider.value());});

	bestEver = points.slice();

	


	nearest_neighbor_button = createButton("Nearest Neighbor");
	nearest_neighbor_button.position(width/2 + 500, height/2 + 15);
	nearest_neighbor_button.mousePressed(nearestNeighbor); // no parentheses inside this function

	nearest_insertion_button = createButton("Nearest Insertion");
	nearest_insertion_button.position(width/2 + 500, height/2 + 45);
	nearest_insertion_button.mousePressed(nearestInsertion);

	farthest_insertion_button = createButton("Farthest Insertion");
	farthest_insertion_button.position(width/2 + 500, height/2 + 75);
	farthest_insertion_button.mousePressed(farthestInsertion);

	speedSlider = createSlider(0, 1000, 250);
	speedSlider.position(width/2 + 350, height/2 + 110);

	

	
}

function draw() {
	background(bgcolor);

	stroke(255);
	strokeWeight(4);
	noFill();
	beginShape();
	for (var i = 0; i < points.length; i++){
		vertex(points[i].x, points[i].y); // connecting lines
		ellipse(points[i].x, points[i].y, 16, 16); // city points
	}
	endShape();

	stroke(100);
	strokeWeight(4);
	noFill();
	beginShape();
	for (var i = 0; i < grayPath.length; i++){
		vertex(grayPath[i].x, grayPath[i].y); // connecting lines
	}
	endShape();

	stroke(0);
	textSize(20);
	fill(255);
	text("Number of cities = " + slider.value(), width/2 - 600, height/2 + 95);

	textSize(18);
	text("Two Opt Delay = " + speedSlider.value(), width/2 + 325, height/2 + 100);


	textSize(64);
	var s = pathCost(points);
	fill(255);
	text("Current Distance = " + s, 150, height/2 + 220);

	text("Record Distance = " + globalRecordDistance, 150, height/2 + 290);

}





function setBestPath(path, cost){
	bestEver = path;
	recordDistance = cost;
}

function distance(p1, p2){
	return dist(p1.x, p1.y, p2.x, p2.y)
}

function pathCost(path){
	return path
    .slice(0, -1)
    .map((point, idx) => distance(point, path[idx + 1]))
    .reduce((a, b) => a + b, 0);
}