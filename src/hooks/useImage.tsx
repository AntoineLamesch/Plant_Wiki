export const useImage = (title: string) => {
    const imageName = `${title.toLowerCase().replace(" ", "")}`;
  
    let source;
    switch (imageName) {
      case "cr90corvette":
        source = require("../../assets/CR90corvette.jpg");
        break;
      case "stardestroyer":
        source = require("../../assets/stardestroyer.jpg");
        break;
      case "sentinel-classlanding craft":
        source = require("../../assets/sentinel-classlandingcraft.jpg");
        break;
      case "deathstar":
        source = require("../../assets/deathstar.jpg");
        break;
      case "millenniumfalcon":
        source = require("../../assets/millenniumfalcon.jpg");
        break;
      case "y-wing":
        source = require("../../assets/y-wing.jpg");
        break;
      case "x-wing":
        source = require("../../assets/x-wing.jpg");
        break;
      case "tieadvanced x1":
        source = require("../../assets/tieadvancedx1.jpg");
        break;
      case "executor":
        source = require("../../assets/executor.jpg");
        break;
      case "rebeltransport":
        source = require("../../assets/rebeltransport.jpg");
        break;
    }
    return source;
  };