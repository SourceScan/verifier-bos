const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CHStack = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  text-align: center;
  align-items: center;
  gap: 10px;
`;

const HStack = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 10px;
`;

const CStack = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  align-items: center;
  gap: 10px;
`;

const Stack = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
`;

const Text = styled.div`
  font-size: 16px;
`;

return {
  CHStack,
  CStack,
  HStack,
  Stack,
  Text,
  Center,
  DashedContainer,
};
