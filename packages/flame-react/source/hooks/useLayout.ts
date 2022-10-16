import { isClient } from '@flame/utils'
import { useEffect, useLayoutEffect } from 'react'

export const useLayout = isClient() ? useLayoutEffect : useEffect
