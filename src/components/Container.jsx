import { useContext } from "react";
import { ThemeContext } from "../ThemeContext";

export function Container({ children }) {
  const { themeLight } = useContext(ThemeContext);

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100%",
        backgroundColor: themeLight ? "white" : "black",
      }}
    >
      {children}
    </div>
  );
}
