function farthestInsertion(){
    CI();

    
    const path = [points.shift()];
    points.sort((a, b) => distance(path[0], b) - distance(path[0], a));
    path.push(points.pop());
    while (points.length > 0) {
        let [selectedDistance, selectedIdx] = [0, null];
        for (const [freePointIdx, freePoint] of points.entries()) {
        let [bestCostToPath, costToPathIdx] = [Infinity, null];
        for (const pathPoint of path) {
            const dist = distance(freePoint, pathPoint);
            if (dist < bestCostToPath) {
            [bestCostToPath, costToPathIdx] = [dist, freePointIdx];
            }
        }
        if (bestCostToPath > selectedDistance) {
            [selectedDistance, selectedIdx] = [bestCostToPath, costToPathIdx];
        }
        }
        const [nextPoint] = points.splice(selectedIdx, 1);
        let [bestCost, bestIdx] = [Infinity, null];
        for (let i = 1; i < path.length; i++) {
            const insertionCost = pathCost([path[i - 1], nextPoint, path[i]]);
            if (insertionCost < bestCost) {
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
}