const _ = require("lodash");
const themeColors = require("./colors.module.scss");

const DEFAULT_THEME = "light";

const themes = _.map(themeColors.themes.split(","), (val) => _.trim(val));

/*
  For each theme variable, we pick the ones that start with "theme_".
  These will be our theme variables as theme_themeName_variableName.
  This will output a flat object of variable names with their values.
*/
const themeVars = _.pickBy(themeColors, (value, key) => {
  if (key === "themes") return false;
  if (key.indexOf("theme_") !== 0) return false;
  return true;
});

/*
  This transforms the flat object from above into a nested object like so:
  {
    themeName: {
      variableName: value,
      ...
    },
    ...
  }
*/
const byTheme = _.transform(
  themeVars,
  (result, value, key) => {
    const parts = key.split("_");
    const theme = parts[1];
    const variable = parts[2];
    result[theme] = result[theme] || {};
    result[theme][variable] = value;
  },
  {}
);

/*
  gets the current theme the user has applied, from the html el classname
*/
export function getCurrentTheme() {
  const htmlClasses = document.querySelector("html").className.split(/\s+/);
  const matches = _.intersection(themes, htmlClasses);
  return matches[0] || DEFAULT_THEME;
}

/*
  similar to the scss theme() method - returns the color for the current theme
*/
export default function theme(variableName) {
  const currentTheme = getCurrentTheme();
  const variables = byTheme[currentTheme];
  return variables[variableName];
}

/* *************** functions below here are not generally needed except at the root app level ***************** */

function onMutationChange(onThemeChange, mutationsList) {
  let wasUpdated = false;
  const currentTheme = getCurrentTheme();

  mutationsList.forEach((mutation) => {
    if (mutation.attributeName === "class") {
      if (currentTheme !== window.__currentTheme) {
        wasUpdated = true;
      }
    }
  });

  if (wasUpdated) {
    onThemeChange(window.__currentTheme, currentTheme);
    window.__currentTheme = currentTheme;
  }
}

/*
  inits a mutation observer to watch the html element for class changes.
  onThemeChange should be a method with optional usage of params oldTheme, newTheme.

  This is needed for react, since react won't rerender with the new theme colors
  if the theme changes. We can watch the change manually, then have a callback that 
  allows us to manually rerender as a result.
*/
export function initThemeObserver(onThemeChange) {
  window.__currentTheme = getCurrentTheme();
  const themeObserver = new MutationObserver(
    onMutationChange.bind(null, onThemeChange)
  );
  themeObserver.observe(document.querySelector("html"), { attributes: true });
  return themeObserver;
}
