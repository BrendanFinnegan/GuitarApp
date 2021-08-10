import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit testdeploy <code>src/App.js</code> and save to reload.
        </p>
        <iframe src="https://player.vimeo.com/video/585483154?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479&amp;h=8131289c0e" width="640" height="360" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen title="Test Embed With Some weird music vimeo added!"></iframe>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
