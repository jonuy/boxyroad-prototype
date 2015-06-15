function GameState() {

  var SCORE_INCREMENT = 10;

  var scoreText;
  var score;
  var movedBack;
  var player;
  // var enemies;

  function init() {
    game.world.setBounds(0, 0, game.width, game.height);
    game.camera.width = game.width;
    game.camera.height = game.height;

    score = 0;
    movedBack = false;
  }

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
    var debugExit = game.input.keyboard.addKey(Phaser.Keyboard.X);

    upKey.onDown.add(onKeyDown, {key: Phaser.Keyboard.UP});
    downKey.onDown.add(onKeyDown, {key: Phaser.Keyboard.DOWN});
    leftKey.onDown.add(onKeyDown, {key: Phaser.Keyboard.LEFT});
    rightKey.onDown.add(onKeyDown, {key: Phaser.Keyboard.RIGHT});
    debugExit.onDown.add(onKeyDown, {key: Phaser.Keyboard.X});
  }

  function create() {
    // Set player as a sprite
    player = game.add.sprite((game.width / 2) - 50, game.height - 50, 'player');
    player.anchor.setTo(0.5, 0.5);
    player.scale.setTo(9, 9);

    // Score text
    var text = 'Score: ' + score;
    style = {font: '18px Arial', fill: '#fff', align: 'left'};
    scoreText = game.add.text(game.camera.width - 128, 32, text, style);
  }

  function update() {
    var playerPos = player.position;

    updateGameBounds(playerPos);
    updateCameraPosition(playerPos);

    updateEnemies();
  }

  function render() {
    game.debug.cameraInfo(game.camera, 32, 32);
    game.debug.spriteInfo(player, 32, 128);
  }

  function onKeyDown() {
    if (this.key == Phaser.Keyboard.UP) {
      console.log('UP pressed');
      player.y -= 100;

      if (!movedBack) {
        incrementScore();
      }
      else {
        movedBack = false;
      }
    }
    else if (this.key == Phaser.Keyboard.DOWN) {
      console.log('DOWN pressed');
      if (player.bottom + 100 < game.world.bounds.y + game.height) {
        player.y += 100;
        movedBack = true;
      }
    }
    else if (this.key == Phaser.Keyboard.LEFT) {
      console.log('LEFT pressed');
      if (player.left >= 100) {
        player.x -= 100;
      }
    }
    else if (this.key == Phaser.Keyboard.RIGHT) {
      console.log('RIGHT pressed');
      if (player.right <= game.width - 100) {
        player.x += 100;
      }
    }
    else if (this.key == Phaser.Keyboard.X) {
      // Debug key to move to end game state
      game.state.start('end');
    }
  }

  function updateGameBounds(playerPos) {
    var playerTop = playerPos.y - 50;
    if (playerTop - game.camera.y < 300) {
      var newY = game.world.bounds.y - 100;
      game.world.setBounds(0, newY, game.width, game.height);
    }
  }

  function updateCameraPosition(playerPos) {
    var playerBottom = playerPos.y + 50;
    var cameraBottom = game.camera.y + game.camera.height;
    if (cameraBottom - playerBottom > 100) {
      game.camera.y -= 100;
    }
  }

  function incrementScore() {
    if (scoreText) {
      // Don't move position the first time
      if (score) {
        scoreText.position.y -= 100;
      }

      score += SCORE_INCREMENT;
      scoreText.setText('Score: ' + score);
    }
  }

  function updateEnemies() {

  }

  return {
    init: init,
    preload: preload,
    create: create,
    update: update,
    render: render
  };
}

game.state.add('game', new GameState());