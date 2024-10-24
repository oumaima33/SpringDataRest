import axios from 'axios';
import React, { Component } from 'react';
import { Card, Table, Button, ButtonGroup } from 'react-bootstrap';  // Import Bootstrap components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';  // Import FontAwesome icons
import { Link } from 'react-router-dom';

export default class VoitureListe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            voitures: []
        };
    }


    componentDidMount() {
        axios.get("http://localhost:8080/voitures")
            .then(response => response.data)
            .then((data) => {
                this.setState({ voitures: data });  // Update state with fetched data
            })
            .catch(error => {
                console.error("There was an error!", error);  // Optional: handle errors
            });
    }


    deleteVoiture = (voitureId) => {
        axios.delete("http://localhost:8080/voitures/" + voitureId)  // Fixing the URL
            .then(response => {
                if (response.data != null) {
                    alert("Voiture supprimée avec succès.");
                    this.setState({
                        voitures: this.state.voitures.filter(voiture => voiture.id !== voitureId)
                    });
                }
            })
            .catch(error => {
                console.error("There was an error deleting the voiture!", error);
            });
    }

    render() {
        return (
            <Card className="border border-dark bg-dark text-white">
                <Card.Header><FontAwesomeIcon icon={faList} /> Liste Voitures</Card.Header>
                <Card.Body>
                    <Table bordered hover striped variant="dark">
                        <thead>
                        <tr>
                            <th>Marque</th>
                            <th>Modele</th>
                            <th>Couleur</th>
                            <th>Immatricule</th>
                            <th>Annee</th>
                            <th>Prix</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.voitures.length === 0 ?
                                <tr align="center">
                                    <td colSpan="7">Aucune voiture disponible.</td>
                                </tr> :
                                this.state.voitures.map((voiture) => (
                                    <tr key={voiture.id}>
                                        <td>{voiture.marque}</td>
                                        <td>{voiture.modele}</td>
                                        <td>{voiture.couleur}</td>
                                        <td>{voiture.immatricule}</td>
                                        <td>{voiture.annee}</td>
                                        <td>{voiture.prix}</td>
                                        <td>
                                            <ButtonGroup>
                                                <Link to={"edit/"+voiture.id} className="btn btn-sm btn-outline-primary">
                                                    <FontAwesomeIcon icon={faEdit} />
                                                </Link>{' '}

                                                <Button size="sm" variant="outline-danger"
                                                        onClick={() => this.deleteVoiture(voiture.id)}>
                                                    <FontAwesomeIcon icon={faTrash} />
                                                </Button>
                                            </ButtonGroup>
                                        </td>
                                    </tr>
                                ))
                        }
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        );
    }
}
