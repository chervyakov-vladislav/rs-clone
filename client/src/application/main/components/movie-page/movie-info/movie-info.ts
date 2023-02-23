import './movie-info.scss';
import DOMElement from '../../../../shared/components/base-elements/dom-element';
import { IFilmData, IReviewsData, IStaff } from '../../../../shared/models/response-data';
import ImageElement from '../../../../shared/components/base-elements/image-element';
import ButtonElement from '../../../../shared/components/base-elements/button-element';
import SVG from '../../../../shared/components/svg-icons';
import movieValue from '../../../services/movie-page/movie-value.service';
import state from '../../../../shared/services/state';
import likeFilmsService from '../../../services/account-page/liked-films/liked-films.service';
import apiKinopoisk from '../../../../shared/services/api/api-kinopoisk';
import apiHelpers from '../../../../shared/services/api/api-helpers.service';

export default class MovieInfo {
  private staff: IStaff[];

  private column1: DOMElement;

  private moviePoster: DOMElement;

  private moviePosterImage: ImageElement;

  private movieWallpapers: ButtonElement | null;

  private column2: DOMElement;

  private movieTitle: DOMElement;

  private movieButtons: DOMElement;

  private buttonWatch: ButtonElement;

  private buttonRate: ButtonElement;

  private movieAbout: DOMElement;

  private movieGrid: DOMElement;

  private gridYear1: DOMElement;

  private gridYear2: DOMElement;

  private gridCountry1: DOMElement;

  private gridCountry2: DOMElement;

  private gridGenre1: DOMElement;

  private gridGenre2: DOMElement;

  private gridDirector1: DOMElement;

  private gridDirector2: DOMElement;

  private gridWritter1: DOMElement;

  private gridWritter2: DOMElement;

  private gridProducer1: DOMElement;

  private gridProducer2: DOMElement;

  private gridOperator1: DOMElement;

  private gridOperator2: DOMElement;

  private gridComposer1: DOMElement;

  private gridComposer2: DOMElement;

  private gridEditor1: DOMElement;

  private gridEditor2: DOMElement;

  private gridTime1: DOMElement;

  private gridTime2: DOMElement;

  private column3: DOMElement;

  private gridRating: DOMElement;

  private gridRatingTotal: DOMElement;

  private gridReviewsTotal: DOMElement;

  private movieCast: DOMElement;

  private movieCastTitle: DOMElement;

  constructor(container: HTMLElement, item: IFilmData, staff: IStaff[], reviews: IReviewsData) {
    this.staff = staff;

    this.column1 = new DOMElement(container, {
      tagName: 'div',
      classList: ['movie-info__column1'],
    });

    this.moviePoster = new DOMElement(this.column1.node, {
      tagName: 'div',
      classList: ['movie-info__poster'],
    });

    this.moviePosterImage = new ImageElement(this.moviePoster.node, {
      tagName: 'img',
      classList: ['movie-info__poster_img'],
      src: item.posterUrl as string,
      alt: item.nameRu as string,
    });

    this.movieWallpapers = null;
    this.checkWallapapers(item.kinopoiskId);

    this.column2 = new DOMElement(container, {
      tagName: 'div',
      classList: ['movie-info__column2'],
    });

    this.movieTitle = new DOMElement(this.column2.node, {
      tagName: 'h2',
      classList: ['movie-info__title'],
      content: `${movieValue.isNameRU(item)} (${movieValue.getYear(item)})`,
    });

    this.movieButtons = new DOMElement(this.column2.node, {
      tagName: 'div',
      classList: ['movie-info__buttons'],
    });

    this.buttonWatch = new ButtonElement(this.movieButtons.node, {
      tagName: 'button',
      classList: likeFilmsService.checkWatchLaterList(item.kinopoiskId)
        ? ['movie-info__to-watch-btn', 'movie-info__to-watch-btn--active']
        : ['movie-info__to-watch-btn'],
    });
    this.buttonWatch.node.innerHTML = SVG.tabBookmark;
    this.buttonWatch.node.addEventListener('click', () => {
      if (state.allData.account.userData.logged) {
        if (likeFilmsService.checkWatchLaterList(item.kinopoiskId)) {
          likeFilmsService.removeWatchLaterValue(item.kinopoiskId);
          this.buttonWatch.node.classList.remove('movie-info__to-watch-btn--active');
        } else {
          likeFilmsService.appendWatchLaterValue(item.kinopoiskId);
          this.buttonWatch.node.classList.add('movie-info__to-watch-btn--active');
        }
      } else {
        window.location.hash = '#auth';
      }
    });

    this.buttonRate = new ButtonElement(this.movieButtons.node, {
      tagName: 'button',
      classList: likeFilmsService.checkLikedFilmsList(item.kinopoiskId)
        ? ['movie-info__to-rate-btn', 'movie-info__to-rate-btn--active']
        : ['movie-info__to-rate-btn'],
    });
    this.buttonRate.node.innerHTML = SVG.starRating;
    this.buttonRate.node.addEventListener('click', () => {
      if (state.allData.account.userData.logged) {
        if (likeFilmsService.checkLikedFilmsList(item.kinopoiskId)) {
          likeFilmsService.removeLikedFilmsValue(item.kinopoiskId);
          this.buttonRate.node.classList.remove('movie-info__to-rate-btn--active');
        } else {
          likeFilmsService.appendLikedFilmsValue(item.kinopoiskId);
          this.buttonRate.node.classList.add('movie-info__to-rate-btn--active');
        }
      } else {
        window.location.hash = '#auth';
      }
    });

    this.movieAbout = new DOMElement(this.column2.node, {
      tagName: 'h3',
      classList: ['movie-info__about-title'],
      content: 'О фильме',
    });

    this.movieGrid = new DOMElement(this.column2.node, {
      tagName: 'div',
      classList: ['movie-info__grid'],
    });

    this.gridYear1 = new DOMElement(this.movieGrid.node, {
      tagName: 'p',
      classList: ['movie-info__grid_text'],
      content: 'Год производства',
    });

    this.gridYear2 = new DOMElement(this.movieGrid.node, {
      tagName: 'p',
      classList: ['movie-info__grid_text'],
      content: `${movieValue.getYear(item)}`,
    });

    this.gridCountry1 = new DOMElement(this.movieGrid.node, {
      tagName: 'p',
      classList: ['movie-info__grid_text'],
      content: 'Страна',
    });

    this.gridCountry2 = new DOMElement(this.movieGrid.node, {
      tagName: 'p',
      classList: ['movie-info__grid_text'],
      content: movieValue.getCountry(item),
    });

    this.gridGenre1 = new DOMElement(this.movieGrid.node, {
      tagName: 'p',
      classList: ['movie-info__grid_text'],
      content: 'Жанр',
    });

    this.gridGenre2 = new DOMElement(this.movieGrid.node, {
      tagName: 'p',
      classList: ['movie-info__grid_text'],
      content: movieValue.getGenres(item),
    });

    this.gridDirector1 = new DOMElement(this.movieGrid.node, {
      tagName: 'p',
      classList: ['movie-info__grid_text'],
      content: 'Режиссёр',
    });

    this.gridDirector2 = new DOMElement(this.movieGrid.node, {
      tagName: 'p',
      classList: ['movie-info__grid_text'],
      content: movieValue.getStaff(staff, 'DIRECTOR'),
    });

    this.gridWritter1 = new DOMElement(this.movieGrid.node, {
      tagName: 'p',
      classList: ['movie-info__grid_text'],
      content: 'Сценарий',
    });

    this.gridWritter2 = new DOMElement(this.movieGrid.node, {
      tagName: 'p',
      classList: ['movie-info__grid_text'],
      content: movieValue.getStaff(staff, 'WRITER'),
    });

    this.gridProducer1 = new DOMElement(this.movieGrid.node, {
      tagName: 'p',
      classList: ['movie-info__grid_text'],
      content: 'Продюсер',
    });

    this.gridProducer2 = new DOMElement(this.movieGrid.node, {
      tagName: 'p',
      classList: ['movie-info__grid_text'],
      content: movieValue.getStaff(staff, 'PRODUCER'),
    });

    this.gridOperator1 = new DOMElement(this.movieGrid.node, {
      tagName: 'p',
      classList: ['movie-info__grid_text'],
      content: 'Оператор',
    });

    this.gridOperator2 = new DOMElement(this.movieGrid.node, {
      tagName: 'p',
      classList: ['movie-info__grid_text'],
      content: movieValue.getStaff(staff, 'OPERATOR'),
    });

    this.gridComposer1 = new DOMElement(this.movieGrid.node, {
      tagName: 'p',
      classList: ['movie-info__grid_text'],
      content: 'Композитор',
    });

    this.gridComposer2 = new DOMElement(this.movieGrid.node, {
      tagName: 'p',
      classList: ['movie-info__grid_text'],
      content: movieValue.getStaff(staff, 'COMPOSER'),
    });

    this.gridEditor1 = new DOMElement(this.movieGrid.node, {
      tagName: 'p',
      classList: ['movie-info__grid_text'],
      content: 'Монтаж',
    });

    this.gridEditor2 = new DOMElement(this.movieGrid.node, {
      tagName: 'p',
      classList: ['movie-info__grid_text'],
      content: movieValue.getStaff(staff, 'EDITOR'),
    });

    this.gridTime1 = new DOMElement(this.movieGrid.node, {
      tagName: 'p',
      classList: ['movie-info__grid_text'],
      content: 'Время',
    });

    this.gridTime2 = new DOMElement(this.movieGrid.node, {
      tagName: 'p',
      classList: ['movie-info__grid_text'],
      content: movieValue.getTime(item),
    });

    this.column3 = new DOMElement(container, {
      tagName: 'div',
      classList: ['movie-info__column3'],
    });

    this.gridRating = new DOMElement(this.column3.node, {
      tagName: 'p',
      classList: movieValue.getRatingStyle(item),
      content: `${movieValue.getRating(item)}`,
    });

    this.gridRatingTotal = new DOMElement(this.column3.node, {
      tagName: 'p',
      classList: ['movie-info__ratings-total'],
      content: `${item.ratingKinopoiskVoteCount} ${movieValue.declOfNum(item.ratingKinopoiskVoteCount, [
        'оценка',
        'оценки',
        'оценок',
      ])}`,
    });

    this.gridReviewsTotal = new DOMElement(this.column3.node, {
      tagName: 'p',
      classList: ['movie-info__reviews-total'],
      content: `${reviews.total} ${movieValue.declOfNum(reviews.total, ['рецензия', 'рецензии', 'рецензий'])}`,
    });

    this.movieCast = new DOMElement(this.column3.node, {
      tagName: 'div',
      classList: ['movie-info__cast'],
    });

    this.movieCastTitle = new DOMElement(this.movieCast.node, {
      tagName: 'h4',
      classList: ['movie-info__cast_title'],
      content: 'В главных ролях',
    });

    let tooltipElem: HTMLElement | null;
    this.movieCast.node.addEventListener('mouseover', (e: Event) => {
      e.preventDefault();
      const target = e.target as HTMLElement;
      if (tooltipElem) tooltipElem.remove();
      apiHelpers.debounce(async () => {
        let actor;
        tooltipElem = document.createElement('div');
        tooltipElem.className = 'tooltip';

        const coords = target.getBoundingClientRect();

        let left = coords.left + (target.offsetWidth - tooltipElem.offsetWidth) - 500;
        if (left < 0) left = 0;

        let top = coords.top - tooltipElem.offsetHeight - 5;
        if (top < 0) {
          top = coords.top + target.offsetHeight + 5;
        }

        tooltipElem.style.left = `${left}px`;
        tooltipElem.style.top = `${top}px`;

        document.body.append(tooltipElem);

        if (target && target.tagName === 'P') {
          if (target.dataset.actor) {
            actor = await apiKinopoisk.getActorData(+target.dataset.actor);
          }
          if (actor) {
            const actorPhoto = document.createElement('div');
            actorPhoto.className = 'tooltip__actor-photo';
            const actorPhotoPic = document.createElement('img');
            actorPhotoPic.src = actor.posterUrl as string;
            actorPhoto.append(actorPhotoPic);
            tooltipElem.append(actorPhoto);

            const actorData = document.createElement('div');
            actorData.className = 'tooltip__actor-data';

            const actorName = document.createElement('div');
            actorName.className = 'tooltip__actor-name';
            actorName.innerHTML = `${actor.nameRu}`;
            actorData.append(actorName);

            const actorProf = document.createElement('div');
            actorProf.className = 'tooltip__actor-prof';
            actorProf.innerHTML = `${actor.profession}`;
            actorData.append(actorProf);

            tooltipElem.append(actorData);
          }
        }
      }, 500)();
    });
    document.body.addEventListener('mouseout', () => {
      if (tooltipElem) {
        tooltipElem.remove();
        tooltipElem = null;
      }
    });

    this.renderActor();
  }

  private renderActor() {
    const container = this.movieCast.node;
    const actors = movieValue.getActor(this.staff, 'ACTOR').slice(0, 13);

    if (Array.isArray(actors)) {
      actors.forEach((actor) => {
        return new DOMElement(container, {
          tagName: 'p',
          classList: ['movie-info__actor'],
          content: `${actor.nameRu}`,
          dataset: `${actor.staffId}`,
        });
      });
    }
  }

  private async checkWallapapers(id: number) {
    const res = await apiKinopoisk.getFilmImages(id, 1, 'POSTER');
    this.movieWallpapers =
      res.items.length > 0
        ? new ButtonElement(this.column1.node, {
            tagName: 'button',
            classList: ['movie-info__wallpapersbtn-btn'],
            content: 'Постеры',
          })
        : null;
    if (res.items.length > 0) {
      (this.movieWallpapers as ButtonElement).node.addEventListener('click', () => {
        window.location.hash = `#wallpapers/${id}`;
      });
    }
  }
}
