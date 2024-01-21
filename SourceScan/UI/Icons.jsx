const UpVoteIcon = (width, height) => {
  const SVG = styled.svg`
    width: ${width};
    height: ${height};
    cursor: pointer;
  `;
  return (
    <OverlayTrigger
      key={"arrow-up-icon-tooltip"}
      placement={"top"}
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
  );
};

const DownVoteIcon = (width, height) => {
  const SVG = styled.svg`
    width: ${width};
    height: ${height};
    cursor: pointer;
  `;

  return (
    <OverlayTrigger
      key={"arrow-down-icon-tooltip"}
      placement={"top"}
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
  );
};

const CommentIcon = (width, height) => {
  const SVG = styled.svg`
    width: ${width};
    height: ${height};
    cursor: pointer;
  `;

  return (
    <OverlayTrigger
      key={"comment-icon-tooltip"}
      placement={"top"}
      overlay={<Tooltip id={`tooltip-comment`}>Comments</Tooltip>}
    >
      <SVG fill="none" stroke-width="1.5" stroke="currentColor">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z"
        />
      </SVG>
    </OverlayTrigger>
  );
};

return { UpVoteIcon, DownVoteIcon, CommentIcon };
