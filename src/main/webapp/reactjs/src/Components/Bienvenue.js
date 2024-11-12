import React from 'react';
import {Col, Jumbotron} from 'react-bootstrap';
class Bienvenue extends React.Component {
    render() {
        return (
            <div className="jumbotron" className="bg-dark text-white"><h1>
                    Bienvenue au Magasine des motors</h1>
                <blockquote className="blockquote mb-0"> <p>Le meilleur de nos voitures est exposé près de
                    chez vous</p>
                <footer className="blockquote-footer">Master MIOLA
            </footer>
        </blockquote>
    </div>


    )
        ;
    }
}

export default Bienvenue;