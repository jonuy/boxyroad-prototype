function EndGame() {
  function init() {
    var text = 'Placeholder End Game Screen';
    var style = {font: '24px Arial', fill: '#fff', align: 'center'};
    var t = game.add.text(this.world.centerX, this.world.centerY, text, style);
    t.anchor.setTo(0.5, 0.5);

    game.world.setBounds(0, 0, game.width, game.height);
  }

  function preload() {}

  function create() {}

  function update() {}

  function render() {
    game.debug.cameraInfo(game.camera, 32, 32);
  }

  return {
    init: init,
    preload: preload,
    create: create,
    update: update,
    render: render
  }
}

game.state.add('end', new EndGame());