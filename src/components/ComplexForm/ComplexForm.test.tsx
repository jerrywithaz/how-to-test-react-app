import React from "react";
import userEvent from "@testing-library/user-event";
import { act, render } from "@testing-library/react";
import ComplexForm, { ComplexFormProps } from "./ComplexForm";

/**
 * This is our test setup function that will be called on every test.
 * 
 * Creating a test setup function reduces the amount of repeated code
 * we have to write for our test cases and allows us to setup declarative
 * test helpers for interacting with the component we are testing.
 */
function renderComplexForm(props?: Partial<ComplexFormProps>) {
  const onSubmit = jest.fn();
  const onCancel = jest.fn();

  const result = render(<ComplexForm onSubmit={onSubmit} onCancel={onCancel} {...props} />);

  const Heading = () => result.getByText("Welcome, Zerry");

  const FirstNameInput = () => result.getByLabelText("First Name");

  const LastNameInput = () => result.getByLabelText("Last Name");

  const IsOver21Input = () =>
    result.getByLabelText("Are you at least 21 years old?");

  const FavoriteDrinkInput = () => result.queryByLabelText("What's your favorite drink?");
  
  const CancelButton = () => result.getByText("Cancel");

  const SubmitButton = () => result.getByText("Apply");

  function changeFirstName(name: string) {
    userEvent.type(FirstNameInput(), name);
  }

  function changeLastName(name: string) {
    userEvent.type(LastNameInput(), name);
  }

  function changeFavoriteDrinkInput(name: string) {
    userEvent.type(FavoriteDrinkInput() as HTMLElement, name);
  }

  async function clickIsOver21() {
    await act(async () => {
      userEvent.click(IsOver21Input());
    });
  }

  function clickSubmit() {
    userEvent.click(SubmitButton());
  }

  function clickCancel() {
    userEvent.click(CancelButton());
  }

  return {
    result,
    onSubmit,
    changeFirstName,
    changeLastName,
    clickIsOver21,
    clickSubmit,
    clickCancel,
    FirstNameInput,
    LastNameInput,
    IsOver21Input,
    SubmitButton,
    CancelButton,
    Heading,
    FavoriteDrinkInput,
    changeFavoriteDrinkInput,
    onCancel,
  };
}

describe("<ComplexForm />", () => {
  it("should render default fields", async () => {
    const {
      FirstNameInput,
      LastNameInput,
      IsOver21Input,
      SubmitButton,
      Heading,
      FavoriteDrinkInput,
      CancelButton
    } = renderComplexForm();

    // Header
    expect(Heading()).toBeInTheDocument();
    // Inputs
    expect(FirstNameInput()).toBeInTheDocument();
    expect(LastNameInput()).toBeInTheDocument();
    expect(IsOver21Input()).toBeInTheDocument();
    expect(FavoriteDrinkInput()).not.toBeInTheDocument();
    // Buttons
    expect(CancelButton()).toBeInTheDocument();
    expect(SubmitButton()).toBeInTheDocument();
  });

  it("should toggle favorite drink input depending on whether or not is over 21 is checked", async () => {
    const {
      clickIsOver21,
      FavoriteDrinkInput,
    } = renderComplexForm();

    expect(FavoriteDrinkInput()).not.toBeInTheDocument();

    await clickIsOver21();

    expect(FavoriteDrinkInput()).toBeInTheDocument();

  });
  
  it("should call onCancel when cancel button is clicked", async () => {
    const {
      clickCancel,
      onCancel
    } = renderComplexForm();

    clickCancel();

    expect(onCancel).toHaveBeenCalled();
  });

  it("should call onSubmit with form values", async () => {
    const {
      changeFirstName,
      changeLastName,
      clickIsOver21,
      changeFavoriteDrinkInput,
      clickSubmit,
      onSubmit
    } = renderComplexForm();

    changeFirstName('Zerry');
    changeLastName('Hogan');
    await clickIsOver21();
    changeFavoriteDrinkInput('Bourbon');
    clickSubmit();

    expect(onSubmit).toHaveBeenCalledWith({
      first_name: 'Zerry',
      last_name: 'Hogan',
      is_over_21: true,
      favorite_drink: 'Bourbon',
    });
  });
});
