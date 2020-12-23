import React from "react";
import { Link} from "react-scroll";

const Header = () => {
  const slideDown = element => element.style.height = `${element.scrollHeight}px`;
  const slideUp = element => element.style.height = 0;
  function showMenu() {
    document.getElementById('hideMenu').style.display = "block";
    slideDown(document.getElementById("dropdown"));
  }
  function hideMenu() {
    document.getElementById('hideMenu').style.display = "none";
    slideUp(document.getElementById("dropdown"));
  }
  return (
    <header>
      <div className="maintext" >Menu</div>
      <div className="navblock">
        <span className="section-name" id="section_ddl">Table № 2</span>
        <nav>
          Navigate
                <div className="menuicon showHideMenu" id='showMenu' onClick={() => showMenu()}></div>
          <div className="closemenu showHideMenu" id='hideMenu' onClick={() => hideMenu()}></div>
        </nav>
      </div>
      <div className="dropdown" id='dropdown'>
        <div>
          <ul>
            <Link to="Breakfasts" spy={true} smooth={true} offset={-100} duration={500}>
              <li>Breakfasts</li>
            </Link>
            <Link to="Main dishes" spy={true} smooth={true} offset={-100} duration={500}>
              <li>Main dishes</li>
            </Link>
            <Link to="Desserts" spy={true} smooth={true} offset={-100} duration={500}>
              <li>Desserts</li>
            </Link>
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Header;