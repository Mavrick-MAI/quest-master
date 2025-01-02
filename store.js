export default Vuex.createStore({
  state() {
    return {
      playerPosition: { x: 0, y: 0 }
    };
  },
  mutations: {
    movePlayer(state, direction) {
      switch (direction) {
        case 'up': state.playerPosition.y -= 1; break;
        case 'down': state.playerPosition.y += 1; break;
        case 'left': state.playerPosition.x -= 1; break;
        case 'right': state.playerPosition.x += 1; break;
      }
    }
  }
});
