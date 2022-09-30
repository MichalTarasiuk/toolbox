import { isClient } from '@wren/utils'

import { isElement } from './assertions'

import type {
	HTMLReactParserOptions,
	Element as ElementType,
	DOMNode,
} from 'html-react-parser'

export const formatId = (name: string) => `id:${name}` as const
export const formatTag = (name: string) => `tag:${name}` as const

export const getSiteOrigin = () => {
	if (isClient()) {
		return window.location.origin
	}

	return process.env.SITE_ORIGIN
}

type ReplaceOption = Exclude<HTMLReactParserOptions['replace'], undefined>

export const elementsGuard =
	(callback: (element: ElementType) => ReturnType<ReplaceOption>) =>
	(domNode: DOMNode) => {
		if (isElement(domNode)) {
			const replacedDOMNode = callback(domNode)

			return replacedDOMNode
		}

		return domNode
	}
