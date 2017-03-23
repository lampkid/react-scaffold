import React from 'react';

import { render } from 'react-dom';


class HelloScaffold extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
        };
    }

    componentDidMount () {
    }

    render() {
        return (
            <div>
                Hello
            </div>
        );
    }
}

render(<HelloScaffold />, document.getElementById('container'));
