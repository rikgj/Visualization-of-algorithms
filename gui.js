function drawSearchPath(paths){
  //first element is the base of the search, all other are being searched
  let i = 0;
  let j = 0;
  base = null;//from master
  drawInterval = setInterval((paths)=>{
    try{
      id = paths[i].shift();
    }catch(err){
      base.classList.toggle('active');
      clearInterval(drawInterval);
    }
    if(id==undefined){
      //new array will start, clear base
        base.classList.toggle('active');
        i++;
        j=0;
    }else{
      //use value
      try{
        id = id.join('-');
        paintCell(id);
      }catch(err){// // FIXME: i have been getting some errors when two intervals are running
        console.log(err);
        console.log(id);
      }

      if(j==0){
        //first in array
        base = document.getElementById(id);
        base.classList.toggle('active');
      }
      j++;
    }
  },speed, paths);
}
