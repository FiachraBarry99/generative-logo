const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');
const Color = require('canvas-sketch-util/color');

const settings = {
  dimensions: [1080, 1080],
  animate: true,
};

const sketch = ({ context, width, height }) => {
  const num = 80;
  const degrees = -25;
  const size = 1.5;

  let x, y, w, h, fill, stroke, offset1, offset2;
  const rects = [];

  const colours = [
    '#0094C4',
    '#0094C4',
    '#0094C4',
    '#E9D800',
    '#E9D800',
    '#E9D800',
    '#7AC5DE',
    '#7AC5DE',
  ];

  for (let i = 0; i < num; i++) {
    x = random.range(0, width);
    y = random.range(0, height);
    w = random.range(100 * size, 400 * size);
    h = random.range(30 * size, 80 * size);

    fill = random.pick(colours);
    stroke = random.pick(colours);

    blend = random.value(0, 1) > 0.5 ? 'overlay' : 'source-over';

    rects.push({ x, y, w, h, stroke, fill, blend });
  }

  let i = 0;

  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    context.save();

    context.lineWidth = 8;

    context.translate(width * 0.5 - 317, width * 0.5 - 92.25);
    shee = drawShee(context, 'rgba(0,0,0,1)');

    context.clip(shee);

    i++;
    if (i === (1000 * (2 * Math.PI)) / 0.0003) {
      i = 0;
    }
    // figure out how much to offset fill by each frame
    offset1 = 60 * Math.sin(0.0003 * i);
    offset2 = 10 * Math.cos(0.0006 * i) + 1;

    context.fillStyle = Color.style(
      Color.offsetHSL('#7AC5DE', offset1, offset2, 0).rgba
    );
    context.fillRect(0, 0, width, height);

    rects.forEach((rect) => {
      const { x, y, w, h, stroke, fill, blend } = rect;

      context.save();
      context.translate(-(width * 0.5 - 317), -(width * 0.5 - 92.25));
      context.translate(x, y);

      drawSkewedRect({
        context,
        w,
        h,
        degrees,
        stroke,
        fill,
        blend,
        offset1,
        offset2,
      });

      context.restore();
    });

    context.restore();

    context.save();

    context.lineWidth = 8;

    context.globalCompositeOperation = 'color-burn';

    context.translate(width * 0.5 - 317, width * 0.5 - 92.25);
    shee = drawShee(context, 'rgba(0,0,0,0.6)');

    context.restore();
  };
};

const drawSkewedRect = ({
  context,
  w = 500,
  h = 110,
  degrees = 25,
  stroke = 'black',
  fill = 'blue',
  blend = 'source-over',
  offset1,
  offset2,
}) => {
  const angle = math.degToRad(degrees);
  const rx = Math.cos(angle) * w;
  const ry = Math.sin(angle) * w;

  context.save();

  let fillColor = Color.style(Color.offsetHSL(fill, offset1, offset2, 0).rgba);
  context.fillStyle = fillColor;

  context.translate(rx * -0.5, (ry + h) * -0.5);

  let strokeColor = Color.style(
    Color.offsetHSL(stroke, offset1, offset2, 0).rgba
  );
  context.strokeStyle = strokeColor;
  context.lineWidth = 10;

  context.beginPath();
  context.moveTo(0, 0);
  context.lineTo(rx, ry);
  context.lineTo(rx, ry + h);
  context.lineTo(0, h);
  context.closePath();

  let shadowColor = Color.offsetHSL(fillColor, 0, 10, -40);
  shadowColor.rgba[3] = 0.4;

  context.shadowColor = Color.style(shadowColor.rgba);
  context.shadowOffsetX = -10;
  context.shadowOffsetY = 20;

  context.globalCompositeOperation = blend;
  context.fill();

  context.shadowColor = 'null';
  context.stroke();

  context.globalCompositeOperation = 'source-over';
  context.strokeStyle = 'black';
  context.lineWidth = 2;
  context.stroke();

  context.restore();
};

const drawShee = function (ctx, stroke) {
  ctx.strokeStyle = stroke;
  ctx.lineJoin = 'round';
  ctx.miterLimit = 4;

  let shee = new Path2D();
  shee.moveTo(1, 112.5);
  shee.lineTo(1, 1);
  shee.lineTo(142, 1);
  shee.lineTo(142, 36);
  shee.lineTo(36, 36);
  shee.lineTo(36, 77.5);
  shee.lineTo(142, 77.5);
  shee.lineTo(142, 184.5);
  shee.lineTo(1, 184.5);
  shee.lineTo(1, 149.5);
  shee.lineTo(107, 149.5);
  shee.lineTo(107, 112.5);
  shee.lineTo(1, 112.5);
  shee.closePath();

  let hhh = new Path2D();
  hhh.moveTo(165, 184.5);
  hhh.lineTo(165, 1);
  hhh.lineTo(200, 1);
  hhh.lineTo(200, 79.5);
  hhh.lineTo(271, 79.5);
  hhh.lineTo(271, 1);
  hhh.lineTo(306, 1);
  hhh.lineTo(306, 184.5);
  hhh.lineTo(271, 184.5);
  hhh.lineTo(271, 114.5);
  hhh.lineTo(200, 114.5);
  hhh.lineTo(200, 184.5);
  hhh.lineTo(165, 184.5);
  hhh.closePath();
  shee.addPath(hhh);

  let e1 = new Path2D();
  e1.moveTo(329, 184.5);
  e1.lineTo(329, 1);
  e1.lineTo(470, 1);
  e1.lineTo(470, 36);
  e1.lineTo(364, 36);
  e1.lineTo(364, 79.5);
  e1.lineTo(440.5, 79.5);
  e1.lineTo(440.5, 114.5);
  e1.lineTo(364, 114.5);
  e1.lineTo(364, 149.5);
  e1.lineTo(470, 149.5);
  e1.lineTo(470, 184.5);
  e1.lineTo(329, 184.5);
  e1.closePath();
  shee.addPath(e1);

  let e2 = new Path2D();
  e2.moveTo(493, 184.5);
  e2.lineTo(493, 1);
  e2.lineTo(634, 1);
  e2.lineTo(634, 36);
  e2.lineTo(528, 36);
  e2.lineTo(528, 79.5);
  e2.lineTo(604.5, 79.5);
  e2.lineTo(604.5, 114.5);
  e2.lineTo(528, 114.5);
  e2.lineTo(528, 149.5);
  e2.lineTo(634, 149.5);
  e2.lineTo(634, 184.5);
  e2.lineTo(493, 184.5);
  e2.closePath();
  shee.addPath(e2);

  ctx.stroke(shee);

  return shee;
};

canvasSketch(sketch, settings);
