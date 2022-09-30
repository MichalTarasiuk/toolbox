/**
 * A factory to help with specific use-cases where you are using a percentage (ex. `1 / n`) but don't know `n` until runtime.
 *
 * @example
 * ```js
 * const autoPercentage = createAutoPercentage();
 *
 * const steps = [
 * 	{ name: 'init', progress: autoPercentage.percentage() },
 * 	{ name: 'modify', progress: autoPercentage.percentage() },
 * 	{ name: 'verify', progress: autoPercentage.percentage() },
 * 	{ name: 'cleanup', progress: 0 }
 * ];
 *
 * let progress = 0;
 *
 * for (const step of steps) {
 * 	if (progress === 1) {
 * 		return;
 * 	}
 *
 * 	progress += step.progress;
 *
 * 	console.log(`${step.name} finished - job is ${Math.round(progress * 100)}% complete`);
 * }
 * ```
 */
export const createAutoPercentage = () => {
	let _count = 0

	/**
	 * Increment and get the percentage.
	 *
	 * @example
	 * ```js
	 * const autoPercentage = createAutoPercentage();
	 *
	 * const a = autoPercentage.percentage();
	 *
	 * Number(a); // 1
	 *
	 * const b = autoPercentage.percentage();
	 *
	 * Number(a); // 0.5
	 * Number(b); // 0.5
	 * ```
	 *
	 * @returns The percentage
	 */
	const percentage = () => {
		_count++
		return { [Symbol.toPrimitive]: () => 1 / _count }
	}

	/**
	 * Increment and get the number of times the percentage has been incremented.
	 *
	 * @example
	 * ```js
	 * const autoPercentage = createAutoPercentage();
	 *
	 * const a = autoPercentage.count();
	 *
	 * Number(a); // 1
	 *
	 * const b = autoPercentage.count();
	 *
	 * Number(a); // 2
	 * Number(b); // 2
	 * ```
	 *
	 * @returns The number of times this percentage has been incremented
	 */
	const count = () => {
		_count++
		return { [Symbol.toPrimitive]: () => _count }
	}

	return {
		percentage,
		count,
	}
}
