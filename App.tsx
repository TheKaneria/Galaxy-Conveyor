import {View, Text} from 'react-native';
import React from 'react';
import Navigation from './Src/Navigation';
import {Loginprovider} from './Src/Context/login_context';
import {Salesprovider} from './Src/Context/sales_context';
import {Productprovider} from './Src/Context/production_context';

const App = () => {
  return (
    <Loginprovider>
      <Salesprovider>
        <Productprovider>
          <Navigation />
        </Productprovider>
      </Salesprovider>
    </Loginprovider>
  );
};

export default App;
