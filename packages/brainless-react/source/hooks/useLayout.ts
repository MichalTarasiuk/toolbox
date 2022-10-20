import { isClient } from '@jupiter/utils'
import { useEffect, useLayoutEffect } from 'react'

export const useLayout = isClient() ? useLayoutEffect : useEffect
