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
      src={`${config.ownerId}/widget/SourceScan.Inputs.Web3.VoteButton`}
      props={{ type: `Upvote`, contract: contract, contractId: contractId }}
    />
    <Widget
      src={`${config.ownerId}/widget/SourceScan.Inputs.Web3.VoteButton`}
      props={{ type: `Downvote`, contract: contract, contractId: contractId }}
    />
  </CHStack>
)
