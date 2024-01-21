const useNetwork = (mainnet, testnet) => {
  return context.networkId === "mainnet" ? mainnet : testnet;
};

State.init({
  verifierId:
    props.verifierId || useNetwork("sourcescan.near", "sourcescan.testnet"),
  ownerId: useNetwork("sourcescan.near", "sourcescan.testnet"),
  apiHost: props.apiHost || "https://sourcescan-api.2bb.dev",
  appUrl:
    props.appUrl ||
    useNetwork("https://sourcescan.dev", "https://testnet.sourcescan.dev"),
  rpcUrl: useNetwork(
    "https://rpc.mainnet.near.org",
    "https://rpc.testnet.near.org"
  ),
  theme: props.theme || {
    bg: "#e3e8ef",
    color: "#4c5566",
    border: "1px dashed #748094",
    text: {
      fontSize: "16px",
    },
    heading: {
      fontSize: "18px",
      fontWeight: "600",
      underline: true,
    },
  },
  contract: null,
  wasm: { value: null, error: false },
  tx: { value: null, error: false },
});

const getContract = async () => {
  Near.asyncView(state.verifierId, "get_contract", {
    account_id: props.contractId,
  })
    .then((res) => {
      State.update({
        contract: res,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

if (!props.contractId) {
  return (
    <Widget
      src={`${state.ownerId}/widget/SourceScan.Common.ErrorAlert`}
      props={{ message: "Please provide a contractId to component" }}
    />
  );
} else {
  getContract();
}

const Main = styled.div`
  background-color: ${state.theme.bg};
  padding: 18px;
  color: ${state.theme.color};
  border: ${state.theme.border};
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  text-align: start;
  align-items: start;
  justify-content: start;
  gap: 30px;
  width: 50%;

  @media only screen and (max-width: 750px) {
    text-align: center;
    align-items: center;
    justify-content: center;
    width: 95%;
  }
`;

const Stack = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  text-align: start;
  gap: 8px;

  @media only screen and (max-width: 750px) {
    width: 90%;
    text-align: center;
    align-items: center;
    justify-content: center;
  }
`;

const CStack = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  justify-content: center;
  gap: 64px;

  @media only screen and (max-width: 750px) {
    width: 90%;
  }
`;

const HStack = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  text-align: start;
  gap: 5px;

  @media only screen and (max-width: 750px) {
    width: 90%;
    text-align: center;
    align-items: center;
    justify-content: center;
  }
`;

const CHStack = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  text-align: center;
  align-items: center;
  justify-content: center;
  gap: 8px;

  @media only screen and (max-width: 750px) {
    width: 90%;
  }
`;

const UHeading = styled.div`
  font-size: ${state.theme.heading.fontSize};
  font-weight: ${state.theme.heading.fontWeight};
  text-decoration: ${state.theme.heading.underline ? "underline" : "none"};
  -webkit-text-decoration-line: ${state.theme.heading.underline
    ? "underline"
    : "none"};
  text-underline-offset: 6px;
  text-decoration-style: dashed;
  text-decoration-color: gray;
`;

const TooltipText = styled.div`
  cursor: pointer;
  font-size: ${state.theme.text.fontSize};
  color: ${state.theme.color};
`;

const Heading = styled.div`
  font-size: ${state.theme.heading.fontSize};
  font-weight: ${state.theme.heading.fontWeight};
`;

const Desktop = styled.div`
  display: flex;

  @media only screen and (max-width: 750px) {
    display: none;
  }
`;

const Mobile = styled.div`
  display: none;

  @media only screen and (max-width: 750px) {
    display: flex;
  }
`;

const Text = styled.div`
  font-size: ${state.theme.text.fontSize};
  color: ${state.theme.color};
`;

const Center = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  @media only screen and (max-width: 750px) {
    width: 90%;
  }
`;

const EPContainer = styled.div`
  max-width: 100%;

  @media only screen and (max-width: 750px) {
    max-width: 90%;
  }
`;

const A = styled.a`
  text-decoration: none;
  color: ${state.theme.color};

  :hover {
    text-decoration: none;
    color: ${state.theme.color};
  }
`;

const truncateStringInMiddle = (str, maxLength) => {
  if (str.length <= maxLength) {
    return str;
  }

  const halfMaxLength = Math.floor(maxLength / 2);
  const firstHalf = str.slice(0, halfMaxLength);
  const secondHalf = str.slice(-halfMaxLength);

  return firstHalf + "..." + secondHalf;
};

const truncateAfterSplit = (str, maxLength) => {
  const [firstPart, secondPart] = str.split("@");

  return firstPart + "@" + truncateStringInMiddle(secondPart, maxLength);
};

const compareCodeHash = () => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: "dontcare",
      method: "query",
      params: {
        request_type: "view_code",
        finality: "final",
        account_id: props.contractId,
      },
    }),
  };
  asyncFetch(state.rpcUrl, options)
    .then((rpc_res) => {
      if (rpc_res.body.result.hash === state.contract.code_hash) {
        State.update({
          wasm: {
            value: true,
            error: false,
          },
        });
      } else {
        State.update({
          wasm: {
            value: false,
            error: false,
          },
        });
      }
    })
    .catch((err) => {
      State.update({
        wasm: {
          value: null,
          error: true,
        },
      });
      console.log(err);
    });
};

if (state.contract) {
  compareCodeHash();
}

const formatSourceCodePath = (path) => {
  let segments = path.split("/");

  segments.shift();
  segments.pop();
  if (state.contract.lang === "rust") {
    segments.push("src", "lib.rs");
  }

  return segments.join("/");
};

const [showComments, setShowComments] = useState(false);
const handleCommentsClick = () => {
  setShowComments((prev) => !prev);
};

return (
  <Center>
    {!state.contract ? (
      <Widget
        src={`${state.ownerId}/widget/SourceScan.Common.Spinner`}
        props={{ width: "64px", height: "64px" }}
      />
    ) : (
      <CStack>
        <Main>
          <CHStack>
            <Heading>{props.contractId}</Heading>
            <A
              href={`https://${
                context.networkId === "mainnet" ? "" : "testnet."
              }nearblocks.io/address/${props.contractId}`}
              target={"_blank"}
            >
              <Widget
                src={`${state.ownerId}/widget/SourceScan.Common.Icons.LinkIcon`}
                props={{ width: "18px", height: "18px" }}
              />
            </A>
          </CHStack>
          <CStack>
            <Widget
              src={`${state.ownerId}/widget/SourceScan.Web3.Contract.Social`}
              props={{
                contractId: props.contractId,
                contract: state.contract,
                onCommentsClick: handleCommentsClick,
              }}
            />
            {showComments ? (
              <>
                <Widget
                  src={`${state.ownerId}/widget/SourceScan.Web3.CommentInput`}
                  props={{
                    contractId: props.contractId,
                  }}
                />
                <Widget
                  src={`${state.ownerId}/widget/SourceScan.Web3.Contract.Comments`}
                  props={{
                    contractId: props.contractId,
                    contract: state.contract,
                  }}
                />
              </>
            ) : null}
          </CStack>
        </Main>
        <Main>
          <Stack>
            <UHeading>Security Checks</UHeading>
            <Stack>
              <HStack>
                {state.wasm.value === null ? (
                  <Widget
                    src={`${state.ownerId}/widget/SourceScan.Common.Spinner`}
                  />
                ) : state.wasm.value ? (
                  <Widget
                    src={`${state.ownerId}/widget/SourceScan.Common.Icons.CheckIcon`}
                    props={{
                      width: "20px",
                      height: "20px",
                      tooltip: {
                        placement: props.placement,
                        label: "Approved",
                      },
                    }}
                  />
                ) : (
                  <Widget
                    src={`${state.ownerId}/widget/SourceScan.Common.Icons.CrossIcon`}
                    props={{
                      width: "20px",
                      height: "20px",
                      tooltip: {
                        placement: props.placement,
                        label: state.wasm.error ? "Error" : "Not approved",
                      },
                    }}
                  />
                )}
                <Text>
                  Wasm Code {state.wasm.value ? "Matches" : "Mismatches"}
                </Text>
              </HStack>
            </Stack>
          </Stack>
          <Stack>
            <UHeading>Source Code</UHeading>
            <HStack>
              <Text>Github</Text>
              <A
                href={`https://github.com/${state.contract.github.owner}/${
                  state.contract.github.repo
                }/tree/${state.contract.github.sha}/${formatSourceCodePath(
                  state.contract.entry_point
                )}`}
                target={"_blank"}
              >
                <Widget
                  src={`${state.ownerId}/widget/SourceScan.Common.Icons.LinkIcon`}
                  props={{ width: "18px", height: "18px" }}
                />
              </A>
            </HStack>
            {state.contract.cid ? (
              <HStack>
                <Text>Code Viewer(IPFS)</Text>
                <A
                  href={`${state.appUrl}/code/${props.contractId}`}
                  target={"_blank"}
                >
                  <Widget
                    src={`${state.ownerId}/widget/SourceScan.Common.Icons.LinkIcon`}
                    props={{ width: "18px", height: "18px" }}
                  />
                </A>
              </HStack>
            ) : null}
          </Stack>
          <Stack>
            <UHeading>Code hash</UHeading>
            <Desktop>
              <Text>{state.contract.code_hash}</Text>
            </Desktop>
            <Mobile>
              <Text>
                {truncateStringInMiddle(state.contract.code_hash, 12)}
              </Text>
            </Mobile>
          </Stack>
          <Stack>
            <UHeading>Builder image</UHeading>
            <OverlayTrigger
              key={"top"}
              placement={"top"}
              overlay={<Tooltip id={`tooltip-top`}>Copy</Tooltip>}
            >
              <TooltipText
                onClick={() => {
                  clipboard.writeText(state.contract.builder_image);
                }}
              >
                {truncateAfterSplit(state.contract.builder_image, 8)}
              </TooltipText>
            </OverlayTrigger>
          </Stack>
          <Stack>
            <UHeading>Entry Point</UHeading>
            <EPContainer>
              <Text>{state.contract.entry_point}</Text>
            </EPContainer>
          </Stack>
          <Stack>
            <UHeading>Lang</UHeading>
            <Text>{state.contract.lang === "ts" ? "TypeScript" : "Rust"}</Text>
          </Stack>
          {state.contract.cid ? (
            <Stack>
              <UHeading>IPFS</UHeading>
              <HStack>
                <Desktop>
                  <Text>{state.contract.cid}</Text>
                </Desktop>
                <Mobile>
                  <Text>{truncateStringInMiddle(state.contract.cid, 8)}</Text>
                </Mobile>
                <A
                  href={`${state.apiHost}/ipfs/${state.contract.cid}`}
                  target={"_blank"}
                >
                  <Widget
                    src={`${state.ownerId}/widget/SourceScan.Common.Icons.LinkIcon`}
                    props={{ width: "18px", height: "18px" }}
                  />
                </A>
              </HStack>
            </Stack>
          ) : null}
          {state.contract.github ? (
            <Stack>
              <UHeading>Github</UHeading>
              <Widget
                src={`${state.ownerId}/widget/SourceScan.Common.Github.GithubLink`}
                props={{
                  github: state.contract.github,
                  theme: {
                    color: state.theme.color,
                    heading: {
                      fontSize: state.heading.fontSize,
                      fontWeight: "800",
                    },
                  },
                }}
              />
            </Stack>
          ) : null}
        </Main>
      </CStack>
    )}
  </Center>
);
