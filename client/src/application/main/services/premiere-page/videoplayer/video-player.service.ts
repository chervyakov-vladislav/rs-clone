/* eslint-disable */
import { IFilmData } from '../../../../shared/models/response-data';
import state from '../../../../shared/services/state';

let YT: any;

class YTPlayerService {
  private player: any;

  public getIFrameLink() {
    const { link } = state.getPremiereInfo() as IFilmData;
    const id = this.getVideoID(link as string);
    const playerParams1 = 'enablejsapi=1&controls=0&iv_load_policy=3&loop=1';
    const playerParams2 = '&modestbranding=1&rel=0&showinfo=0&color=white';
    return `http://www.youtube.com/embed/${id}?${playerParams1}${playerParams2}`;
  }

  private getVideoID(link: string) {
    return link.trim().split('/').pop()?.split('?t=')[0];
  }

  public setControls(player: HTMLVideoElement) {
    // console.log(player.getOptions());
  }
}
const ytPlayerService = new YTPlayerService();
export default ytPlayerService;
