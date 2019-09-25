import React, {Component} from "react";
import "./Profile.scss";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";
import API from "../../utils/API";
import { Container, Col, Row } from "reactstrap";
// import { Col, Row, Container } from "../../components/Grid";
// import { List, ListItem } from "../../components/List";
// import Jumbotron from "../../components/Jumbotron/";
import DeleteBtn from "../../components/DeleteBtn/";


class Profile extends Component {
    state = {
        loggedIn: false,
        user: null,
        loading: true,
        name: "",
        chakra: "",
        color: "",
        metaProps: [],
        image: "",
        favorites: []
    }

    componentDidMount() {

        this.loading();

        API.isLoggedIn().then(user => {
            if (user.data.loggedIn) {
                // console.log(user.data);
                this.setState({
                    loggedIn: true,
                    user: user.data.user,
                    // userId: user.data.user.id
                });
                // console.log(user);
                this.loadFavs();
            }
        }).catch(err => {
            console.log(err);
        });

        console.log(this.props)

        
    }

    loading() {
        setTimeout(()=> {
            this.setState({
                loading: false
            })
        }, 1000)  
    }

    loadFavs= () => {
        console.log('inside loadFavs')
        API.getFavs()
        .then(res => 
            this.setState({ favorites: res.data, name: "", chakra: "", color: "", metaProps: "", image: "", userId: ""})
            )
            .catch(err => console.log(err));
           
    };



    deleteFav = id => {
        API.deleteFav(id)
        .then(res => this.loadFavs())
        .catch(err => console.log(err));
    }


    render() {
        return (
            <>
            <div className="profilePage">
                {this.state.loggedIn ? (
                    <div className="profileBox">
                        <h1 id="userTitle">Welcome {this.state.user.username}</h1>
                    </div>
                ) : (
                    <div className="noUser">
                        {!this.state.loading ? (
                            <>
                                <h1>Please log in</h1>
                                <Link className="loginLink" to="/login"><Button className="loginBtn" color="info" block>Login</Button></Link>
                            </>
                        ) : (
                            <img id="loadingIcon" src="./assets/images/loading-wheel.gif" alt="loading"/>
                        )}
                    </div> 
                )}
            </div>
            <Container>
                <Row>
                <Col sm="2">
                    <h2>Favorite Stones</h2>
           
                        {this.state.favorites.length ? (
                
                            <ul>
                                {this.state.favorites.map(fav => (
                    // console.log({fav}),
                            <ul key={fav._id}>
                            <strong>
                                {fav.favorite_name}
                            </strong>
                            <li>
                                {fav.favorite_chakra}
                            </li>
                            <li>
                                {fav.favorite_color}
                            </li>
                            <li>
                                {fav.favorite_metaProps}
                            </li>
                            <li>
                                <img src={fav.favorite_image} alt={fav.favorite_name} />
                            </li>

                            <DeleteBtn onClick={() => this.deleteFav(fav._id)} />
                    </ul>
                    ))}
                </ul>   
                ) : (
<h3>No Results to Display</h3>
                )}                  
                    
            </Col>
            </Row>
            </Container>
            </>

        )
    }
}


export default Profile;