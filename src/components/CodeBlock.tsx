import { Grid, Select, MenuItem } from "@mui/material";
import { CopyBlock, monokaiSublime } from "react-code-blocks";

export function CodeBlock({
  language,
  setLanguage,
  text,
  title = undefined,
  width,
}) {
  return (
    <Grid width={width} margin="0 auto 1rem" maxWidth="80%">
      <Grid width="25rem">
        <Select
          value={language}
          label="Language"
          onChange={(e) => setLanguage(e.target.value)}
          variant="standard"
        >
          <MenuItem value="python">Python</MenuItem>
          <MenuItem value="javascript">JS</MenuItem>
        </Select>
        <span>
          <b>{title?.toUpperCase()}</b>
        </span>
      </Grid>
      <CopyBlock
        language={language}
        text={text}
        showLineNumbers={false}
        theme={monokaiSublime}
        wrapLines={true}
        codeBlock
      />
    </Grid>
  );
}
