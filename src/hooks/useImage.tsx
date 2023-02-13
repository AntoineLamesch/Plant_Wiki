export const useImage = (title: string) => {
  const imageName = `${title.toLowerCase().replace(" ", "")}`;

  let source;
  switch (imageName) {
    case "feuilles":
      source = require("../../assets/images/feuilles.gif");
      break;
    case "fond":
      source = require("../../assets/images/leaf.png");
      break;
    case "accueil":
      source = require("../../assets/images/accueil.png");
      break;
  }
  return source;
};
