import React from 'react'
import { Link } from 'react-router-dom';

const Menu = () => {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Invoce2Data</Link>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/AddInvoce">Add</Link>
              </li>
              <li className="nav-item">
                <Link  className="nav-link" to="/ListInvoces">Invoces</Link >
              </li>
            </ul>
          </div>
        </div>
      </nav>
    )
}
export default Menu;