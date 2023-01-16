import { Editor } from "react-draft-wysiwyg";
import { ContentState, convertFromHTML, EditorState } from "draft-js";
import { toHTML } from "react-mui-draft-wysiwyg";
import React from "react";
import spellCheckDecorator from "./SpellCheckDecorator";

export function WysiwygEditor({ content, onChange }) {
  const [editorState, setEditorState] = React.useState(
    EditorState.createWithContent(
      ContentState.createFromBlockArray(convertFromHTML(content).contentBlocks),
      spellCheckDecorator
    )
  );

  const handleChangeEditor = (val) => {
    setEditorState(val);
    onChange(toHTML(val.getCurrentContent()));
  };

  return (
    <Editor
      editorState={editorState}
      onEditorStateChange={handleChangeEditor}
      toolbar={{ options: ["inline", "link"] }}
      placeholder="Text goes here.."
      spellCheck
    />
  );
}
