import * as queryHandler from './queryHandler.js';

let zone_map = null;
let size = 40;

export function getMap(){
  return zone_map;
}

export function setRandomMap(){
  let map = []
  let rows = 10;
  let colums = 20;
  for(let i = 0; i < rows; i++){
    let row = [];
    for(let j = 0; j < colums; j++){
      // get 1 or 0
      let col =0;
      if (Math.random() > 0.65){// X% chance for paths
        col = 1
      }
      row.push(col)
    }
    map.push(row)
  }
  zone_map = map;
}

export function setupMap(){
  // clear current map
  let base = document.getElementById('container');
  base.innerHTML = '';

  // create new map from zone_map
  let i = 0;
  for (let line of zone_map){
    let cells = new Cells(i);
    let j = 0;
    for (let el of line){
      let block = (el == 1);
      let cell = new Cell(i,j,block,size)
      cells.appendChild(cell);
      j++;
    }
    base.appendChild(cells);
    i++;
  }
}

function Cells(i){
  let ratio =  1-0.025*(6-i);
  let cells = document.createElement('div');
  cells.classList.add('cells');
  cells.id = i;
  return cells
}

function Cell(i,j,block,size){
  let id = (i+'-'+j);
  let cell = document.createElement('div');
  cell.id = id;
  cell.classList.add('cell');
  cell.value = block;
  cell.style.width = size+'px';
  cell.style.height = size+'px';

  // only non-blocks should be pickable
  if(block){
    cell.classList.add('block');
  }else{//cell is a path
    cell.classList.add('path');
    cell.onclick = (evt)=>{identifyCell(evt)};
    // add markers
    let markA = new Mark(id+'A');
    let markB = new Mark(id+'B');
    cell.appendChild(markA);
    cell.appendChild(markB);
  }

  return cell
}

function Mark(id){
  let mark = document.createElement('div');
  mark.id = id;
  mark.classList.add('mark', 'mark-hidden');
  mark.innerText = id.slice(id.length-1);
  return mark
}

function identifyCell(evt){
  let id = evt.target.id.split('-').map(x => parseInt(x));
  let qa = queryHandler.getQTurn();

  if (qa){
    let qpa = queryHandler.getQa();
    document.getElementById(qpa.join('-')+'A').classList.toggle('mark-hidden')
    qpa = id;
    document.getElementById(qpa.join('-')+'A').classList.toggle('mark-hidden')
    queryHandler.setQa(qpa);
  }else {
    let qpb = queryHandler.getQb();
    document.getElementById(qpb.join('-')+'B').classList.toggle('mark-hidden');
    qpb = id;
    document.getElementById(qpb.join('-')+'B').classList.toggle('mark-hidden');
    queryHandler.setQb(qpb);
  }
  queryHandler.nextQturn();
  queryHandler.updateQsText();
}
