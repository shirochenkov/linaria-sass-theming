import { useState, useCallback, useEffect } from "react";
import { styled } from "linaria/react";

import theme, { initThemeObserver } from "./themeColors";

import { Icon, SwitchTheme } from "./components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme("backgroundColor")};
  transition: background-color 300ms ease-in-out;
`;

function App() {
  // const [, updateState] = useState();
  // const forceUpdate = useCallback(() => updateState({}), []);

  useEffect(() => {
    document.documentElement.classList.add("light");
  }, []);

  // useEffect(() => {
  //   const themeObserver = initThemeObserver(forceUpdate);
  //   return () => {
  //     if (themeObserver) themeObserver.disconnect();
  //   };
  // });

  const toggleThemeType = () => {
    document.documentElement.classList.toggle("light");
    document.documentElement.classList.toggle("dark");
  };

  return (
    <Wrapper theme={theme}>
      <Icon />
      <SwitchTheme toggleThemeType={toggleThemeType} />
    </Wrapper>
  );
}

export default App;
