<template>
  <div class="btn-group">
    <v-btn class="color" fab="" style ="background-color: #E76F51 "></v-btn>
    <v-btn class="color" fab="" style ="background-color: #F2A261"></v-btn>
    <v-btn class="color" fab="" style ="background-color: #E9C46A"></v-btn>
    <v-btn class="color" fab="" style ="background-color: #2A9D8F"></v-btn>
    <v-btn class="color" fab="" style ="background-color: #264653"></v-btn>
    <v-btn class="color" fab="" style ="background-color: #000000"></v-btn>
    <v-btn class="size" id="5" fab="" small="">
      <i class="far fa-dot-circle fa-3x"></i>
    </v-btn>
    <v-btn class="size" id="10" fab="">
      <i class="far fa-dot-circle fa-4x"></i>
    </v-btn>
    <v-btn class="size" id="20" fab="" large="">
      <i class="far fa-dot-circle fa-5x"></i>
    </v-btn>

  </div>
</template>

<style>

  .btn-group button {
  display: block;
  margin-bottom: 5px;
  }

  .size {
  margin: auto;
  }

  .btn-group {
  float: left;
  padding-left: 21.3%;
  padding-right: 20px;
  text-align: center;
  margin-top: 20px;
  }
</style>