function nearestInsertion(){
    CI();

    const path = [points.shift()];

    points.sort((a, b) => distance(path[0], b) - distance(path[0], a));
    path.push(points.pop());

    while (points.length > 0){
        let [selectedDistance, selectedIdx] = [Infinity, null];
        for (const [freePointIdx, freePoint] of points.entries()){
            for (const pathPoint of path){
                const dist = distance(freePoint, pathPoint);
                if (dist < selectedDistance){
                    [selectedDistance, selectedIdx] = [dist, freePointIdx];
                }
            }
        }


        const[nextPoint] = points.splice(selectedIdx, 1);

        let[bestCost, bestIdx] = [Infinity, null];
        for (let i = 1; i < path.length; i++){
            const insertionCost = pathCost([path[i - 1], nextPoint, path[i]]);
            if (insertionCost < bestCost){
                [bestCost, bestIdx] = [insertionCost, i];
            }
        }
        path.splice(bestIdx, 0, nextPoint);
    }
    path.push(path[0]);
    
    points = path;

    if (pathCost(points) < globalRecordDistance){
        globalRecordDistance = pathCost(points);
    }
};


