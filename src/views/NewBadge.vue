<template>
  <body style ="background-image: url('https://png.pngtree.com/thumb_back/fh260/background/20190331/pngtree-vector-white-abstract-background-design-templates-collection-wit-image_94438.jpg'); background-repeat: repeat;">
    <div class = "mt-5 orgs">
      <h1 style ="font-family: georgia; font-size: 45px;">
        <center>
          <b>Create a New Badge!</b>
        </center>
      </h1>
      <h2 style ="margin-bottom: 30px; font-family: georgia; font-size: 25px;">
        <center>
          <b>Design your own badge for your organization.</b>
        </center>
      </h2>
      <Buttons/>
      <v-layout style="margin: 10px;" justify-center="">
        <canvas id = "canvas" width="900" height="600">
        </canvas>
      </v-layout>
    </div>
  </body>
</template>

<script>
  import Buttons from '../components/newBadge/Buttons';

  export default {
  name: 'NewBadge',
  components: {
  Buttons
  }
  }
  
  function draw() {
  var canvas = document.getElementById('canvas');
  if (canvas.getContext) {
  var ctx = newCanvas.getContext('2d');
  }
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

  .title {
  padding: 20px;
  font-size: 80px;
  }
</style>
