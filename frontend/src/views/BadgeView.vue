<template>
  <div>
    <v-layout class="ma-5" justify-center>
      <div style="width: 1200px">
        <div>
          <div></div>
          <div class="mt-5 header1">Badges</div>
          <v-card flat>
            <BadgeListItem v-for="id in predefinedBadges" :name="id" />
          </v-card>
        </div>
        <div>
          <div class="mt-5 header1">Special Badges</div>
          <v-card flat>
            <BadgeListItem v-for="id in specialBadges" :name="id" isSpecial />
          </v-card>
        </div>
      </div>
    </v-layout>
  </div>
</template>

<script>
import BadgeListItem from "../components/badgeList/BadgeListItem";
import SpecialBadges from "../assets/badges/special/specialBadges";
import PredefinedBadges from "../assets/badges/predefined/predefinedBadges";

const specialBadges = new SpecialBadges();
const predefinedBadges = new PredefinedBadges();

export default {
  name: "BadgeList",
  components: {
    BadgeListItem
  },
  computed: {
    specialBadges() {
      return specialBadges.getAllBadgeIDs();
    },
    predefinedBadges() {
      return predefinedBadges.getAllBadgeIDs();
    }
  }
};
</script>

<style>
.header1 {
  font-size: 30px;
}

.org {
  margin-bottom: 8px;
}
</style>
