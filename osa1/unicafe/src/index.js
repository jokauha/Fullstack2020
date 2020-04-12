import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>{props.text}</button>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  if (good+neutral+bad === 0) {
    return (
      <p>No feedback given</p>
    )
  }

  else {
    return (
      <div>
        <h1>statistics</h1>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={good+neutral+bad} />
        <StatisticLine text="average" value={(good-bad)/(good+neutral+bad)} />
        <StatisticLine text="positive" value={(good/(good+neutral+bad))*100} />
      </div>
    )
  }
}

const StatisticLine = ({ text, value }) => {
  if (text === "positive") {
    return (
      <table>
        <tbody>
          <tr>
            <td>{text}</td>
            <td>{value}</td>
            <td>%</td>
          </tr>
        </tbody>
      </table>
    )
  }
  else {
    return (
      <table>
        <tbody>
          <tr>
            <td>{text}</td>
            <td>{value}</td>
          </tr>
        </tbody>
      </table>
    )
  }
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)