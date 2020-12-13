// declaring all global variables and some asigning

document.getElementById('btnFindPath').onclick = clickFindPath;
document.getElementById('btnRndMap').onclick = clickRndMap;

let grid = document.getElementById('container');
let zone_map = null;
let len_c = null;
let len_r = null;
let size = 40;

// used to count the number of checks an algoortihms does, and to draw the alg search path
let drawpaths = []
let checkcounter = 0

// set settings for drawing
let speed = 100; // make input range slider
let drawInterval;
let base = null;

// start a and end b, make input from user
let qa = null;
let qpa = null;
let qpb = null;


// start up the  map generating
clickRndMap()
//------------------------------------------------------//


//Funcitons
function clickRndMap(){
  // clear drawing in case it is active
  stopDrawing()
  zone_map = getRandomMap();
  // update map values
  len_c = zone_map[0].length;
  len_r = zone_map.length;
  grid.innerHTML = '';
  grid.style.width = size*len_c+'px';
  grid.style.height = size*len_r+'px';
  setupGrid(zone_map,size);
  resetQs();
}

function stopDrawing(){
  clearInterval(drawInterval);
  if (base != null){
      base.classList.remove('active');
  }
}


function resetQs(){
  qa = true;
  qpa = getFirstQSpot();
  qpb = qpa;
  document.getElementById(qpa.join('-')+'A').classList.toggle('mark-hidden');
  document.getElementById(qpb.join('-')+'B').classList.toggle('mark-hidden');
  updateQs();
}

function getFirstQSpot(){
  let i = 0;
  let j = 0;
  for(row of zone_map){
    for(val of row){
      if(val == 0){
        return [i,j]
      }
      j++
    }
    i++
  }
}

function updateQs(){
  document.getElementById('txt_qOut').innerHTML = '('+ qpa + ')' + '\u2794' + '(' + qpb + ')';
}

function getRandomMap(){
  let map = []
  let rows = 10;
  let colums = 20;
  for(let i = 0; i < rows; i++){
    let row = [];
    for(let j = 0; j < colums; j++){
      // get 1 or 0
      let col =  Math.round(Math.random());
      row.push(col)
    }
    map.push(row)
  }
  return map
}

function clickFindPath(){
  stopDrawing();
  let resOut = document.getElementById('txt_resOut');
  let counterOut = document.getElementById('txt_counterOut')
  let result = '';

  if (possible(qpa,qpb)){
    // a path was found
    result = 'A path was found';
  }else{
    // no path found
    result = 'A path was not found';
  }
  resOut.innerText = result;
  counterOut.innerText = checkcounter;
  drawSearchPath(drawpaths);
}
