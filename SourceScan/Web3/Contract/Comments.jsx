const useNetwork = (mainnet, testnet) => {
  return context.networkId === "mainnet" ? mainnet : testnet;
};

const { getConfig, limits } = VM.require(
  `${useNetwork(
    "sourcescan.near",
    "sourcescan.testnet"
  )}/widget/SourceScan.libs.constants`
);

if (!getConfig) {
  return <div>loading...</div>;
}
const config = getConfig(context.networkId);
const contractId = props.contractId;

const { useTheme } = VM.require(
  `${config.ownerId}/widget/SourceScan.libs.theme`
);
if (!useTheme) {
  return <div>loading...</div>;
}
const theme = useTheme(
  Storage.get("theme", `${config.ownerId}/widget/SourceScan`)
);

const [limit, setLimit] = useState(limits[0]);
const [selectedPage, setSelectedPage] = useState(1);
const [fromIndex, setFromIndex] = useState(0);
const handleOptionsChange = (e) => {
  setLimit(parseInt(e.target.value));
  setSelectedPage(1);
  setFromIndex(0);
};

const handlePageChange = (x) => {
  setSelectedPage(x + 1);
  setFromIndex(x * limit);
};

const [pages, setPages] = useState(1);
const [comments, setComments] = useState(null);
useEffect(() => {
  if (!contractId) return;

  Near.asyncView(config.contractId, "get_comments", {
    account_id: contractId,
    from_index: fromIndex,
    limit: limit,
  })
    .then((res) => {
      setComments(res[0]);
      setPages(res[1]);
    })
    .catch((err) => {
      console.log(err);
    });
}, [contractId, limit, selectedPage, fromIndex]);

const CommentsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 32px;
`;

return (
  <CommentsContainer>
    {comments ? (
      <>
        {comments.length > 0 ? (
          <>
            <Widget
              src={`${config.ownerId}/widget/SourceScan.Inputs.Limits`}
              props={{
                label: "Comments per page",
                handleOptionsChange: handleOptionsChange,
                theme: theme,
                limits: limits,
                selectedLimit: limit,
              }}
            />
            {comments.map((comment, i) => (
              <Widget
                key={i}
                src={`${config.ownerId}/widget/SourceScan.Web3.CommentView`}
                props={{ comment: comment }}
              />
            ))}
            <Widget
              src={`${config.ownerId}/widget/SourceScan.Inputs.Pagination`}
              props={{
                theme: theme,
                pages: pages,
                selectedPage: selectedPage,
                handlePageChange: handlePageChange,
              }}
            />
          </>
        ) : null}
      </>
    ) : (
      <Widget
        src={`${config.ownerId}/widget/SourceScan.Common.Spinner`}
        props={{ width: "20px", height: "20px" }}
      />
    )}
  </CommentsContainer>
);
