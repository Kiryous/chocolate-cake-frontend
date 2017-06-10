class Player {
  constructor(options) {
    this.wrapper = options.wrapper;
    this.audio = options.wrapper.find('.js-player-audio')[0];
    this.playBtn = options.wrapper.find('.js-player-play');

    $(this.playBtn).click(() => {
      let nextState = !this.state.playing;
      if (nextState && window.players.length) {
        window.players
          .filter(p => p.id != this.id)
          .forEach(p => p.pause());
      }
      this[nextState ? 'play' : 'pause']();
    });
  }

  get state() {
    return {
      playing: !this.audio.paused
    }
  }

  get id() {
    return this.wrapper.attr('data-title');
  }

  pause() {
    this.audio.pause();
    this.updatePlay(this.state);
  }

  play() {
    this.audio.play();
    this.updatePlay(this.state);
  }

  updatePlay(state) {
    if (!state.playing) {
      this.playBtn.removeClass('player__control--pause');      
      this.playBtn.addClass('player__control--play');
    } else {
      this.playBtn.removeClass('player__control--play');      
      this.playBtn.addClass('player__control--pause');
    }
  }
}

if ($('.js-player').length) {
  window.players = [];
  $('.js-player').toArray().forEach(function(player) {
    window.players.push(new Player({
      wrapper: $(player)
    }));
  });
}