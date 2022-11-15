import BlotFormatter from "quill-blot-formatter";
import HtmlEditButton from "quill-html-edit-button";
export default [
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
        },
      },
    },
  },
];
