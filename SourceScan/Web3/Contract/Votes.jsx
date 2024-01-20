const { getConfig } = VM.require(
  `sourcescan.near/widget/SourceScan.libs.constants`
)
const config = getConfig(context.networkId)

const { CHStack } = VM.require(
  `${config.ownerId}/widget/SourceScan.UI.Components`
)

const contractId = props.contractId
const contract = props.contract

return (
  <CHStack>
    <Widget
      src={`${config.ownerId}/widget/SourceScan.Web3.VoteContract`}
      props={{ type: `Upvote`, contract: contract, contractId: contractId }}
    />
    <Widget
      src={`${config.ownerId}/widget/SourceScan.Web3.VoteContract`}
      props={{ type: `Downvote`, contract: contract, contractId: contractId }}
    />
  </CHStack>
)
