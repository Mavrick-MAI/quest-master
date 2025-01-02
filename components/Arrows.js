export default {
    name: 'Arrows',
    methods: {
      move(direction) {
        this.$store.commit('movePlayer', direction);
      }
    },
    template: `
      <div class="arrows">
        <button @click="move('up')">Up</button>
        <button @click="move('left')">Left</button>
        <button @click="move('down')">Down</button>
        <button @click="move('right')">Right</button>
      </div>
    `
  };
  