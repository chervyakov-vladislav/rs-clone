import YoutubeAPI from '../../../../core/components/scripts/youtube-api';
import state from '../../../../shared/services/state';

// let YT: any;

class YTPlayerService {
  private api: YoutubeAPI | null = null;

  // private player: any;

  public appendIFrame() {
    this.removeOldScripts();

    const { link } = state.getPremiereInfo();
    const id = this.getVideoID(link);

    console.log(`замена дива на айфрейм с ID ${id}`);
    this.api = new YoutubeAPI(document.body);
  }

  private removeOldScripts() {
    const youtubeScripts = Array.from(document.querySelectorAll('#youtube-api'));
    console.log(youtubeScripts);
    if (youtubeScripts.length > 0) {
      youtubeScripts.forEach((item) => item.remove());
    }
  }

  private getVideoID(link: string) {
    return link.trim().split('/').pop()?.split('?t=')[0];
  }
}
const ytPlayerService = new YTPlayerService();
export default ytPlayerService;
