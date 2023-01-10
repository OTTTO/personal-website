import React from "react";
import MUIEditor, { MUIEditorState, toHTML } from "react-mui-draft-wysiwyg";
import { convertFromHTML, ContentState } from "draft-js";

export function TextEditor({ value, onChange, first }) {
  const editorConfig = {};

  const [editorState, setEditorState] = React.useState(
    MUIEditorState.createEmpty()
  );
  const [didFirst, setDidFirst] = React.useState(false);

  const handleChangeEditor = (val) => {
    setEditorState(val);
    onChange(toHTML(val.getCurrentContent()));
  };

  if (first && !didFirst) {
    const convertedHTML = convertFromHTML(value);
    const convertedHTMLContent = ContentState.createFromBlockArray(
      convertedHTML.contentBlocks,
      convertedHTML.entityMap
    );
    setEditorState(
      MUIEditorState.createWithContent(editorConfig, convertedHTMLContent)
    );
    setDidFirst(true);
  }

  return <MUIEditor editorState={editorState} onChange={handleChangeEditor} />;
}
