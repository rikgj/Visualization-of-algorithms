let qTurn = null;
let qpa = null;
let qpb = null;


export function setQs(a,b){
  qpa = a;
  qpb = b;
}

export function setQa(a){
  qpa = a;
}

export function setQb(b){
  qpb = b;
}

export function getQs(){
  return [qpa,qpb];
}

export function getQa(){
  return qpa;
}

export function getQb(){
  return qpb;
}

export function getQTurn(){
  return qTurn;
}

export function nextQturn(){
  qTurn = !qTurn;
}


export function resetQs(zone_map){
  qTurn = true;
  qpa = getFirstQSpot(zone_map);
  qpb = qpa;
  document.getElementById(qpa.join('-')+'A').classList.toggle('mark-hidden');
  document.getElementById(qpb.join('-')+'B').classList.toggle('mark-hidden');
  updateQsText();
}


function getFirstQSpot(zone_map){
  let i = 0;
  let j = 0;
  for(let row of zone_map){
    for(let val of row){
      if(val == 0){
        return [i,j];
      }
      j++;
    }
    i++;
  }
}

export function updateQsText(){
  document.getElementById('txt_qOut').innerHTML = '('+ qpa + ')' + '\u2794' + '(' + qpb + ')';
}
