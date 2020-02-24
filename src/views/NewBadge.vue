<template>
  <body style="  padding-top: 48px; padding-bottom: 25px;">
    <div>
      <h1 style="font-family: georgia; font-size: 45px; text-align: center;">
        <b>Create a New Badge!</b>
      </h1>
      <h2
        style="margin-bottom: 30px; font-family: georgia; font-size: 25px; text-align: center;"
      >
        <b>Design your own badge for your organization.</b>
      </h2>
      <div>
        <DrawButtons />
        <canvas id="canvas" width="900" height="600"></canvas>
      </div>
    </div>
    <ToolButtons />
  </body>
</template>

<style>
canvas {
  background-color: #ffffff;
  border: 2px solid gray;
  border-radius: 2px;
  margin-bottom: 10px;
}

body {
  background-image: url("https://png.pngtree.com/thumb_back/fh260/background/20190331/pngtree-vector-white-abstract-background-design-templates-collection-wit-image_94438.jpg");
  background-repeat: repeat;
}
</style>

<script>
import ToolButtons from "../components/newBadge/ToolButtons";
import DrawButtons from "../components/newBadge/DrawButtons";

export default {
  name: "NewBadge",
  components: {
    DrawButtons,
    ToolButtons
  }
};

window.addEventListener("load", () => {
  const canvas = document.getElementById("canvas");

  canvas.backgroundColor = "#ffffff";
  let haveColor = true;
  let pencilColor;

  const ctx = canvas.getContext("2d");

  function getMousePos(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    return {
      x:
        ((event.clientX - rect.left) / (rect.right - rect.left)) * canvas.width,
      y: ((event.clientY - rect.top) / (rect.bottom - rect.top)) * canvas.height
    };
  }

  ctx.strokeStyle = "#000000";
  ctx.fillStyle = "#000000";
  ctx.lineWidth = 10;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  var posX;
  var posY;

  let shouldPaint = false;
  let shouldDrawShape = false;

  var selector = document.getElementById("selector");
  var pencil = document.getElementById("pencil");
  var eraser = document.getElementById("eraser");
  var square = document.getElementById("square");
  var roundSquare = document.getElementById("roundSquare");
  var circle = document.getElementById("circle");
  var text = document.getElementById("text");

  //Allows canvas to be drawn on immediately when page is loaded
  drawingLines();
  canvas.addEventListener("mousedown", startLine);
  document.addEventListener("mouseup", endLine);
  canvas.addEventListener("mousemove", continueLine);

  //Pencil Drawing
  function startLine() {
    shouldPaint = true;
    var mousePos = getMousePos(canvas, event);
    ctx.moveTo(mousePos.x, mousePos.y);
    ctx.beginPath();
    continueLine(event);
  }

  function continueLine(event) {
    if (shouldPaint) {
      var mousePos = getMousePos(canvas, event);
      ctx.lineTo(mousePos.x, mousePos.y);
      ctx.stroke();
    }
  }

  function endLine() {
    shouldPaint = false;
  }

  //Shapes
  function startShape() {
    shouldDrawShape = true;
    var mousePos = getMousePos(canvas, event);
    ctx.moveTo(mousePos.x, mousePos.y);
    posX = mousePos.x;
    posY = mousePos.y;
    ctx.beginPath();
  }

  function drawRect(event) {
    if (shouldDrawShape) {
      var mousePos = getMousePos(canvas, event);
      ctx.fillRect(posX, posY, mousePos.x - posX, mousePos.y - posY);
    }
  }

  function drawRoundRect(event) {
    if (shouldDrawShape) {
      var mousePos = getMousePos(canvas, event);
      ctx.lineJoin = "round";
      ctx.strokeRect(posX, posY, mousePos.x - posX, mousePos.y - posY);
      ctx.fillRect(posX, posY, mousePos.x - posX, mousePos.y - posY);
    }
  }

  function drawEllipse(event) {
    if (shouldDrawShape) {
      var mousePos = getMousePos(canvas, event);
      var rh = (posY - mousePos.y) / 2;
      var rw = (posX - mousePos.x) / 2;
      ctx.beginPath();
      ctx.ellipse(
        mousePos.x + rw,
        mousePos.y + rh,
        Math.abs(rw),
        Math.abs(rh),
        0,
        0,
        2 * Math.PI
      );
      ctx.fill();
    }
  }

  function endShape() {
    shouldDrawShape = false;
  }

  //Allows user to draw lines or shapes on canvas

  function drawingLines() {
    haveColor = true;
    if (ctx.strokeStyle == canvas.backgroundColor) {
      ctx.strokeStyle = pencilColor;
      if (!pencilColor) {
        ctx.strokeStyle = "#000000";
      }
    }
  }

  function drawingShapes() {
    haveColor = true;
    if (ctx.strokeStyle == canvas.backgroundColor) {
      ctx.fillStyle = pencilColor;
      ctx.strokeStyle = pencilColor;
      if (!pencilColor) {
        ctx.fillStyle = "#000000";
        ctx.strokeStyle = "#000000";
      }
    }
  }

  // Changing colors
  document.querySelectorAll(".color").forEach(link => {
    link.addEventListener("click", function() {
      if (haveColor) {
        ctx.strokeStyle = this.style.backgroundColor;
        pencilColor = this.style.backgroundColor;
        ctx.fillStyle = this.style.backgroundColor;
      }
    });
  });

  //Changing brush size
  document.querySelectorAll(".size").forEach(link => {
    link.addEventListener("click", function() {
      ctx.lineWidth = this.id;
    });
  });

  //Activates and deactivates buttons
  function removeTools() {
    canvas.removeEventListener("mousedown", startLine);
    canvas.removeEventListener("mousedown", startShape);
    canvas.removeEventListener("mouseup", drawRect);
    canvas.removeEventListener("mouseup", drawRoundRect);
    canvas.removeEventListener("mouseup", drawEllipse);
  }

  selector.addEventListener("click", removeTools);

  pencil.addEventListener("click", function() {
    removeTools();
    drawingLines();
    canvas.addEventListener("mousedown", startLine);
    document.addEventListener("mouseup", endLine);
    canvas.addEventListener("mousemove", continueLine);
  });

  eraser.addEventListener("click", function() {
    removeTools();
    drawingLines();
    haveColor = false;
    ctx.strokeStyle = canvas.backgroundColor;
    canvas.addEventListener("mousedown", startLine);
    document.addEventListener("mouseup", endLine);
    canvas.addEventListener("mousemove", continueLine);
  });

  square.addEventListener("click", function() {
    removeTools();
    drawingShapes();
    canvas.addEventListener("mousedown", startShape);
    canvas.addEventListener("mouseup", drawRect);
    document.addEventListener("mouseup", endShape);
  });

  roundSquare.addEventListener("click", function() {
    removeTools();
    drawingShapes();
    canvas.addEventListener("mousedown", startShape);
    canvas.addEventListener("mouseup", drawRoundRect);
    document.addEventListener("mouseup", endShape);
    console.log("round");
  });

  circle.addEventListener("click", function() {
    removeTools();
    drawingShapes();
    canvas.addEventListener("mousedown", startShape);
    canvas.addEventListener("mouseup", drawEllipse);
    document.addEventListener("mouseup", endShape);
  });

  text.addEventListener("click", removeTools);
});
</script>
