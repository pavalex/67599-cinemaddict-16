import dayjs from 'dayjs';
import {getRandomInteger, getRandomPositiveFloat, getShuffle} from '../utils.js';

// Постеры
const generatePoster = () => {
  const posters = [
    'made-for-each-other.png',
    'popeye-meets-sinbad.png',
    'sagebrush-trail.jpg',
    'santa-claus-conquers-the-martians.jpg',
    'the-dance-of-life.jpg',
    'the-great-flamarion.jpg',
    'the-man-with-the-golden-arm.jpg',
  ];

  const randomIndex = getRandomInteger(0, posters.length - 1);

  return posters[randomIndex];
};

// Название фильма
const generateNameOfMovie = () => {
  const movies = [
    'The Dance of Life',
    'Sagebrush Trail',
    'The Man with the Golden Arm',
    'Santa Claus Conquers the Martians',
    'Popeye the Sailor Meets Sindbad the Sailor',
    'The Great Flamarion',
    'Made for Each Other'
  ];

  const randomIndex = getRandomInteger(0, movies.length - 1);

  return movies[randomIndex];
};

// Рейтинг
const generateRating = () => getRandomPositiveFloat(3, 9, 1);

// Жанр
const generateGenre = () => {
  const genres = [
    'Musical',
    'Western',
    'Drama',
    'Comedy',
    'Cartoon',
    'Mystery'
  ];

  const randomIndex = getRandomInteger(0, genres.length - 1);

  return genres[randomIndex];
};

// Комментарии для карточки
const generateCountComments = () => getRandomInteger(0, 5);

// Текст комментария
const generateTextComment = () => {
  const comments = [
    'Interesting setting and a good cast',
    'Booooooooooring',
    'Very very old. Meh',
    'Almost two hours? Seriously?',
    'In rutrum ac purus sit amet tempus.'
  ];

  const randomIndex = getRandomInteger(0, comments.length - 1);

  return comments[randomIndex];
};

// Автор комментария
const generateAuthorComment = () => {
  const authors = [
    'Tim Macoveev',
    'John Doe',
    'Tom Riddle',
    'Harry Potter',
    'Albus Dumbldor'
  ];

  const randomIndex = getRandomInteger(0, authors.length - 1);

  return authors[randomIndex];
};

// Дата комментария
const generateDateComment = () => {
  const maxYearsGap = 1;
  const yearsGap = getRandomInteger(-maxYearsGap, maxYearsGap);

  return dayjs().add(yearsGap, 'year').toDate();
};

// Эмоджи
const generateEmoji = () => {
  const emojies = [
    'angry.png',
    'puke.png',
    'sleeping.png',
    'smile.png'
  ];

  const randomIndex = getRandomInteger(0, emojies.length - 1);

  return emojies[randomIndex];
};

// Описание фильма
const generateDescription = () => {
  const descriptions = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Cras aliquet varius magna, non porta ligula feugiat eget.',
    'In rutrum ac purus sit amet tempus.',
    'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
    'Nunc fermentum tortor ac porta dapibus.',
    'Fusce tristique felis at fermentum pharetra.',
    'Aliquam id orci ut lectus varius viverra.',
    'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
    'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
    'Aliquam erat volutpat.',
    'Sed sed nisi sed augue convallis suscipit in sed felis.'
  ];

  const newDescription = Array.from(getShuffle(descriptions)).slice(0, getRandomInteger(1, 6)).join(' ');

  return newDescription;
};

// Генерация даты фильма
const generateDate = () => {
  const beginYear = 1940;
  const maxYearsGap = 10;
  const yearsGap = getRandomInteger(-maxYearsGap, maxYearsGap);

  return dayjs(beginYear).add(yearsGap, 'year').toDate();
};

// Генерация продолжительности фильма, часы
const generateDurationFilmHour = () => {
  const time = [
    0,
    1,
    2
  ];

  const randomIndex = getRandomInteger(0, time.length - 1);

  return time[randomIndex];
};

// Генерация продолжительности фильма, минуты
const generateDurationFilmMinute = () => {
  const maxMinuteGap = 20;
  const minutesGap = getRandomInteger(-maxMinuteGap, maxMinuteGap);

  return dayjs().add(minutesGap, 'minute').toDate();
};

export const generateFilmItem = () => {
  const dueRating = generateRating();
  const dueDate = generateDate();
  const dueDurationFilmHour = generateDurationFilmHour();
  const dueDurationFilmMinute = generateDurationFilmMinute();
  const infoTable = {
    id: 1,
    director:	'Anthony Mann',
    writers:	['Anne Wigton', 'Heinz Herald', 'Richard Weil'],
    actors: ['Erich von Stroheim', 'Mary Beth Hughes', 'Dan Duryea'],
    releaseDate:	'30 March 1945',
    runtime:	'1h 18m',
    country:	'USA',
    genres:	['Drama', 'Film-Noir', 'Mystery']
  };

  return {
    poster: generatePoster(),
    description: generateDescription(),
    nameOfMovie: generateNameOfMovie(),
    dueRating,
    genre: generateGenre(),
    dueDate,
    dueDurationFilmHour,
    dueDurationFilmMinute,
    infoTable,
    isWatchlist: Boolean(getRandomInteger(0, 1)),
    isWatched: Boolean(getRandomInteger(0, 1)),
    isFavorite: Boolean(getRandomInteger(0, 1)),
    comments: [{
      commentsCount: generateCountComments(),
      emoji: generateEmoji(),
      textComment: generateTextComment(),
      dueDateComment: generateDateComment(),
      author: generateAuthorComment(),
    }]
  };
};
