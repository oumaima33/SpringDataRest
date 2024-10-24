import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class NavigationBar extends React.Component {
    render() {
        return (
            <Navbar bg="dark" variant="dark">
                    <Link to={""} className="navbar-brand">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/1/17/Tata_Tamo_Racemo.jpg"
                            width="25"
                            height="25"
                            alt="Tata Tamo Racemo"/>
                    </Link>
                    <Link to={"add"} className="nav-link">
                        Ajouter une Voiture
                    </Link>
                    <Link to={"list"} className="nav-link">
                    Liste des Voitures
                    </Link>

            </Navbar>
        );
    }
}

export default NavigationBar;
