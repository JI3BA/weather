import  React from 'react'
import './App.css';
import Weather from './component/weather/Weather';

const App: React.FC = () => {
  return (
    <div className="container">
      <Weather />
    </div>
  );
}

export default App;
