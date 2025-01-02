export default {
    name: 'Grid',
    computed: {
      playerPosition() {
        return this.$store.state.playerPosition;
      },
      cells() {
        const gridSize = 10;
        return new Array(gridSize * gridSize).fill(null);
      }
    },
    methods: {
      isPlayerPosition(index) {
        const gridSize = 10;
        const x = index % gridSize;
        const y = Math.floor(index / gridSize);
        return x === this.playerPosition.x && y === this.playerPosition.y;
      }
    },
    template: `
      <div class="grid">
        <div 
          v-for="(cell, index) in cells" 
          :key="index" 
          :class="['cell', isPlayerPosition(index) ? 'player' : '']">
        </div>
      </div>
    `
  };
  