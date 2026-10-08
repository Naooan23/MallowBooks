import "./MenuBars.css";
import type { MenuButtonMovilProps } from "./MenuTypes";

export default function MenuButtonMovil(props: MenuButtonMovilProps) {
  return (
    <>
      <button
        className="btn m-2 d-sm-none"
        onClick={() => props.setOpen(!props.open)}
      >
        <i
          className={`bi ${props.open ? "bi-x" : "bi-list"}`}
          style={{ fontSize: "2rem", padding: "0rem" }}
        ></i>
      </button>
    </>
  );
}
