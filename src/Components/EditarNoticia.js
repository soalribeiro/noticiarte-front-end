import React from 'react';

export default class EditarNoticia extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id_noticia: this.props.location.state.noticia_id
        };
    }

    render() {
        console.log('teste -> ' + this.state.id_noticia);
        return (
            <div>
                <h1>olá</h1>
            </div>
        );
    }
}