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

const { CStack, Text } = VM.require(
  `${config.ownerId}/widget/SourceScan.UI.Components`
);

if (!CStack || !Text) {
  return <div>loading...</div>;
}

const Input = styled.textarea`
  height: 125px;
  width: 100%;
  border-radius: 6px;
  text-align: start;
  padding: 5px 10px; /* shorthand for padding-top, padding-right, padding-bottom, padding-left */
`;

const Button = styled.button`
  height: 36px;
  width: 96px;
  font-weight: 600;
  border-radius: 6px;
  padding-top: 5px;
  padding-bottom: 5px;
  border: 1px dashed ${theme.border};
  color: ${theme.color};
  background-color: ${theme.bg};
  transition: background-color 0.1s ease-in-out;

  :hover {
    background-color: ${theme.hover.bg};
  }
`;

const addComment = () => {
  Near.call(config.contractId, "add_comment", {
    account_id: contractId,
    content: value,
  });
};

const [value, setValue] = useState("");
const handleChange = (e) => {
  setValue(e.target.value);
};

return (
  <CStack>
    <Text>Leave a comment</Text>
    <Input onChange={handleChange} value={value} />
    <Button onClick={addComment}>post</Button>
  </CStack>
);
