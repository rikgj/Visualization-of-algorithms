// imports
import * as mapHandler from './js/mapHandler.js';
import * as drawHandler from './js/drawHandler.js';
import * as qHandler from './js/queryHandler.js'
import * as algHandler from './js/algHandler.js';
import * as counter from './js/alg_counter.js';

// assign user input funcs
document.getElementById('btnFindPath').onclick = clickFindPath;
document.getElementById('btnRndMap').onclick = clickRndMap;
// set speed range slider
let inpSpeed = document.getElementById('inpSpeed');
inpSpeed.onchange = updSpeed;
inpSpeed.value = parseInt((parseInt(inpSpeed.max) - parseInt(inpSpeed.min))*2/3);
function updSpeed(){
  let speed = parseInt(inpSpeed.max) - parseInt(inpSpeed.value);
  drawHandler.setSpeed(speed)
}

// add algorithm selection items
for (let alg of algHandler.getAlgorithms()){
  let el = new algHandler.Alg(alg.name);
  document.getElementById("algs").append(el);
}
// setup current algorithm selection
algHandler.setupAlgGUI();

// IDEA: make the q-spots markers that cannot be on same spot and are moved by dragging them

// start up the  map generating
clickRndMap()

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
// IDEA: make getQs with parameter numOfPoints[int] from 0 --> 4
//(limit due to space) 0 because not all algs may need a q

// change of algorithm should change
  let qab = qHandler.getQs();
  let zone_map = mapHandler.getMap();

  let result = '';
  let res = algHandler.runAlg(qab,zone_map);

  if (res){
    result = 'A path was found';
  }else{
    result = 'A path was not found';
  }
  document.getElementById('txt_resOut').innerText = result;
  document.getElementById('txt_counterOut').innerText = counter.getCount();
  drawHandler.drawSearchPath();
}
