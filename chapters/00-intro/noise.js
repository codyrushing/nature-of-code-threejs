/*
draw a square that walks around
it is more likely to take a small step than a large step
*/

import * as d3 from 'd3';
import { Noise } from 'noisejs';

const screenDimensions = [
  window.innerWidth,
  window.innerHeight
];

const [ width, height ] = screenDimensions;

const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');
canvas.setAttribute('width', width);
canvas.setAttribute('height', height);

document.body.appendChild(canvas);

var position;
const maxStepSize = 2;
const noise = new Noise(Math.random());

// returns a value from -1 to 1
function getStepSize(){
  while(true){
    const v = Math.random();
    const p = Math.random();
    if(p > v){
      return v;
    }
  }
}

function getPosition(t, currentPosition=[width/2,height/2]){
  return currentPosition.map(
    (coord, i) => {
      const noiseValue = i === 0
        ? noise.simplex2(0, t)
        : noise.simplex2(t, 0);
      coord += noiseValue * maxStepSize;
      return coord > screenDimensions[i] || coord < 0
        ? Math.abs(screenDimensions[i] - coord)
        : coord;
    }
  );
}

var timestamp = 0;
d3.timer(
  t => {
    timestamp += 0.01;
    position = getPosition(timestamp, position);
    context.clearRect(0, 0, width, height);
    context.beginPath();
    context.rect(...position, 10, 10);
    context.fill();
  }
);
