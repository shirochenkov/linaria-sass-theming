import theme, { getCurrentTheme } from "../themeColors";

import { styled } from "linaria/react";

const Button = styled.button`
  color: #61dafb;

  border: 0;
  border-radius: 90%;
  font-size: 32px;
  width: 140px;
  height: 140px;

  background-color: ${(props) => props.theme("buttonBackground")};
  color: ${(props) => props.theme("textDark")};

  outline: 0;
`;

export const SwitchTheme = ({ toggleThemeType }) => {
  return (
    <Button onClick={toggleThemeType} theme={theme}>
      {getCurrentTheme() === "light" ? <>Dark &#9658;</> : <>Light &#9658;</>}
    </Button>
  );
};
