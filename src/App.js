import React from 'react';

require('./App.scss');
let _ = require('lodash');

class AppComponent extends React.Component {
  
    constructor(props) {
      super(props);
      this.state = {
        names: [],
        showRecent: false,
      };
    }

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

    render() {
        let recentNames = _.difference(JSON.parse(localStorage.getItem('recent')) || [], this.state.names);

        let recent;
        if (recentNames.length > 0) {
            recent = (
                <div className='recent'>
                    <div className='title'>Recently used</div>
                    <div className='names'>
                        {_.map(recentNames, (name, idx) => (
                            <div key={name} className='name' onClick={() => {this.onAdd(name)}}>{name}</div>
                        ))}
                    </div>
                </div>
            );
        }

        let input = (
            <div className='input'>
                <input ref='name' onKeyPress={e => {if (e.key === 'Enter') this.onAddFromInput()}} />
                <button className='add' onClick={() => this.onAddFromInput()}>Add</button>
                <button className='randomize' onClick={() => this.onRandomize()}>Randomize</button>                
            </div>
        );

        let names = (
            <div className='names'>
                {_.map(this.state.names, (name, idx) => 
                    <div key={name} className='name' onClick={() => this.onRemove(idx)}>{name}</div>
                )}
            </div>
        );

        let pods = (
            <div className='pods'>
                {_.map(this.state.pods, (pod, podIdx) =>
                    <div key={podIdx} className='pod'>
                        {_.map(pod, (name, idx) =>
                            <div key={idx} className='name'>{name}</div>
                        )}
                    </div>
                )}  
            </div>
        );

        return (
            <div className={'main ' + (this.state.showRecent ? 'showRecent' : 'hideRecent')}>
                {input}
                {recent}
                {names}
                {pods}
          </div>
        );
    }

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

    onAdd(name) {
        name = name.trim();
        if (name.length === 0) return;

        let names = this.state.names;
        if (_.includes(names, name)) return;

        names.push(name);
        
        let recent = JSON.parse(localStorage.getItem('recent')) || [];
        recent.push(name);
        localStorage.setItem('recent', JSON.stringify(_.uniq(recent)));

        this.setState({names: names});
    }

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

    onAddFromInput() {
        let input = this.refs.name.value;
        _.each(input.split(';'), name => this.onAdd(name));

        this.refs.name.value = '';
        this.refs.name.focus();
    }

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

    onRemove(idx) {
        let names = this.state.names;
        names.splice(idx, 1);
        this.setState({names: names});
    }

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

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

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

    onShowHideRecent() {
        this.setState({showRecent: !this.state.showRecent});
    }
}

AppComponent.defaultProps = {
};

export default AppComponent;
