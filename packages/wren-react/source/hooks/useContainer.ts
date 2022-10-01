/* eslint-disable @typescript-eslint/no-unsafe-argument -- just ignore */
import { useMemo } from 'react'

import { traverseFiber } from '../utils/utils'

import { useFiber } from './useFiber'

/**
 * Represents a react-reconciler container instance.
 */
export interface ContainerInstance<ContainerInfo = unknown> {
	containerInfo: ContainerInfo
}

/**
 * Returns the current react-reconciler container info passed to {@link ReactReconciler.Reconciler.createContainer}.
 *
 * In react-dom, a container will point to the root DOM element; in react-three-fiber, it will point to the root Zustand store.
 */
export const useContainer = <ContainerInfo = unknown>():
	| ContainerInfo
	| undefined => {
	const fiber = useFiber()
	const root = useMemo(
		() =>
			traverseFiber<ContainerInstance<ContainerInfo>>(
				fiber,
				true,
				(node) => node.stateNode?.containerInfo != null,
			),
		[fiber],
	)

	return root?.stateNode.containerInfo
}
