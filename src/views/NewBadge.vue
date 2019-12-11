<template>
  <div class = "mt-5 orgs">
  <h1>
    <center><b>Create a New Badge!</b></center>
    </h1>
    <v-layout class="ma-5" justify-center>
      <canvas id = "newCanvas" width="900" height="600">
      </canvas>
    </v-layout>
  </div>
</template>

<script>
function draw() {
        var canvas = document.getElementById('newCanvas');
        if (canvas.getContext) {
          var ctx = newCanvas.getContext('2d');
        }
</script>

<style>
canvas {
    background-color: white;
    margin: auto;
    display: block;
    border: 2px solid gray;
    border-radius: 2px;
}
</style>
