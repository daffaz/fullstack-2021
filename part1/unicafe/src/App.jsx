import { useState } from 'react';
import Statistic from './components/Statistic';

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const total = good + neutral + bad;
  const average = (good - bad) / total;
  return (
    <div>
      <h2>give feedbacks</h2>
      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>
      <hr />
      <h2>statistics</h2>
      <Statistic
        good={good}
        neutral={neutral}
        bad={bad}
        total={total}
        average={average}
      />
    </div>
  );
}

export default App;
