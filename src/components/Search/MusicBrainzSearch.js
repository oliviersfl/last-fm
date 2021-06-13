import React, { useState } from 'react';

const MusicBrainzSearch = ({ onFormSubmit }) => {
    const [term, setTerm] = useState('');

    const submitForm = event => {
        event.preventDefault();
        onFormSubmit(term);
    }

    return (
        <form onSubmit={ submitForm } className="ui form">
            <div className="field">
                <h1>Search MusicBrainz</h1>
                <div className="ui icon input">
                    <input
                        type="text"
                        value={ term }
                        onChange={ e => setTerm(e.target.value) }
                        placeholder="Search for Artist..." />
                    <i className="search icon"></i>
                </div>
            </div>
        </form>
    );
}

export default MusicBrainzSearch;