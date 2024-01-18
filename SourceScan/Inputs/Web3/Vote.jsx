const { getConfig } = VM.require(
  `sourcescan.near/widget/SourceScan.libs.constants`
)
const { Button, CHStack, CStack, Text, Center, DivPointer } = VM.require(
  `sourcescan.near/widget/SourceScan.UI.Components`
)
const { UpVoteIcon, DownVoteIcon } = VM.require(
  `sourcescan.near/widget/SourceScan.UI.Icons`
)

const type = props.type

const [config, setConfig] = useState(getConfig(context.networkId))
const [upVotes, setUpVotes] = useState(0)
const [downVotes, setDownVotes] = useState(0)

useEffect(() => {}, [])

const vote = () => {}

return (
  <CHStack>
    <CStack>
      <UpVoteIcon width={'24px'} height={'24px'} onClick={vote} />
      <div>{upVotes}</div>
    </CStack>
    <CStack>
      <DownVoteIcon width={'24px'} height={'24px'} onClick={vote} />
      <div>{downVotes}</div>
    </CStack>
  </CHStack>
)
