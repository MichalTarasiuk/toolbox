import type {GetServerSideProps, GetServerSidePropsContext, GetStaticProps, GetStaticPropsContext} from 'next';

type AnyPropsProviders = GetServerSideProps[] | GetStaticProps[];

type InferContext<PropsProviders extends AnyPropsProviders> = GetServerSideProps extends AnyPropsProviders[number]
  ? GetServerSidePropsContext
  : GetStaticPropsContext;

export const composePropsProviders = <PropsProviders extends AnyPropsProviders>(propsProviders: PropsProviders) => {
  return (context: InferContext<PropsProviders>) => null;
};
