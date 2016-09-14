// class used to abstract away menu assignemts from game class
// nothing is rendered on canvas for this class
class TowerMenu {
  constructor(options) {
    this.game = options.game;
    this.makeRifleButton();
    this.makeRapidFireButton();
  }

  makeRifleButton() {
    const rifleButton = document.getElementById("tower-1");
    rifleButton.addEventListener("click", () => {
      this.game.towerOverlay = "rifle";
    });
  }

  makeRapidFireButton() {
    const rapidFireButton = document.getElementById("tower-2");
    rapidFireButton.addEventListener("click", () => {
      this.game.towerOverlay = "rapid_fire";
    });
  }
}

export default TowerMenu;
