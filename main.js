import store from './store.js';
import Grid from './components/Grid.js';
import Arrows from './components/Arrows.js';

const { createApp } = Vue;

createApp({
  components: { Grid, Arrows },
  template: `
    <div>
      <Grid />
      <Arrows />
    </div>
  `
}).use(store).mount('#app');
