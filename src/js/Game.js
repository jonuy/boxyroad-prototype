var gameState = {
  init: function() {

  },
  preload: function() {
    game.load.image('player', 'assets/redbox.png');
  },
  create: function() {
    // Images
    player = game.add.sprite(game.width / 2, game.height - 50, 'player');
    player.anchor.setTo(0.5, 0.5);
    player.scale.setTo(10, 10);
  },
  update: function() {

  }
};

game.state.add('game', gameState);