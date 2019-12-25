<template>
    <body style ="background-image: url('https://png.pngtree.com/thumb_back/fh260/background/20190331/pngtree-vector-white-abstract-background-design-templates-collection-wit-image_94438.jpg'); background-repeat: repeat; padding-top: 48px; padding-bottom: 25px;">
      <div>
        <h1 style ="font-family: georgia; font-size: 45px; text-align: center;">
            <b>Create a New Badge!</b>
        </h1>
        <h2 style ="margin-bottom: 30px; font-family: georgia; font-size: 25px; text-align: center;">
          <b>Design your own badge for your organization.</b>
        </h2>
          <div>
            <DrawButtons/>
              <canvas id = "canvas" width="900" height="600">
              </canvas>
          </div>
        <ToolButtons/>
      </div>
    </body>
</template>

<style>

  canvas {
  background-color: white;
  border: 2px solid gray;
  border-radius: 2px;
  margin-bottom: 10px;
  }


</style>

<script>
  import ToolButtons from '../components/newBadge/ToolButtons';
  import DrawButtons from '../components/newBadge/DrawButtons';

  export default {
  name: 'NewBadge',
  components: {
  DrawButtons,
  ToolButtons,
  }
  }



  window.addEventListener("load", () => {
  const canvas = document.getElementById("canvas");

  const ctx = canvas.getContext("2d");

  function getMousePos(canvas, event) {
  var rect = canvas.getBoundingClientRect();
  return {
  x: (event.clientX - rect.left) / (rect.right - rect.left) * canvas.width,
  y: (event.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height
  };
  }

  ctx.strokeStyle = "#000000";
  ctx.lineWidth = 10;
  ctx.lineCap = "round";

  let shouldPaint = false;

  function startDrawing() {
  shouldPaint = true;
  var mousePos = getMousePos(canvas, event);
  ctx.moveTo(mousePos.x, mousePos.y);
  ctx.beginPath()
  continueDrawing(event);
  }

  function continueDrawing(event) {
  if (shouldPaint) {
  var mousePos = getMousePos(canvas, event);
  ctx.lineTo(mousePos.x, mousePos.y)
  ctx.stroke();
  }
  }

  function endDrawing() {
  shouldPaint = false;
  }

  //Allows user to draw on canvas
  drawing();

  function drawing(event) {
  canvas.addEventListener("mousedown", startDrawing);
  document.addEventListener("mouseup", endDrawing);
  canvas.addEventListener("mousemove", continueDrawing);
  }

  // Changing colors
  document.querySelectorAll(".color").forEach(link => {
  link.addEventListener("click", function(event) {
  ctx.strokeStyle = this.style.backgroundColor;
  })
  })

  //Changing brush size
  document.querySelectorAll(".size").forEach(link => {
  link.addEventListener("click", function(event) {
  ctx.lineWidth = this.id;
  })
  })



  //Activates and deactivates buttons
  function removeDraw(event) {
  canvas.removeEventListener("mousedown", startDrawing);
  console.log("working");
  }

  selector.addEventListener("click", removeDraw);
  pencil.addEventListener("click", drawing);
  eraser.addEventListener("click", removeDraw);
  square.addEventListener("click", removeDraw);
  circle.addEventListener("click", removeDraw);
  magic.addEventListener("click", removeDraw);
  text.addEventListener("click", removeDraw);


  })

</script>