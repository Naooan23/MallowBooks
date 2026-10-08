import Logo from "../../assets/Logo.jpg";
import "./MenuBars.css";
import MenuDesktop from "./MenuDesktop.jsx";

export default function AppTopBar({ hayLogo }) {
  return (
    <div className="app-navbar">
      <MenuDesktop hayLogo={hayLogo} Logo={Logo} />
    </div>
  );
}