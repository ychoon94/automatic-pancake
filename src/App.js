import React, { useEffect, useState } from 'react';
import ClusteredChart from './ClusteredChart';

const App = () => {
  const [formValue, setFormValue] = useState('');

  const [showChildren, setShowChildren] = useState(true);

  const onChangeHandler = (event) => {
    setShowChildren(false);
    setFormValue(event.target.value);
  };

  useEffect(() => {
    setShowChildren(true);
  }, [formValue]);

  return (
    <>
      <div>
        <select
          id="stateSelect"
          onChange={onChangeHandler}
          value={formValue}
          name="stateSelect"
        >
          <option value="none">(None)</option>
          <option value="data_SalesType">Sales Type</option>
          <option value="data_Gender">Gender</option>
          <option value="data_AgeGroup">Age Group</option>
          <option value="data_Race">Race Group</option>
          <option value="data_CategoryType">Category Type</option>
        </select>
      </div>

      {showChildren ? <ClusteredChart onDataChange={formValue} /> : null}
    </>
  );
};

export default App;
