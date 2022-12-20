import { React, Component } from 'react';
import { CircularProgress } from '@mui/material';

import '../styles/Carregando.css';

class Carregando extends Component {
  render() {
    return <CircularProgress className="carregando" />;
  }
}

export default Carregando;
