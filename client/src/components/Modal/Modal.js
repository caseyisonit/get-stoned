import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import StoneName from "../StoneName";
import API from "../../utils/API";
import "./ModalStyle.scss";

class StoneModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      favText: "Add to Favorites",
      favoriteStones: []
    };

  }

  componentDidMount() {
    API.getFavs().then(res => {
      let favoriteStonesToBe = []
      res.data.forEach(stone => {
        favoriteStonesToBe.push(stone.favorite_name)
      })
      this.setState({ favoriteStones: favoriteStonesToBe })
      console.log(this.state.favoriteStones)
    })



  }

  handleClick = () => {
    if (this.props.stone.name === this.state.favoriteStones.favorite_name) {
      this.setState({ favText: "Added to Favorites" })
    } else {

      this.setState({ favText: "Saved to Favorites" })

      // let favoritesCopy = [...this.state.favoriteStones]
      // favoritesCopy.push(this.props.stone)
      // this.setState({ favoriteStones: favoritesCopy })
      console.log(this.props.stone.name)

      API.saveFav({
        favorite_name: this.props.stone.name,
        favorite_color: this.props.stone.color,
        favorite_chakra: this.props.stone.chakra,
        favorite_metaProps: this.props.stone.properties,
        favorite_image: this.props.stone.image,
        favorite_imageText: this.props.stone.imageText
      }).then(res => console.log('success', res.data))
        .catch(err => console.log(err));
      }  
    };



    render() {
      return (
        <div>
          {this.props.stone ? (
            <>
              <StoneName onClick={this.props.toggle} />
              <Modal isOpen={this.props.modalOpen} toggle={this.props.toggle} className={this.props.className} centered >
                <ModalHeader toggle={this.toggle} cssModule={{ 'modal-title': 'w-100 text-center' }}><img src={this.props.stone.image} alt={this.props.stone.name} className="modalStone" />{this.props.stone.name}</ModalHeader>
                <ModalBody cssModule={{ 'modal-text': 'w-100 text-center' }}>
                  <h6>Chakras</h6>
                  <ul>
                    <li>{this.props.stone.chakra}</li>
                  </ul>
                  <span className="space" />
                  <h6>Color</h6>
                  <ul>
                    <li>{this.props.stone.color}</li>
                  </ul>
                  <span className="space" />
                  <h6>Properties</h6>
                  <ul>
                    {this.props.stone.properties}
                    <li></li>
                  </ul>
                </ModalBody>
                <ModalFooter>
                  {this.state.favoriteStones.includes(this.props.stone.name) ? (

                    // <a href="/profile"><Button color="primary" className="faveButton">Saved to Favorites</Button></a>
                    <Button color="primary" className="faveButton" onClick={() => this.props.deleteFav(this.props.stone._id)}>Delete from Favorites</Button>
                  ) : (
                      <Button color="primary" className="faveButton" onClick={this.handleClick}>{this.state.favText}</Button>

                    )}

                </ModalFooter>
              </Modal>
            </>
          ) : null}
        </div>
      );
    }
  }


  export default StoneModal;