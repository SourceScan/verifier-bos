const useNetwork = (mainnet, testnet) => {
  return context.networkId === "mainnet" ? mainnet : testnet;
};

const { getConfig } = VM.require(
  `${useNetwork(
    "sourcescan.near",
    "sourcescan.testnet"
  )}/widget/SourceScan.libs.constants`
);
if (!getConfig) {
  return <div>loading...</div>;
}
const config = getConfig(context.networkId);

const { CommentIcon } = VM.require(
  `${config.ownerId}/widget/SourceScan.UI.Icons`
);
const { CHStack, CStack, Text } = VM.require(
  `${config.ownerId}/widget/SourceScan.UI.Components`
);

if (!CommentIcon || !CHStack || !CStack || !Text) {
  return <div>loading...</div>;
}

const contractId = props.contractId;
const contract = props.contract;

return (
  <>
    <CHStack>
      <Widget
        src={`${config.ownerId}/widget/SourceScan.Web3.VoteContract`}
        props={{ type: `Upvote`, contract: contract, contractId: contractId }}
      />
      <Widget
        src={`${config.ownerId}/widget/SourceScan.Web3.VoteContract`}
        props={{ type: `Downvote`, contract: contract, contractId: contractId }}
      />
      <CStack>
        <div onClick={props.onCommentsClick}>
          <CommentIcon width={"24px"} height={"24px"} />
        </div>
        <Text>{contract.comments.length}</Text>
      </CStack>
    </CHStack>
  </>
);
