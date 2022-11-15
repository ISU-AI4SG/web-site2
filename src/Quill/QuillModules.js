import BlotFormatter from "quill-blot-formatter";
import HtmlEditButton from "quill-html-edit-button";
import ImageUploader from "quill-image-uploader";

export const modules = [
  {
    name: "htmlEditButton",
    module: HtmlEditButton,
  },
  {
    name: "blotFormatter",
    module: BlotFormatter,
    toolbar: {
      handlers: {
        ani: function (value) {
          console.log(value);
          return new Promise((s) => s());
        },
      },
    },
  },
  {
    name: "imageUploader",
    module: ImageUploader,
    options: {
      upload: (file) => {
        console.log(file);
      },
    },
  },
];

export const setUploadPromise = function (uploadPromise) {
  modules[2].options.upload = uploadPromise;
};
