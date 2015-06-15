function GameState() {

  var SCORE_INCREMENT = 1;
  var SPAWN_INTERVAL_MIN = 0.25;
  var SPAWN_INTERVAL_MAX = 1;

  var scoreText;
  var score;
  var movedBack;
  var player;
  var enemies;

  var timeUntilSpawn;
  var lastCheckedTime;

  function init() {
    game.world.setBounds(0, 0, game.width, game.height);
    game.camera.width = game.width;
    game.camera.height = game.height;

    score = 0;
    movedBack = false;

    enemies = new Array();
  }

  function preload() {
    // Load assets
    game.load.image('player', 'assets/bluebox.png');
    game.load.image('enemy1', 'assets/redbox.png');
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
    game.debug.text('Enemies: ' + enemies.length, 32, 256);
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
    // Start spawning after player's moved 3 spaces
    if (game.world.bounds.y > -300)
      return;

    spawnEnemies();
    moveEnemies();
    cullEnemies();
  }

  function spawnEnemies() {
    // Is it ok to spawn a new object yet?
    var currTime = (new Date()).getTime();
    var deltaTime = currTime - lastCheckedTime;
    if (timeUntilSpawn >= 0) {
      lastCheckedTime = currTime;
      timeUntilSpawn -= deltaTime;
      return;
    }

    // Choose a Y coord to start from
    var row = Math.floor(Math.random() * 10);
    var ypos = game.world.bounds.y - 500 + (row * 100) + 50;

    // Choose a direction to go in
    var dir = Math.round(Math.random());
    var velocity = 4;
    var xpos = -150;
    if (dir == 0) {
      velocity *= -1;
      xpos = game.width + 150;
    }

    // Create sprite
    var enemy = game.add.sprite(xpos, ypos, 'enemy1');
    enemy.anchor.setTo(0.5, 0.5);
    enemy.scale.setTo(9, 9);
    enemy.velocity = velocity;
    enemies[enemies.length] = enemy;

    // Set time until next spawn
    lastCheckedTime = currTime;
    var spawnRange = SPAWN_INTERVAL_MAX - SPAWN_INTERVAL_MIN;
    timeUntilSpawn = (Math.round(Math.random() * spawnRange) + SPAWN_INTERVAL_MIN) * 1000;
  }

  function moveEnemies() {
    var i;
    var enemy;

    for (i = 0; i < enemies.length; i++) {
      enemy = enemies[i];
      enemy.x += enemy.velocity;
    }
  }

  function cullEnemies() {
    var i;
    var enemy;
    var remaining;

    for (i = enemies.length - 1; i >= 0; i--) {
      enemy = enemies[i];
      if (enemy.y > game.camera.y + game.camera.height) {
        enemy.destroy();
        enemies.splice(i, 1); 
      }
    }
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