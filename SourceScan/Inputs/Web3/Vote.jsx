const { getConfig } = VM.require(
  `sourcescan.near/widget/SourceScan.libs.constants`
)
const { Button, CHStack, CStack, Text, Center } = VM.require(
  `sourcescan.near/widget/SourceScan.UI.Components`
)
const { ArrowUpIcon, ArrowDownIcon } = VM.require(
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
      <div onClick={vote}>
        <ArrowUpIcon label={'Upvote'} width={'24px'} height={'24px'} />
      </div>
      <div>{upVotes}</div>
    </CStack>
    <CStack>
      <div onClick={vote}>
        <ArrowDownIcon width={'24px'} height={'24px'} />
      </div>
      <div>{downVotes}</div>
    </CStack>
  </CHStack>
)
