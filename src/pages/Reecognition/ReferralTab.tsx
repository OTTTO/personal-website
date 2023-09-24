import { Tab } from "@mui/material";

export function ReferralTab({ label, tab, activeTab, setActiveTab }) {
  const isActive = activeTab === tab;
  return (
    <Tab
      label={label}
      sx={{
        border: "2px solid black",
        backgroundColor: "#fff",
        opacity: !isActive ? 0.5 : 1,
        fontWeight: "bold",
        marginLeft: "2px",
        marginTop: "2px",
        borderRadius: "5px",
      }}
      onClick={() => setActiveTab(tab)}
    />
  );
}
