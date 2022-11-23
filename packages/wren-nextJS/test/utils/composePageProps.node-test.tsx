/* eslint-disable @typescript-eslint/consistent-type-assertions -- mocks */
import {isObject, keyIn} from '@wren/utils';

import {composePageProps} from '../../_api';

import type {GetServerSidePropsContext, GetStaticPropsContext} from 'next';

const getServerSidePropsContext = {} as GetServerSidePropsContext;
const getStaticPropsContext = {} as GetStaticPropsContext;

describe('node - nextJS:utils:composePageProps', () => {
  test('server.parallel.shallow', async () => {
    const getServerSideProps = composePageProps(
      'server.parallel.shallow',
      [() => ({props: {a: 0, c: {a: 1}}}), () => ({props: {a: 0, c: {b: 2}}})],
      (_, {c: {b}}) => ({
        props: {
          result: b,
        },
      }),
    );

    const getServerSidePropsResult = await getServerSideProps(getServerSidePropsContext);

    if (
      keyIn(getServerSidePropsResult, 'props') &&
      isObject(getServerSidePropsResult.props) &&
      keyIn(getServerSidePropsResult.props, 'result')
    ) {
      expect(getServerSidePropsResult.props.result).toBe(2);

      return;
    }

    throw Error("`getServerSidePropsResult` doesn't have `result` prop");
  });

  test('static.parallel.deep', async () => {
    const getStaticProps = composePageProps(
      'static.parallel.deep',
      [() => ({props: {a: 0, c: {a: 1}}}), () => ({props: {a: 0, c: {b: 2}}})],
      (_, {c: {a, b}}) => ({
        props: {
          result: a + b,
        },
      }),
    );

    const getStaticPropsResult = await getStaticProps(getStaticPropsContext);

    if (
      keyIn(getStaticPropsResult, 'props') &&
      isObject(getStaticPropsResult.props) &&
      keyIn(getStaticPropsResult.props, 'result')
    ) {
      expect(getStaticPropsResult.props.result).toBe(3);

      return;
    }

    throw Error("`getStaticPropsResult` doesn't have `result` prop");
  });
});
