// a full conectivity search og point A, unless A == B, it would be better to combine with a
// lookup of previously explored points, but in this visualization that has been left out
import * as drawHandler from './drawHandler.js';
import * as counter from './alg_counter.js';

export default function connecticity(pa,pb,zone_map){
  drawHandler.resetPath();
  drawHandler.addPath([pa,pb]);
  counter.resetCounter();
  counter.count();

  if (pa[0] == pb[0] && pa[1] == pb[1]){
    return true;
  }
  // check if the types match
  counter.count();
  if (zone_map[pa[0]][pa[1]] != zone_map[pb[0]][pb[1]]){
      return false;
  }


  let cur_type = zone_map[pa[0]][pa[1]];
  let len_c = zone_map[0].length;
  let len_r = zone_map.length;
  let path = [];
  let crossroads = [pa];
  // find all possible paths from pa
  for (let cp of crossroads){
    counter.count();
    let draw = [cp];

    if (!path.map(x => x.join()).includes((cp.join()))) {
      //store point of path
      path.push(cp)
      //get r,c of cp
      let r = cp[0];
      let c = cp[1];

      // check for neighbouring unchecked points (up/down/left/right)
      // check bound and type match
      let check, cur, limit;
      // up
      let dir = r;

      while (dir>0){
        counter.count();
        check = dir-1;
        cur = [check,c]
        if(!crossroads.map(x => x.join()).includes((cur.join())) && cur_type == zone_map[cur[0]][cur[1]]){
          draw.push(cur);
          crossroads.push(cur);
        }else{
          break;
        }
        dir = check;
      }

      // down
      dir = r;
      limit = len_r -1;

      while (dir<limit){
        counter.count();
        check = dir+1;
        cur = [check,c]
        if(!crossroads.map(x => x.join()).includes((cur.join())) && cur_type == zone_map[cur[0]][cur[1]]){
          draw.push(cur);
          crossroads.push(cur);
        }else{
          break;
        }
        dir = check;
      }

      // left
      dir = c;
      while (dir>0){
        counter.count();
        check = dir-1;
        cur = [r,check];
        if(!crossroads.map(x => x.join()).includes((cur.join())) && cur_type == zone_map[cur[0]][cur[1]]){
          draw.push(cur);
          crossroads.push(cur);
        }else{
          break;
        }
        dir = check;
      }

      // right
      dir = c;
      limit = len_c -1;
      while (dir<limit){
        counter.count();
        check = dir+1;
        cur = [r,check];
        if(!crossroads.map(x => x.join()).includes((cur.join())) && cur_type == zone_map[cur[0]][cur[1]]){
          draw.push(cur);
          crossroads.push(cur);
        }else{
          break;
        }
        dir = check;
      }
    }
    drawHandler.addPath(draw);
  }

  // check if destination is of set and return
  let checkarr = path.map(x => x.join());
  return (checkarr.includes((pa.join())) && checkarr.includes((pb.join())));
}
