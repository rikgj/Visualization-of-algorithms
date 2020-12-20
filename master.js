// imports
import connecticity from './js/algorithm_connectivty.js';
import * as mapHandler from './js/mapHandler.js';
import * as drawHandler from './js/drawHandler.js';
import * as qHandler from './js/queryHandler.js'
import * as counter from './js/alg_counter.js';

// assign user input funcs
document.getElementById('btnFindPath').onclick = clickFindPath;
document.getElementById('btnRndMap').onclick = clickRndMap;
// set speed range slider
let inpSpeed = document.getElementById('inpSpeed');
inpSpeed.onchange = updSpeed;
inpSpeed.value = parseInt((parseInt(inpSpeed.max) - parseInt(inpSpeed.min))*2/3);
// IDEA: might want some algs to use two points A and B, but not all?
// {'value':[int],'name':[string], 'info':[string]}
let algorithms = [
  {'value':0,'name':'My First Algorithm v1', 'info':'The algorithm was my first attempt to solve a path finding challange. It is more of a connectivity algorithm, that checks if a path between two point can be foud. Unless point A = point B, a full connectivity search of point A will be performed.'},
  {'value':0,'name':'My First Algorithm v2', 'info':'The algorithm was my first attempt to solve a path finding challange. It is more of a connectivity algorithm, that checks if a path between two point can be foud. Unless point A = point B, a full connectivity search of point A will be performed.'},
  {'value':0,'name':'My First Algorithm v3', 'info':'The algorithm was my first attempt to solve a path finding challange. It is more of a connectivity algorithm, that checks if a path between two point can be foud. Unless point A = point B, a full connectivity search of point A will be performed.'}
]
// keep track off which algorithm is currently chosen
let curAlg = -1;
// add algorithm selection items
let parent = document.getElementById("algs");
for (let alg of algorithms){
  let el = new Alg(alg.name);
  parent.append(el);
}
// set current algorithm to first in list
setCurAlg(algorithms[0].name);

// start up the  map generating
clickRndMap()


//User functions
function Alg(name){
  let alg = document.createElement('li');
  alg.classList.add('alg');
  alg.innerText = name;
  alg.onclick = (evt) =>{
    setCurAlg(evt.target.innerText)
    // remove dropdown menu
    evt.target.parentElement.classList.add('ct-algs-display-none');
    // make it so that the dropdown menu can reappear
    document.addEventListener('mousemove', removeDisplayNone);
  }
  return alg;
}

function removeDisplayNone(){
  document.getElementById("algs").classList.remove('ct-algs-display-none');
  // remove itself as a listener
  document.removeEventListener('mousemove',removeDisplayNone);
}

function setCurAlg(name){
  for (let alg of algorithms){
    if (name == alg.name){
      curAlg = alg.value;
      document.getElementById("curAlg").innerText = alg.name;
      document.getElementById("out-info-title").innerText = alg.name;
      document.getElementById("out-info").innerText = alg.info;
      break;
    }
  }
}

function updSpeed(){
  let speed = parseInt(inpSpeed.max) - parseInt(inpSpeed.value);
  drawHandler.setSpeed(speed)
}

function clickRndMap(){
  // clear drawing in case it is active
  drawHandler.stopDrawing()
  // set new map
  mapHandler.setRandomMap();
  mapHandler.setupMap();
  // update query
  let zone_map = mapHandler.getMap();
  qHandler.resetQs(zone_map);
}


function clickFindPath(){
  // reset color of map
  drawHandler.cleanMap();

  let qab = qHandler.getQs();
  let zone_map = mapHandler.getMap();

  let result = '';
  let res = -1;


  switch (curAlg) {
    case 0:
      res = connecticity(qab[0],qab[1],zone_map);
      break;
  }

  if(res == -1){
    result = 'RESULT NOT GIVEN';
  }else if (res){
    result = 'A path was found';
  }else{
    result = 'A path was not found';
  }
  document.getElementById('txt_resOut').innerText = result;
  document.getElementById('txt_counterOut').innerText = counter.getCount();
  drawHandler.drawSearchPath();
}
