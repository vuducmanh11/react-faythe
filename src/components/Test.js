import React, { Component } from 'react';

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countries: [],
      colours: {}
    };
  }

  componentDidMount() {
    var xhr = new XMLHttpRequest()
    xhr.addEventListener('load', () => {
      console.log("fff");
      console.log(xhr.responseText)

    })
    xhr.open('DELETE', 'http://127.0.0.1:8600/scalers/7929723140d7673c776b281e1cac5689/16c1c48b4ecb14d4c62198356b1e406f')
    xhr.send()
  }


  render () {
    const { countries } = this.state;

    let countriesList = countries.length > 0
    	&& countries.map((item, i) => {
      return (
        <option key={i} value={item.id}>{item.name}</option>
      )
    }, this);

    return (
      <div>
        <select>
          {countriesList}
        </select>
      </div>
    );
  }
}

export default Test;