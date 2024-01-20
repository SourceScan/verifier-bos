const Button = styled.a`
  height: 36px;
  width: 96px;
  text-align: center;
  font-weight: 600;
  border-radius: 6px;
  padding-top: 5px;
  padding-bottom: 5px;
  border: 1px dashed ${state.theme.border};
  color: ${state.theme.color};
  background-color: ${state.theme.bg};
  transition: background-color 0.1s ease-in-out;

  &:hover,
  &:focus {
    background: #ecedee;
    text-decoration: none;
    outline: none;
    color: ${state.theme.color};
  }
  :hover {
    background-color: ${state.theme.hover.bg};
  }
`

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
  gap: 30px;

  @media only screen and (max-width: 750px) {
    text-align: center;
    align-items: center;
    justify-content: center;
    width: 95%;
  }
`

return {
  Button,
  CHStack,
  CStack,
  HStack,
  Stack,
  Text,
  Center,
  DashedContainer,
}
