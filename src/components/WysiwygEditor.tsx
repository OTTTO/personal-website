import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import React from "react";

export function WysiwygEditor() {
  const [editorState, setEditorState] = React.useState(
    EditorState.createEmpty()
  );

  return (
    <Editor
      editorState={editorState}
      onEditorStateChange={setEditorState}
      editorClassName="rdw-storybook-editor"
      toolbar={{ options: ["inline", "link"] }}
      placeholder="Text goes here.."
    />
  );
}
