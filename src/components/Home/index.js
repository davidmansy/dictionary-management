import React from 'react';
import AddDictionary from './AddDictionary';
import DictionaryTable from './DictionaryTable';
import { Divider } from 'antd';

function Home() {
  return (
    <div>
      <div className="add-form-container">
        <Divider orientation="left">Add a new dictionary</Divider>
        <AddDictionary />
      </div>
      <div>
        <Divider orientation="left">Dictionaries</Divider>
        <DictionaryTable />
      </div>
    </div>
  );
}

export default Home;
