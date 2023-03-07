import state from '../../../../shared/services/state';
import ReviewCard from '../../../components/account-page/user-data/reviews/review-card/review-card';

class UserReviewsRenderService {
  private containerReviews: HTMLElement = document.createElement('div');

  private newCard: ReviewCard | null = null;

  public registerContainer(elem: HTMLElement) {
    this.containerReviews = elem;
  }

  public renderReviews() {
    const reviews = state.getUserReviewList();
    reviews.forEach((review) => {
      this.newCard = new ReviewCard(this.containerReviews, review);
    });
  }
}

const userReviewsRenderService = new UserReviewsRenderService();
export default userReviewsRenderService;
