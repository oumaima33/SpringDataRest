import React from 'react';
import { Card, Form, Button, Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faUndo, faPlusSquare, faEdit } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useParams } from 'react-router-dom';

class Voiture extends React.Component {
    constructor(props) {
        super(props);

        this.state = this.initialState;
        this.voitureChange = this.voitureChange.bind(this);
        this.submitVoiture = this.submitVoiture.bind(this);
        this.resetVoiture = this.resetVoiture.bind(this);
    }

    initialState = {
        id: '',
        marque: '',
        modele: '',
        couleur: '',
        immatricule: '',
        prix: '',
        annee: ''
    };

    componentDidMount() {
        const { id } = this.props.params;  // Récupère l'ID depuis les paramètres d'URL
        if (id) {
            // Récupération des données de la voiture si l'ID existe
            axios.get(`http://localhost:8080/voitures/${id}`)
                .then(response => {
                    if (response.data) {
                        this.setState({
                            ...response.data
                        });
                    }
                })
                .catch(error => console.error("Erreur lors du chargement de la voiture :", error));
        }
    }

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

        const voitureId = this.state.id;
        if (voitureId) {
            axios.put(`http://localhost:8080/voitures/${voitureId}`, voiture)
                .then(response => {
                    if (response.data) {
                        alert("Voiture mise à jour avec succès");
                    }
                })
                .catch(error => console.error("Erreur de mise à jour de la voiture :", error));
        } else {
            axios.post("http://localhost:8080/voitures", voiture)
                .then(response => {
                    if (response.data) {
                        this.setState(this.initialState);
                        alert("Voiture enregistrée avec succès");
                    }
                })
                .catch(error => console.error("Erreur lors de l'enregistrement de la voiture :", error));
        }
    };

    voitureChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    render() {
        const { marque, modele, couleur, immatricule, annee, prix, id } = this.state;

        return (
            <Card className={"border border-dark bg-dark text-white"}>
                <Card.Header>
                    <FontAwesomeIcon icon={id ? faEdit : faPlusSquare} /> {id ? "Éditer" : "Ajouter"} une Voiture
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
                                    value={marque || ''}
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
                                    value={modele || ''}
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
                                    value={couleur || ''}
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
                                    value={immatricule || ''}
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
                                    value={annee || ''}
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
                                    value={prix || ''}
                                    autoComplete="off"
                                    onChange={this.voitureChange}
                                />
                            </Form.Group>
                        </Row>
                    </Card.Body>
                    <Card.Footer style={{ textAlign: "right" }}>
                        <Button size="sm" variant="success" type="submit">
                            <FontAwesomeIcon icon={faSave} /> {id ? "Mettre à jour" : "Enregistrer"}
                        </Button>{' '}
                        <Button size="sm" variant="info" type="reset">
                            <FontAwesomeIcon icon={faUndo} /> Réinitialiser
                        </Button>
                    </Card.Footer>
                </Form>
            </Card>
        );
    }
}

export default function VoitureWrapper(props) {
    const params = useParams();
    return <Voiture {...props} params={params} />;
}
