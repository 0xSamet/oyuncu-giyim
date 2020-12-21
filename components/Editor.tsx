import dynamic from "next/dynamic";
import { Delta, Sources } from "quill";

const QuillNoSSRWrapper = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

const modules = {
  toolbar: [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction

    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],

    ["clean"], // remove formatting button
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
  "code-block",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
  "color",
  "background",
  "script",
  "align",
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
      defaultValue={value || ""}
      modules={modules}
      formats={formats}
      theme="snow"
    />
  );
}
