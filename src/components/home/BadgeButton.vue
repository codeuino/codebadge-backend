<template>
  <div>
    <v-btn class="btn-login" v-if="!isLoading" outline><a href = "#/newbadge">Create New Badge</a></v-btn>
    <v-btn class="btn-login" v-if="isLoading" outline>
    </v-btn>
  </div>
</template>

