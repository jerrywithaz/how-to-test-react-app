import React, { useState, VoidFunctionComponent } from "react";

type FormJSON = Record<string, any>;

export type ComplexFormProps = {
  onSubmit: (data: FormJSON) => void;
  onCancel: VoidFunction;
}

const ComplexForm: VoidFunctionComponent<ComplexFormProps> = ({ onSubmit, onCancel }) => {
  const [isOver21, setIsOver21] = useState<boolean>(false);

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const data = formToJSON(form.elements);

    onSubmit(data);
  };

  const handleIsOver21Change = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    const checkbox = target as HTMLInputElement;
    setIsOver21(checkbox.checked);
  };

  return (
    <form id="myForm" name="myForm" onSubmit={handleFormSubmit}>
      <h1>Welcome, Zerry</h1>
      <div>
        <label htmlFor="first_name">First Name</label>
        <input type="text" id="first_name" name="first_name" />
      </div>
      <div>
        <label htmlFor="last_name">Last Name</label>
        <input type="text" id="last_name" name="last_name" />
      </div>
      <div>
        <label htmlFor="is_over_21">Are you at least 21 years old?</label>
        <input
          type="checkbox"
          id="is_over_21"
          name="is_over_21"
          checked={isOver21}
          onChange={handleIsOver21Change}
        />
      </div>
      {isOver21 && (
        <div>
          <label htmlFor="favorite_drink">What's your favorite drink?</label>
          <input type="text" id="favorite_drink" name="favorite_drink" />
        </div>
      )}
      <button type="button" onClick={onCancel}>Cancel</button>
      <button type="submit">Apply</button>
    </form>
  );
};

/**
 * Retrieves input data from a form and returns it as a JSON object.
 */
const formToJSON = (
  elements: HTMLFormControlsCollection
): FormJSON => {
  return Array.from(elements).reduce((data, element: any) => {
    if (element.name) {
      const value = element.type === 'checkbox' ? element.checked : element.value;
      return {
        ...data,
        [element.name]: value
      };
    }
    return { ...data };
  }, {} as FormJSON);
};

export default ComplexForm;
