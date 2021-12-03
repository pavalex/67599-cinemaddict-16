const filmToFilterMap = {
  Watchlist: (cards) => cards.filter((card) => card.isWatchlist).length,
  History: (cards) => cards.filter((card) => card.isWatched).length,
  Favorites: (cards) => cards.filter((card) => card.isFavorite).length,
};

export const generateFilter = (cards) => Object.entries(filmToFilterMap).map(
  ([filterName, countCards]) => ({
    name: filterName,
    count: countCards(cards)
  })
);
