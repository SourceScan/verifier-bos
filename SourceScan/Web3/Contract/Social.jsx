const { getConfig } = VM.require(
  `sourcescan.near/widget/SourceScan.libs.constants`
)
const config = getConfig(context.networkId)

const { CommentIcon } = VM.require(
  `${config.ownerId}/widget/SourceScan.UI.Icons`
)
const { CHStack, CStack, Text } = VM.require(
  `${config.ownerId}/widget/SourceScan.UI.Components`
)

const contractId = props.contractId
const contract = props.contract

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
      <CStack onClick={props.onCommentsClick}>
        <CommentIcon width={'24px'} height={'24px'} />
        <Text>{contract.comments.length}</Text>
      </CStack>
    </CHStack>
  </>
)
