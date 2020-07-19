import React from "react";
import { logout } from "../services/auth";
import { withRouter } from "react-router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import 'bootstrap/js/dist/dropdown';
import { Link } from 'react-router-dom'

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nome: localStorage.getItem("nome"),
    }
    this.fazerLogout = this.fazerLogout.bind(this)
  }

  fazerLogout() {
    logout();
    this.props.history.push('/login')
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light main-nav justify-content-between ">
        <ul className="align-items-center nav">
          <li className="nav-item d-lg-block" href="#">
            <div className="btn-group">
              <div type="button" className="btn dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" href="#" aria-expanded="false">
                <FontAwesomeIcon icon={faUser} className={"mr-2"} />
                {this.state.nome}
              </div>
              <div className="dropdown-menu text-center">
                <Link className="dropdown-item" to="/">Home</Link>
                <Link className="dropdown-item" to="/lacar-despesas">Lançar Despesas</Link>
                <div className="dropdown-divider mr-4 ml-4"></div>
                <a className="dropdown-item" href="/login" onClick={this.fazerLogout}>Fazer logout</a>
              </div>
            </div>
          </li>
        </ul>
      </nav >
    );
  }
}

export default withRouter(Menu)