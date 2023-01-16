import { CompositeDecorator } from "draft-js";

const HANDLE_REGEX = /\@[\w]+/g;
const HASHTAG_REGEX = /\#[\w\u0590-\u05ff]+/g;

function handleStrategy(contentBlock, callback, contentState) {
  findWithRegex(HANDLE_REGEX, contentBlock, callback);
}

function hashtagStrategy(contentBlock, callback, contentState) {
  findWithRegex(HASHTAG_REGEX, contentBlock, callback);
}

function findWithRegex(regex, contentBlock, callback) {
  const text = contentBlock.getText();
  let matchArr, start;
  while ((matchArr = regex.exec(text)) !== null) {
    start = matchArr.index;
    callback(start, start + matchArr[0].length);
  }
}

const HandleSpan = (props) => {
  return (
    <span
      style={{
        color: "rgba(98, 177, 254, 1.0)",
        direction: "ltr",
        unicodeBidi: "bidi-override",
      }}
      data-offset-key={props.offsetKey}
    >
      {props.children}
    </span>
  );
};

const HashtagSpan = (props) => {
  return (
    <span
      style={{
        color: "rgba(95, 184, 138, 1.0)",
      }}
      data-offset-key={props.offsetKey}
    >
      {props.children}
    </span>
  );
};

const spellCheckDecorator = new CompositeDecorator([
  {
    strategy: handleStrategy,
    component: HandleSpan,
  },
  {
    strategy: hashtagStrategy,
    component: HashtagSpan,
  },
]);

export default spellCheckDecorator;
