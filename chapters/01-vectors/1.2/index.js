import * as d3 from 'd3';
import Vec2 from '../../../base/vector';

const screenDimensions = [
  window.innerWidth,
  window.innerHeight
];
const [ width, height ] = screenDimensions;

const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');
canvas.setAttribute('width', width);
canvas.setAttribute('height', height);
const hiddenCanvas = document.createElement('canvas');
const hiddenContext = hiddenCanvas.getContext('2d');
hiddenCanvas.setAttribute('width', width);
hiddenCanvas.setAttribute('height', height);
hiddenCanvas.style.display = 'none';

document.body.appendChild(canvas);
document.body.appendChild(hiddenCanvas);

hiddenContext.globalAlpha = 0.6;

const numDots = 100;

const dots = d3.range(numDots).map(
  () => {
    return {
      position: new Vec2(
        Math.random() * width,
        Math.random() * height
      ),
      velocity: new Vec2(
        (Math.random() - 0.5) * 2 * width/200,
        (Math.random() - 0.5) * 2 * height/200
      )
    };
  }
);

d3.timer(
  t => {
    hiddenContext.clearRect(0, 0, width, height);
    hiddenContext.drawImage(canvas, 0, 0, width, height);
    context.clearRect(0, 0, width, height);
    context.drawImage(hiddenCanvas, 0, 0, width, height);
    dots.forEach(
      dot => {
        dot.position.add(dot.velocity);
        if(dot.position.x > width || dot.position.x <= 0){
          dot.velocity.x = -dot.velocity.x;
        }
        if(dot.position.y > height || dot.position.y <= 0){
          dot.velocity.y = -dot.velocity.y;
        }
        context.beginPath();
        context.fillStyle = 'red';
        context.arc(dot.position.x, dot.position.y, 4, 0, 2 * Math.PI);
        context.fill();
      }
    );
  }
);
