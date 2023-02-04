/* eslint-disable */
import YoutubeAPI from '../../../../core/components/scripts/youtube-api';
import IFrameElement from '../../../../shared/components/base-elements/iframe-element';
// import { IFilmData } from '../../../../shared/models/response-data';
import state from '../../../../shared/services/state';

var player: any;

class YTPlayerService {
  private ytService: YoutubeAPI | null;

  constructor() {
    this.ytService = null;
  }

  public initPlayer(toggleDiv: HTMLElement, parantNode: HTMLElement) {
    const videoLink = state.getPremiereInfo()?.link as string;
    const videoID = this.getVideoID(videoLink) as string;

    // удаляем старый скрипт апи
    // грузим данные в YT Player
    if (!player) {
      this.setNewPlayerData(videoID);
      this.ytService = new YoutubeAPI(document.body);
    } else {
      this.removeOldApi();
      this.createIFrame(videoID, toggleDiv, parantNode);
      this.ytService = new YoutubeAPI(document.body);
    }
  }

  private getVideoID(link: string) {
    return link.trim().split('/').pop()?.split('?t=')[0];
  }

  private removeOldApi() {
    document.querySelector('#youtube-api')?.remove();
  }

  private setNewPlayerData(videoID: string) {
    (<any>window).onYouTubeIframeAPIReady = () => {
      player = new (<any>window).YT.Player('premiere-page-player', {
        videoId: videoID,
        playerVars: {
          controls: 0,
          disablekb: 0,
          enablejsapi: 1,
          iv_load_policy: 3,
          showinfo: 0,
          rel: 0,
          autoplay: 0,
          modestbranding: 0,
          playsinline: 1,
          fs: 0,
          cc_load_policy: 0,
          color: "white",
          origin: "https://chervyakov-vladislav.github.io"
        },
        events: {
          onStateChange: this.onPlayerStateChange,
          onReady: this.onPlayerReady,
        }
      });
    }
  }

  public togglePlay() {
    player.playVideo();
  }

  public togglePause() {
    player.pauseVideo();
  }

  private onPlayerStateChange(e: Event) {
    // const target: any = e.target;
  }

  private onPlayerReady(e: Event) {
    // const target: any = e.target;
  }

  private createIFrame(videoID: string, toggleDiv: HTMLElement, parantNode: HTMLElement) {
    const params = `https://www.youtube.com/embed/${videoID}?controls=0&disablekb=0&enablejsapi=1&iv_load_policy=3&showinfo=0&rel=0&autoplay=0&modestbranding=0&playsinline=1&fs=0&cc_load_policy=0&color=white&origin=http%3A%2F%2Flocalhost%3A8080&widgetid=1`;
    const newIFrame = new IFrameElement(null, {
      tagName: 'iframe',
      id: 'premiere-page-player',
      frameborder: '0',
      src: params,
    }).node;
    const allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    newIFrame.setAttribute('allow', allow);
    newIFrame.setAttribute('allowfullscreen', '1');
    parantNode.insertBefore(newIFrame, toggleDiv);
    toggleDiv.remove();
  }
}
const ytPlayerService = new YTPlayerService();
export default ytPlayerService;
