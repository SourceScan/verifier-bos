const useNetwork = (mainnet, testnet) => {
  return context.networkId === "mainnet" ? mainnet : testnet;
};

State.init({
  theme: props.theme || {
    color: "#4c5566",
    heading: {
      fontSize: "18px",
      fontWeight: "600",
    },
  },
  ownerId: useNetwork("sourcescan.near", "sourcescan.testnet"),
});

if (!props.github)
  return (
    <Widget
      src={`${state.ownerId}/widget/SourceScan.Common.ErrorAlert`}
      props={{
        message:
          "Please provide github: {owner: string, repo: string, sha(optional): string} to the component",
      }}
    />
  );

const RStack = styled.div`
  display: flex;
  color: ${state.theme.color};
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 5px;

  @media only screen and (max-width: 750px) {
    flex-direction: column;
  }
`;

const A = styled.a`
  text-decoration: none;
  color: ${state.theme.color};

  :hover {
    text-decoration: none;
    color: ${state.theme.color};
  }
`;

const Desktop = styled.div`
  display: flex;

  @media only screen and (max-width: 750px) {
    display: none;
  }
`;

const Mobile = styled.div`
  display: none;

  @media only screen and (max-width: 750px) {
    display: flex;
  }
`;

const Heading = styled.div`
  font-size: ${state.theme.heading.fontSize};
  font-weight: ${state.theme.heading.fontWeight};
`;

const truncateStringInMiddle = (str, maxLength) => {
  if (str.length <= maxLength) {
    return str;
  }

  const halfMaxLength = Math.floor(maxLength / 2);
  const firstHalf = str.slice(0, halfMaxLength);
  const secondHalf = str.slice(-halfMaxLength);

  return firstHalf + "..." + secondHalf;
};

return (
  <RStack>
    <Widget
      src={`${state.ownerId}/widget/SourceScan.Common.Github.GithubUser`}
      props={{ user: props.github.owner, theme: state.theme }}
    />
    <Desktop>
      <Widget
        src={`${state.ownerId}/widget/SourceScan.Common.Icons.ChevronRightIcon`}
        props={{ width: "20px", height: "20px" }}
      />
    </Desktop>
    <Mobile>
      <Widget
        src={`${state.ownerId}/widget/SourceScan.Common.Icons.ChevronDownIcon`}
        props={{ width: "20px", height: "20px" }}
      />
    </Mobile>
    <Heading>{props.github.repo}</Heading>
    {props.github.sha ? (
      <>
        <Desktop>
          <Widget
            src={`${state.ownerId}/widget/SourceScan.Common.Icons.ChevronRightIcon`}
            props={{ width: "20px", height: "20px" }}
          />
        </Desktop>
        <Mobile>
          <Widget
            src={`${state.ownerId}/widget/SourceScan.Common.Icons.ChevronDownIcon`}
            props={{ width: "20px", height: "20px" }}
          />
        </Mobile>
        <Heading>{truncateStringInMiddle(props.github.sha, 12)}</Heading>
      </>
    ) : null}
    <A
      href={
        props.github.sha
          ? `https://github.com/${props.github.owner}/${props.github.repo}/tree/${props.github.sha}`
          : `https://github.com/${props.github.owner}/${props.github.repo}`
      }
      target={"_blank"}
    >
      <Widget
        src={`${state.ownerId}/widget/SourceScan.Common.Icons.LinkIcon`}
        props={{ width: "20px", height: "20px" }}
      />
    </A>
  </RStack>
);
