const { getConfig } = VM.require(
  `sourcescan.near/widget/SourceScan.libs.constants`
)
const config = getConfig(context.networkId)
const contractId = props.contractId

const { CHStack } = VM.require(
  `${config.ownerId}/widget/SourceScan.UI.Components`
)

const [comments, setComments] = useState(null)
useEffect(() => {
  if (!contractId) return

  Near.asyncView(config.contractId, 'get_comments', {
    account_id: contractId,
  }).then((comments) => {
    setComments(comments)
  })
}, [contractId])

const [commentContent, setCommentContent] = useState('')
const addComment = () => {
  Near.call(config.contractId, 'add_comment', {
    account_id: contractId,
    content: commentContent,
  })
}

const CommentsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 32px;
`

return (
  <CommentsContainer>
    <CHStack>
      <input
        onChange={(e) => setCommentContent(e.target.value)}
        value={commentContent}
      />
      <button onClick={addComment}>send</button>
    </CHStack>
    <CommentsContainer>
      {comments ? (
        comments.map((comment, i) => (
          <Widget
            key={i}
            src={`${config.ownerId}/widget/SourceScan.Web3.CommentView`}
            props={{ comment: comment }}
          />
        ))
      ) : (
        <Widget
          src={`${config.ownerId}/widget/SourceScan.Common.Spinner`}
          props={{ width: '20px', height: '20px' }}
        />
      )}
    </CommentsContainer>
  </CommentsContainer>
)
