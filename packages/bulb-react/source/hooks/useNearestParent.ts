/* eslint-disable @typescript-eslint/no-unsafe-argument -- just ignore */
import { isString } from '@bulb/utils'
import { useRef } from 'react'

import { traverseFiber } from '../utils/utils'

import { useFiber } from './hooks'
import { useLayout } from './useLayout'

/**
 * Returns the nearest react-reconciler parent instance or the node created from {@link ReactReconciler.HostConfig.createInstance}.
 *
 * In react-dom, this would be a DOM element; in react-three-fiber this would be an instance descriptor.
 */
export const useNearestParent = <Current = unknown>(
	/** An optional element type to filter to. */
	type?: keyof JSX.IntrinsicElements,
) => {
	const fiber = useFiber()
	const parentRef = useRef<Current>()

	useLayout(() => {
		parentRef.current = traverseFiber<Current>(
			fiber,
			true,
			(node) =>
				isString(node.type) && (type === undefined || node.type === type),
		)?.stateNode
	}, [fiber])

	return parentRef
}
