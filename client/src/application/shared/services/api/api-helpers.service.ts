class ApiHelpers {
  private debounceTimeout: NodeJS.Timeout | number = 0;

  private throttleTimeout: NodeJS.Timeout | number = 0;

  public debounce<F extends (...args: Parameters<F>) => ReturnType<F>>(
    func: F,
    ms = 1_000
  ): (...args: Parameters<F>) => void {
    return (...args: Parameters<F>): void => {
      clearTimeout(this.debounceTimeout);
      this.debounceTimeout = setTimeout(() => {
        func.apply(this, args);
      }, ms);
    };
  }

  public throttle<F extends (...args: Parameters<F>) => ReturnType<F>>(
    func: F,
    ms = 2_000
  ): (...args: Parameters<F>) => void {
    return (...args: Parameters<F>): void => {
      if (this.throttleTimeout) return;
      func.apply(this, args);

      this.throttleTimeout = setTimeout(() => {
        clearTimeout(this.throttleTimeout);
        this.throttleTimeout = 0;
      }, ms);
    };
  }
}

const apiHelpers = new ApiHelpers();
export default apiHelpers;
