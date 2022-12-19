import { React, Component } from 'react';
import { CircularProgress } from '@mui/material';

import '../styles/Carregando.css';

class Carregando extends Component {
  render() {
    return (
      <div>
        <CircularProgress classname="carregando" />
      </div>
    );
  }
}

export default Carregando;
