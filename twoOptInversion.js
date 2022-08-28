// function twoOptInversion(){
//     points.push(points[0]);


//     let best = pathCost(points);
//     let swapped = true;

//     while (swapped){
//         swapped = false;
//         for (let pt1 = 1; pt1 < points.length - 1; pt1++){
//             for (let pt2 = pt1 + 1; pt2 < points.length - 1; pt2++){
//                 const section = points.slice(pt1, pt2 + 1);

//                 section.reverse();

//                 points.splice(pt1, pt2 +1 - pt1, ...section);

//                 const newPath = points;
//                 const cost = pathCost(newPath);
//                 if (cost < best){
//                     swapped = true;
//                     best = cost;
//                     self.setBestPath(newPath, best); 
                    
//                 } else {
//                     section.reverse();
//                     points.splice(pt1, pt2 + 1 - pt1, ...section);
//                 }
//             }
//         }
//     }

// }

function singleTwoOptInversion(){
    points.push(points[0]);
    let best = pathCost(points);
    for (let pt1 = 1; pt1 < points.length - 1; pt1++){
        for (let pt2 = pt1 + 1; pt2 < points.length - 1; pt2++){
            const section = points.slice(pt1, pt2 + 1);
            section.reverse();


            points.splice(pt1, pt2 +1 - pt1, ...section);

            const newPath = points;
            const cost = pathCost(newPath);
            if (cost < best){
                grayPath = section;
                best = cost;
                self.setBestPath(newPath, best); 
                if (pathCost(points) < globalRecordDistance){
                    globalRecordDistance = pathCost(points);
                }
                return;
            } else {
                section.reverse();
                points.splice(pt1, pt2 + 1 - pt1, ...section);
            }
        }
    }
}

function slowedTOI(){
    delay = setInterval(singleTwoOptInversion, speedSlider.value());
    two_opt_inversion_button.mousePressed(CI);
    
	stop_button.position(width/2 + 635, height/2 + 105);
    stop_button.mousePressed(CI);
}

function CI(){
    clearInterval(delay);
    grayPath = [];
    stop_button.position(width, height);
    two_opt_inversion_button.mousePressed(slowedTOI);
}

function shufflePoints(numberOfCities){
	CI();
	points = [];
	for (var i = 0; i < numberOfCities; i++){
		var v = createVector(random(width), random(height/2));
		points[i] = v;
	}
	globalRecordDistance = pathCost(points);
}