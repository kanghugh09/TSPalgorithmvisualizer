function nearestNeighbor(){
    CI();

    const path = [points.shift()];
    while (points.length > 0){
        points.sort(
            (a, b) => distance(path[path.length-1], b) - distance(path[path.length-1], a)
        );
        
        path.push(points.pop());
    }

    path.push(path[0]);

    points = path

    if (pathCost(points) < globalRecordDistance){
        globalRecordDistance = pathCost(points);
    }
}