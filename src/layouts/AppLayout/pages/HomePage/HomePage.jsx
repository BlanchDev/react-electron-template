import reactLogo from "../../../../assets/react.svg";
import viteLogo from "/vite.svg";
import electronLogo from "../../../../assets/electron.svg";
import { useCounter } from "../../context/appLayoutContext";
import "./HomePage.scss";

function HomePage() {
  const {
    reactCount,
    setReactCount,
    electronCount,
    isLoading,
    handleIncrement,
    handleDecrement,
    handleReset,
  } = useCounter();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='app-layout-page column aic gap25'>
      <div className='home-page column aic jcc gap25'>
        <div className='images row aic jcc gap50'>
          <a href='https://vite.dev' target='_blank'>
            <img src={viteLogo} className='logo' alt='Vite logo' />
          </a>
          <a href='https://react.dev' target='_blank'>
            <img src={reactLogo} className='logo react' alt='React logo' />
          </a>
          <a href='https://www.electronjs.org/' target='_blank'>
            <img
              src={electronLogo}
              className='logo electron'
              alt='Electron logo'
            />
          </a>
        </div>

        <h1>
          Vite + React{" "}
          <span className={`${!window.Electron && "notElectron"}`}>
            + Electron
          </span>{" "}
          Template
        </h1>
        <div className='card top column aic jcc gap25'>
          <h3>React Counter</h3>
          <pre>{reactCount}</pre>
          <div className='row aic jcc gap15'>
            <button onClick={() => setReactCount((count) => count + 1)}>
              Increment
            </button>
            <button onClick={() => setReactCount((count) => count - 1)}>
              Decrement
            </button>
            <button onClick={() => setReactCount(0)}>Reset</button>
          </div>
          <p>
            Edit <code>src/App.jsx</code> and save to test HMR
          </p>
        </div>
        <div
          className={`card bottom column aic jcc gap25 ${
            !window.Electron && "notElectron"
          }`}
        >
          <h3>Electron Counter</h3>
          <pre>{electronCount}</pre>
          <div className='row aic jcc gap15'>
            <button onClick={handleIncrement}>Increment</button>
            <button onClick={handleDecrement}>Decrement</button>
            <button onClick={handleReset}>Reset</button>
          </div>
          <p>
            <code>electron/handlers/counterHandler.js</code>
          </p>
        </div>
        <p className='read-the-docs'>
          Click on the Vite, React and Electron logos to learn more
        </p>
      </div>
    </div>
  );
}

export default HomePage;
