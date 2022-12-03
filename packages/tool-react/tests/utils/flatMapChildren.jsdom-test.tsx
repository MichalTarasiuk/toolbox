import {render} from '@testing-library/react';
import React from 'react';
import ReactIs from 'react-is';

import {flatMapChildren} from '../../_api';

import {type ReactNode} from 'react';

describe('jsdom - react:utils:flatMapChildren', () => {
  it('should filter all elements which are not a `Item` component', () => {
    const Item = ({children}: {children: string}) => <p>{children}</p>;
    const List = ({children}: {children: ReactNode}) => (
      <>{flatMapChildren(children).filter(reactNode => ReactIs.isElement(reactNode) && reactNode.type === Item)}</>
    );

    const {getByText} = render(
      <List>
        <Item>1</Item>
        <Item>2</Item>
        <>
          <p>3</p>
          <Item>4</Item>
        </>
      </List>,
    );

    expect(() => getByText('3')).toThrowError();
  });

  it('should skip fragment tag', () => {
    const FlatMapList = ({children}: {children: ReactNode}) => <p>flat map: {flatMapChildren(children).length}</p>;
    const MapList = ({children}: {children: ReactNode}) => <p>map: {React.Children.toArray(children).length}</p>;

    const {getByText} = render(
      <>
        <FlatMapList>
          <p>1</p>
          <>
            <p>2</p>
            <p>3</p>
          </>
        </FlatMapList>
        <MapList>
          <p>1</p>
          <>
            <p>2</p>
            <p>3</p>
          </>
        </MapList>
      </>,
    );

    getByText('flat map: 3');
    getByText('map: 2');
  });
});
