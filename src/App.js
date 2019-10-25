import React from 'react';

require('./App.scss');
let _ = require('lodash');


//let yeomanImage = require('../images/yeoman.png');
//<img src={yeomanImage} alt="Yeoman Generator" />

class AppComponent extends React.Component {
  
  constructor(props) {
      super(props);
      this.state = {
        names: 'Tal Nitai Or Elvira Salomon Phillip Aaron'.split(' '),
      };
    }

    render() {
      return (
          <div className="main">
            <div className="names">
              {_.map(this.state.names, name => <div className="name">{name}</div>)}
            </div>

            <div className="input">
              <input ref="name" />
              <button className="add" onClick={() => this.onAdd()}>Add</button>
            <button className="randomize" onClick={() => this.onRandomize()}>Randomize</button>
          </div>

          <div className="pods">
            {_.map(this.state.pods, pod =>
              <div className="pod">
                {_.map(pod, name =>
                  <div className="name">{name}</div>
              )}
            </div>
          )}
        </div>
          </div>
      );
    }

    onAdd() {
      let names = this.state.names;
      names.push(this.refs.name.value);
      this.refs.name.value = '';
      this.setState({names: names});
    }

    onRandomize() {
      let names = this.state.names;
      let pods = [];
      let c = 0;

      if (names.length == 0  &&  this.state.pods.length > 0) {
        names = _.flatten(this.state.pods);
      }

      let podCount = Math.round(names.length / 4);

      while (names.length > 0) {
        let idx = Math.round(Math.random() * (names.length - 1));
        let name = names.splice(idx, 1)[0];
        pods[c % podCount] = (pods[c % podCount] || []);
        pods[c % podCount].push(name);
        c++;
      }

      this.setState({names: [], pods: pods});
    }
}

AppComponent.defaultProps = {
};

export default AppComponent;
