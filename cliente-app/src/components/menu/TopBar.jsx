import Logo from "../../assets/Logo.jpg";
import MenuDesktop from "./MenuDesktop.jsx";
import "./TopBar.css";

export default function AppTopBar({ hayLogo }) {
  // const [open, setOpen] = useState(false);
  // const [colSize, setColSize] = useState(0);

  // const DefinirRutas = (items) => {
  //   if (items <= 4) {
  //     setColSize(3);
  //   } else {
  //     setColSize(4);
  //   }
  // };

  // useEffect(() => {

  //   DefinirRutas(appRoutes.filter((x) => x.menu === true).length);
  // }, []);

  return (
    <div className="app-navbar">
      {/* <div>
        <MenuButtonMovil
          props={{
            open,
            setOpen,
          }}
        />
      </div> */}

      {/* <MenuMovil
        colSize={colSize}
        hayLogo={hayLogo}
        Logo={Logo}
        open={open}
        onClick={() => setOpen(!open)}
      /> */}

      <MenuDesktop hayLogo={hayLogo} Logo={Logo} />
    </div>
  );
}