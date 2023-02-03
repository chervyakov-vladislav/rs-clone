/* eslint-disable */
import YoutubeAPI from '../../../../core/components/scripts/youtube-api';
// import { IFilmData } from '../../../../shared/models/response-data';
import state from '../../../../shared/services/state';

let YT: any;

class YTPlayerService {
  private player: any;

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
      const player = (<any>window).YT.Player('premiere-page-player', {
        videoId: videoID,
        height: '100%',
        width: '100%',
      });
    }
  }

  public setControls(player: HTMLVideoElement) {
    // console.log(player.getOptions());
  }
}
const ytPlayerService = new YTPlayerService();
export default ytPlayerService;
