import { render } from '@testing-library/react';
import React from 'react';
import ComplexForm from './ComplexForm';

function renderComplexForm() {
  const onSubmit = jest.fn();
  const result = render((
    <ComplexForm onSubmit={onSubmit} />
  ));

  return { result, onSubmit };
}

describe('<ComplexForm />', () => {
  it('should render default fields', () => {
    const { } = renderComplexForm();
  })
})
