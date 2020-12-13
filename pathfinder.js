
let knownpaths = []

function possible(pa,pb){
  drawpaths = [[pa],[pb]]
  checkcounter = 1
  if (checkInKnownPaths(pa,pb)){
    return true
  }


  let cur_type = zone_map[pa[0]][pa[1]];
  let path = [];
  let crossroads = [pa];
  // find all possible paths from pa
  for (cp of crossroads){
    checkcounter++;
    let draw = [cp];

    if (!path.map(x => x.join()).includes((cp.join()))) {
      //store point of path
      path.push(cp)
      //get r,c of cp
      let r = cp[0];
      let c = cp[1];

      // check for neighbouring unchecked points (up/down/left/right)
      // check bound and type match
      // up
      let id = [r-1,c]
      checkcounter++;
      if (r > 0 && cur_type == zone_map[r-1][c]){
        draw.push(id);
        crossroads.push(id)
      }
      // down
      id = [(r+1),c]
      checkcounter++;
      if (r < len_r-1 && cur_type == zone_map[r+1][c]){
          draw.push(id);
          crossroads.push(id)
      }
      // left
      id = [r,c-1];
      checkcounter++;
      if (c > 0 && cur_type == zone_map[r][c-1]){
        draw.push(id);
        crossroads.push(id);
      }
      // right
      id = [r,c+1];
      checkcounter++;
      if (c < len_c-1 && cur_type == zone_map[r][c+1]){
        draw.push(id);
        crossroads.push(id);
      }
    }
    drawpaths.push(draw);
  }
  // store path
  knownpaths.push(path)

  // check if destination is of set and return
  let checkarr = path.map(x => x.join());
  return (checkarr.includes((pa.join())) && checkarr.includes((pb.join())))
}


function checkInKnownPaths(pa,pb){
  checkcounter++;

  if (pa[0] == pb[0] && pa[1] == pb[1]){
    return true
  }
  // check if the types match
  checkcounter++;
  if (zone_map[pa[0]][pa[1]] != zone_map[pb[0]][pb[1]]){
      return false
  }
  // check of known paths
  for (path of knownpaths){
    checkcounter++;
    let checkarr = path.map(x => x.join());
    if (checkarr.includes((pa.join())) && checkarr.includes((pb.join()))){
      return true
    }
    else if (checkarr.includes((pa.join())) || checkarr.includes((pb.join()))){
      checkcounter++;
      return false
    }
    checkcounter++;
  }
  // no checks gave output
  return false
}
