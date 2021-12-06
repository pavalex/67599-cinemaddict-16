// Генерация случайного целого числа из диапазона
export const getRandomInteger = (minNumber = 0, maxNumber = 1) => {
  const lower = Math.ceil(Math.min(minNumber, maxNumber));
  const upper = Math.floor(Math.max(minNumber, maxNumber));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

// Генерация случайного дробного числа из диапазона
export const getRandomPositiveFloat = (a, b, digits = 1) => {
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));
  const result = Math.random() * (upper - lower) + lower;

  return result.toFixed(digits);
};

// Алгоритм Фишера-Йетса для создание случайного массива из тех же данных
export const getShuffle = (arr) => {
  let j;
  let temp;
  for(let i = arr.length - 1; i > 0; i--) {
    j = Math.floor(Math.random()*(i + 1));
    temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
  }
  return arr;
};


