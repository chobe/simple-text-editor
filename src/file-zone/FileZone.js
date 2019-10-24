import React, { Component } from 'react';
import './FileZone.css';

class FileZone extends Component {
    editableRef = React.createRef();


    findCurrentTags = () => {
        // Editor container 
        var editorElement = this.editableRef.current;
        
        // No of ranges
        var numRanges = window.getSelection().rangeCount;

        // Will hold parent tags of a range
        var rangeParentTags;

        // Will hold parent tags of all ranges
        var allRangesParentTags = [];
            
        // Current menu tags
        var menuTags = [ 'B', 'I', 'U' ];
            
        // Will hold common tags from all ranges
        var menuTagsCommon = [];

        var startElement,
            endElement,
            curElement;

        // For all ranges
        for(let i = 0; i < numRanges; i++) {
            // Start container of range
            startElement = window.getSelection().getRangeAt(i).startContainer;
            
            // End container of range
            endElement = window.getSelection().getRangeAt(i).endContainer;
            
            // Will hold parent tags of a range
            rangeParentTags = [];

            // If starting node and final node are the same
            if(startElement.isEqualNode(endElement)) {
                // If the current element lies inside the editor container then don't consider the range
                // This happens when editor container is clicked
                if(editorElement.isEqualNode(startElement)) {
                    allRangesParentTags.push([]);
                    continue;
                }

                curElement = startElement.parentNode;
                
                // Get all parent tags till editor container    
                while(!editorElement.isEqualNode(curElement)) {
                    rangeParentTags.push(curElement.nodeName);
                    curElement = curElement.parentNode;
                }
            }

            // Push tags of current range 
            allRangesParentTags.push(rangeParentTags);
        }

        // Find common parent tags for all ranges
        for(let i=0; i<menuTags.length; i++) {
            var common_tag = 1;
            for(var j=0; j<allRangesParentTags.length; j++) {
                if(allRangesParentTags[j].indexOf(menuTags[i]) === -1) {
                    common_tag = -1;
                    break;
                }
            }

            if(common_tag === 1)
                menuTagsCommon.push(menuTags[i]);
        }

        this.props.updateOptions({
            bold: menuTagsCommon.indexOf('B') !== -1,
            italic: menuTagsCommon.indexOf('I') !== -1,
            underline: menuTagsCommon.indexOf('U') !== -1,
        })
    }

    render() {
        return (
            <div id="file-zone">
                <div 
                    id="file"
                    onClick={this.findCurrentTags}
                    onKeyUp={this.findCurrentTags}
                    contentEditable
                    spellCheck="false"
                    ref={this.editableRef}
                    dangerouslySetInnerHTML={{ __html : this.props.html}}
                />
            </div>
        );
    }
}

export default FileZone;
