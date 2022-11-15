<template>
  <div class="menu" :class="{ menuOpen: isMenuOpen }">
    <div
      class="column justify-center"
      :style="`transform: rotateY(${
        !isMenuOpen ? 0 : 180
      }deg); cursor:pointer; margin-right:10px`"
      @click="isMenuOpen = !isMenuOpen"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="48"
        width="48"
        fill="white"
      >
        <path d="M20 44 0 24 20 4l2.8 2.85L5.65 24 22.8 41.15Z" />
      </svg>
    </div>
    <div ref="menu">
      <div
        class="text-right"
        v-for="item in menu"
        :key="item"
        @click="menuEvent(item.id)"
      >
        <span>{{ item.name }}</span>
      </div>
    </div>
  </div>
  <div
    class="column justify-center items-center content-center outter p"
    :style="`transform: translate(${!isMenuOpen ? 0 : -1 * w}px)`"
  >
    <div class="q-ma-au q-pr-md sc" style="width: 100%" v-html="html"></div>
  </div>
</template>

<script>
import { getInnerPages, getText } from "@/services/service-u";
export default {
  props: ["inf"],
  data() {
    return {
      menu: [],
      html: "",
      isMenuOpen: false,
      w: 0,
    };
  },
  methods: {
    getPages: function () {
      getInnerPages(this.inf.id).then(
        (res) => (this.menu = res.docs.map((i) => i.data()))
      );
    },
    menuEvent: function (id) {
      getText(id).then((res) => {
        if (res.exists) this.html = res.data()?.text;
      });
    },
  },
  mounted() {
    setTimeout(() => {
      this.w = this.$refs.menu.clientWidth;
    }, 1000);
    this.getPages();
    this.menuEvent(this.inf.id);
  },
};
</script>
<style scoped>
.outter {
  height: 100%;
}
.menu {
  position: fixed;
  overflow: hidden auto;
  justify-content: space-around;
  display: flex;
  flex-direction: row;
  max-height: 100%;
  right: 0px;
  transform: translate(80%, 0%);
  padding-right: 10px;
}
.menuOpen {
  transform: translate(0%, 0%);
}
.p {
  transform: translate(0px, 0px);
}
.pOpen {
  transform: translate(-50%, 0%);
}
.menu > div > div {
  cursor: pointer;
  width: 150px;
  padding: 5px;
  height: max-content;
  overflow: hidden;
}
.menu > div > div:hover {
  color: blueviolet;
  width: 150px;
}
</style>
