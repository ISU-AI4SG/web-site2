<template>
  <div class="menuOut sc" style="" :class="{ menuOpen: isMenuOpen }">
    <div
      class="column justify-center"
      :style="`transform: rotateY(${
        !isMenuOpen ? 0 : 180
      }deg); cursor:pointer; margin-right:10px; `"
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
    <div ref="menu" class="sc">
      <div
        class="text-right row justify-end no-wrap items-center content-center"
        v-for="item in menu"
        :key="item"
        @click="menuEvent(item.id)"
      >
        <span>{{ item.name }}</span>
        <svg style="flex-shrink: 0;"
          xmlns="http://www.w3.org/2000/svg"
          height="48"
          width="48"
          fill="white"
        >
          <path d="M28.05 36 16 23.95 28.05 11.9l2.15 2.15-9.9 9.9 9.9 9.9Z" />
        </svg>
      </div>
    </div>
  </div>
  <div
    class="column justify-center items-center content-center outter p"
    :style="`transform: translate(${!isMenuOpen ? 0 : -1 * w}px); width:100%`"
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
.menuOut {
  position: fixed;
  overflow: hidden auto;
  justify-content: space-around;
  display: flex;
  flex-direction: row;
  max-height: 80%;
  right: 0px;
  transform: translate(80%, 0%);
  padding-right: 10px;
}
.menu {
  overflow: hidden auto;
  display: flex;
  flex-direction: row;
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
.menuOut > div > div {
  cursor: pointer;
  width: 250px;
  padding: 5px;
  height: max-content;
  overflow: hidden;
}
.menuOut > div > div:hover svg {
  fill: blueviolet;
  margin-right: 10px;
}
.menuOut > div > div:hover span{
  color: blueviolet;

}
</style>
