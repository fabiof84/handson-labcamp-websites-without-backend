import React, { Component } from "react";
import * as firebase from 'firebase';

import Select from "../Select";
class AddProduct extends Component {
  constructor() {
    super();

    this.state = {
      products: [],
      selectedOption: ""
    };
  }

  componentDidMount = () => {
    // TODO step 11 - fetch data from Firebase
    const db = firebase.firestore();
    let self = this;
    const products = [];
    // TODO step 5 - fetch data from Firebase
    db.collection("devices").get().then(function(querySnapshot) {
      querySnapshot.forEach(function(device) {
        products.push(device.data().name);
      })
      self.setState({
        products: products
      });
    });
  };

  handleSelectChange = selectedOption => {
    console.log(selectedOption);
    this.setState({
      selectedOption
    });
  };

  handleSubmitClick = async () => {
    /* TODO - step 14: push data in Firebase db using transactions */
    let self = this;
    const db = firebase.firestore();
    db.collection("devices").where("name", "==", self.state.selectedOption)
    .get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        console.log(doc.data());
        db.collection("devices").doc(doc.id).update({
            daysOut: doc.data().daysOut + 1
          });
      });
    })
  };

  render = () => {
    return (
      <div className="card">
        <div className="card-header">Add one product</div>
        <div className="card-body">
          <div className="input-group">
            {/* TODO step 12 - pass the options from the state to this select and handle onChange event */}
            <Select
              value={this.state.selectedOption}
              options={this.state.products}
              changed={this.handleSelectChange}
            />
            <div className="input-group-append">
              {/* TODO - step 13: handle onClick of this button */}
              <button
                className="btn btn-primary"
                disabled={this.state.selectedOption === ""}
                onClick={this.handleSubmitClick}
              >
                Aggiungi prodotto
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
}

export default AddProduct;
