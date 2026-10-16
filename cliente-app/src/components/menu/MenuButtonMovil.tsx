import "./MenuBars.css";
import type { MenuButtonMovilProps } from "./MenuTypes";

export default function MenuButtonMovil({ open, setOpen }: MenuButtonMovilProps) {
  return (
    <>
      <button
        className="btn m-2 d-sm-none"
        onClick={() => setOpen(!open)}
      >
        <i
          className={`bi ${open ? "bi-x" : "bi-list"}`}
          style={{ fontSize: "2rem", padding: "0rem" }}
        ></i>
      </button>
    </>
  );
}
