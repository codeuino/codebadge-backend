import store from "../../../store";
import rawdata from "./badges";

const json = JSON.parse(JSON.stringify(rawdata));
const badgeURLPrefix = "/assets/badges/special/";

export default class SpecialBadges {
  getBadges(name, orgName) {
    let badges = [];

    const topCommits = store.getters.getTopCommits(orgName);
    const topWeekCommits = store.getters.getTopWeekCommits(orgName);
    const topMonthCommits = store.getters.getTopMonthCommits(orgName);
    const topYearCommits = store.getters.getTopYearCommits(orgName);

    //Make sure to sort in descending order of priority of display

    if (topCommits[0].name === name) {
      badges.push({
        url: badgeURLPrefix + json["topContributor"].badge,
        tooltip: json["topContributor"].tooltip
      });
    }

    if (topWeekCommits[0].name === name) {
      if (topWeekCommits[0].weeks[topWeekCommits[0].weeks.length - 1].c > 0) {
        badges.push({
          url: badgeURLPrefix + json["topWeekContributor"].badge,
          tooltip: json["topWeekContributor"].tooltip
        });
      }
    }

    if (topMonthCommits[0].name === name) {
      let actuallyHasCommited = false;
      for (let week in topMonthCommits[0].weeks) {
        if (week.c > 0) {
          actuallyHasCommited = true;
          break;
        }
      }
      if (topMonthCommits[0].weeks.length < 4) actuallyHasCommited = false;
      if (actuallyHasCommited)
        badges.push({
          url: badgeURLPrefix + json["topMonthContributor"].badge,
          tooltip: json["topMonthContributor"].tooltip
        });
    }

    if (topYearCommits[0].name === name) {
      let actuallyHasCommited = false;
      for (let week in topYearCommits[0].weeks) {
        if (week.c > 0) {
          actuallyHasCommited = true;
          break;
        }
      }
      if (topYearCommits[0].weeks.length < 52) actuallyHasCommited = false;
      if (actuallyHasCommited)
        badges.push({
          url: badgeURLPrefix + json["topYearContributor"].badge,
          tooltip: json["topYearContributor"].tooltip
        });
    }

    return badges;
  }

  getBadgeFromName(name) {
    return json[name];
  }

  getBadgePrefixURL() {
    return badgeURLPrefix;
  }

  getAllBadgeIDs() {
    let keys = [];
    for(let key in json)
      keys.push(key);
    return keys;
  }
}
