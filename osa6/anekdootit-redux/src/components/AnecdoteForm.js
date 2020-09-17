import React from 'react';
import { connect } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { timedNotification } from '../reducers/notificationReducer';

const AnecdoteForm = (props) => {

    const addAnecdote = async (event) => {
        event.preventDefault();
        const anecdote = event.target.anecdote.value;
        event.target.anecdote.value = '';
        props.createAnecdote(anecdote);
        props.timedNotification(`Added: '${anecdote}'`, 5);
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div><input name='anecdote' /></div>
                <button type='submit'>create</button>
            </form>
        </div>

    )
}

const mapStateToProps = null

const mapDispatchToProps = {
    createAnecdote,
    timedNotification
}

const connectedAnecdoteForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(AnecdoteForm);
export default connectedAnecdoteForm;