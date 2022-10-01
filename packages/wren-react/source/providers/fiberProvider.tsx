/* eslint-disable functional/no-this-expression -- fill me */
import React from 'react'

import { wrapContext } from '../utils/utils'

import type { Fiber } from 'react-reconciler'

const FiberContext = wrapContext(React.createContext<Fiber | null>(null))

type Props = {
	children: React.ReactNode
}

/**
 * A react-internal {@link Fiber} provider. This component binds React children to the React Fiber tree. Call its-fine hooks within this.
 */
export class FiberProvider extends React.Component<Props> {
	private _reactInternals: Fiber

	render() {
		return (
			<FiberContext.Provider value={this._reactInternals}>
				{this.props.children}
			</FiberContext.Provider>
		)
	}
}
