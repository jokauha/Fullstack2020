import React from 'react'
import { connect } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {

    const voteHandler = (anecdote) => {
        props.vote(anecdote)
        props.setNotification(`you voted '${anecdote.content}'`, 5)
    }

    return (
        <div>
            {props.anecdotes
                .sort((a, b) => b.votes - a.votes )
                .filter(anecdote => anecdote.content.toLowerCase().includes(props.filter))
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

const mapStateToProps = (state) => {
    return {
        anecdotes: state.anecdotes,
        filter: state.filter,
    }
}

const mapDispatchToProps = {
    vote,
    setNotification,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AnecdoteList)