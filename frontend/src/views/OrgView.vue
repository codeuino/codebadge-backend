<template>
  <div>
    <v-layout class="ma-5" justify-center>
      <Org/>
    </v-layout>
  </div>
</template>

<script>
import Org from '../components/org/Org';

export default {
  name: 'OrgView',
  components: {
    Org
  }
};
</script>

<style lang="scss" scoped>
</style>