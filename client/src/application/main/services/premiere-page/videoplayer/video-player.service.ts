/* eslint-disable */
import YoutubeAPI from '../../../../core/components/scripts/youtube-api';
// import { IFilmData } from '../../../../shared/models/response-data';
import state from '../../../../shared/services/state';

var player: any;

class YTPlayerService {
  private ytService: YoutubeAPI | null;

  constructor() {
    this.ytService = null;
  }

  public initPlayer() {
    const videoLink = state.getPremiereInfo()?.link as string;
    const videoID = this.getVideoID(videoLink) as string;

    // удаляем старый скрипт апи
    this.removeOldApi();

    // грузим данные в YT Player
    this.setNewPlayerData(videoID);

    // добавляем новый скрипт апи
    this.ytService = new YoutubeAPI(document.body);
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
    console.log(e);
  }

  private onPlayerReady(e: Event) {
    console.log(e);
  }
}
const ytPlayerService = new YTPlayerService();
export default ytPlayerService;
