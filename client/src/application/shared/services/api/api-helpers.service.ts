class ApiHelpers {
  private timeout: NodeJS.Timeout | number = 0;

  public debounce<F extends (...args: Parameters<F>) => ReturnType<F>>(
    func: F,
    ms = 400
  ): (...args: Parameters<F>) => void {
    return (...args: Parameters<F>): void => {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        func.apply(this, args);
      }, ms);
    };
  }
}

const apiHelpers = new ApiHelpers();
export default apiHelpers;
