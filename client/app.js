import React from 'react';
import ReduxToastr from 'react-redux-toastr';
import { Navbar } from './components';
import Routes from './routes';

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
      <ReduxToastr
        timeOut={4000}
        newestOnTop={false}
        preventDuplicates
        position="top-left"
        transitionIn="fadeIn"
        transitionOut="fadeOut"
        progressBar />
    </div>
  );
};

export default App;
