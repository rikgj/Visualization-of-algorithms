let drawPaths = [];
let activeCell = null;
let drawInterval = false;
// set settings for drawing
let speed = 150; 
// IDEA: store progress of drawing by updating a index value for each interval so that speed can be alterd while drwaing
export function setSpeed(s){
  speed = s;
}
export function getDrawInterval(){
  return drawInterval;
}

export function resetPath(){
  drawPaths = [];
}

export function addPath(path){
  drawPaths.push(path);
}

export function stopDrawing(){
  clearInterval(drawInterval);
  if (activeCell != null){
      activeCell.classList.remove('active');
  }
  drawInterval = false;
}


export function drawSearchPath(){
  //first element is the activeCell of the search, all other are being searched
  let i = 0;
  let j = 0;
  activeCell = null;
  if (!drawInterval){ // interval not active
    drawInterval = setInterval((drawPaths)=>{
      let id = undefined;
      try{
        id = drawPaths[i].shift();
      }catch(err){
        if(activeCell != null){
          activeCell.classList.remove('active');
        }
        clearInterval(drawInterval);
        drawInterval = false;
      }
      if(id==undefined){
        //new array will start, clear activeCell
          if(activeCell != null){
              activeCell.classList.remove('active');
          }

          i++;
          j=0;
      }else{
        //use value
        id = id.join('-');
        paintCell(id);

        if(j==0){
          //first in array
          activeCell = document.getElementById(id);
          activeCell.classList.add('active');
        }
        j++;
      }
    },speed, drawPaths);
  }
}

function paintCell(id){
  let cell = document.getElementById(id);
  let rate = 0.8;
  let first = 255*rate;
  let rgb = "rgb(" + first +"," + first +"," + first + ")";
  if (cell.style.backgroundColor != ""){
    rgb = cell.style.background.slice(4,-1).split(',').map(x => parseFloat(x));
    rgb = rgb.map(x=>x*0.9);
    rgb = 'rgb('+ rgb.join(',') +')';
  }
  cell.style.background = rgb;
}

export function cleanMap(){
  stopDrawing();
  let style = getComputedStyle(document.body);
  let pathColor = style.getPropertyValue('--path-color');
  let blockColor = style.getPropertyValue('--block-color');
  let cells = document.getElementById('container').children;
  for (let i = 0; i < cells.length; i++){
    let cell = cells[i].children;
    for (let j = 0; j < cell.length; j++){
      cell[j].style.background = (cell[j].value ? blockColor:pathColor);
    }
  }
}
