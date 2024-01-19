const { getConfig } = VM.require(
  `sourcescan.near/widget/SourceScan.libs.constants`
)
const { CHStack } = VM.require(
  `sourcescan.near/widget/SourceScan.UI.Components`
)

const config = getConfig(context.networkId)

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
