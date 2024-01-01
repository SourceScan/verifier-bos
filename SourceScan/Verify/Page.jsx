const useNetwork = (mainnet, testnet) => {
  return context.networkId === "mainnet" ? mainnet : testnet;
};

State.init({
  ownerId: useNetwork("sourcescan.near", "sourcescan.testnet"),
  apiHost: props.apiHost || "https://sourcsecan.2bb.dev",
  appUrl: props.appUrl,
  theme: props.theme || {
    name: "light",
    bg: "#e3e8ef",
    color: "#4c5566",
    border: "#748094",
    hover: {
      bg: "#eef2f6",
      border: "#d8dfe7",
    },
    text: {
      fontSize: "16px",
    },
    heading: {
      fontSize: "18px",
      fontWeight: "600",
    },
  },
  loading: false,
  error: false,
  contractId: null,
  codeHash: null,
});

const A = styled.a`
  text-decoration: none;
  color: ${state.theme.color};

  :hover {
    text-decoration: none;
    color: ${state.theme.color};
  }
`;

const Stack = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  justify-content: center;
  gap: 55px;
`;

const HStack = styled.div`
  display: flex;
  flex-direction: row;
  text-align: center;
  align-items: center;
  justify-content: center;
  gap: 25px;
`;

const ImportStack = styled.div`
  display: flex;
  flex-direction: row;
  text-align: center;
  align-items: center;
  justify-content: center;
  gap: 25px;

  @media only screen and (max-width: 750px) {
    flex-direction: column;
    gap: 30px;
  }
`;

const Commit = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  text-align: center;
  align-items: center;
  justify-content: space-between;
  gap: 25px;
  border-bottom: 1px dashed ${state.theme.border};

  @media only screen and (max-width: 750px) {
    flex-direction: column;
    justify-content: center;
    margin-top: 25px;
  }
`;

const NHStack = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 5px;
`;

const CommitsContainer = styled.div`
  height: 100%;
  padding: 10px;
  border-radius: 6px;
  border-style: dashed;
  border-color: ${state.theme.border};
  flex-direction: row;
  text-align: center;
  align-items: center;
  justify-content: space-between;
`;

const CommitInfo = styled.div`
  width: 100%;
  display: flex;
  padding: 15px;
  flex-direction: row;
  text-align: start;
  align-items: center;
  justify-content: space-between;
  gap: 25px;

  @media only screen and (max-width: 750px) {
    flex-direction: column;
    text-align: center;
    justify-content: center;
  }
`;

const SearchStack = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 15px;

  @media only screen and (max-width: 750px) {
    flex-direction: column;
    gap: 30px;
  }
`;

const Text = styled.div`
  font-size: ${state.theme.text.fontSize};
  font-weight: ${state.theme.text.fontWeight};
  color: ${state.theme.color};
`;

const MHeading = styled.div`
  font-size: ${state.theme.heading.fontSize};
  font-weight: ${state.theme.heading.fontWeight};
  color: ${state.theme.color};
  width: 250px;
`;

const Heading = styled.div`
  font-size: ${state.theme.heading.fontSize};
  font-weight: ${state.theme.heading.fontWeight};
  color: ${state.theme.color};
`;

const Select = styled.select`
  cursor: pointer;
  border: 1px solid ${state.theme.border};
  background-color: transparent;
  border-radius: 6px;
  height: 36px;
  width: 200px;
  padding-left: 10px;
  padding-right: 10px;
  text-align: start;
  transition: border 0.1s ease-in-out;
  color: ${state.theme.color};

  :hover {
    border: 1px solid ${state.theme.hover.border};
  }
`;

const Button = styled.button`
  height: 36px;
  width: 96px;
  font-weight: 600;
  border-radius: 6px;
  padding-top: 5px;
  padding-bottom: 5px;
  border: 1px dashed ${state.theme.border};
  color: ${state.theme.color};
  background-color: ${state.theme.bg};
  transition: background-color 0.1s ease-in-out;

  :hover {
    background-color: ${state.theme.hover.bg};
  }
`;

const RButton = styled.button`
  background-color: ${state.theme.bg};
  border: 1px solid ${state.theme.border};
  width: 20px;
  height: 20px;
  border-radius: 50px;
`;

const SelectedRButton = styled.button`
  background-color: ${state.theme.border};
  border: 1px solid ${state.theme.border};
  width: 20px;
  height: 20px;
  border-radius: 50px;
`;

const clearState = () => {
  State.update({
    loading: false,
    error: false,
    contractId: null,
    codeHash: null,
  });
};

const handleSubmit = (value) => {
  clearState();

  State.update({ loading: true });

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
        account_id: value,
      },
    }),
  };
  asyncFetch(props.rpcUrl, options)
    .then((rpc_res) => {
      if (rpc_res.body.error) {
        State.update({ error: rpc_res.body.error.cause.name });
      }

      State.update({
        contractId: value,
        codeHash: rpc_res.body.result.hash,
      });
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      State.update({ loading: false });
    });
};

const truncateStringInMiddle = (str, maxLength) => {
  if (str.length <= maxLength) {
    return str;
  }

  const halfMaxLength = Math.floor(maxLength / 2);
  const firstHalf = str.slice(0, halfMaxLength);
  const secondHalf = str.slice(-halfMaxLength);

  return firstHalf + "..." + secondHalf;
};

return (
  <Stack>
    <Heading>1. Select contract to verify</Heading>
    <SearchStack>
      <Widget
        src={`${state.ownerId}/widget/SourceScan.Inputs.SearchBar`}
        props={{
          inputWidth: "180px",
          placeholder: "Account ID",
          theme: state.theme,
          handleSubmit: handleSubmit,
          value: state.contractId,
        }}
      />
    </SearchStack>
    {state.error && state.error !== "NO_CONTRACT_CODE" ? (
      <Widget
        src={`${state.ownerId}/widget/SourceScan.Common.ErrorAlert`}
        props={{
          message: "Error while loading contract from rpc",
        }}
      />
    ) : (
      <>
        {state.contractId ? (
          <NHStack>
            <Heading>{state.contractId}</Heading>
            <A
              href={`https://${
                context.networkId === "mainnet" ? "" : "testnet."
              }nearblocks.io/address/${state.contractId}`}
              target={"_blank"}
            >
              <Widget
                src={`${state.ownerId}/widget/SourceScan.Common.Icons.LinkIcon`}
                props={{ width: "18px", height: "18px" }}
              />
            </A>
          </NHStack>
        ) : null}
        {state.contractId ? (
          <>
            <Widget
              src={`${state.ownerId}/widget/SourceScan.Verify.Github`}
              props={{
                rpcUrl: props.rpcUrl,
                theme: state.theme,
                apiHost: state.apiHost,
                appUrl: state.appUrl,
                contractId: state.contractId,
              }}
            />
          </>
        ) : state.loading ? (
          <Widget
            src={`${state.ownerId}/widget/SourceScan.Common.Spinner`}
            props={{ width: "64px", height: "64px" }}
          />
        ) : null}
      </>
    )}
  </Stack>
);
