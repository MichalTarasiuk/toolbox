import type ReactReconciler from 'react-reconciler';

/**
 * Represents a react-internal Fiber node.
 */
export type Fiber<StateNode = unknown> = Omit<ReactReconciler.Fiber, 'stateNode'> & {
  stateNode: StateNode;
};

/**
 * Represents a {@link Fiber} node selector for traversal.
 */
export type FiberSelector<StateNode = unknown> = (node: Fiber<StateNode | null>) => boolean | void;

/**
 * Traverses up or down a {@link Fiber}, return `true` to stop and select a node.
 */
export const traverseFiber = <StateNode = unknown>(
  fiber: Fiber<StateNode> | undefined,
  ascending: boolean,
  selector: FiberSelector<StateNode>,
): Fiber<StateNode> | undefined => {
  if (!fiber) {
    return;
  }

  if (selector(fiber)) {
    return fiber;
  }

  let child = ascending ? fiber.return : fiber.child;

  while (child) {
    const match = traverseFiber(child, ascending, selector);

    if (match) {
      return match;
    }

    child = child.sibling;
  }

  return undefined;
};
