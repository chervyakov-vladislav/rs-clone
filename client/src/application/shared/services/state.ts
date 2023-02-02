class State {
  public data;
  // public data: Interface; описать интерфейс

  constructor() {
    this.data = {
      premiere: {
        link: 'https://youtu.be/d9MyW72ELq0',
        info: 12321,
      },
    };
  }

  public setPremiereInfo(link: string, info: number) {
    this.data.premiere.link = link;
    this.data.premiere.info = info;
  }

  public getPremiereInfo() {
    return this.data.premiere;
  }
}

const state = new State();
export default state;
