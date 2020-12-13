function setupGrid(maparr,size){
  let i = 0;
  for (line of maparr){
    cells = new Cells(i);
    let j = 0;
    for (el of line){
      let block = false;
      let color = 'rgb(255,255,255)';
      if (el == 1){
        block = true;
        color = 'rgb(0,0,255)';
      }
      cell = new Cell((i+'-'+j),block,color,size)
      cells.appendChild(cell);
      j++;
    }
    grid.appendChild(cells);
    i++;
  }
}

function Cells(id){
  cells = document.createElement('div');
  cells.classList.add('cells');
  cells.id = id;
  return cells
}

function Cell(id,block,color,size){
  cell = document.createElement('div');
  cell.id = id;
  cell.classList.add('cell');
  cell.value = block;
  cell.style.background = color;
  cell.style.width = size+'px';
  cell.style.height = size+'px';
  // only non-blocks should be pickable
  if(!block){
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
  if (qa){
    document.getElementById(qpa.join('-')+'A').classList.toggle('mark-hidden')
    qpa = id;
    document.getElementById(qpa.join('-')+'A').classList.toggle('mark-hidden')
    qa = false
  }else {
    document.getElementById(qpb.join('-')+'B').classList.toggle('mark-hidden');
    qpb = id;
    document.getElementById(qpb.join('-')+'B').classList.toggle('mark-hidden');
    qa = true
  }
  updateQs();
}

function paintCell(id){
  cell = document.getElementById(id);
  rgb = cell.style.background.slice(4,-1).split(',').map(x => parseFloat(x));
  rgb = rgb.map(x=>x*0.9);
  cell.style.background = 'rgb('+ rgb.join(',') +')';
}
