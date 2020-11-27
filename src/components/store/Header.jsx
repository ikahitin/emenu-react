import React from "react";

function Header() {
  const slideDown = element => element.style.height = `${element.scrollHeight}px`;
  const slideUp = element => element.style.height = 0;
  function showMenu(){
    document.getElementById('hideMenu').style.display = "block";
    slideDown(document.getElementById("dropdown"));
  }
  function hideMenu(){
    document.getElementById('hideMenu').style.display = "none";
    slideUp(document.getElementById("dropdown"));
  }
  const scrollTo = ele => {
    ele.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };
  return (
    <header>
      <div className="maintext">Menu</div>
      <div className="navblock">
        <span className="section-name" id="section_ddl">Main dishes</span>
        <nav>
          Navigate
                <div className="menuicon showHideMenu" id='showMenu' onClick={() => showMenu()}></div>
          <div className="closemenu showHideMenu" id='hideMenu' onClick={() => hideMenu()}></div>
        </nav>
      </div>
      <div className="dropdown" id='dropdown'>
        <div>
        <ul>
          <a href="/#Main dishes" onClick={() => { scrollTo(mainRef.current);}}>
            <li>Main dishes</li>
          </a>
          <a href="/#Breakfasts" onClick={() => { scrollTo(breakfastsRef.current);}}>
            <li>Breakfasts</li>
          </a>
          <a href="/#beverages">
            <li>Beverages</li>
          </a>
        </ul>
        </div>
      </div>
    </header>
  );
}

export default Header;