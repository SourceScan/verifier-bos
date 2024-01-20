const { getConfig } = VM.require(
  `sourcescan.near/widget/SourceScan.libs.constants`
)
const config = getConfig(context.networkId)
const comment = props.comment

const { CStack, CHStack, Text, DashedContainer } = VM.require(
  `${config.ownerId}/widget/SourceScan.UI.Components`
)

console.log(comment)

const formatDate = (date) => {
  return date.toLocaleString('en-GB', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  })
}

return (
  <DashedContainer>
    <Text>{comment.author_id}</Text>
    <Text>{comment.content}</Text>
    <Text>{formatDate(new Date(comment.timestamp / 1000000))}</Text>
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
  </DashedContainer>
)
