var game = new Phaser.Game(
  800,
  500,
  Phaser.AUTO,
  'game'
);



/**
 *
 * This is a simple state template to use for getting a Phaser game up
 * and running quickly. Simply add your own game logic to the default
 * state object or delete it and make your own.
 *
 */
var state = {
  init: function() {
    // Delete this init block or replace with your own logic.

    // Create simple text display for current Phaser version
    var text = "Phaser Version "+Phaser.VERSION + " works!";
    var style = { font: "24px Arial", fill: "#fff", align: "center" };
    var t = game.add.text(this.world.centerX, this.world.centerY, text, style);
    t.anchor.setTo(0.5, 0.5);

    game.playercontroller = new PlayerController();
    // game.gamecontroller = new GameController();
  },
  preload: function() {
    // STate preload logic goes here
  },
  create: function(){
    // State create logic goes here
    test1.output();
    test2.output();
    test3.output();
    game.playercontroller.draw();
  },
  update: function() {
      // State Update Logic goes here.

  }
};

