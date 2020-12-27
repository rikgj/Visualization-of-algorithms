import connecticity_v1 from './alg_connectivityV1.js';
import connecticity_v2 from './alg_connectivityV2.js';

// IDEA: might want some algs to use two points A and B, but not all?
// IDEA:  make connectivity algs acctual be always a connectivity search using only one point

// {qCount:[int], alg:[function], name(unique)':[string], 'info':[string]}
// qCount is ment for the implementation of queryHandler such that the number of
// marks on the map may vary
let algorithms = [
  {'qCount':2, 'alg':(qab,zone_map)=>{connecticity_v1(qab[0],qab[1],zone_map);}, 'name':'My First Algorithm v1', 'info':'The algorithm was my first attempt to solve a path finding challange. It is more of a connectivity algorithm, that checks if a path between two point can be foud. Unless point A = point B, a full connectivity search of point A will be performed.'},
  {'qCount':2, 'alg':(qab,zone_map)=>{connecticity_v2(qab[0],qab[1],zone_map);}, 'name':'My First Algorithm v2', 'info':'The algorithm was my second attempt to solve a path finding challange. It is more of a connectivity algorithm, that checks if a path between two point can be foud. Unless point A = point B, a full connectivity search of point A will be performed. An improvment from V1 is that the algorithm looks at all cells neighboring a found cell until it hita a block.'}
];

// keep track off which algorithm is currently chosen
let curAlg = algorithms[0];

export function getAlgorithms(){
  return algorithms;
}

export function getCurAlg(){
  return curAlg;
}

export function setCurAlg(name){
  for (let alg of algorithms){
    if (name == alg.name){
      curAlg = alg;
      setupAlgGUI();
    }
  }
}

export function setupAlgGUI(){
  document.getElementById("curAlg").innerText = curAlg.name;
  document.getElementById("out-info-title").innerText = curAlg.name;
  document.getElementById("out-info").innerText = curAlg.info;
}


export function runAlg(qs,zone_map){
  return curAlg.alg(qs,zone_map);
}

export function Alg(name){
  let alg = document.createElement('li');
  alg.classList.add('alg');
  alg.innerText = name;
  alg.onclick = (evt) =>{
    setCurAlg(evt.target.innerText)
    // remove dropdown menu
    evt.target.parentElement.classList.add('ct-algs-display-none');
    // make it so that the dropdown menu can reappear
    document.addEventListener('mousemove', removeDisplayNone);

    //update map with new algorithm
  }
  return alg;
}

function removeDisplayNone(){
  document.getElementById("algs").classList.remove('ct-algs-display-none');
  // remove itself as a listener
  document.removeEventListener('mousemove',removeDisplayNone);
}
