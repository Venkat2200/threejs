<template>
  <div
    v-if="allLoaded"
    v-html="promoConfig.userName"
  />
  <!-- <div>
    <HelloWorld msg="Cube with Three.js in vue.js" />
    <CubeCanvas />
    <HelloWorld msg="Line with Three.js in vue.js" />
    <LineCanvas />
    <HelloWorld msg="GLTF with Three.js in vue.js" />
    <GLTFCanvas />
  </div> -->
</template>

<script>
import { mapActions, mapState } from 'pinia';
import { promoWeb } from '@mkweb/promo-web';
import { usePromoStore } from '@/store';


// import HelloWorld from './components/HelloWorld.vue'
// import CubeCanvas from './components/CubeCanvas.vue'
// import LineCanvas from './components/LineCanvas.vue'
// import GLTFCanvas from './components/GLTFCanvas.vue'
// import TestSample from './components/TestSample.vue'


export default {
  data() {
    return {
      allLoaded: false,
    };
  },
  computed: {
    ...mapState(promoWeb, ['promoConfig']),
  },
  async mounted() {
    await Promise.all([
      this.loadPromoConfig(),
      this.loadPromoContent(),
    ]);

    await this.loadPromoData();

    this.allLoaded = true;
  },
  methods: {
    ...mapActions(promoWeb, ['loadPromoConfig', 'loadPromoContent']),
    ...mapActions(usePromoStore, ['loadPromoData']),
  },
  // name: 'App',
  // components: {
  //   HelloWorld,
  //   CubeCanvas,
  //   LineCanvas,
  //   GLTFCanvas,
  //   TestSample
  // }
};

</script>

<style>
/* stylelint-disable-next-line plugin/selector-tag-no-without-class */
#app {
  color: #2c3e50;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  margin-top: 60px;
  text-align: center;
}
.slot-main > vn-main > main {
  min-height: 0;
}

</style>
