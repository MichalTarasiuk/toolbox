import {fireEvent, render} from '@testing-library/react';
import {useState} from 'react';

import {Freeze} from '../../_api';

describe('jsdom - react:components:Freeze', () => {
  it('should show loading when `freeze` is truthy', () => {
    const Component = () => {
      return (
        <Freeze freeze fallback={<p>loading</p>}>
          <p>content</p>
        </Freeze>
      );
    };

    const {getByText} = render(<Component />);

    getByText('loading');
  });

  it('should show content when `freeze` is falsy', () => {
    const Component = () => {
      return (
        <Freeze freeze={false} fallback={<p>loading</p>}>
          <p>content</p>
        </Freeze>
      );
    };

    const {getByText} = render(<Component />);

    getByText('content');
  });

  it('should show loading when `freeze` is changing to truthy', () => {
    const Component = () => {
      const [freeze, setFreeze] = useState(false);

      const toggle = () => {
        setFreeze(!freeze);
      };

      return (
        <div>
          <Freeze freeze={freeze} fallback={<p>loading</p>}>
            <p>content</p>
          </Freeze>
          <button onClick={toggle}>toggle</button>
        </div>
      );
    };

    const {getByText} = render(<Component />);

    fireEvent.click(getByText('toggle'));

    getByText('loading');

    fireEvent.click(getByText('toggle'));

    getByText('content');
  });
});
