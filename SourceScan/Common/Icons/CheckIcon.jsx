State.init({
  tooltip: props.tooltip || {
    placement: "top",
    label: "Approved",
  },
});

const CheckIcon = (width, height) => {
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
      <path
        fill-rule="evenodd"
        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
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
      <Tooltip id={`tooltip-${placement}`}>{state.tooltip.label}</Tooltip>
    }
  >
    <CheckIcon width={props.width} height={props.height} />
  </OverlayTrigger>
);
