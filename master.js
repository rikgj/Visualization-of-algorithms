// import
import connecticity from './js/algorithm_connectivty.js';
import * as mapHandler from './js/mapHandler.js';
import * as drawHandler from './js/drawHandler.js';
import * as qHandler from './js/queryHandler.js'
import * as counter from './js/alg_counter.js';

// assign user input funcs
document.getElementById('btnFindPath').onclick = clickFindPath;
document.getElementById('btnRndMap').onclick = clickRndMap;


// start up the  map generating
clickRndMap()


//User functions
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
  drawHandler.cleanMap();
  let result = '';

  // // FIXME: make a switch so that different algorithms can be used
  let qab = qHandler.getQs();
  let zone_map = mapHandler.getMap();
  let res = connecticity(qab[0],qab[1],zone_map);
  if (res){
    // a path was found
    result = 'A path was found';
  }else{
    // no path found
    result = 'A path was not found';
  }
  document.getElementById('txt_resOut').innerText = result;
  document.getElementById('txt_counterOut').innerText = counter.getCount();
  drawHandler.drawSearchPath();
}
