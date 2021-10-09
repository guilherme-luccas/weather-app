import { useContext } from "react";
import { ThemeContext } from "../ThemeContext";

export function Loading() {
  const { themeLight } = useContext(ThemeContext);

  return (
    <div style={{ color: themeLight ? "black" : "white" }}>Carregando...</div>
  );
}
