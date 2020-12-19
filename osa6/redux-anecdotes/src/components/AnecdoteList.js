import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { notificationChange, removeNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filter.toLowerCase())
    const dispatch = useDispatch()

    const voteHandler = (anecdote) => {
        dispatch(vote(anecdote))
        dispatch(notificationChange(`Voted for "${anecdote.content}"`))
        setTimeout(() => {
            dispatch(removeNotification())
        }, 5000)
    }

    return (
        <div>
            {anecdotes
                .sort((a, b) => b.votes - a.votes )
                .filter(anecdote => anecdote.content.toLowerCase().includes(filter))
                .map(anecdote =>
                    <div key={anecdote.id}>
                        <div>
                        {anecdote.content}
                        </div>
                        <div>
                        has {anecdote.votes}
                        <button onClick={() => voteHandler(anecdote)}>vote</button>
                        </div>
                    </div>
            )}
        </div>
    )
}

export default AnecdoteList