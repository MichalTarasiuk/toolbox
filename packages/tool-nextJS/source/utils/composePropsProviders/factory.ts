import type {Any} from '@tool/typescript';

type Config<BoundProps extends Any.AnyObject> = Partial<{
  beforeAll: () => {props: BoundProps};
  beforeEach: () => void;
}>;

export const createComposePropsProviders = <BoundProps extends Any.AnyObject>(config: Config<BoundProps>) => {
  return () => null;
};
