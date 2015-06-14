function MainMenu() {

  function init() {
    var text = 'Press "Enter" to start';
    var style = { font: "24px Arial", fill: "#fff", align: "center" };
    var t = game.add.text(this.world.centerX, this.world.centerY, text, style);
    t.anchor.setTo(0.5, 0.5);
  }

  function preload() {}

  function create() {
    var enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    enterKey.onDown.addOnce(startGame, this);
  }

  function update() {}

  function startGame() {
    game.state.start('game');
  }

  return {
    init: init,
    preload: preload,
    create: create,
    update: update
  }
}

game.state.add('main-menu', new MainMenu());
game.state.start('main-menu');