const useNetwork = (mainnet, testnet) => {
  return context.networkId === "mainnet" ? mainnet : testnet;
};

State.init({
  appUrl: props.appUrl,
  apiHost: props.apiHost,
  ownerId: useNetwork("sourcescan.near", "sourcescan.testnet"),
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
  github: props.github,
  accessToken: props.accessToken,
  files: props.files,
  entryPoint: null,
  lang: "rust",
  loading: false,
  verifyLoading: false,
  verifyError: null,
  verifySuccess: null,
  error: false,
  gatewayKey: null,
  verification: null,
  builderImage: null,
  dockerTutorial: false,
  uploadToIpfs: false,
});

const clearState = () => {
  State.update({
    entryPoint: null,
    lang: "rust",
    loading: false,
    error: false,
    gatewayKey: null,
    verification: null,
    builderImage: null,
    dockerTutorial: false,
    uploadToIpfs: false,
    verifyError: null,
    verifyLoading: false,
  });
};

if (!props.github) {
  <Widget
    src={`${state.ownerId}/widget/SourceScan.Common.ErrorAlert`}
    props={{
      message:
        "Please provide github: {repo: string, owner: string, sha: string} to the component",
    }}
  />;
} else if (!props.accessToken) {
  <Widget
    src={`${state.ownerId}/widget/SourceScan.Common.ErrorAlert`}
    props={{
      message: "Please provide accessToken: string to the component",
    }}
  />;
} else if (!props.files) {
  <Widget
    src={`${state.ownerId}/widget/SourceScan.Common.ErrorAlert`}
    props={{
      message: "Please provide files: string[] to the component",
    }}
  />;
}

const Center = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const EPContainer = styled.div`
  height: 100%;
  padding: 10px;
  border-radius: 6px;
  border-style: dashed;
  border-color: ${state.theme.border};
  flex-direction: row;
  text-align: center;
  align-items: center;
  justify-content: space-between;

  @media only screen and (max-width: 750px) {
    width: 90%;
  }
`;

const EntryPoint = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  text-align: start;
  align-items: center;
  justify-content: start;
  gap: 25px;
  padding-top: 25px;
  padding-bottom: 25px;
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

const Text = styled.div`
  max-width: 350;
  font-size: ${state.theme.text.fontSize};
  font-weight: ${state.theme.text.fontWeight};
  color: ${state.theme.color};

  @media only screen and (max-width: 750px) {
    max-width: 200px;
  }
`;

const Heading = styled.div`
  font-size: ${state.theme.heading.fontSize};
  font-weight: ${state.theme.heading.fontWeight};
  color: ${state.theme.color};

  @media only screen and (max-width: 750px) {
    width: 200px;
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

const DeployStack = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  justify-content: center;
  gap: 25px;
`;

const VerificationStack = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  text-align: center;
  align-items: center;
  justify-content: center;
  gap: 25px;

  @media only screen and (max-width: 750px) {
    width: 20%;
  }
`;

const HStack = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  text-align: center;
  align-items: center;
  justify-content: center;
  gap: 25px;
`;

const HeadingStack = styled.div`
  display: flex;
  flex-direction: row;
  text-align: center;
  align-items: center;
  justify-content: center;
  gap: 15%;
`;

const Select = styled.select`
  cursor: pointer;
  border: 1px solid ${state.theme.border};
  background-color: transparent;
  border-radius: 6px;
  height: 36px;
  width: 150px;
  padding-left: 10px;
  padding-right: 10px;
  text-align: start;
  transition: border 0.1s ease-in-out;
  color: ${state.theme.color};

  :hover {
    border: 1px solid ${state.theme.hover.border};
  }
`;

const Checkbox = styled.input`
  accent-color: ${state.theme.primaryColor};
  width: 20px;
  height: 20px;
  border: 2px solid ${state.theme.border};
  border-radius: 4px;
  transition: border-color 0.1s ease-in-out, background-color 0.1s ease-in-out;

  :checked {
    background-color: ${state.theme.checked.bg};
    border-color: ${state.theme.checked.border};
  }

  :hover {
    border-color: ${state.theme.hover.border};
  }

  :focus {
    outline: none;
    box-shadow: 0 0 0 2px ${state.theme.focus.shadow};
  }
`;

const Button = styled.button`
  font-weight: 600;
  border-radius: 6px;
  padding: 15px;
  border: 1px dashed ${state.theme.border};
  color: ${state.theme.color};
  background-color: ${state.theme.bg};
  transition: background-color 0.1s ease-in-out;

  :hover {
    background-color: ${state.theme.hover.bg};
  }
`;

const TooltipText = styled.div`
  cursor: pointer;
  font-size: ${state.theme.text.fontSize};
  color: ${state.theme.color};
`;

const A = styled.a`
  text-decoration: none;
  color: ${state.theme.color};

  :hover {
    text-decoration: none;
    color: ${state.theme.color};
  }
`;

const handleEntryPointSelect = (file) => {
  if (state.loading || state.gatewayKey || state.error) return;

  if (state.entryPoint === file) {
    State.update({
      entryPoint: null,
    });
    return;
  }

  State.update({ entryPoint: file });
};

const handleLangChange = (e) => {
  if (state.loading || state.gatewayKey || state.error) return;

  State.update({ lang: e.target.value });
};

const handleKeyGen = () => {
  if (state.loading || state.gatewayKey || !props.contractId) return;

  State.update({
    loading: true,
  });

  asyncFetch(`${state.apiHost}/api/gateway/genKey`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      accessToken: state.accessToken,
      lang: state.lang,
      entryPoint: state.entryPoint,
      github: state.github,
      accountId: props.contractId,
    }),
  })
    .then((res) => {
      if (res.status !== 200) {
        State.update({ error: true });
      } else {
        State.update({
          gatewayKey: res.body,
        });
      }
    })
    .finally(() => {
      State.update({ loading: false });
    });
};

const getBuilderImageInfo = () => {
  if (state.loading || state.error || !props.contractId) return;

  State.update({
    loading: true,
  });

  asyncFetch(`${state.apiHost}/api/verify/builderInfo`, {
    method: "GET",
  })
    .then((res) => {
      if (res.status !== 200) {
        clearState();
        State.update({ error: true });
      } else {
        State.update({
          builderImage: res.body.builderImage,
        });
      }
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

const handleVerificationSelect = (verification) => {
  if (verification === "Docker") getBuilderImageInfo();

  State.update({
    verification: verification,
  });
};

const truncateAfterSplit = (str, maxLength) => {
  const [firstPart, secondPart] = str.split("@");

  return firstPart + "@" + truncateStringInMiddle(secondPart, maxLength);
};

const handleDockerCheckBoxChange = () => {
  State.update({ dockerTutorial: !state.dockerTutorial });
};

const handleIPFSCheckBoxChange = () => {
  State.update({ uploadToIpfs: !state.uploadToIpfs });
};

const verify = () => {
  if (state.verifyLoading || !props.contractId) return;

  State.update({
    verifyLoading: true,
  });

  asyncFetch(`${state.apiHost}/api/verify/${state.lang}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${state.accessToken}`,
    },
    method: "POST",
    body: JSON.stringify({
      accountId: props.contractId,
      networkId: context.networkId,
      entryPoint: state.entryPoint,
      uploadToIpfs: state.uploadToIpfs,
      accountId: props.contractId,
    }),
  })
    .then((res) => {
      if (res.body.message !== "Contract verified successfully") {
        State.update({
          verifyError: res.body.message ? res.body.message : "Error ocurred",
        });
      } else {
        State.update({
          verifySuccess: res.body.message,
        });
      }
    })
    .finally(() => {
      State.update({ verifyLoading: false });
    });
};

return (
  <Stack>
    <Heading>3. Select entry point</Heading>
    <EPContainer>
      {state.files.map((file, i) => (
        <EntryPoint key={i}>
          {state.entryPoint === file ? (
            <SelectedRButton onClick={() => handleEntryPointSelect(file)} />
          ) : (
            <RButton onClick={() => handleEntryPointSelect(file)} />
          )}
          <Heading>{file}</Heading>
        </EntryPoint>
      ))}
    </EPContainer>
    {state.entryPoint ? (
      <>
        <Heading>4. What to compile</Heading>
        <Select onChange={(e) => handleLangChange(e)}>
          <option
            value={"rust"}
            selected={state.lang === "rust"}
            disabled={state.loading || state.error}
          >
            Rust
          </option>
          <option value={"ts"} selected={state.lang === "ts"} disabled={true}>
            TypeScript
          </option>
        </Select>
        <Heading>5. How to verify</Heading>
        <VerificationStack>
          <div onClick={() => handleVerificationSelect("Docker")}>
            <Widget
              src={`${state.ownerId}/widget/SourceScan.Common.Icons.DockerIcon`}
              props={{
                width: "40px",
                height: "40px",
              }}
            />
          </div>
          <Heading>or</Heading>
          <div onClick={() => handleVerificationSelect("FAK")}>
            <Widget
              src={`${state.ownerId}/widget/SourceScan.Common.Icons.KeyIcon`}
              props={{
                width: "32px",
                height: "32px",
              }}
            />
          </div>
        </VerificationStack>
        {state.verification === "Docker" ? (
          <>
            {state.loading ? (
              <Widget
                src={`${state.ownerId}/widget/SourceScan.Common.Spinner`}
                props={{ width: "20px", height: "20px" }}
              />
            ) : (
              <>
                <HStack>
                  <Text>{"Builder image: "}</Text>
                  <OverlayTrigger
                    key={"top"}
                    placement={"top"}
                    overlay={<Tooltip id={`tooltip-top`}>Copy</Tooltip>}
                  >
                    <TooltipText
                      onClick={() => {
                        clipboard.writeText(state.builderImage);
                      }}
                    >
                      {truncateAfterSplit(state.builderImage, 8)}
                    </TooltipText>
                  </OverlayTrigger>
                </HStack>
                <Stack>
                  <HStack>
                    {state.dockerTutorial ? (
                      <SelectedRButton onClick={handleDockerCheckBoxChange} />
                    ) : (
                      <RButton onClick={handleDockerCheckBoxChange} />
                    )}
                    <Text>All steps done from</Text>
                    <a
                      href={
                        "https://docs.sourcescan.dev/tutorials/docker-verification"
                      }
                      target={"_blank"}
                    >
                      tutorial
                    </a>
                  </HStack>
                  <HStack>
                    {state.uploadToIpfs ? (
                      <SelectedRButton
                        onClick={() => handleIPFSCheckBoxChange()}
                      />
                    ) : (
                      <RButton onClick={() => handleIPFSCheckBoxChange()} />
                    )}
                    <Text>Upload to IPFS</Text>
                  </HStack>
                </Stack>
                {state.dockerTutorial ? (
                  <Button onClick={verify} disabled={state.verifyLoading}>
                    {!state.verifyLoading ? (
                      "Verify"
                    ) : (
                      <Widget
                        src={`${state.ownerId}/widget/SourceScan.Common.Spinner`}
                        props={{ width: "20px", height: "20px" }}
                      />
                    )}
                  </Button>
                ) : null}
                {state.verifyError ? (
                  <Widget
                    src={`${state.ownerId}/widget/SourceScan.Common.ErrorAlert`}
                    props={{
                      message: state.verifyError,
                    }}
                  />
                ) : state.verifySuccess ? (
                  <Widget
                    src={`${state.ownerId}/widget/SourceScan.Common.SuccessAlert`}
                    props={{
                      message: state.verifySuccess,
                    }}
                  />
                ) : null}
              </>
            )}
          </>
        ) : state.verification === "FAK" ? (
          state.gatewayKey ? (
            <DeployStack>
              <A
                href={`${state.appUrl}/gateway?key=${encodeURIComponent(
                  state.gatewayKey
                )}`}
                target={"_blank"}
              >
                <Button>Gateway</Button>
              </A>
            </DeployStack>
          ) : (
            <>
              <Button onClick={handleKeyGen} disabled={state.loading}>
                {!state.loading ? (
                  "Generate Key"
                ) : (
                  <Widget
                    src={`${state.ownerId}/widget/SourceScan.Common.Spinner`}
                    props={{ width: "20px", height: "20px" }}
                  />
                )}
              </Button>
              {state.error ? (
                <Widget
                  src={`${state.ownerId}/widget/SourceScan.Common.ErrorAlert`}
                  props={{
                    message: "Error ocurred during key generation",
                  }}
                />
              ) : null}
            </>
          )
        ) : null}
      </>
    ) : null}
  </Stack>
);
