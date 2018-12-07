import React, { Component } from "react";

import Input from "../Input";

import * as firebase from "firebase";

class NewProduct extends Component {
  constructor() {
    super();

    this.state = {
      productName: "",
      daysOut: 0
    };
  }

  handleInputChange = (name, value) => {
    this.setState({
      [name]: value
    }, () => {
      // callback eseguita dopo il set state
    });
  };

  handleSubmitClick = async () => {
    /* TODO - step 9: push data in Firebase db */
    const db = firebase.firestore();
    db.collection("devices").add({
      name: this.state.productName,
      daysOut: this.state.daysOut
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
  };

  render = () => {
    return (
      <div className="card">
        <div className="card-header">New product</div>
        <div className="card-body">
          <div className="form-inline">
            <div className="form-group">
              {/* TODO - step 7: connect this input to the state */}
              <Input
                name="productName"
                type="text"
                placeholder="Nome del prodotto"
                onChange={this.handleInputChange}
                value={this.state.productName}
              />
            </div>
            <div className="form-group mx-sm-3">
              {/* TODO - step 7: connect this input to the state */}
              <Input
                name="daysOut"
                type="number"
                placeholder="Quantità"
                onChange={this.handleInputChange}
                value={this.state.daysOut}
              />
            </div>

            {/* TODO - step 8: handle onClick of this button */}
            <button
              className="btn btn-primary"
              disabled={
                this.state.productName === "" || this.state.productQnt === 0
              }
              onClick={this.handleSubmitClick}
            >
              Aggiungi nuovo prodotto
            </button>
          </div>
        </div>
      </div>
    );
  };
}

export default NewProduct;
