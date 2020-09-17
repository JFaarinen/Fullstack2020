import React from 'react';
import { voteAnecdote } from '../reducers/anecdoteReducer';
import { timedNotification } from '../reducers/notificationReducer';
import { useSelector, useDispatch } from 'react-redux';
import { clearTimer } from '../reducers/timeoutReducer';

const AnecdoteList = () => {
    const dispatch = useDispatch();
    const anecdotes = useSelector(state => state.anecdotes);

    const vote = (anecdote) => {
        //console.log('vote', anecdote.id);
        dispatch(voteAnecdote(anecdote));
        dispatch(clearTimer());
        dispatch(timedNotification(`Voted: ${anecdote.content}`, 5));
    }

    return (
        <div>
            <h2>Anecdotes</h2>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList;