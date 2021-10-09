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
        backgroundColor: themeLight ? "white" : "black",
        paddingBottom: "30px",
      }}
    >
      {children}
    </div>
  );
}
