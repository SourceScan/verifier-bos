const { getConfig } = VM.require(
  `sourcescan.near/widget/SourceScan.libs.constants`
)
const config = getConfig(context.networkId)

const { Button, CStack } = VM.require(
  `${config.ownerId}/widget/SourceScan.UI.Components`
)
const { UpVoteIcon, DownVoteIcon } = VM.require(
  `${config.ownerId}/widget/SourceScan.UI.Icons`
)

// Upvote, Downvote
const type = props.type
const isUpvote = type === 'Upvote'
const comment = props.comment

const [votes, setVotes] = useState(-1)

useEffect(() => {
  if (!comment) return

  let votes = 0
  comment.votes.forEach((vote) => {
    if (vote.vote_type === type) votes++
  })
  setVotes(votes)
}, [comment])

const vote = () => {
  Near.call(config.contractId, 'vote_comment', {
    comment_id: comment.id,
    is_upvote: isUpvote,
  })
}

return (
  <CStack>
    <div onClick={vote}>
      {type === 'Upvote' ? (
        <UpVoteIcon width={'24px'} height={'24px'} />
      ) : (
        <DownVoteIcon width={'24px'} height={'24px'} />
      )}
    </div>
    <div>{votes}</div>
  </CStack>
)
