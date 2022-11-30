import {useEvent} from '@tool/react';
import {none} from '@tool/utils';
import {useRouter} from 'next/router';
import {stringify} from 'query-string';
import {useCallback, useEffect, useState} from 'react';

import type {Any} from '@tool/typescript';
import type {NextRouter} from 'next/router';
import type {UrlObject} from 'url';

type Url = string | UrlObject;

type InferTransitionOptions<GenericNextRouter extends NextRouter> = GenericNextRouter extends {
  push: (url: Url, as?: Url, options?: infer TransitionOptions) => unknown;
}
  ? TransitionOptions
  : never;

export const useRefreshProps = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const router = useRouter();

  const getUrl = useEvent(() => router.asPath);

  useEffect(() => {
    const routeChangeStartHandler = (nextUrl: string, transitionOptions: InferTransitionOptions<typeof router>) => {
      if (getUrl().replace(/\?(.)+/, none) === nextUrl.replace(/\?(.)+/, none) && !transitionOptions.shallow) {
        setIsRefreshing(true);
      }
    };
    const routeChangeFinishHandler = () => {
      setIsRefreshing(isRefreshing => isRefreshing && false);
    };

    router.events.on('routeChangeStart', routeChangeStartHandler);
    router.events.on('routeChangeError', routeChangeFinishHandler);
    router.events.on('routeChangeComplete', routeChangeFinishHandler);

    return () => {
      router.events.off('routeChangeStart', routeChangeStartHandler);
      router.events.off('routeChangeError', routeChangeFinishHandler);
      router.events.off('routeChangeComplete', routeChangeFinishHandler);
    };
  }, [getUrl, router.events]);

  const refreshProps = useCallback(
    (searchParams: Any.AnyObject<string, string>) => {
      const url = `${router.asPath}?${stringify(searchParams)}`;

      void router.replace(url, undefined);
    },
    [router],
  );

  return [isRefreshing, refreshProps] as const;
};
