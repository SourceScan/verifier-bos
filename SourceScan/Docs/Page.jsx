const useNetwork = (mainnet, testnet) => {
  return context.networkId === "mainnet" ? mainnet : testnet;
};

State.init({
  ownerId: useNetwork("sourcescan.near", "sourcescan.testnet"),
  apiHost: props.apiHost || "https://sourcsecan.2bb.dev",
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
});

const Stack = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  justify-content: center;
  gap: 55px;
`;

const Heading = styled.div`
  font-size: ${state.theme.heading.fontSize};
  font-weight: ${state.theme.heading.fontWeight};
  color: ${state.theme.color};
`;

return (
  <Stack>
    <Heading>Coming soon...</Heading>
  </Stack>
);
