<template>
  <router-view />
</template>

<script>
export default {
  name: "App",
};
</script>
<style>
.sc::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}
.sc::-webkit-scrollbar-track {
  background-color: #111;
  border-radius: 10px;
}
.sc::-webkit-scrollbar-thumb {
  background-color: #222;
  border-radius: 10px;
}
</style>