import rawdata from "./badges";

const json = JSON.parse(JSON.stringify(rawdata));
const badgeURLPrefix = "/assets/badges/predefined/";

export default class PredefinedBadges {
  getBadge(commits) {
    let url = "";
    let tooltip = "";
    json.forEach(function(badge) {
      if (commits >= badge.min_commits && commits <= badge.max_commits) {
        url = badgeURLPrefix + badge.badge;
        tooltip = badge.tooltip;
      }
    });
    return {url: url, tooltip: tooltip};
  }

  getBadgeFromName(name) {
    let data = {};
    json.forEach(function(badge) {
      if(badge.name === name)
      {
        data = badge;
      }
    });
    return data;
  }

  getBadgeURLPrefix()
  {
    return badgeURLPrefix;
  }

  getAllBadgeIDs()
  {
    let keys = [];
    for(let i in json)
      keys.push(json[i].name);
    return keys;
  }
}
