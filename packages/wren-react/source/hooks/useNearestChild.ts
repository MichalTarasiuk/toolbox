/* eslint-disable @typescript-eslint/no-unsafe-argument -- just ignore */
import { useRef } from 'react'

import { traverseFiber } from '../utils/utils'

import { useFiber } from './hooks'
import { useLayout } from './useLayout'

/**
 * Returns the nearest react-reconciler child instance or the node created from {@link ReactReconciler.HostConfig.createInstance}.
 *
 * In react-dom, this would be a DOM element; in react-three-fiber this would be an instance descriptor.
 */
export const useNearestChild = <Current = unknown>(
	type?: keyof JSX.IntrinsicElements,
) => {
	const fiber = useFiber()
	const childRef = useRef<Current>()

	useLayout(() => {
		childRef.current = traverseFiber<Current>(
			fiber,
			false,
			(node) =>
				typeof node.type === 'string' &&
				(type === undefined || node.type === type),
		)?.stateNode
	}, [fiber])

	return childRef
}
