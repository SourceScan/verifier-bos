const { getConfig } = VM.require(
  `sourcescan.near/widget/SourceScan.libs.constants`
)
const config = getConfig(context.networkId)
const contractId = props.contractId

const [comments, setComments] = useState(null)
useEffect(() => {
  if (!contractId) return

  Near.asyncView(config.contractId, 'get_comments', {
    account_id: contractId,
  }).then((comments) => {
    setComments(comments)
  })
}, [contractId])

return (
  <>
    {comments ? (
      comments.map((comment, i) => (
        <div key={i}>
          <Widget
            src={`${config.ownerId}/widget/SourceScan.Web3.CommentBox`}
            props={{ comment: comment }}
          />
        </div>
      ))
    ) : (
      <Widget
        src={`${config.ownerId}/widget/SourceScan.Common.Spinner`}
        props={{ width: '20px', height: '20px' }}
      />
    )}
  </>
)
