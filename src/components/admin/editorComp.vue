<template>
  <div ref="test" v-if="isLoadable">
    <QuillEditor
      ref="quill"
      theme="snow"
      :modules="modules"
      :toolbar="toolbar"
      @update:content="updateEvent"
    >
    </QuillEditor>
  </div>

  <q-btn
    class="full-width bg-black text-white"
    label="Publish"
    :disable="di"
    @click="publish"
  />
</template>

<script>
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";

import { getText, upladImage, uploadText } from "@/services/service-fb";
import { computed } from "@vue/runtime-core";

import QuillToolBar from "@/Quill/QuillToolBar";
import { modules, setUploadPromise } from "@/Quill/QuillModules";

export default {
  components: {
    QuillEditor,
  },
  inject: ["setTest", "updateImages"],
  data() {
    return {
      di: false,
      isLoadable: false,
      route: computed(() => this.$route.path),
      upload: this.uploader,
      toolbar: QuillToolBar,
      modules: modules,
      animations: [{ name: "Breath", value: "breath" }],
    };
  },
  methods: {
    update: function () {
      getText().then((res) => {
        if (res.exists()) {
          const t = res.data().text;
          if (this.$refs.quill) this.$refs.quill.setHTML(t);
          this.setTest(t);
        } else {
          if (this.$refs.quill) this.$refs.quill.setHTML("");
          this.setTest("");
        }
      });
    },
    downloader: function () {
      return new Promise((resolve) => {
        resolve("imgFireStorage/");
      });
    },
    updateEvent: function () {
      this.$refs.quill.getHTML();
      this.updateImages(this.$refs.test);
      this.setTest(this.$refs.quill.getHTML());
    },
    publish: function () {
      this.di = true;
      uploadText(this.$refs.quill.getHTML()).then(() => (this.di = false));
    },
  },

  mounted() {
    setUploadPromise(upladImage);
    this.isLoadable = true;
    this.update();
  },
  watch: {
    route() {
      this.update();
    },
  },
};
</script>
