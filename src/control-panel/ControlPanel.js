import React, { Component } from 'react';
import './ControlPanel.css';

class ControlPanel extends Component {
    toggleBold = () => {
        document.execCommand('bold');
        this.props.toggleOption('bold')
    }

    toggleItalic = () => {
        document.execCommand('italic');
        this.props.toggleOption('italic')
    }

    toggleUnderline = () => {
        document.execCommand('underline');
        this.props.toggleOption('underline')
    }

    isActive = (key) => (this.props[key] ? "format-action" : "")

    render() {
        return (
            <div id="control-panel">
                <div id="format-actions">
                    <button className={this.isActive('bold')} type="button" onClick={this.toggleBold}><b>B</b></button>
                    <button className={this.isActive('italic')} type="button" onClick={this.toggleItalic}><i>I</i></button>
                    <button className={this.isActive('underline')} type="button" onClick={this.toggleUnderline}><u>U</u></button>
                </div>
            </div>
        );
    }
}

export default ControlPanel;
