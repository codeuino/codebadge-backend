<template>
  <div>
    <v-list-tile avatar>
      <!-- <div> -->
      <v-layout justify-space-between>
        <div>
          <v-list-tile-title v-html="author"></v-list-tile-title>
        </div>
        <div class="mx-5">
          <div class="badge-simple" :style="{backgroundColor: getColor()}"></div>
        </div>
      </v-layout>
      <!-- </div> -->
      <!-- <div>
        <v-list-tile-title>{ Total commits: {{total}}, Last commit: {{getLastWeek()}} week(s) ago }</v-list-tile-title>
      </div>-->
    </v-list-tile>
  </div>
</template>

<script>
export default {
  name: 'ContributorItem',
  props: {
    author: {
      type: String
    },
    weeks: {
      type: Array
    },
    total: {
      type: Number
    }
  },
  data() {
    return {
      reversedWeeks: this.weeks.reverse()
    };
  },
  methods: {
    getLastWeek() {
      return this.reversedWeeks.findIndex(week => week.c != 0);
    },
    getColor() {
      let value = this.getLastWeek();

      if (value == 1) return '#1B5E20';
      else if (value == 2) return '#2E7D32';
      else if (value == 3) return '#66BB6A';
      else if (3 < value && value <= 5) return '#A5D6A7';
      else if (5 < value && value <= 8) return '#FFF9C4';
      else if (8 < value && value <= 16) return '#FFF176';
      else if (16 < value && value <= 32) return '#F9A825';
      else if (32 < value && value <= 56) return '#FF6F00';
      else if (56 < value && value <= 84) return '#E65100';
      else if (84 < value && value <= 112) return '#FF3D00';
      else if (112 < value) return '#78909C';
    }
  }
};
</script>

<style lang="scss" scoped>
.badge-simple {
  width: 20px;
  height: 20px;
  border-radius: 4px;
}
</style>