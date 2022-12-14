import {isClient} from '@tool/utils';
import {useEffect, useLayoutEffect} from 'react';

export const useLayout = isClient() ? useLayoutEffect : useEffect;
