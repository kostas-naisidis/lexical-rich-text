import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";
import { useState } from "react";
import CommentPlugin from "./plugins/CommentPlugin";
import FloatingTextFormatToolbarPlugin from "./plugins/FloatingTextFormatToolbarPlugin";

type LexicalErrorBoundaryProps = {
  children: JSX.Element;
  onError: (error: Error) => void;
};

function LexicalErrorBoundary({
  children,
  onError
}: LexicalErrorBoundaryProps): JSX.Element {
  return (
    <ReactErrorBoundary
      fallback={
        <div
          style={{
            border: "1px solid #f00",
            color: "#f00",
            padding: "8px"
          }}
        >
          An error was thrown.
        </div>
      }
      onError={onError}
    >
      {children}
    </ReactErrorBoundary>
  );
}

export default function Editor() {
  const [, setFloatingAnchorElem] = useState<HTMLDivElement | null>(null);

  const onRef = (_floatingAnchorElem: HTMLDivElement) => {
    if (_floatingAnchorElem !== null) {
      setFloatingAnchorElem(_floatingAnchorElem);
    }
  };

  return (
    <div>
      <CommentPlugin providerFactory={undefined} />
      <FloatingTextFormatToolbarPlugin />
      <RichTextPlugin
        contentEditable={
          <div className="editor-scroller">
            <div className="editor" ref={onRef}>
              <ContentEditable className="ContentEditable__root" />
            </div>
          </div>
        }
        placeholder={<div id="div-initial" />}
        ErrorBoundary={LexicalErrorBoundary}
      />
    </div>
  );
}
