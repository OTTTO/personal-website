import { Editor } from "react-draft-wysiwyg";
import { ContentState, EditorState, convertToRaw } from "draft-js";
import React from "react";
import spellCheckDecorator from "./SpellCheckDecorator";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import useWindowDimensions from "hooks/useWindowDimensions";
import "../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export function WysiwygEditor({
  content,
  onChange,
  options,
  expanded = false,
  first = false,
  error = false,
}) {
  const { width } = useWindowDimensions();
  const smallerDeviceWidth = 700;
  const isSmaller = width < smallerDeviceWidth;
  const [didFirst, setDidFirst] = React.useState(false);

  const [editorState, setEditorState] = React.useState(
    EditorState.createWithContent(
      ContentState.createFromBlockArray(htmlToDraft(content).contentBlocks),
      spellCheckDecorator
    )
  );

  const handleChangeEditor = (val) => {
    setEditorState(val);
    onChange(draftToHtml(convertToRaw(val.getCurrentContent())));
  };

  if (first && !didFirst) {
    setEditorState(
      EditorState.createWithContent(
        ContentState.createFromBlockArray(htmlToDraft(content).contentBlocks),
        spellCheckDecorator
      )
    );

    setDidFirst(true);
  }

  return (
    <Editor
      editorState={editorState}
      onEditorStateChange={handleChangeEditor}
      editorClassName={!error ? "rdw-editor-main" : "rdw-editor-error"}
      toolbar={{
        options,
        fontSize: {
          options: [8, 10, 12, 14, 16, 18, 19, 20, 24, 30, 36, 48, 72, 128],
        },
        inline: { inDropdown: !expanded && isSmaller },
        list: { inDropdown: !expanded && isSmaller },
        link: { inDropdown: !expanded && isSmaller },
        textAlign: { inDropdown: !expanded && isSmaller },
      }}
      placeholder="Text goes here.."
      spellCheck
    />
  );
}
