/*const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    //id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject) */
import anecdoteService from '../services/anecdotes';

const anecdoteReducer = (state = [], action) => {
  //console.log('state now: ', state);
  //console.log('action', action);

  switch (action.type) {
    case 'VOTE_ANECDOTE':
      const id = action.data;
      const anecdoteVoted = state.find(a => a.id === id);
      const voted = {
        ...anecdoteVoted, votes: anecdoteVoted.votes + 1
      }
      return state.map(anecdote => anecdote.id !== id ? anecdote : voted).sort((a, b) => b.votes - a.votes);
    case 'CREATE_ANECDOTE':
      return state.concat(action.data);
    case 'INIT_ANECDOTES':
      return action.data;
    default:
      return state;
  }
}

export const voteAnecdote = (anecdote) => {
  return async dispatch => {
    const updatetAnecdote = await anecdoteService.update(anecdote);
    dispatch({
      type: 'VOTE_ANECDOTE',
      data: updatetAnecdote.id
    });
  }
}

export const createAnecdote = (anecdote) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(anecdote);
    dispatch({
      type: 'CREATE_ANECDOTE',
      data: newAnecdote
    });
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    });

  }
}

export default anecdoteReducer;