State.init({
  tooltip: props.tooltip || {
    placement: "top",
    label: "Not Approved",
  },
});

const CrossIcon = (width, height) => {
  const SVG = styled.svg`
      width: ${width}
      height: ${height}
    `;

  return (
    <SVG
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
    </SVG>
  );
};

return (
  <OverlayTrigger
    key={state.tooltip.placement}
    placement={state.tooltip.placement}
    overlay={
      <Tooltip id={`tooltip-${placement}`}>
        {state.error ? "Error" : "Not approved"}
      </Tooltip>
    }
  >
    <CrossIcon width={props.width} height={props.height} />
  </OverlayTrigger>
);
