<template>
  <div>
    <v-container>
      <v-layout justify-center>
        <img src="../assets/upload.svg">
      </v-layout>
    </v-container> 
    <v-container>
      <v-layout justify-center>
        <form action="http://localhost:5000/api/upload" method="POST" enctype="multipart/form-data">
          <textarea name="tempname" rows="1" cols="25" placeholder="Input your template name"/>
            <v-container>
              <v-layout justify-center>
                <input type="file" style="display: none" name="temp" id="temp">
                  <label for="temp" class="custom-file-upload button1">
                    <i class="fas fa-cloud-upload"></i> Upload image
                  </label>
                </input>
              </v-layout>
            </v-container> 
            <v-container>
              <v-layout justify-center>
                <button class="upload-button button1" type="submit" >Submit Template</button>
              </v-layout>
            </v-container>
        </form>
      </v-layout>
    </v-container>
  </div>
</template>

<style>
.custom-file-upload {
    border: none;
    color: white;
    text-align: center;
    padding: 15px 27px;
    cursor: pointer;
    display: inline-block;
    font-size: 20px;;
    background-color: #2c75fe;
}
.upload-button {
  border: none;
  color: white;
  padding: 15px 15px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 20px;
  background-color: #2c75fe;
}

.button1 {border-radius: 12px;}

.button1:hover {
  background-color: #0743b4;
  color: white;
}

.uploadimage {
 width: 100%;
 background-image: "../assets/upload.svg";
 background-size: cover;
 height: 150;
 padding: 150;
 padding-bottom: calc;
}

textarea {
  border: 1px solid #0743b4;
}

::-webkit-input-placeholder { /* Edge */
  color: #0743b4;
  font-size: 18px;
  opacity: 1;
}

:-ms-input-placeholder { /* Internet Explorer 10-11 */
  color: #0743b4;
  font-size: 18px;
  opacity: 1;
}

::placeholder {
  color: #0743b4;
  font-size: 18px;
  opacity: 1;
}
</style>
