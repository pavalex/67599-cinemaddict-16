import dayjs from 'dayjs';

const createPopupPosterTemplate = (poster) => (
  `<div class="film-details__poster">
    <img class="film-details__poster-img" src="./images/posters/${poster}" alt="">

    <p class="film-details__age">18+</p>
  </div>`
);

const createPopupInfoHeadTemplate = (nameOfMovie, dueRating) => (
  `<div class="film-details__info-head">
    <div class="film-details__title-wrap">
      <h3 class="film-details__title">${nameOfMovie}</h3>
      <p class="film-details__title-original">Original: ${nameOfMovie}</p>
    </div>

    <div class="film-details__rating">
      <p class="film-details__total-rating">${dueRating}</p>
    </div>
  </div>`
);

const createPopupInfoTableTemplate = (infoTable) => (
  `<table class="film-details__table">
  <tr class="film-details__row">
    <td class="film-details__term">Director</td>
    <td class="film-details__cell">${infoTable.director}</td>
  </tr>
  <tr class="film-details__row">
    <td class="film-details__term">Writers</td>
    <td class="film-details__cell">${infoTable.writers.join(', ')}</td>
  </tr>
  <tr class="film-details__row">
    <td class="film-details__term">Actors</td>
    <td class="film-details__cell">${infoTable.actors.join(', ')}</td>
  </tr>
  <tr class="film-details__row">
    <td class="film-details__term">Release Date</td>
    <td class="film-details__cell">${infoTable.releaseDate}</td>
  </tr>
  <tr class="film-details__row">
    <td class="film-details__term">Runtime</td>
    <td class="film-details__cell">${infoTable.runtime}</td>
  </tr>
  <tr class="film-details__row">
    <td class="film-details__term">Country</td>
    <td class="film-details__cell">${infoTable.country}</td>
  </tr>
  <tr class="film-details__row">
    <td class="film-details__term">Genres</td>
    <td class="film-details__cell">
      <span class="film-details__genre">${infoTable.genres[0]}</span>
      <span class="film-details__genre">${infoTable.genres[1]}</span>
      <span class="film-details__genre">${infoTable.genres[2]}</span></td>
  </tr>
</table>`
);

const createPopupInfoDescriptionTemplate = (description) => (
  `<p class="film-details__film-description">
    ${description}
  </p>`
);

const createPopupControlsTemplate = (isWatchlist, isWatched, isFavorite) => {
  const getActiveClass = (isItem) => isItem ? 'film-details__control-button--active'  : '';

  const watchlistClassName = getActiveClass(isWatchlist);
  const watchedClassName = getActiveClass(isWatched);
  const favoriteClassName = getActiveClass(isFavorite);
  return (
    `<section class="film-details__controls">
    <button type="button" class="film-details__control-button ${watchlistClassName} film-details__control-button--watchlist" id="watchlist" name="watchlist">Add to watchlist</button>
    <button type="button" class="film-details__control-button ${watchedClassName} film-details__control-button--watched" id="watched" name="watched">Already watched</button>
    <button type="button" class="film-details__control-button ${favoriteClassName} film-details__control-button--favorite" id="favorite" name="favorite">Add to favorites</button>
  </section>`
  );
};

const createPopupCommentTemplate = (comments) => {
  const {emoji, textComment, author, dueDateComment} = comments;
  const date = dayjs(dueDateComment).format('DD/MM/YYYY');

  return `
  <ul class="film-details__comments-list">
    <li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${emoji}" width="55" height="55" alt="emoji-smile">
      </span>
      <div>
        <p class="film-details__comment-text">${textComment}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${author}</span>
          <span class="film-details__comment-day">${date} 23:59</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>
  </ul>`;
};

export const createPopupTemplate = (card) => {
  const {poster, nameOfMovie, dueRating, description, isWatchlist, isWatched, isFavorite, comments, infoTable} = card;

  const posterTemplate = createPopupPosterTemplate(poster);
  const infoHeadTemplate = createPopupInfoHeadTemplate(nameOfMovie, dueRating);
  const infoTableTemplate = createPopupInfoTableTemplate(infoTable);
  const infoDescriptionTemplate = createPopupInfoDescriptionTemplate(description);
  const controlsTemplate = createPopupControlsTemplate(isWatchlist, isWatched, isFavorite);

  const CommentTemplate = comments.map(createPopupCommentTemplate);

  return `<form class="film-details__inner" action="" method="get">
  <div class="film-details__top-container">
    <div class="film-details__close">
      <button class="film-details__close-btn" type="button">close</button>
    </div>
    <div class="film-details__info-wrap">
      ${posterTemplate}

      <div class="film-details__info">
        ${infoHeadTemplate}

        ${infoTableTemplate}

        ${infoDescriptionTemplate}
      </div>
    </div>

    ${controlsTemplate}
  </div>

  <div class="film-details__bottom-container">
    <section class="film-details__comments-wrap">
    <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>
      ${CommentTemplate.join('')}
      <div class="film-details__new-comment">
        <div class="film-details__add-emoji-label"></div>

        <label class="film-details__comment-label">
          <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
        </label>

        <div class="film-details__emoji-list">
          <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
          <label class="film-details__emoji-label" for="emoji-smile">
            <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
          </label>

          <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
          <label class="film-details__emoji-label" for="emoji-sleeping">
            <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
          </label>

          <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
          <label class="film-details__emoji-label" for="emoji-puke">
            <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
          </label>

          <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
          <label class="film-details__emoji-label" for="emoji-angry">
            <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
          </label>
        </div>
      </div>
    </section>
  </div>
</form>`;
};
