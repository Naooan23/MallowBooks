export function BasePage({ children }) {
  return (<div
    style={{
      display: "flex",
      width: "100%",
      height: "100vh",
      backgroundColor: "red",
      padding: "2rem"
    }}
  >
    {children}
  </div>);
}
