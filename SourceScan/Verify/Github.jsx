const useNetwork = (mainnet, testnet) => {
  return context.networkId === "mainnet" ? mainnet : testnet;
};

State.init({
  ownerId: useNetwork("sourcescan.near", "sourcescan.testnet"),
  appUrl: props.appUrl,
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
  loading: false,
  importLoading: false,
  error: false,
  user: null,
  repo: null,
  branches: null,
  selectedBranch: null,
  selectedPage: 1,
  commits: null,
  selectedCommit: null,
  accessToken: null,
  files: null,
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
    user: null,
    repo: null,
    branches: null,
    selectedBranch: null,
    selectedPage: 1,
  });
};

const handleSubmit = (value) => {
  State.update({ loading: true });
  const repoUrl = value.toLocaleLowerCase();
  const parsed = repoUrl?.replace("https://github.com/", "").split("/");

  asyncFetch(`https://api.github.com/repos/${parsed[0]}/${parsed[1]}`, {
    method: "GET",
  })
    .then((res) => {
      if (res.status !== 200) {
        clearState();
        State.update({ error: true });
      } else {
        State.update({
          user: {
            name: res.body.owner.login,
            avatar: res.body.owner.avatar_url,
          },
        });
        State.update({ repo: { name: res.body.name, url: res.body.html_url } });
      }
    })
    .finally(() => {
      State.update({ loading: false });
    });
};

const getBranches = async () => {
  asyncFetch(
    `https://api.github.com/repos/${state.user.name}/${state.repo.name}/branches`,
    {
      method: "GET",
    }
  )
    .then((res) => {
      if (res.status !== 200) {
        clearState();
        State.update({ error: true });
      } else {
        State.update({
          branches: res.body,
          selectedBranch:
            res.body.find(
              (branch) => branch.name === "main" || branch.name === "master"
            )?.name || res.body[0].name,
        });
      }
    })
    .finally(() => {
      State.update({ loading: false });
    });
};

if (state.user && state.repo && !state.branches && !state.selectedBranch)
  getBranches();

const getCommits = () => {
  asyncFetch(
    `https://api.github.com/repos/${state.user?.name}/${state.repo?.name}/commits?per_page=10&page=${state.selectedPage}&sha=${state.selectedBranch}`,
    {
      method: "GET",
    }
  )
    .then((res) => {
      if (res.status !== 200) {
        clearState();
        State.update({ error: true });
      } else {
        State.update({
          commits: res.body.map((item) => {
            const commit = item.commit;
            return {
              sha: item.sha,
              message: commit.message,
              date: new Date(commit.author.date),
              author: commit.author.name,
              url: item.html_url.replace("commit", "tree"),
            };
          }),
        });
      }
    })
    .finally(() => {
      State.update({ loading: false });
    });
};

if (state.branches && state.selectedBranch) getCommits();

const handleSelectChange = (e) => {
  State.update({
    selectedBranch: e.target.value,
  });
};

const handleCommitSelect = (commit) => {
  if (state.selectedCommit?.sha === commit.sha) {
    State.update({
      selectedCommit: null,
    });
    return;
  }

  State.update({
    selectedCommit: commit,
  });
};

const handleImport = () => {
  if (!state.selectedCommit) return;
  State.update({ importLoading: true });

  asyncFetch(`${state.apiHost}/api/temp/github`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      repo: state.repo?.url,
      sha: state.selectedCommit?.sha,
    }),
  })
    .then((res) => {
      if (res.status !== 200) {
        clearState();
        State.update({ error: true });
      } else {
        State.update({
          accessToken: res.body.accessToken,
          files: res.body.files,
        });
      }
    })
    .finally(() => {
      State.update({ importLoading: false });
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
    {!state.accessToken && !state.files ? (
      <>
        <Heading>2. Specify source code GitHub repo</Heading>
        <SearchStack>
          <Widget
            src={`${state.ownerId}/widget/SourceScan.Inputs.SearchBar`}
            props={{
              inputWidth: "180px",
              placeholder: "Repository URL",
              theme: state.theme,
              handleSubmit: handleSubmit,
              value: state.repo,
            }}
          />
        </SearchStack>
        {!state.loading && state.repo && state.user ? (
          <Stack>
            <ImportStack>
              <Widget
                src={`${state.ownerId}/widget/SourceScan.Common.Github.GithubLink`}
                props={{
                  github: {
                    owner: state.user?.name,
                    repo: state.repo?.name,
                    sha: state.selectedCommit?.sha,
                  },
                  theme: {
                    color: state.theme.color,
                    heading: state.theme.heading,
                  },
                }}
              />
              {state.selectedCommit ? (
                <Button onClick={handleImport}>
                  {!state.importLoading ? (
                    "Select"
                  ) : (
                    <Widget
                      src={`${state.ownerId}/widget/SourceScan.Common.Spinner`}
                      props={{ width: "20px", height: "20px" }}
                    />
                  )}
                </Button>
              ) : null}
            </ImportStack>
            {state.branches ? (
              <Select onChange={(e) => handleSelectChange(e)}>
                {state.branches.map((branch, i) => (
                  <option
                    key={i}
                    value={branch.name}
                    selected={branch.name === state.selectedBranch}
                  >
                    {branch.name}
                  </option>
                ))}
              </Select>
            ) : null}
            {state.commits ? (
              <CommitsContainer>
                {state.commits.map((commit, i) => (
                  <Commit key={i}>
                    {state.selectedCommit.sha === commit.sha ? (
                      <SelectedRButton
                        onClick={() => handleCommitSelect(commit)}
                      />
                    ) : (
                      <RButton onClick={() => handleCommitSelect(commit)} />
                    )}
                    <Text>{commit.date.toLocaleDateString()}</Text>
                    <CommitInfo>
                      <MHeading>"{commit.message}"</MHeading>
                      <Text>{" by "}</Text>
                      <Text>{commit.author}</Text>
                      <Heading>
                        ({truncateStringInMiddle(commit.sha, 12)})
                      </Heading>
                    </CommitInfo>
                  </Commit>
                ))}
              </CommitsContainer>
            ) : null}
          </Stack>
        ) : state.loading && !state.error ? (
          <Widget
            src={`${state.ownerId}/widget/SourceScan.Common.Spinner`}
            props={{ width: "64px", height: "64px" }}
          />
        ) : state.error ? (
          <Widget
            src={`${state.ownerId}/widget/SourceScan.Common.ErrorAlert`}
            props={{ message: "Invalid repository URL" }}
          />
        ) : null}
      </>
    ) : (
      <Widget
        src={`${state.ownerId}/widget/SourceScan.Verify.Compile`}
        props={{
          appUrl: state.appUrl,
          contractId: props.contractId,
          accessToken: state.accessToken,
          files: state.files,
          github: {
            repo: state.repo.name,
            owner: state.user.name,
            sha: state.selectedCommit?.sha,
          },
          theme: state.theme,
          apiHost: state.apiHost,
        }}
      />
    )}
  </Stack>
);
