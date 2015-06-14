function EndGame() {
  function init() {
    var text = 'Placeholder End Game Screen';
    var style = {font: '24px Arial', fill: '#fff', align: 'center'};
    var t = game.add.text(this.world.centerX, this.world.centerY, text, style);
    t.anchor.setTo(0.5, 0.5);
  }

  function preload() {}

  function create() {}

  function update() {}

  return {
    init: init,
    preload: preload,
    create: create,
    update: update
  }
}

game.state.add('end', new EndGame());