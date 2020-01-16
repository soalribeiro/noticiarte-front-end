import React, { Component } from 'react';
import CKEditor from 'ckeditor4-react';

export default class CorpoEditarNoticia extends Component {
    constructor(props) {
        super(props);
        this.state = {
            placeholder: this.props.corpo,
            content: '',
            characters: 0
        }
    }

    /* eliminaPlaceholder = () => {
        this.setState({
            placeholder: ''
        });
    } */

    onChange = (event) => {
        this.setState({
            content: event.sender.element.$.innerHTML
        })

        this.props.conteudo(this.state.content);
    }

    render() {
        return (
            <div>
                <CKEditor
                    type="inline"
                    config={{
                        toolbar: [['Bold'], ['Italic'], ['Link'], ['SpecialChar'], ['Image']],
                        extraPlugins: 'autogrow',
                        uiColor: '#e6e6e6'
                    }}
                    onChange={this.onChange}
                    data={this.state.placeholder}
                />
            </div>
        );
    }
}