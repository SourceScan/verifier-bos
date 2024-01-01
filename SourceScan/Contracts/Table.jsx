const useNetwork = (mainnet, testnet) => {
  return context.networkId === "mainnet" ? mainnet : testnet;
};

State.init({
  verifierId:
    props.verifierId || useNetwork("sourcescan.near", "sourcescan.testnet"),
  contracts: props.contracts,
  theme: props.theme || {
    name: "light",
    bg: "#e3e8ef",
    color: "#4c5566",
    border: "#748094",
    hover: {
      bg: "#eef2f6",
      border: "#d8dfe7",
    },
  },
  ownerId: useNetwork("sourcescan.near", "sourcescan.testnet"),
});

if (props.contracts)
  State.update({
    contracts: props.contracts,
  });

const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const Table = styled.table`
  border: 1px solid ${state.theme.border};
  background-color: ${state.theme.bg};
  color: ${state.theme.color};
  border-collapse: separate;
  border-spacing: 0;
  border-radius: 10px;
  text-align: start;
  width: 50%;

  thead {
    text-transform: uppercase;
    font-size: 12px;
    font-weight: 100;
    color: ${state.theme.border};
  }

  th {
    padding: 15px;
  }

  td {
    border-top: 0.5px dashed ${state.theme.border};
    padding: 15px;
  }

  @media only screen and (max-width: 750px) {
    border: none;

    thead {
      display: none;
    }

    th {
      display: block;
      width: 100%;
    }

    tr {
      border-radius: 10px;
      display: block;
      width: full;
      border: 1px solid ${state.theme.border};
      margin-bottom: 40px;
    }

    td {
      position: relative;
      display: flex;
      align-items: end;
      justify-content: end;
      text-align: end;
      border: none;
    }

    td:before {
      width: 100%;
      content: attr(data-label);
      text-transform: uppercase;
      padding-right: 20px;
      font-size: 12px;
      font-weight: 100;
      color: ${state.theme.border};
      font-weight: bold;
      text-align: start;
    }
  }
`;

const HStack = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: start;
  gap: 8px;
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
    width: 250%;
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

const Button = styled.a`
  height: 36px;
  width: 96px;
  text-align: center;
  font-weight: 600;
  border-radius: 6px;
  padding-top: 5px;
  padding-bottom: 5px;
  border: 1px dashed ${state.theme.border};
  color: ${state.theme.color};
  background-color: ${state.theme.bg};
  transition: background-color 0.1s ease-in-out;

  &:hover,
  &:focus {
    background: #ecedee;
    text-decoration: none;
    outline: none;
    color: ${state.theme.color};
  }
  :hover {
    background-color: ${state.theme.hover.bg};
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

const infoHref = (contractId) => {
  return `#/${state.ownerId}/widget/SourceScan?page=contract&contractId=${contractId}`;
};

return (
  <>
    {state.contracts.length === 0 ? (
      <>Nothing here...</>
    ) : (
      <Table>
        <thead>
          <tr>
            <th>Contract</th>
            <th>Lang</th>
            <th>IPFS</th>
            <th>Github</th>
            <th>Approved</th>
            <Desktop>
              <th></th>
            </Desktop>
          </tr>
        </thead>
        <tbody>
          {state.contracts
            ? state.contracts.map((contract, i) => {
                const contractId = contract[0];
                const lang = contract[1].lang;
                const cid = contract[1].cid;
                const deploy_tx = contract[1].deploy_tx;
                const github = contract[1].github;
                return (
                  <tr key={i}>
                    <td data-label={"Contract"}>{contractId}</td>
                    <td data-label={"Lang"}>{lang}</td>
                    <td data-label={"IPFS"}>
                      <HStack>
                        {truncateStringInMiddle(cid, 8)}
                        <A
                          href={`${props.apiHost}/ipfs/${cid}`}
                          target={"_blank"}
                        >
                          <Widget
                            src={`${state.ownerId}/widget/SourceScan.Common.Icons.LinkIcon`}
                            props={{ width: "20px", height: "20px" }}
                          />
                        </A>
                      </HStack>
                    </td>
                    <td data-label={"Github"}>
                      {github ? (
                        <HStack>
                          {github.owner}/{github.repo}
                          <A
                            href={`https://github.com/${github.owner}/${github.repo}/tree/${github.sha}`}
                            target={"_blank"}
                          >
                            <Widget
                              src={`${state.ownerId}/widget/SourceScan.Common.Icons.LinkIcon`}
                              props={{ width: "20px", height: "20px" }}
                            />
                          </A>
                        </HStack>
                      ) : (
                        "None"
                      )}
                    </td>
                    <td data-label={"Approved"}>
                      <Center>
                        <Widget
                          src={`${state.ownerId}/widget/SourceScan.Contracts.Approved`}
                          props={{
                            verifierId: state.verifierId,
                            rpcUrl: props.rpcUrl,
                            apiHost: props.apiHost,
                            accountId: contractId,
                            cid: cid,
                            ownerId: state.ownerId,
                            deploy_tx: deploy_tx,
                          }}
                        />
                      </Center>
                    </td>
                    <td>
                      <Desktop>
                        <OverlayTrigger
                          key={state.placement}
                          placement={state.placement}
                          overlay={
                            <Tooltip id={`tooltip-${placement}`}>
                              Show More
                            </Tooltip>
                          }
                        >
                          <A href={infoHref(contractId)} target={"_self"}>
                            <Widget
                              src={`${state.ownerId}/widget/SourceScan.Common.Icons.InfoIcon`}
                              props={{ width: "20px", height: "20px" }}
                            />
                          </A>
                        </OverlayTrigger>
                      </Desktop>
                      <Mobile>
                        <Button href={infoHref(contractId)} target={"_self"}>
                          More
                        </Button>
                      </Mobile>
                    </td>
                  </tr>
                );
              })
            : null}
        </tbody>
      </Table>
    )}
  </>
);
