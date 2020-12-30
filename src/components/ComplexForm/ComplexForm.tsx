import React from 'react';

const ComplexForm = () => {
  return (
    <form>
      <h1>Welcome, Zerry</h1>
      <input type="text" name="first_name" />
      <input type="text" name="last_name" />
      <input type="checkbox" name="is_over_18" />
    </form>
  );
}

export default ComplexForm;
