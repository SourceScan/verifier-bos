const Stack = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
`;

const SuccessAlert = styled.div`
  padding: 15px;
  background-color: #d4edda; // Light green background
  color: #155724; // Dark green text color
  border: 1px solid #c3e6cb; // Greenish border
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
  <SuccessAlert>
    <Stack>
      <Text>{props.message}</Text>
    </Stack>
  </SuccessAlert>
);
