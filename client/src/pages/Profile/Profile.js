import React, { Component } from "react";
import "./Profile.scss";
import { Button, Container, Col, Row } from "reactstrap";
import { Link } from "react-router-dom";
import API from "../../utils/API";
import DeleteBtn from "../../components/DeleteBtn/";
import StoneName from "../../components/StoneName";
import StoneModal from "../../components/Modal"




class Profile extends Component {
    state = {
        loggedIn: false,
        user: null,
        loading: true,
        favorites: [],
        modalOpen: false,
        currentStone: {
            name: null,
            image: null,
            chakra: null,
            properties: null,
            color: null,
            userId: null
        }
    }

    componentDidMount() {

        this.loading();

        API.isLoggedIn().then(user => {
            if (user.data.loggedIn) {
                this.setState({
                    loggedIn: true,
                    user: user.data.user
                });
                this.loadFavs();
            }
        }).catch(err => {
            console.log(err);
        });



    }

    loading() {
        setTimeout(() => {
            this.setState({
                loading: false
            })
        }, 1000)
    }

    loadFavs = () => {
        API.getFavs()
            .then(res => {
                this.setState({ favorites: res.data })
                
            }
            )
            .catch(err => console.log(err));

    };


    deleteFav = id => {
        API.deleteFav(id)
            .then(res => this.loadFavs())
            .catch(err => console.log(err));
    }

    toggle = () => {
        this.setState(prevState => ({
            modalOpen: !prevState.modalOpen
        }));
    }

    stoneModalOpen = (event, stone) => {
        event.preventDefault();
        this.setState({
            modalOpen: true, 
            currentStone: {
                name: stone.favorite_name,
                image: stone.favorite_image,
                chakra: stone.favorite_chakra,
                properties: stone.favorite_metaProps,
                color: stone.favorite_color,
                userId: stone.favorite_userId
            }
        });

    }


    render() {
        return (
            <Container fluid>
                <Row>
                    <Col sm={{ size: 3, offset: 1 }}>
                        {this.state.loggedIn ? (
                            <h1 className="pageTitle">
                                <span className="header">WELCOME</span><br />
                                {this.state.user.username}
                            </h1>
                        ) : (
                                <div className="noUser">
                                    {!this.state.loading ? (
                                        <>
                                            <h1>Please Log In</h1>
                                            <Link className="loginLink" to="/login"><Button className="loginBtn">Login</Button></Link>
                                        </>
                                    ) : (
                                            <img id="loadingIcon" src="./assets/images/loading-wheel.gif" alt="loading" />
                                        )}
                                </div>
                            )}
                    </Col>
                </Row>
                <Row>
                    <Col sm="12">
                        <Container>
                            <Row>
                                {this.state.favorites.length ? (
                                    (this.state.favorites.map(stone => (
                                        <>
                                            <StoneName
                                                key={stone.favorite_name}
                                                name={stone.favorite_name}
                                                image={stone.favorite_image}
                                                stoneModalOpen={(event) => this.stoneModalOpen(event, stone)}
                                                toggle={this.toggle}
                                            />

                                            <DeleteBtn onClick={() => this.deleteFav(stone._id)} />
                                        </>
                                    )))
                                ) : (
                                        <>
                                            <Col sm={{ size: 3, offset: 3 }}>
                                                <h3>No Results to Display</h3>
                                            </Col>
                                        </>
                                    )}

                                <StoneModal
                                    modalOpen={this.state.modalOpen}
                                    toggle={this.toggle}
                                    isOpen={this.state.modalOpen}
                                    stone={this.state.currentStone}
                                    className="centered"
                                    deleteFav={this.deleteFav}
                                />


                            </Row>
                        </Container>
                    </Col>
                </Row>
            </Container>
        )
    }
}


export default Profile;

