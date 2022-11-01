import type { createAtoms } from '../../createAtoms'

type AtomsFactory = ReturnType<typeof createAtoms>
export type AtomInitialize = AtomsFactory['atom']
