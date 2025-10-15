class EmojiVoting extends React.Component {
  constructor(props) {
    super(props);
    const storedVotes = JSON.parse(localStorage.getItem('votes')) || {};
    this.state = {
      emojis: ['😀', '😂', '😍', '😢', '😡'],
      votes: storedVotes,
      winners: []
    };
  }

  vote = (emoji) => {
    this.setState(prevState => {
      const votes = { ...prevState.votes };
      votes[emoji] = (votes[emoji] || 0) + 1;
      localStorage.setItem('votes', JSON.stringify(votes));
      return { votes };
    });
  }

  showResults = () => {
    const { votes, emojis } = this.state;
    let maxVote = 0;
    emojis.forEach(e => {
      const v = votes[e] || 0;
      if (v > maxVote) maxVote = v;
    });

    const winners = emojis.filter(e => (votes[e] || 0) === maxVote && maxVote > 0);
    this.setState({ winners });
  }

  clearResults = () => {
    localStorage.removeItem('votes');
    this.setState({ votes: {}, winners: [] });
  }

  render() {
    const { emojis, votes, winners } = this.state;
    return (
      <div className="container py-5 text-center">
        <h1 className="mb-4">Emoji Voting</h1>
        <div className="d-flex justify-content-center gap-3 mb-4">
          {emojis.map(e => (
            <button key={e} className="btn btn-light fs-2" onClick={() => this.vote(e)}>
              {e} <span className="badge bg-secondary">{votes[e] || 0}</span>
            </button>
          ))}
        </div>
        <div className="mb-3">
          <button className="btn btn-primary me-2" onClick={this.showResults}>Show Results</button>
          <button className="btn btn-danger" onClick={this.clearResults}>Clear Results</button>
        </div>
        {winners.length > 0 &&
          <h3 className="mt-3">
            Winner{winners.length > 1 ? 's' : ''}: {winners.join(', ')} ({votes[winners[0]]} votes)
          </h3>
        }
      </div>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<EmojiVoting />);
