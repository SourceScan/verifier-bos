const Stack = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
`;

const ErrorAlert = styled.div`
  padding: 15px;
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
  border-radius: 4px;
`;

const Heading = styled.div`
  font-size: 18px;
  font-weight: 600;
`;

const Text = styled.div`
  font-size: 16px;
`;

return (
  <ErrorAlert>
    <Stack>
      <Text>{props.message}</Text>
    </Stack>
  </ErrorAlert>
);
