import { WysiwygEditor } from "../../components/WysiwygEditor";

export function HomeWysiwygEditor({
  home,
  setHome,
  property,
  updateErrorCount,
}) {
  const handleContentChange = (content: string, property: string) => {
    updateErrorCount(home[property], content);
    const newHome = structuredClone(home);
    newHome[property] = content;
    setHome(newHome);
  };

  return (
    <WysiwygEditor
      content={home[property]}
      onChange={(value) => handleContentChange(value, property)}
      options={["inline", "link", "textAlign"]}
      expanded
      first={home[property].length > 0}
      error={
        home[property].length === 0 || home.websiteInfo.startsWith("<p></p>")
      }
    />
  );
}
