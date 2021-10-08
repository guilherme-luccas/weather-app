export function Button({ children }) {
  return (
    <button
      style={{
        width: 200,
        height: 40,
        padding: 10,
        backgroundColor: "#0ec99d85",
        border: "none",
        textDecoration: "none",
        cursor: "pointer",
        borderRadius: 10,
        fontFamily: "sans-serif",
        fontWeight: "bold",
      }}
    >
      {children}
    </button>
  );
}
