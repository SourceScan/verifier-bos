const networks = ["mainnet", "testnet"];

State.init({
  theme: props.theme || {
    name: "light",
    bg: "#e3e8ef",
    color: "#4c5566",
    border: "#748094",
    hover: {
      bg: "#eef2f6",
    },
  },
});

const Select = styled.select`
  font-weight: 600;
  cursor: pointer;
  border: 1px dashed ${state.theme.border};
  background-color: ${state.theme.bg};
  border-radius: 8px;
  width: 122px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: ${state.theme.color};
  transition: background-color 0.1s ease-in-out;

  :hover {
    background-color: ${state.theme.hover.bg};
  }
`;

const strCapitalize = (str) => {
  if (str.length === 0) return str;

  return str.replace(/^./, (match) => match.toUpperCase());
};

const DropDown = styled.div`
  .dropbtn {
    font-weight: 600;
    cursor: pointer;
    border: 1px dashed ${state.theme.border};
    background-color: ${state.theme.bg};
    border-radius: 8px;
    width: 122px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: ${state.theme.color};
    transition: background-color 0.1s ease-in-out;

    :hover {
      background-color: ${state.theme.hover.bg};
    }
  }

  .dropdown {
    position: relative;
    display: inline-block;
  }

  .dropdown-content {
    display: none;
    align-items: center;
    justify-content: center;
    text-align: center;
    position: absolute;
    border: 1px dashed ${state.theme.border};
    background-color: ${state.theme.bg};
    border-radius: 8px;
    width: 122px;
    height: 40px;
    z-index: 10;
  }

  .dropdown-content a {
    display: block;
    align-items: center;
    justify-content: center;
    text-align: center;
    width: 100%;
    padding: 6px;
    height: 100%;
    font-weight: 600;
    color: ${state.theme.color};
    cursor: pointer;
    border-radius: 8px;
    text-decoration: none;
  }

  .dropdown-content a:hover {
    background-color: ${state.theme.hover.bg};
  }

  .dropdown:hover .dropdown-content {
    display: flex;
  }

  .dropdown:hover .dropbtn {
    background-color: ${state.theme.hover.bg};
  }
`;

const appHref = (network) => {
  return network === "mainnet"
    ? "https://near.social/sourcescan.near/widget/SourceScan"
    : "https://test.near.social/sourcescan.testnet/widget/SourceScan";
};

return (
  <DropDown>
    <div class="dropdown">
      <button class="dropbtn">{strCapitalize(context.networkId)}</button>
      <div class="dropdown-content">
        {networks
          .filter((n) => n !== context.networkId)
          .map((network, i) => (
            <a key={i} href={appHref(network)} target={"_self"}>
              {strCapitalize(network)}
            </a>
          ))}
      </div>
    </div>
  </DropDown>
);
