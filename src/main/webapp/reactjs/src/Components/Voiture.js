import React from 'react';
import { Card, Form, Button, Col, Row } from 'react-bootstrap'; // Import necessary components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faUndo, faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

export default class Voiture extends React.Component {
    constructor(props) {
        super(props);

        this.state = this.initialState;

        this.voitureChange = this.voitureChange.bind(this);
        this.submitVoiture = this.submitVoiture.bind(this);
        this.resetVoiture = this.resetVoiture.bind(this);
    }


    initialState = {
        marque: '',
        modele: '',
        couleur: '',
        immatricule: '',
        prix: '',
        annee: ''
    };


    resetVoiture = () => {
        this.setState(this.initialState);
    };


    submitVoiture = (event) => {
        event.preventDefault();
        const voiture = {
            marque: this.state.marque,
            modele: this.state.modele,
            couleur: this.state.couleur,
            immatricule: this.state.immatricule,
            annee: this.state.annee,
            prix: this.state.prix
        };
        console.log('Sending voiture data:', voiture);

        axios.post("http://localhost:8080/voitures", voiture)
            .then(response => {
                if (response.data != null) {
                    this.setState(this.initialState); // Reset form on success
                    alert("Voiture enregistrée avec succès");
                }
            })
            .catch(error => {
                console.error("There was an error!", error); // Optional: handle errors
                alert("Erreur lors de l'enregistrement de la voiture.");
            });
    };


    voitureChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    render() {
        // Destructure state for cleaner use in JSX
        const { marque, modele, couleur, immatricule, annee, prix } = this.state;

        return (
            <Card className={"border border-dark bg-dark text-white"}>
                <Card.Header>
                    <FontAwesomeIcon icon={faPlusSquare} /> Ajouter une Voiture
                </Card.Header>
                <Form onReset={this.resetVoiture} onSubmit={this.submitVoiture} id="VoitureFormId">
                    <Card.Body>
                        <Row>
                            <Form.Group as={Col} controlId="formGridMarque">
                                <Form.Label>Marque</Form.Label>
                                <Form.Control
                                    name="marque"
                                    type="text"
                                    className={"bg-dark text-white"}
                                    placeholder="Entrez Marque Voiture"
                                    value={marque}
                                    autoComplete="off"
                                    onChange={this.voitureChange}
                                />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridModele">
                                <Form.Label>Modèle</Form.Label>
                                <Form.Control
                                    name="modele"
                                    type="text"
                                    className={"bg-dark text-white"}
                                    placeholder="Entrez Modèle Voiture"
                                    value={modele}
                                    autoComplete="off"
                                    onChange={this.voitureChange}
                                />
                            </Form.Group>
                        </Row>

                        <Row>
                            <Form.Group as={Col} controlId="formGridCouleur">
                                <Form.Label>Couleur</Form.Label>
                                <Form.Control
                                    required
                                    name="couleur"
                                    type="text"
                                    className={"bg-dark text-white"}
                                    placeholder="Entrez Couleur Voiture"
                                    value={couleur}
                                    autoComplete="off"
                                    onChange={this.voitureChange}
                                />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridImmatricule">
                                <Form.Label>Immatricule</Form.Label>
                                <Form.Control
                                    required
                                    name="immatricule"
                                    type="text"
                                    className={"bg-dark text-white"}
                                    placeholder="Entrez Immatricule Voiture"
                                    value={immatricule}
                                    autoComplete="off"
                                    onChange={this.voitureChange}
                                />
                            </Form.Group>
                        </Row>

                        <Row>
                            <Form.Group as={Col} controlId="formGridAnnee">
                                <Form.Label>Année</Form.Label>
                                <Form.Control
                                    required
                                    name="annee"
                                    type="number"
                                    className={"bg-dark text-white"}
                                    placeholder="Entrez Année Voiture"
                                    value={annee}
                                    autoComplete="off"
                                    onChange={this.voitureChange}
                                />
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>Prix</Form.Label>
                                <Form.Control
                                    required
                                    name="prix"
                                    type="number"
                                    className={"bg-dark text-white"}
                                    placeholder="Entrez Prix Voiture"
                                    value={prix}
                                    autoComplete="off"
                                    onChange={this.voitureChange}
                                />
                            </Form.Group>
                        </Row>
                    </Card.Body>
                    <Card.Footer style={{ textAlign: "right" }}>
                        <Button size="sm" variant="success" type="submit">
                            <FontAwesomeIcon icon={faSave} /> Submit
                        </Button>{' '}
                        <Button size="sm" variant="info" type="reset">
                            <FontAwesomeIcon icon={faUndo} /> Reset
                        </Button>
                    </Card.Footer>
                </Form>
            </Card>
        );
    }
}
