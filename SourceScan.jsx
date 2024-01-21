const limits = [5, 10, 20, 50];

const font = fetch(
  "https://fonts.googleapis.com/css2?family=Source+Code+Pro&display=swap"
).body;

if (!font) {
  return null;
}

const getConfig = (network) => {
  switch (network) {
    case "mainnet":
      return {
        appUrl: "https://sourcescan.dev",
        ownerId: "sourcescan.near",
        rpcUrl: "https://rpc.mainnet.near.org",
        contractId: "dev.sourcescan.near",
        apiHost: "https://api.sourcescan.dev",
      };
    case "testnet":
      return {
        appUrl: "https://testnet.sourcescan.dev",
        ownerId: "sourcescan.testnet",
        rpcUrl: "https://rpc.testnet.near.org",
        contractId: "dev.sourcescan.testnet",
        apiHost: "https://api.sourcescan.dev",
      };
    default:
      throw Error(`Unconfigured environment '${network}'.`);
  }
};

State.init({
  theme: Storage.get("theme"),
  from_index: 0,
  limit: limits[0],
  contracts: null,
  pages: 1,
  selectedPage: 1,
  search: "",
  config: getConfig(context.networkId),
});

const dark = {
  name: "dark",
  bg: "#28282b",
  color: "#e6eaee",
  border: "#748094",
  hover: {
    bg: "#39393c",
    border: "#4e5460",
  },
  text: {
    fontSize: "16px",
  },
  heading: {
    fontSize: "18px",
    fontWeight: "600",
  },
};

const light = {
  name: "light",
  bg: "#e3e8ef",
  color: "#1b202b",
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
};

const useTheme = (light, dark) => {
  return state.theme === "light" ? light : dark;
};

const GlobalStyle = styled.div`
  * {
    font-family: "Source Code Pro", cursive;
  }
  ${font}
`;

const Main = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  color: ${useTheme(light.color, dark.color)};
  background-color: ${useTheme(light.bg, dark.bg)};
  overflow-y: auto;
  padding-bottom: 80px;
  min-height: 100vh;

  @media only screen and (max-width: 750px) {
    padding-bottom: 160px;
  }
`;

const Stack = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
`;

const HStack = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 15px;
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

const Content = styled.div`
  padding-top: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
`;

const switchTheme = () => {
  const themeToChange = useTheme("dark", "light");
  State.update({
    theme: themeToChange,
  });
  Storage.set("theme", themeToChange);
};

const handleSubmit = (value) => {
  State.update({ search: value });
  searchContracts();
};

const searchContracts = async () => {
  Near.asyncView(state.config.contractId, "search", {
    key: state.search,
    from_index: state.from_index,
    limit: state.limit,
  })
    .then((res) => {
      State.update({
        pages: res[1],
        contracts: res[0],
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

if (!state.contracts) searchContracts();

const localStorageTheme = Storage.get("theme");
if (localStorageTheme)
  State.update({
    theme: localStorageTheme,
  });

const handleOptionsChange = (e) => {
  State.update({
    limit: parseInt(e.target.value),
    selectedPage: 1,
    from_index: 0,
  });
  searchContracts();
};

const handlePageChange = (x) => {
  State.update({
    selectedPage: x + 1,
    from_index: x * state.limit,
  });
  searchContracts();
};

const pages = {
  main: (
    <>
      <SearchStack>
        <Widget
          src={`${state.config.ownerId}/widget/SourceScan.Inputs.SearchBar`}
          props={{
            placeholder: "Account ID",
            theme: useTheme(light, dark),
            handleSubmit: handleSubmit,
            value: state.search,
          }}
        />
        <Widget
          src={`${state.config.ownerId}/widget/SourceScan.Inputs.Limits`}
          props={{
            handleOptionsChange: handleOptionsChange,
            theme: useTheme(light, dark),
            limits: limits,
            selectedLimit: state.limit,
          }}
        />
      </SearchStack>
      <Widget
        src={`${state.config.ownerId}/widget/SourceScan.Contracts.Table`}
        props={{
          theme: useTheme(light, dark),
          verifierId: state.config.contractId,
          contracts: state.contracts,
          rpcUrl: state.config.rpcUrl,
          apiHost: state.config.apiHost,
        }}
      />
      <Widget
        src={`${state.config.ownerId}/widget/SourceScan.Inputs.Pagination`}
        props={{
          theme: useTheme(light, dark),
          pages: state.pages,
          selectedPage: state.selectedPage,
          handlePageChange: handlePageChange,
        }}
      />
    </>
  ),
  contract: (
    <Widget
      src={`${state.config.ownerId}/widget/SourceScan.Contracts.Info`}
      props={{
        verifierId: state.config.contractId,
        apiHost: state.config.apiHost,
        appUrl: state.config.appUrl,
        contractId: props.contractId,
        theme: useTheme(
          {
            ...light,
            border: `1px dashed ${light.border}`,
            heading: {
              ...light.heading,
              underline: true,
            },
          },
          {
            ...dark,
            border: `1px dashed ${dark.border}`,
          }
        ),
      }}
    />
  ),
  verify: (
    <Widget
      src={`${state.config.ownerId}/widget/SourceScan.Verify.Page`}
      props={{
        rpcUrl: state.config.rpcUrl,
        theme: useTheme(light, dark),
        apiHost: state.config.apiHost,
        appUrl: state.config.appUrl,
      }}
    />
  ),
  docs: (
    <Widget
      src={`${state.config.ownerId}/widget/SourceScan.Docs.Page`}
      props={{
        rpcUrl: state.config.rpcUrl,
        theme: useTheme(light, dark),
        apiHost: state.config.apiHost,
      }}
    />
  ),
};

return (
  <GlobalStyle>
    <Main>
      <Widget
        src={`${state.config.ownerId}/widget/SourceScan.Layout.Navbar`}
        props={{
          theme: useTheme(light, dark),
          switchTheme: switchTheme,
        }}
      />
      <Content>{pages[props.page] ? pages[props.page] : pages.main}</Content>
    </Main>
  </GlobalStyle>
);
