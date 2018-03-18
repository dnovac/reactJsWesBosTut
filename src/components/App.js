import React from "react";

import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import Fish from "./Fish";

import sampleFishes from "../sample-fishes";

class App extends React.Component {
  constructor() {
    super();

    //we need this to make the word this point to the current object (App) in those methods
    this.addFish = this.addFish.bind(this);
    this.loadSamples = this.loadSamples.bind(this);
    this.addToOrder = this.addToOrder.bind(this);

    //getinitialState
    this.state = {
      fishes: {},
      order: {}
    };
  }

  addFish(fish) {
    //update our state
    //get a copy of our current state
    //... ES6 syntax, makes an array of each fish from state
    const fishes = { ...this.state.fishes };
    //add in our new fish
    const timestamp = Date.now(); //for unique key
    fishes[`fish-${timestamp}`] = fish; //this is the updated fishes but not yet set on state
    //set state
    this.setState({ fishes: fishes }); //set only the updated thing from the state object, we sent just fishes, not entire state
    //in ES6 we can pass just fishes because key == value of Object. {fishes} is enough
  }

  loadSamples() {
    this.setState({
      fishes: sampleFishes
    });
  }

  addToOrder(key) {
    //take a copy of our state
    const order = { ...this.state.order };
    //update or add the new number of fish order
    order[key] = order[key] + 1 || 1;
    //update our state
    this.setState({
      order
    });
  }

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh seafood Market" />
          <ul className="list-of-fishes">
            {Object.keys(this.state.fishes).map(key => (
              <Fish
                key={key}
                index={key}
                details={this.state.fishes[key]}
                addToOrder={this.addToOrder}
              />
            ))}
          </ul>
        </div>
        <Order fishes={this.state.fishes} order={this.state.order}
         />
        <Inventory addFish={this.addFish} loadSamples={this.loadSamples} />
      </div>
    );
  }
}

export default App;
