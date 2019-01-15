import React, { Component } from 'react';
import Example from './components/Example';

class App extends Component {
    render () {
        return (
            <div>
                This is the root
                <Example />
            </div>
        )
    }
}

export default App