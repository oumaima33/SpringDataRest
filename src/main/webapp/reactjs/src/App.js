import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import NavigationBar from './Components/NavigationBar';
import Bienvenue from "./Components/Bienvenue";
import Footer from './Components/Footer';
import VoitureListe from './Components/VoitureListe';
import Voiture from './Components/Voiture';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

class App extends Component {


    render() {
        const marginTop = { marginTop: "20px" };

        return (
            <Router>
                <NavigationBar/>
                <Container>
                    <Row>
                        <Col lg={12} style={marginTop}>
                            <Routes>
                                <Route path="/" element={<Bienvenue />} />
                                <Route path="/add" element={<Voiture/>} />
                                <Route path="/list" element={<VoitureListe />} />
                                <Route path="/edit/:id" element={<Voiture/>}/>
                            </Routes>
                        </Col>
                    </Row>
                </Container>
                <Footer />
            </Router>
        );
    }
}

export default App;
