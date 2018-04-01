import React from "react";

import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import Fish from "./Fish";
import sampleFishes from "../sample-fishes";

import base from "../base";

class App extends React.Component {
  constructor() {
    super();

    //we need this to make the word this point to the current object (App) in those methods
    this.addFish = this.addFish.bind(this);
    this.updateFish = this.updateFish.bind(this);
    this.removeFish = this.removeFish.bind(this);
    this.loadSamples = this.loadSamples.bind(this);
    this.addToOrder = this.addToOrder.bind(this);
    this.removeFromOrder = this.removeFromOrder.bind(this);

    //getinitialState
    this.state = {
      fishes: {},
      order: {}
    };
  }

  componentWillMount() {
    //this runs right before the <App></App> is rendered
    this.ref = base.syncState(`${this.props.params.storeId}/fishes`, {
      context: this,
      state: "fishes"
    });

    //check if there is any order in localStorage
    const localStorageRef = localStorage.getItem(
      `order-${this.props.params.storeId}`
    );

    if (localStorageRef) {
      //update our App component's order state
      this.setState({
        //turn a json back into object
        order: JSON.parse(localStorageRef)
      });
    }
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  componentWillUpdate(nextProps, nextState) {
    console.log("Something changed");
    console.log({ nextProps, nextState });

    localStorage.setItem(
      `order-${this.props.params.storeId}`,
      JSON.stringify(nextState.order)
    );
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


  updateFish(key, updatedFish) {
    const fishes = {...this.state.fishes};
    fishes[key] = updatedFish;
    this.setState({ fishes });
  }


  removeFish(key) {
    const fishes = {...this.state.fishes};
    fishes[key] = null;
    this.setState({fishes});
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

  removeFromOrder(key) {
    const order = {...this.state.order};
    delete order[key];
    this.setState({order});
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
        <Order
          fishes={this.state.fishes}
          order={this.state.order}
          params={this.props.params}
          removeFromOrder={this.removeFromOrder}
        />
        <Inventory 
        addFish={this.addFish} 
        removeFish={this.removeFish} 
        loadSamples={this.loadSamples}
        fishes={this.state.fishes}
        updateFish={this.updateFish}  
        storeId={this.props.params.storeId}
        />
      </div>
    );
  }
}

App.prototypes = {
  params: React.PropTypes.object.isRequired
}

export default App;
