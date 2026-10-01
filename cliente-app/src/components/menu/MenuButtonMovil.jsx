import "./TopBar.css";

export default function MenuButtonMovil({ props }) {
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
