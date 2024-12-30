
    // Create a Vue app
    const app = Vue.createApp({
        data() {
          return {
            gridSize: 10,
            playerPosition: { row: 0, col: 0 }, // Player starts at top-left corner
          };
        },
        computed: {
          grid() {
            return Array.from({ length: this.gridSize }, (_, row) => 
              Array.from({ length: this.gridSize }, (_, col) => `${row},${col}`)
            );
          }
        }
      });
  
      // Mount the app
      app.mount('#app');