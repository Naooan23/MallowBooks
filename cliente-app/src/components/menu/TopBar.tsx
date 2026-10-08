import Logo from "../../assets/Logo.jpg";
import "./MenuBars.css";
import MenuDesktop from "./MenuDesktop.js";

interface LogoInterface {
  hayLogo: boolean
}

export default function TopBar({ hayLogo }: LogoInterface) {
  return (
    <div className="app-navbar">
      <MenuDesktop hayLogo={hayLogo} Logo={Logo} />
    </div>
  );
}