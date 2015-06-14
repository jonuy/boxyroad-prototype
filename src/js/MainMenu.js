var mainMenuState = {
  init: function() {
    var text = 'Press "Enter" to start';
    var style = { font: "24px Arial", fill: "#fff", align: "center" };
    var t = game.add.text(this.world.centerX, this.world.centerY, text, style);
    t.anchor.setTo(0.5, 0.5);
  },
  preload: function() {

  },
  create: function() {
    var enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    enterKey.onDown.addOnce(this.startGame, this);
  },
  update: function() {

  },
  startGame: function() {
    game.state.start('game');
  }
};

game.state.add('main-menu', mainMenuState);
game.state.start('main-menu');