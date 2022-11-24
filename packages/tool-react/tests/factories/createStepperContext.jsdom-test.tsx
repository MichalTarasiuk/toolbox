import {render, fireEvent} from '@testing-library/react';

import {createStepperContext} from '../../_api';

describe('jsdom - react:factories:createStepperContext', () => {
  it('should throw error when steps are not correct', () => {
    expect(() =>
      createStepperContext({
        0: {name: 'email', canGo: () => true},
        2: {name: 'password', canGo: () => false},
      }),
    ).toThrowError();
  });

  it('should not throw error when steps are correct', () => {
    expect(() =>
      createStepperContext({
        0: {name: 'email', canGo: () => true},
        1: {name: 'password', canGo: () => false},
      }),
    ).not.toThrowError();
  });

  it('should move to next step', () => {
    const {StepperProvider, useStepper} = createStepperContext({
      0: {name: 'email', canGo: () => true},
      1: {name: 'password', canGo: () => true},
    });
    const Component = () => {
      const stepper = useStepper();

      const clickHandler = () => {
        const token = stepper.step.canGo();

        if (token) {
          stepper.go(token);
        }
      };

      return (
        <div>
          <p>name: {stepper.step.name}</p>
          <button onClick={clickHandler}>next step</button>
        </div>
      );
    };

    const {getByText} = render(<Component />, {wrapper: StepperProvider});

    fireEvent.click(getByText('next step'));

    getByText('name: password');
  });

  it('should move to next step', () => {
    const {StepperProvider, useStepper} = createStepperContext({
      0: {name: 'email', canGo: () => false},
      1: {name: 'password', canGo: () => true},
    });
    const Component = () => {
      const stepper = useStepper();

      const clickHandler = () => {
        const token = stepper.step.canGo();

        if (token) {
          stepper.go(token);
        }
      };

      return (
        <div>
          <p>name: {stepper.step.name}</p>
          <button onClick={clickHandler}>next step</button>
        </div>
      );
    };

    const {getByText} = render(<Component />, {wrapper: StepperProvider});

    fireEvent.click(getByText('next step'));

    getByText('name: email');
  });

  it('should move back', () => {
    const {StepperProvider, useStepper} = createStepperContext({
      0: {name: 'email', canGo: () => true},
      1: {name: 'password', canGo: () => true},
    });
    const Component = () => {
      const stepper = useStepper();

      const clickHandler = () => {
        const token = stepper.step.canGo();

        if (token) {
          stepper.go(token);
        }
      };

      return (
        <div>
          <p>name: {stepper.step.name}</p>
          <button onClick={stepper.back}>previous step</button>
          <button onClick={clickHandler}>next step</button>
        </div>
      );
    };

    const {getByText} = render(<Component />, {wrapper: StepperProvider});

    fireEvent.click(getByText('next step'));

    getByText('name: password');

    fireEvent.click(getByText('previous step'));

    getByText('name: email');
  });
});
