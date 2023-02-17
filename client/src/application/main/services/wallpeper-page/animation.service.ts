class WallpepersAnimation {
  public fadeIn(elem: HTMLElement, callback?: Function) {
    animation();

    function animation(): FrameRequestCallback | void {
      let opacity = Number(elem.style.opacity);

      if (opacity < 1) {
        opacity += 0.1;
        elem.style.opacity = opacity.toString();
        window.requestAnimationFrame(animation() as FrameRequestCallback);
        return;
      }

      if (callback) {
        callback();
      }
    }
  }

  public fadeOut(elem: HTMLElement, callback?: Function) {
    animation();

    function animation(): FrameRequestCallback | void {
      let opacity = Number(elem.style.opacity);

      if (opacity > 0) {
        opacity -= 0.04;
        elem.style.opacity = opacity.toString();
        window.requestAnimationFrame(animation() as FrameRequestCallback);
        return;
      }

      if (callback) {
        callback();
      }
    }
  }
}

const wallpaperAnimation = new WallpepersAnimation();
export default wallpaperAnimation;
