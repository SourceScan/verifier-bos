const placement = props.placement || "top";
const label = props.label || "Contracts per page";
const limits = props.limits || [10, 20, 50];
const theme = props.theme || {
  name: "light",
  bg: "#e3e8ef",
  color: "#4c5566",
  border: "#748094",
  hover: {
    bg: "#eef2f6",
    border: "#d8dfe7",
  },
};
const selectedLimit = props.selectedLimit || props.limits[0] || 10;

const Select = styled.select`
  border: 1px solid ${theme.border};
  background-color: transparent;
  border-radius: 6px;
  height: 36px;
  width: 76px;
  padding-left: 10px;
  padding-right: 10px;
  text-align: start;
  transition: border 0.1s ease-in-out;
  color: ${theme.color};

  :hover {
    border: 1px solid ${theme.hover.border};
  }
`;

return (
  <OverlayTrigger
    key={placement}
    placement={placement}
    overlay={<Tooltip id={`tooltip-${placement}`}>{label}</Tooltip>}
  >
    <Select onChange={(e) => props.handleOptionsChange(e)}>
      {limits.map((limit, i) => (
        <option key={i} value={limit} selected={selectedLimit === limit}>
          {limit}
        </option>
      ))}
    </Select>
  </OverlayTrigger>
);
