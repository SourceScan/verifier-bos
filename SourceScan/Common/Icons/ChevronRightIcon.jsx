const ChevronRightIcon = (width, height) => {
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
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.25 4.5l7.5 7.5-7.5 7.5"
      />
    </SVG>
  );
};

return <ChevronRightIcon width={props.width} height={props.height} />;
