import apiHelpers from '../../../../shared/services/api/api-helpers.service';

class InfiniteScroll {
  public checkPosition() {
    const height = document.body.scrollHeight;
    const screenHeight = window.innerHeight;

    const scrolled = window.scrollY;
    const threshold = height - screenHeight / 4;
    const position = scrolled + screenHeight;

    if (position >= threshold) {
      apiHelpers.throttle(() => {
        console.log(`подгружаем ${position}`);
      })();
    }
  }

  public scrollListener() {
    this.checkPosition();
  }
}

const infiniteScroll = new InfiniteScroll();
export default infiniteScroll;
