import Editor from "./Editor";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import CommentEditorTheme from "./themes/CommentEditorTheme";
import PlaygroundNodes from "./nodes/PlaygroundNodes";

export default function App() {
  const initialConfig = {
    editorState: null,
    namespace: "Playground",
    nodes: [...PlaygroundNodes],
    onError: (error: Error) => {
      throw error;
    },
    theme: CommentEditorTheme
  };

  return (
    <div className="App">
      <LexicalComposer initialConfig={initialConfig}>
        <div>
          <div className="editor-shell">
            <Editor />
          </div>
        </div>
      </LexicalComposer>
    </div>
  );
}
