import React, {Component} from 'react';
import './App.css';
import ControlPanel from "./control-panel/ControlPanel";
import FileZone from "./file-zone/FileZone";
import getMockText from './text.service';

let isMounted = false

class App extends Component {
    state = {
        html: '',
        bold: false,
        italic: false,
        underline: false
    }
    
    componentDidMount() {
        isMounted = true
        getMockText().then(result => {
            if (isMounted) {
                this.setState({ html: result })
            }
        })
    }

    componentWillUnmount() {
        isMounted = false
    }

    updateOptions = (options) => {
        this.setState(options)
    }

    toggleOption = (option) => {
        this.setState((currentState) => ({ [option]: !currentState[option] }))
    }

    render() {
        return (
            <div className="App">
                <header>
                    <span>Simple Text Editor</span>
                </header>
                <main>
                    <ControlPanel {...this.state} toggleOption={this.toggleOption} />
                    <FileZone html={this.state.html} updateOptions={this.updateOptions} />
                </main>
            </div>
        );
    }
}

export default App;
