import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="nav">
      <div className="wrap">
        <Link className="brand" to="/">
          <span>M</span>Mga Munting Kamay
        </Link>
        <button
          className="toggle"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          Menu
        </button>
        <ul className={open ? "menu open" : "menu"}>
          <li>
            <NavLink to="/" end onClick={() => setOpen(false)}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" onClick={() => setOpen(false)}>
              About
            </NavLink>
          </li>
          <li>
            <NavLink to="/donate" onClick={() => setOpen(false)}>
              Donate
            </NavLink>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Navbar;