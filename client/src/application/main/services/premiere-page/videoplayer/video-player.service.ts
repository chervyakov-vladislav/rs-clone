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

    if (!player) {
      this.setNewPlayerData(videoID);
      this.ytService = new YoutubeAPI(document.body);
    } else {
      this.createIFrame(toggleDiv, parantNode);
    }
  }

  private getVideoID(link: string) {
    return link.trim().split('/').pop()?.split('?t=')[0];
  }

  private setNewPlayerData(videoID: string) {
    (<any>window).onYouTubeIframeAPIReady = () => {
      player = new (<any>window).YT.Player('premiere-page-player', {
        videoId: videoID,
        width: "100%",
        height: "100%",
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
    state.setIframe(player.getIframe());
  }

  private createIFrame(toggleDiv: HTMLElement, parantNode: HTMLElement) {
    const newIFrame = state.getIframe();
    parantNode.insertBefore(newIFrame, toggleDiv);
    toggleDiv.remove();
  }

  public mute() {
    player.mute();
  }

  public unmute() {
    player.unMute();
  }

  public setVolume(volume: number) {
    player.setVolume(volume);
  }
}
const ytPlayerService = new YTPlayerService();
export default ytPlayerService;
