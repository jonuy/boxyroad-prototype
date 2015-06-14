function GameState() {

  function init() {};

  function preload() {
    // Load assets
    game.load.image('player', 'assets/redbox.png');
    game.load.image('enemy1', 'assets/bluebox.png');
    game.load.image('enemy2', 'assets/greenbox.png');

    // Key bindings
    var upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    var downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    var leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    var rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);

    upKey.onDown.add(onKeyDown, {key: Phaser.Keyboard.UP});
    downKey.onDown.add(onKeyDown, {key: Phaser.Keyboard.DOWN});
    leftKey.onDown.add(onKeyDown, {key: Phaser.Keyboard.LEFT});
    rightKey.onDown.add(onKeyDown, {key: Phaser.Keyboard.RIGHT});
  };

  function create() {
    // Images
    player = game.add.sprite(game.width / 2, game.height - 50, 'player');
    player.anchor.setTo(0.5, 0.5);
    player.scale.setTo(10, 10);
  };

  function update() {};

  function onKeyDown() {
    if (this.key == Phaser.Keyboard.UP) {
      console.log('UP pressed');
    }
    else if (this.key == Phaser.Keyboard.DOWN) {
      console.log('DOWN pressed');
    }
    else if (this.key == Phaser.Keyboard.LEFT) {
      console.log('LEFT pressed');
    }
    else if (this.key == Phaser.Keyboard.RIGHT) {
      console.log('RIGHT pressed');
    }
  };

  return {
    init: init,
    preload: preload,
    create: create,
    update: update
  };
}

game.state.add('game', new GameState());