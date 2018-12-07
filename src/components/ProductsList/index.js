import React, { Component } from "react";
import * as firebase from "firebase";

class ProductsList extends Component {
  constructor() {
    super();

    this.state = {
      products: []
    }
  }

  componentDidMount = () => {
    const db = firebase.firestore();
    let self = this;
    // TODO step 5 - fetch data from Firebase
    db.collection("devices").onSnapshot(function(querySnapshot) {
        const products = [];
        querySnapshot.forEach(function(device) {
          products.push(device.data())
        });
        self.setState({
          products: products
        });
    })
  };

  render = () => {
    return (
      <div className="card">
        <div className="card-header">Product List</div>
        <div className="card-body">
          <ul className="list-group">
            { this.state.products.map( (product, index) => {
              return (
                <li className="list-group-item" key={index}>
                  {product.name}
                <span className="badge badge-pill badge-success">{product.daysOut}</span>
                </li>
              )}) }
          </ul>
        </div>
      </div>
    );
  };
}

export default ProductsList;
