<template>
  <div>
    <v-card outline class="mx-auto org">
      <v-card-title>
        <v-avatar size="60">
          <v-img class="elevation-6" :src="avatar" />
        </v-avatar>
        <span class="title">{{ title }}</span>
      </v-card-title>
      <div class="description">
        {{ description }}
      </div>
    </v-card>
  </div>
</template>

<script>
import PredefinedBadges from "../../assets/badges/predefined/predefinedBadges";
import SpecialBadges from "../../assets/badges/special/specialBadges";

let predefinedBadges = new PredefinedBadges();
let specialBadges = new SpecialBadges();
export default {
  name: "BadgeListItem",
  props: {
    name: {
      type: String
    },
    isSpecial: {
      type: Boolean
    }
  },
  data() {
    return {
      badgeData: {}
    };
  },
  computed: {
    avatar() {
      let prefixURL = predefinedBadges.getBadgeURLPrefix();
      if(this.isSpecial)
        prefixURL = specialBadges.getBadgePrefixURL();
      return prefixURL + this.badgeData.badge;
    },
    title() {
      return this.badgeData['information'].title;
    },
    description() {
      return this.badgeData['information'].description;
    }
  },
  created() {
    if(this.isSpecial)
      this.badgeData = specialBadges.getBadgeFromName(this.name);
    else
      this.badgeData = predefinedBadges.getBadgeFromName(this.name);
  }
};
</script>

<style>
.description {
  margin-left: 100px;
  padding-bottom: 15px;
  font-size: 15px;
}
</style>
