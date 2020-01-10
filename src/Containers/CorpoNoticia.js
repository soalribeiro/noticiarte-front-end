import React, { Component } from 'react';
import CKEditor from 'ckeditor4-react';

export default class CorpoNoticia extends Component {
    constructor() {
        super();
        this.state = {
            placeholder: 'Escreve o corpo de notícia aqui',
            content: '',
            characters: 0
        }
    }

    eliminaPlaceholder = () => {
        this.setState({
            placeholder: ''
        });
    }

    onChange = (event) => {
        this.setState({
            content: event.sender.element.$.innerHTML
        })

        this.props.conteudo(this.state.content);
    }

    render() {
        return (
            <div onClick={this.eliminaPlaceholder}>
                <CKEditor
                    type="inline"
                    config={{
                        toolbar: [['Bold'], ['Italic'], ['Link'], ['SpecialChar']],
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