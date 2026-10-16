import type { ChildrenProp } from "../GeneralTypes";

export function BasePage({ children }: ChildrenProp) {
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
