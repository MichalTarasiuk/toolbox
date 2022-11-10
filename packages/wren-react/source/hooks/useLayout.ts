import { isClient } from '@wren/utils'
import { useEffect, useLayoutEffect } from 'react'

export const useLayout = isClient() ? useLayoutEffect : useEffect
