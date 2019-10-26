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
                <div className="input">
                    <input ref="name" />
                    <button className="add" onClick={() => this.onAdd()}>Add</button>
                    <button className="randomize" onClick={() => this.onRandomize()}>Randomize</button>
                </div>

                <div className="names">
                    {_.map(this.state.names, (name, idx) => 
                        <div key={name} className="name" onClick={() => this.onRemove(idx)}>{name}</div>
                    )}
                </div>

                {<div className="pods">
                    {_.map(this.state.pods, (pod, podIdx) =>
                        <div key={podIdx} className="pod">
                            {_.map(pod, (name, idx) =>
                                <div key={idx} className="name">{name}</div>
                            )}
                        </div>
                    )}  
                </div>}
          </div>
      );
    }

    onAdd() {
      let names = this.state.names;
      names.push(this.refs.name.value);
      this.refs.name.value = '';
      this.setState({names: names});
    }

    onRemove(idx) {
      let names = this.state.names;
      names.splice(idx, 1);
      this.setState({names: names});
    }

    onRandomize() {
      let names = _.union(this.state.names, _.flatten(this.state.pods));
      let pods = [];
      let c = 0;

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
