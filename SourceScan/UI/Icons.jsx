const UpVoteIcon = (width, height) => {
  const SVG = styled.svg`
    width: ${width};
    height: ${height};
    cursor: pointer;
  `
  return (
    <OverlayTrigger
      key={'arrow-up-icon-tooltip'}
      placement={'top'}
      overlay={<Tooltip id={`tooltip-arrow-up`}>Upvote</Tooltip>}
    >
      <SVG fill="none" stroke-width="1.5" stroke="currentColor">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18"
        />
      </SVG>
    </OverlayTrigger>
  )
}

const DownVoteIcon = (width, height) => {
  const SVG = styled.svg`
    width: ${width};
    height: ${height};
    cursor: pointer;
  `

  return (
    <OverlayTrigger
      key={'arrow-down-icon-tooltip'}
      placement={'top'}
      overlay={<Tooltip id={`tooltip-arrow-down`}>Downvote</Tooltip>}
    >
      <SVG fill="none" stroke-width="1.5" stroke="currentColor">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
        />
      </SVG>
    </OverlayTrigger>
  )
}

return { UpVoteIcon, DownVoteIcon }
