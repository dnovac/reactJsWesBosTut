import React from "react";
import { getFunName } from "../helpers";

class StorePicker extends React.Component {
  /*  constructor() {
    super();
    //for making this(StorePicker obj) available in goToStore method by calling it with "this."
    this.goToStore = this.goToStore.bind(this);
  } */

  goToStore(event) {
    event.preventDefault();
    console.log("You changed the URL");
    //first grab the text from the box
    const storeId = this.storeInput.value;
    console.log(`Going to ${storeId}`);
    //second wr're going to transition from / to /store/:storeId
    this.context.router.transitionTo(`/store/${storeId}`);
  }

  render() {
    return (
      <form className="store-selector" onSubmit={e => this.goToStore(e)}>
        <h2>Please Enter a Store</h2>
        <input
          type="text"
          required
          placeholder="Store Name"
          defaultValue={getFunName()}
          ref={input => {
            this.storeInput = input;
          }}
        />
        <button type="submit">Viist Store</button>
      </form>
    );
  }
}

/****** Needs this to add a router to this Component *******/
StorePicker.contextTypes = {
  router: React.PropTypes.object
};

export default StorePicker;
