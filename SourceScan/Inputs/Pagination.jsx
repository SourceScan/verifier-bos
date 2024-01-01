State.init({
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
  pages: props.pages || 1,
  selectedPage: props.selectedPage || 1,
});

const HStack = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex-direction: row;
  gap: 10px;
`;

const PageButton = styled.button`
  font-weight: 600;
  border-radius: 5px;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 16px;
  padding-right: 16px;
  border: 1px dashed ${state.theme.border};
  color: ${state.theme.color};
  background-color: ${state.theme.bg};
  transition: background-color 0.1s ease-in-out;

  :hover {
    background-color: ${state.theme.hover.bg};
  }
`;

const range = (start, stop, step) =>
  Array.from(
    { length: (stop - start) / step + 1 },
    (value, index) => start + index * step
  );

const handlePageChange = (x) => {
  State.update({
    selectedPage: x + 1,
    from_index: x * state.limit,
  });
  searchContracts();
};

return (
  <>
    {state.pages ? (
      <HStack>
        {range(
          state.pages > 1
            ? state.selectedPage > 2
              ? state.selectedPage - 2
              : 0
            : state.selectedPage - 1,
          state.pages > 1
            ? state.selectedPage + 1 < state.pages
              ? state.selectedPage
              : state.pages - 1
            : state.pages - 1,
          1
        ).map((x, i) => (
          <PageButton
            key={i}
            onClick={() => props.handlePageChange(x)}
            style={
              state.selectedPage === x + 1
                ? {
                    textDecoration: "underline",
                    textUnderlineOffset: "2px",
                  }
                : null
            }
          >
            {x + 1}
          </PageButton>
        ))}
      </HStack>
    ) : null}
  </>
);
