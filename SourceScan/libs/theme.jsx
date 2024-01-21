const dark = {
  name: "dark",
  bg: "#28282b",
  color: "#e6eaee",
  border: "#748094",
  hover: {
    bg: "#39393c",
    border: "#4e5460",
  },
  text: {
    fontSize: "16px",
  },
  heading: {
    fontSize: "18px",
    fontWeight: "600",
  },
};

const light = {
  name: "light",
  bg: "#e3e8ef",
  color: "#1b202b",
  border: "#748094",
  hover: {
    bg: "#eef2f6",
    border: "#d8dfe7",
  },
  text: {
    fontSize: "16px",
  },
  heading: {
    fontSize: "18px",
    fontWeight: "600",
  },
};

const useTheme = (storedTheme) => {
  return storedTheme === "light" ? light : dark;
};

return { useTheme };
