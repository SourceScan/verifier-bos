const useNetwork = (mainnet, testnet) => {
  return context.networkId === "mainnet" ? mainnet : testnet;
};

State.init({
  verifierId:
    props.verifierId || useNetwork("sourcescan.near", "sourcescan.testnet"),
  ownerId: useNetwork("sourcescan.near", "sourcescan.testnet"),
  value: null,
  error: false,
});

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
        account_id: props.accountId,
      },
    }),
  };
  asyncFetch(props.rpcUrl, options)
    .then((rpc_res) => {
      Near.asyncView(state.verifierId, "get_contract", {
        account_id: props.accountId,
      })
        .then((res) => {
          if (rpc_res.body.result.hash === res.code_hash) {
            State.update({ value: true });
          } else {
            State.update({ value: false });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

compareCodeHash();

return (
  <>
    {state.value === null ? (
      <Widget src={`${props.ownerId}/widget/SourceScan.Common.Spinner`} />
    ) : state.value === true ? (
      <Widget
        src={`${state.ownerId}/widget/SourceScan.Common.Icons.CheckIcon`}
        props={{
          width: "20px",
          height: "20px",
          tooltip: { placement: props.placement, label: "Approved" },
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
            label: state.error ? "Error" : "Not approved",
          },
        }}
      />
    )}
  </>
);
