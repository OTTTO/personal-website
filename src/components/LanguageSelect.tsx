import Select from "react-select";

export function LanguageSelect({ language, setLanguage }) {
  const options = [
    { value: "python", label: "Python" },
    { value: "javascript", label: "JS" },
  ];

  const styles = {
    container: (base) => ({
      ...base,
      minWidth: "7rem",
      marginTop: ".2rem",
      border: "1px solid black",
      borderRadius: "3px",
    }),
    placeholder: (base) => ({
      ...base,
      color: "black",
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected ? "#2684FF" : "white",
    }),
  };

  const getDefaultValue = (language) => {
    for (let option of options) {
      if (option.value === language) return option;
    }
  };

  return (
    <Select
      options={options}
      defaultValue={getDefaultValue(language)}
      onChange={(option) => setLanguage(option.value)}
      styles={styles}
      isSearchable={false}
    />
  );
}
