import { isClient } from '@brainless/utils'
import { useEffect, useLayoutEffect } from 'react'

export const useLayout = isClient() ? useLayoutEffect : useEffect
