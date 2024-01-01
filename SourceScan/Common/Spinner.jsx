State.init({
  width: props.width || "20px",
  height: props.height || "20px",
});

const useTheme = (light, dark) => {
  return state.theme === "light" ? light : dark;
};

const dark = {
  bg: "#28282b",
  color: "#e6eaee",
  border: "#748094",
};

const light = {
  bg: "#e3e8ef",
  color: "#4c5566",
  border: "#748094",
};

const Spinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  @keyframes spinner {
    to {
      transform: rotate(360deg);
    }
  }

  :before {
    content: "";
    box-sizing: border-box;
    width: ${state.width};
    height: ${state.height};
    border-radius: 50%;
    border: 2px solid ${useTheme(light.border, dark.border)};
    border-top-color: ${useTheme(light.color, dark.color)};
    animation: spinner 0.6s linear infinite;
  }
`;

return <Spinner />;
