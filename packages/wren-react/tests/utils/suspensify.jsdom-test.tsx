import {render, waitFor} from '@testing-library/react';
import {sleep} from '@wren/utils';
import {Suspense} from 'react';

import {suspensify} from '../../_api';

describe('jsdom - react:utils:suspensify', () => {
  it('should display loading until promise resolved', async () => {
    const userPromise = suspensify(sleep(1000, {name: 'Michał'})[0]);
    const Component = () => {
      userPromise.read();

      return <p>resolved</p>;
    };

    const {getByText} = render(
      <Suspense fallback={<p>loading</p>}>
        <Component />
      </Suspense>,
    );

    getByText('loading');

    await waitFor(() => {
      getByText('resolved');
    });
  });
});
