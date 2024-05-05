import React, { FormEvent, useState } from 'react';
import styles from './App.module.css';
import { PUZZLE_DEFAULTS } from './utils/puzzle';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [challenger, setChallenger] = useState('');
  const [puzzle, setPuzzle] = useState(PUZZLE_DEFAULTS);
  const [canLogin, setCanLogin] = useState(true);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const bot = new Worker(new URL('./bot', import.meta.url));
    bot.postMessage({ username, password, puzzle, challenger });

    bot.onmessage = (e: MessageEvent) => {
      // TODO: Handle messages sent from the WebWorker
    };
    bot.onerror = (e: ErrorEvent) => {
      console.error(e);
    };

    setCanLogin(false);
  }

  return (
    <div className={styles.div}>
      <h1>Under Construction</h1>
      <p>This page is currently being used for testing.</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username: </label>
        <input id='username' value={username} placeholder='Username' required onChange={(e) => setUsername(e.target.value)} />
        <br />
        <label htmlFor="password">Password: </label>
        <input id='password' value={password} placeholder='Password' type='password' onChange={(e) => setPassword(e.target.value)} />
        <br />
        <label htmlFor='challenger'>Challenger Showdown Username: </label>
        <input id='challenger' value={challenger} placeholder='Username' required onChange={(e) => setChallenger(e.target.value)} />
        <br />
        <label htmlFor='team'>Team: </label>
        <textarea id='team' value={puzzle.team} placeholder='Team text in PokePaste format' required onChange={(e) => setPuzzle({ ...puzzle, team: e.target.value })} />
        <br />
        <input type='submit' value='Log in' disabled={!canLogin} />
      </form>
    </div>
  );
}

export default App;
