import { Editor } from "react-draft-wysiwyg";
import { ContentState, convertFromHTML, EditorState } from "draft-js";
import { toHTML } from "react-mui-draft-wysiwyg";
import React from "react";

export function WysiwygEditor({ content, onChange, idx }) {
  const [editorState, setEditorState] = React.useState(
    EditorState.createWithContent(
      ContentState.createFromBlockArray(convertFromHTML(content).contentBlocks)
    )
  );

  const handleChangeEditor = (val) => {
    setEditorState(val);
    onChange(toHTML(val.getCurrentContent()), idx);
  };

  return (
    <Editor
      editorState={editorState}
      onEditorStateChange={handleChangeEditor}
      toolbar={{ options: ["inline", "link"] }}
      placeholder="Text goes here.."
    />
  );
}
