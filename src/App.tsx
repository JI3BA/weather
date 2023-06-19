import  React from 'react'
import './styles/App.scss';
import { Weather } from './component/weather/Weather';

export const App = () => {
  return (
    <div className="container">
      <Weather />
    </div>
  );
}
