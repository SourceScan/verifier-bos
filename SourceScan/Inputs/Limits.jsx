State.init({
  placement: props.placement || "top",
  label: props.label || "Contracts per page",
  selectedLimit: props.selectedLimit || props.limits[0] || 10,
  limits: props.limits || [10, 20, 50],
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
});

const Select = styled.select`
  border: 1px solid ${state.theme.border};
  background-color: transparent;
  border-radius: 6px;
  height: 36px;
  width: 76px;
  padding-left: 10px;
  padding-right: 10px;
  text-align: start;
  transition: border 0.1s ease-in-out;
  color: ${state.theme.color};

  :hover {
    border: 1px solid ${state.theme.hover.border};
  }
`;

return (
  <OverlayTrigger
    key={state.placement}
    placement={state.placement}
    overlay={<Tooltip id={`tooltip-${placement}`}>{state.label}</Tooltip>}
  >
    <Select onChange={(e) => props.handleOptionsChange(e)}>
      {state.limits.map((limit, i) => (
        <option key={i} value={limit} selected={state.selectedLimit === limit}>
          {limit}
        </option>
      ))}
    </Select>
  </OverlayTrigger>
);
