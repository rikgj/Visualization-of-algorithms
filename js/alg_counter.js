let counter = 0;

export function resetCounter(){
  counter = 0;
}

export function count(){
  counter++;
}

export function getCount(){
  return counter;
}
