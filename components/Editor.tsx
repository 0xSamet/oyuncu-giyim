import dynamic from "next/dynamic";
import { Delta, Sources } from "quill";

const QuillNoSSRWrapper = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    ["clean"],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
];

interface EditorTypes {
  value?: string | Delta;
  onChange?: (
    content: string,
    delta: Delta,
    source: Sources,
    editor: any
  ) => void;
}

export default function Editor({ value, onChange }: EditorTypes) {
  //const [state, setState] = useState(initialValue || "");
  return (
    <QuillNoSSRWrapper
      onChange={(c, d, s, e) => onChange(c, d, s, e)}
      value={value || ""}
      modules={modules}
      formats={formats}
      theme="snow"
    />
  );
}
