import { Grid, Typography } from "@mui/material";
import { CopyBlock, monokaiSublime } from "react-code-blocks";
import { LanguageSelect } from "./LanguageSelect";

export function CodeBlock({
  language,
  setLanguage,
  text,
  title = undefined,
  width,
}) {
  return (
    <Grid width={width} margin="0 auto 1rem" maxWidth="100%">
      <Grid
        width="100%"
        display="flex"
        flexDirection="row"
        alignItems="center"
        marginBottom=".3rem"
      >
        <LanguageSelect language={language} setLanguage={setLanguage} />
        <Typography marginLeft=".5rem">
          <b>{title?.toUpperCase()}</b>
        </Typography>
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
