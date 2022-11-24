import {render} from '@testing-library/react';
import {expectType, signs, none, keyIn} from '@tool/utils';

import {reactify} from '../../_api';

type Reactify = typeof reactify;
type ReactifyProps = Parameters<Reactify>;

type MarkupProps = {
  html: ReactifyProps[0];
  resolvers?: ReactifyProps[1];
};

const Markup = (props: MarkupProps) => {
  return <>{reactify(props.html, props.resolvers)}</>;
};

describe('jsdom - react:utils:reactify', () => {
  it('should render', () => {
    const {getByText} = render(<Markup html="<p>Hello World</p>" />);

    getByText('Hello World');
  });

  it('should replace every `a` tag to `p`', () => {
    const {getByText} = render(
      <Markup
        html="<a href='/home'>Home Page</a>"
        resolvers={{
          'tag:a': props => {
            expectType(props.href);

            return props.href ? <p>{props.href.replace(signs.slash, none)}</p> : <a {...props} />;
          },
        }}
      />,
    );

    getByText('home');
  });

  it('should replace every element with `replace-me` id', () => {
    const selector = 'replace-me';

    const {getByText} = render(
      <Markup
        html={`<p id='${selector}'>Hello World</p>`}
        resolvers={{
          [`id:${selector}` as const]: props => {
            if (keyIn(props, 'id')) {
              return <p>{'replaced :)'}</p>;
            }

            return null;
          },
        }}
      />,
    );

    getByText('replaced :)');
  });
});
