import ScriptElement from '../../../shared/components/base-elements/script-element';

export default class YoutubeAPI extends ScriptElement {
  constructor(parentNode: HTMLElement) {
    super(parentNode, {
      tagName: 'script',
      src: 'https://www.youtube.com/iframe_api',
      id: 'youtube-api',
    });
  }
}
