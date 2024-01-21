const { getConfig } = VM.require(
  `sourcescan.near/widget/SourceScan.libs.constants`
)
const config = getConfig(context.networkId)
const comment = props.comment

const { useTheme } = VM.require(
  `${config.ownerId}/widget/SourceScan.libs.theme`
)
const theme = useTheme(Storage.privateGet('theme'))

const { CStack, CHStack, Text } = VM.require(
  `${config.ownerId}/widget/SourceScan.UI.Components`
)

const CommentContainer = styled.div`
  padding: 18px;
  color: currentColor;
  border: 1px dashed ${theme.border};
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  justify-content: center;
  gap: 50px;
  width: 50%;

  @media only screen and (max-width: 750px) {
    text-align: center;
    align-items: center;
    justify-content: center;
    width: 95%;
  }
`

const formatDate = (date) => {
  return date
    .toLocaleString('en-GB', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: false,
    })
    .replace(/\//g, '.')
    .replace(',', '')
}

return (
  <CommentContainer>
    <Text>{comment.author_id}</Text>
    <Text>{comment.content}</Text>
    <Text>{formatDate(new Date(comment.timestamp / 1000000))}</Text>
    <CHStack>
      <Widget
        src={`${config.ownerId}/widget/SourceScan.Web3.VoteComment`}
        props={{ type: `Upvote`, comment: comment }}
      />
      <Widget
        src={`${config.ownerId}/widget/SourceScan.Web3.VoteComment`}
        props={{ type: `Downvote`, comment: comment }}
      />
    </CHStack>
  </CommentContainer>
)
