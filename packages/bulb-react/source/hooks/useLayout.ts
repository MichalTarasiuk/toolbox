import { isClient } from '@bulb/utils'
import { useEffect, useLayoutEffect } from 'react'

export const useLayout = isClient() ? useLayoutEffect : useEffect
