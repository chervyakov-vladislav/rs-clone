class ApiHelpers {
  private debounceTimeout = 0;

  private throttleTimeout = 0;

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
    ms = 1_500
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
