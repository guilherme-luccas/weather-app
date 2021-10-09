import { useContext, useState } from "react";
import Switch from "react-switch";
import { ThemeContext } from "../ThemeContext";

export function SwitchToggle() {
  const [checked, setChecked] = useState(false);
  const { themeLight, ChangeTheme } = useContext(ThemeContext);

  function handleChange() {
    setChecked(!checked);
    ChangeTheme(themeLight);
    console.log(themeLight);
  }

  return (
    <div>
      <Switch onColor="#0ec99d85" onChange={handleChange} checked={checked} />
    </div>
  );
}
