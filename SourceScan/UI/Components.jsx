const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const CHStack = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  text-align: center;
  align-items: center;
  gap: 10px;
`

const HStack = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 10px;
`

const CStack = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  align-items: center;
  gap: 10px;
`

const Stack = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
`

const Text = styled.div`
  font-size: 16px;
`

const DashedContainer = styled.div`
  padding: 18px;
  color: currentColor;
  border: 1px dashed currentColor;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  justify-content: center;
  gap: 20px;
  width: 100%;

  @media only screen and (max-width: 750px) {
    text-align: center;
    align-items: center;
    justify-content: center;
    width: 95%;
  }
`

return {
  CHStack,
  CStack,
  HStack,
  Stack,
  Text,
  Center,
  DashedContainer,
}
