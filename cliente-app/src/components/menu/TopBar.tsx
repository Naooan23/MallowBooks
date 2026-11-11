import Logo from "../../pages/MainPage/Logo_t.png";
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