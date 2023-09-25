import { Grid } from "@mui/material";
import { ReferralTab } from "./ReferralTab";

export function ReferralTabs({ activeTab, setActiveTab }) {
  return (
    <Grid direction="row">
      <ReferralTab
        label="Development"
        tab={0}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <ReferralTab
        label="Mentorship"
        tab={1}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </Grid>
  );
}
