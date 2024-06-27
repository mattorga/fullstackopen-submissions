import { useState } from 'react'

const StatisticsLine = ({text, value}) => <tr><td>{text}</td><td>{value}</td></tr>

const Statistics = ({good, neutral, bad}) => {
  const totalFeedback = good + neutral + bad

  if (totalFeedback === 0) {
    return (
      <>
        <p>No feedback given</p>
      </>
    )
  }

  const goodScore = good * 1
  const badScore = bad * -1

  const average = (goodScore + badScore)/totalFeedback 
  const posPercentage = (good/totalFeedback)*100

  return (
    <>
      <table>
        <tbody>
          <StatisticsLine text="good" value={good}/>
          <StatisticsLine text="neutral" value={neutral}/>
          <StatisticsLine text="bad" value={bad}/>
          <StatisticsLine text="all" value={totalFeedback}/>
          <StatisticsLine text="average" value={average}/>
          <StatisticsLine text="positive" value={posPercentage + " %"}/>
        </tbody>
      </table>
    </>
  )
}

const Button = ({text, handleClick}) => <button onClick={handleClick} >{text}</button>

function App() {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const handleClickGood = () => setGood(good + 1)
    const handleClickNeutral = () => setNeutral(neutral + 1)
    const handleClickBad = () => setBad(bad + 1)

    return (
      <div>
        <h1>give feedback</h1>

        <Button text="good" handleClick={handleClickGood} />
        <Button text="neutral" handleClick={handleClickNeutral} />
        <Button text="bad" handleClick={handleClickBad} />

        <h1>statistics</h1>

        <Statistics good={good} neutral={neutral} bad={bad} />

      </div>
    )
}

export default App