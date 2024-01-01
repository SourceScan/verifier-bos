State.init({
  theme: props.theme || {
    name: "light",
    bg: "#e3e8ef",
    color: "#4c5566",
    border: "#748094",
  },
});

const useThemeName = (light, dark) => {
  return state.theme.name === "light" ? light : dark;
};

const Button = styled.button`
  border-radius: 20px;
  padding-top: 5px;
  padding-bottom: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid transparent;
  background-color: ${state.theme.bg};
  transition: background-color 0.1s ease-in-out;

  :hover {
    background-color: ${state.theme.hover.bg};
  }
`;

const Moon = (width, height) => {
  const SVG = styled.svg`
    width: ${width}
    height: ${height}
  `;

  return (
    <SVG
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill={`${state.theme.color}`}
    >
      <path
        fillRule="evenodd"
        d="M7.455 2.004a.75.75 0 01.26.77 7 7 0 009.958 7.967.75.75 0 011.067.853A8.5 8.5 0 116.647 1.921a.75.75 0 01.808.083z"
        clipRule="evenodd"
      />
    </SVG>
  );
};

const Sun = (width, height) => {
  const SVG = styled.svg`
    width: ${width}
    height: ${height}
  `;

  return (
    <SVG
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={`${state.theme.color}`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
      />
    </SVG>
  );
};

return (
  <>
    <Button onClick={props.switchTheme}>
      {useThemeName(
        <Moon width={"20px"} height={"20px"} />,
        <Sun width={"25px"} height={"25px"} />
      )}
    </Button>
  </>
);
