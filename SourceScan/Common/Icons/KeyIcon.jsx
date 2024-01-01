State.init({
  cursor: props.cursor || "pointer",
  tooltip: props.tooltip || {
    placement: "top",
    label: "Full Access Key",
  },
});

const KeyIcon = (width, height) => {
  const SVG = styled.svg`
          width: ${width}
          height: ${height}
        `;

  return (
    <SVG
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      cursor={state.cursor}
    >
      <path
        fill-rule="evenodd"
        d="M8 7a5 5 0 113.61 4.804l-1.903 1.903A1 1 0 019 14H8v1a1 1 0 01-1 1H6v1a1 1 0 01-1 1H3a1 1 0 01-1-1v-2a1 1 0 01.293-.707L8.196 8.39A5.002 5.002 0 018 7zm5-3a.75.75 0 000 1.5A1.5 1.5 0 0114.5 7 .75.75 0 0016 7a3 3 0 00-3-3z"
        clip-rule="evenodd"
      />
    </SVG>
  );
};

return (
  <OverlayTrigger
    key={state.tooltip.placement}
    placement={state.tooltip.placement}
    overlay={
      <Tooltip id={`tooltip-${state.tooltip.placement}`}>
        {state.tooltip.label}
      </Tooltip>
    }
  >
    <KeyIcon width={props.width} height={props.height} />
  </OverlayTrigger>
);
