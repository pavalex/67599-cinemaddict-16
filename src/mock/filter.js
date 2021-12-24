import {typeFilters} from '../const.js';
const {WATCHLIST, HYSTORY, FAVORITES} = typeFilters;

const filmToFilterMap = {
  [WATCHLIST]: (cards) => cards.filter((card) => card.isWatchlist).length,
  [HYSTORY]: (cards) => cards.filter((card) => card.isWatched).length,
  [FAVORITES]: (cards) => cards.filter((card) => card.isFavorite).length,
};

export const generateFilter = (cards) => Object.entries(filmToFilterMap).map(
  ([filterName, countCards]) => ({
    name: filterName,
    count: countCards(cards)
  })
);
