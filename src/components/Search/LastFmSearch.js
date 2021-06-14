import React, { useState } from 'react';

const LastFmSearch = ({ onFormSubmit }) => {
    const [term, setTerm] = useState('');

    const submitForm = event => {
        event.preventDefault();
        onFormSubmit(term);
    }

    return (
        <form onSubmit={ submitForm } className="ui form">
            <div className="field">
                <h1>Search Last.fm</h1>
                <div className="ui icon input">
                    <input
                        type="text"
                        value={ term }
                        onChange={ e => setTerm(e.target.value) }
                        placeholder="Search for Artist..." />
                    <i className="search icon circular link" onClick={ submitForm }></i>
                </div>
            </div>
        </form>
    );
}

export default LastFmSearch;