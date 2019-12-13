<template>
  <div>
      <form action="http://localhost:5000/api/upload" method="POST" enctype="multipart/form-data">
        <input type="file" name="temp" id="temp">
        <input name="tempname" placeholder="Give your template name">
        <button type="submit">Upload</button>
      </form>
  </div>
</template>