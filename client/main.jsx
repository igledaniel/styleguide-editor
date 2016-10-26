'use strict'

import 'styles/main.scss'

import React from 'react'
import ReactDOM from 'react-dom'
import RichTextEditor from 'react-rte'

import { saveAs } from 'file-saver'

class RichEditor extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      value: RichTextEditor.createEmptyValue()
    }

    this.onChange = this.onChange.bind(this)
    this.exportMarkdown = this.exportMarkdown.bind(this)
  }

  onChange (value) {
    this.setState({value})
  }

  exportMarkdown () {
    const text = this.state.value.toString('markdown')
    // Use FileSaver implementation, pass `true` as third parameter
    // to prevent auto-prepending a Byte-Order Mark (BOM)
    saveAs(new Blob([text], {type: 'text/plain;charset=utf-8'}), 'mapzen-blog.md', true);
  }

  render () {
    const toolbarConfig = {
      // Optionally specify the groups to display (displayed in the order listed).
      display: ['BLOCK_TYPE_DROPDOWN', 'INLINE_STYLE_BUTTONS', 'BLOCK_TYPE_BUTTONS', 'LINK_BUTTONS', 'HISTORY_BUTTONS', 'MY_CUSTOM_BUTTONS'],
      INLINE_STYLE_BUTTONS: [
        { label: 'Bold', style: 'BOLD', className: 'custom-css-class' },
        { label: 'Italic', style: 'ITALIC' },
        { label: 'Underline', style: 'UNDERLINE' },
        { label: 'Strikethrough', style: 'STRIKETHROUGH' },
        { label: 'Monospace', style: 'CODE' },
      ],
      BLOCK_TYPE_BUTTONS: [
        { label: 'UL', style: 'unordered-list-item' },
        { label: 'OL', style: 'ordered-list-item' },
        { label: 'Blockquote', style: 'blockquote' },
      ],
      BLOCK_TYPE_DROPDOWN: [
        { label: 'Normal', style: 'unstyled' },
        { label: 'Heading Large', style: 'header-one' },
        { label: 'Heading Medium', style: 'header-two' },
        { label: 'Heading Small', style: 'header-three' }
      ],
      MY_CUSTOM_BUTTONS: [
        { label: 'Yo', style: 'comeon' }
      ]
    }

    return (
      <div className="container">
        <RichTextEditor
          className="RichEditor-root"
          toolbarClassName="RichEditor-controls"
          editorClassName="RichEditor-editor"
          toolbarConfig={toolbarConfig}
          value={this.state.value}
          onChange={this.onChange}
        />
        <div className="export">
          <button onClick={this.exportMarkdown}>Click to export</button>
        </div>
      </div>
    )
  }
}

RichEditor.propTypes = {
  onChange: React.PropTypes.func
}

ReactDOM.render(
  <RichEditor />,
  document.getElementById('container')
)
