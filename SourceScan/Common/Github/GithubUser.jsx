if (!props.user)
  return (
    <Widget
      src={`${state.ownerId}/widget/SourceScan.Common.ErrorAlert`}
      props={{ message: "Please provide github user to the component" }}
    />
  );

State.init({
  user: null,
  theme: props.theme || {
    color: "#4c5566",
    heading: {
      fontSize: "18px",
      fontWeight: "600",
    },
  },
});

const getUserData = async (user) => {
  asyncFetch(`https://api.github.com/users/${user}`, {
    method: "GET",
  })
    .then((res) => {
      State.update({
        user: res.body,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

const HStack = styled.div`
  color: ${state.theme.color};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

const Heading = styled.div`
  font-size: ${state.theme.heading.fontSize};
  font-weight: ${state.theme.heading.fontWeight};
`;

const Avatar = styled.img`
  display: inline-block;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.2);
`;

if (!state.user) getUserData(props.user);

return (
  <>
    {state.user ? (
      <HStack>
        <Heading>{state.user?.login}</Heading>
        <Avatar src={state.user?.avatar_url} width={"36px"} height={"36px"} />
      </HStack>
    ) : null}
  </>
);
