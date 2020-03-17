<template>
  <div>
    <v-list class="contributor-list">
      <v-list-tile>
        <v-list-tile-avatar>
          <v-avatar size="48" class="avatar">
            <v-img class="elevation-4" :src="avatar" />
          </v-avatar>
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title v-html="name"></v-list-tile-title>
        </v-list-tile-content>

        <div class="mr-1 badge-holder">
          <v-avatar class="elevation-2 badge" size="32">
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-img v-on="on" v-on:click="redirect()" :src="predefinedBadge.url" />
              </template>
              <span>{{ predefinedBadge.tooltip }}</span>
            </v-tooltip>
          </v-avatar>
          <v-avatar
            class="elevation-2 badge"
            size="32"
            v-for="badgedata in specialBadges"
          >
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-img v-on="on" v-on:click="redirect()" class="elevation-2" :src="badgedata.url" />
              </template>
              <span>{{ badgedata.tooltip }}</span>
            </v-tooltip>
          </v-avatar>
        </div>
      </v-list-tile>
    </v-list>
  </div>
</template>

<script>
import PredefinedBadges from "../../assets/badges/predefined/predefinedBadges";
import SpecialBadges from "../../assets/badges/special/specialBadges";

const predefinedBadges = new PredefinedBadges();
const specialBadges = new SpecialBadges();

export default {
  name: "ContributorItem",
  props: {
    name: {
      type: String
    },
    orgName: {
      type: String
    }
  },
  data() {
    return {
      userData: this.$store.getters.getUserOrgCommits({
        name: this.name,
        orgName: this.orgName
      })
    };
  },
  computed: {
    predefinedBadge() {
      let data = predefinedBadges.getBadge(this.userData.total);
      return data;
    },
    specialBadges() {
      return specialBadges.getBadges(this.name, this.orgName);
    },
    avatar() {
      return this.userData.avatar;
    }
  },
  methods: {
    redirect() {
      this.$router.push({ name: "badgeList"});
    }
  }
};
</script>

<style lang="scss" scoped>
.contributor-list {
  width: auto;
}

.avatar {
  padding-right: 10px;
}

.badge-holder {
  margin-left: 70px;
}

.badge {
  margin-left: 3px;
}
</style>
