export type Debounceable<T> = (...args: any[]) => T;
export type Callable<T> = () => T;

/**
 * Adapted from component/debounce
 * @see {@link https://github.com/component/debounce}
 * @see {@link http://unscriptable.com/2009/03/20/debouncing-javascript-methods/}
 */
export function debounce<T>(
  func: Debounceable<T>,
  wait: number = 100,
): Debounceable<T> {
  let timeout: any;
  let callable: Callable<T> | null;
  let timestamp: number;
  let result: any;

  function later() {
    const last = Date.now() - timestamp;
    if (last < wait && last >= 0) {
      timeout = setTimeout(later, wait - last);
    } else if (callable != null) {
      timeout = null;
      result = callable();
      callable = null;
    }
  }

  return function wrapped(...args: any[]) {
    callable = () => func(...args);
    timestamp = Date.now();
    if (timeout == null) {
      timeout = setTimeout(later, wait);
    }
    return result;
  };
}
