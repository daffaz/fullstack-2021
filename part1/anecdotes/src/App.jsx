import { useEffect, useState } from 'react';

function App() {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients',
  ];

  const [selected, setSelected] = useState(0);
  const [vote, setVote] = useState({});
  const [max, setMax] = useState(0);

  const handleSelect = () => {
    const randomizer = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomizer);
  };

  const handleVote = () => {
    if (vote[selected]) {
      setVote({ ...vote, [selected]: vote[selected] + 1 });
    } else {
      setVote({ ...vote, [selected]: 1 });
    }
  };

  useEffect(() => {
    const arrVote = Object.keys(vote);
    const highestVote =
      arrVote.length >= 2
        ? arrVote.reduce((a, b) => (vote[a] > vote[b] ? a : b))
        : arrVote[0];
    setMax(highestVote);
  }, [vote, max]);

  // console.log('Vote => ', vote);
  // console.log(max);
  return (
    <div>
      <h2>Anecdotes of the day</h2>
      <div>{anecdotes[selected]}</div>
      <div>has {vote[selected]} votes</div>
      <button style={{ marginRight: 10 }} onClick={handleVote}>
        vote
      </button>
      <button onClick={handleSelect}>next anecdote</button>
      <hr />
      <h2>Anecdotes with most votes</h2>
      <div>{anecdotes[max]}</div>
      <div>with {vote[max]} votes</div>
    </div>
  );
}

export default App;
