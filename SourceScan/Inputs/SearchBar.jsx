State.init({
  theme: props.theme || {
    name: "light",
    bg: "#e3e8ef",
    color: "#4c5566",
    border: "#748094",
    hover: {
      bg: "#eef2f6",
      border: "#d8dfe7",
    },
  },
  value: props.value || "",
});

const useThemeName = (light, dark) => {
  return state.theme.name === "light" ? light : dark;
};

const handleChange = (e) => {
  State.update({ value: e.target.value });
};

const HStack = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const SearchInput = styled.input`
  height: 36px;
  width: ${props.inputWidth || "126px"};
  border-radius: 6px;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
  border: 1px solid ${state.theme.border};
  color: ${state.theme.color};
  background-color: ${state.theme.bg};
  transition: border 0.1s ease-in-out;

  :hover {
    border: 1px solid ${state.theme.hover.border};
  }
`;

const SearchButton = styled.button`
  height: 36px;
  width: 96px;
  font-weight: 600;
  border-radius: 6px;
  padding-top: 5px;
  padding-bottom: 5px;
  border: 1px dashed ${state.theme.border};
  color: ${state.theme.color};
  background-color: ${state.theme.bg};
  transition: background-color 0.1s ease-in-out;

  :hover {
    background-color: ${state.theme.hover.bg};
  }
`;

return (
  <HStack>
    <SearchInput
      placeholder={props.placeholder || "Search"}
      value={state.value}
      onChange={handleChange}
      autoFocus
    />
    <SearchButton onClick={() => props.handleSubmit(state.value)}>
      Search
    </SearchButton>
  </HStack>
);
