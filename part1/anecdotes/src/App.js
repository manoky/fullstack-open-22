import { useState } from "react";

const Button = ({ text, handleClick }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const Anecdote = ({ text, votes, heading }) => {
  return (
    <div>
      <h1>{heading}</h1>
      {text} <br /> has {votes} votes
    </div>
  );
};

function App() {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients",
  ];

  const points = Array(anecdotes.length)
    .fill(0)
    .map(() => 0);

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(points);

  const max = Math.max(...votes);

  const handleNextClick = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length));
  };

  const handleVoteClick = () => {
    const newVotes = [...votes];
    newVotes[selected] += 1;
    setVotes(newVotes);
  };

  return (
    <div>
      <Anecdote
        text={anecdotes[selected]}
        votes={votes[selected]}
        heading="Anecdote of the day"
      />
      <div>
        <Button text="next anecdote" handleClick={handleNextClick} />
        <Button text="vote" handleClick={handleVoteClick} />
      </div>
      {max > 0 && (
        <Anecdote
          text={anecdotes[votes.indexOf(max)]}
          votes={votes[votes.indexOf(max)]}
          heading="Anecdote with most votes"
        />
      )}
    </div>
  );
}

export default App;
