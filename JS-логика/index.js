// 1\. Напишите функцию deepEqual для проверки двух обьектов на идентичность. Пример:

// deepEqual({name: 'test'}, {name: 'test'}) // output true
// deepEqual({name: 'test'}, {name: 'test1'}) // output false
// deepEqual({name: 'test', data: {value: 1}}, {name: 'test', data: {value: 2}}) // output false
// deepEqual({name: 'test'}, {name: 'test', age: 10}) // false

// --------------------solution--------------------

const deepEqual = function (obj1, obj2) {
  const entries1 = Object.entries(obj1);
  const entries2 = Object.entries(obj2);
  if (entries1.length != entries2.length) {
    return false;
  }

  for (const item1 of entries1) {
    console.log(item1);
    for (const item2 of entries2) {
      if (item1 != item2) {
        return false;
      }
    }
  }

  return true;
};

// console.log(deepEqual({ name: 'test' }, { name: 'test' })); // true
// console.log(deepEqual({ name: 'test' }, { name: 'test1' })); // false
// console.log(
//   deepEqual(
//     { name: 'test', data: { value: 1 } },
//     { name: 'test', data: { value: 2 } }
//   )
// ); // false

// console.log(deepEqual({ name: 'test' }, { name: 'test', age: 10 })); // false

// 2\. Напишите функцию генератор chunkArray, которая возвращает итератор возвращающий части массива указанной длинны. Пример:

// const iterator = chunkArray([1,2,3,4,5,6,7,8], 3);
// iterator.next() // { value: [1,2,3], done: false }
// iterator.next() // { value: [4,5,6], done: false }
// iterator.next() // { value: [7,8], done: false }
// iterator.next() // { value: undefined, done: true }

// --------------------solution--------------------

function* chunkArray(arr, chunkSize) {
  for (let i = 0; i < arr.length; i += chunkSize) {
    yield arr.slice(i, i + chunkSize);
  }
}

const iterator = chunkArray([1, 2, 3, 4, 5, 6, 7, 8], 3);

// console.log(iterator.next()); // { value: [1,2,3], done: false }
// console.log(iterator.next()); // { value: [4,5,6], done: false }
// console.log(iterator.next()); // { value: [7,8], done: false }
// console.log(iterator.next()); // { value: undefined, done: true }

// 3\. Напишите функцию обертку, которая на вход принимает массив функций и их параметров,
// а возвращает массив результатов их выполнения. Количество аргументов исполняемой функции ** не ограничено ** ! Пример:

const f1 = (cb) => {cb(1)}
const f2 = (a, cb) => {cb(a)}
const f3 = (a, b, cb) => {setTimeout(() => cb([a, b]), 1000)}

// bulkRun(
//   [
//     [f1, []],
//     [f2, [2]]
//     [f3, [3, 4]]
//   ]
// ).then(console.log)
//  // Output: [1, 2, [3, 4]]

// --------------------solution--------------------

async function bulkRun(functions) {
  const results = [];

  for (const [fn, args] of functions) {
    const result = await new Promise(resolve => {
      fn(...args, resolve);
    });
    results.push(result);
  }

  return results;
}

// bulkRun(
//   [
//     [f1, []],
//     [f2, [2]],
//     [f3, [3, 4]]
//   ]
// ).then(console.log)
 // Output: [1, 2, [3, 4]]

// 4\. Напишите метод arrayToObject, который превращает массив в объект (использовать рекурсию). Пример: 

const arr = [
  ['name', 'developer'],
  ['age', 5],
  [
    'skills',
    [
      ['html', 4],
      ['css', 5],
      ['js', 5],
    ],
  ],
];

const arrayToObject = function (arr) {
  const obj = {};

  arr.forEach(([key, value]) => {
    if (Array.isArray(value)) {
      obj[key] = arrayToObject(value);
    } else {
      obj[key] = value;
    }
  });

  return obj;
};

// console.log(arrayToObject(arr));
// Outputs: {
// 	name: 'developer',
// 	age: 5,
// 	skills: {
// 		html: 4,
// 		css: 5,
// 		js: 5
// 	}
// // 5\. Написать обратный метод (см. задачу 4) objectToArray, который из объекта создаст массив. Пример:

// objectToArray({
// 	name: 'developer',
// 	age: 5,
// 	skills: {
// 		html: 4,
// 		css: 5,
// 		js: 5
// 	}
// })

// // Outputs: [['name', 'developer'], ['age', 5], ['skills', [['html', 4], ['css', 5], ['js', 5]]]

// --------------------solution--------------------

function objectToArray(obj) {
  const result = [];

  for (const key in obj) {
    if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
      result.push([key, objectToArray(obj[key])]);
    } else {
      result.push([key, obj[key]]);
    }
  }

  return result;
}

// console.log(objectToArray({
// 	name: 'developer',
// 	age: 5,
// 	skills: {
// 		html: 4,
// 		css: 5,
// 		js: 5
// 	}
// }))

// 6. Есть функция `primitiveMultiply`, которая умножает числа, но случайным образом может выбрасывать исключения типа: `NotificationException`, `ErrorException`. 
// Задача написать функцию обертку которая будет повторять вычисление при исключении`NotificationException`, 
// но прекращать работу при исключениях`ErrorException`

// Пример:


// function NotificationException() {}
// function ErrorException() {}
// function primitiveMultiply(a, b) {
//   const rand = Math.random();
//   if (rand < 0.5) {
//     return a * b;
//   } else if(rand > 0.85) {
//     throw new ErrorException()
//   } else {
//     throw new NotificationException()
//   }
// }

// function reliableMultiply(a, b) {
//   // Ваш код
// }

// console.log(reliableMultiply(8, 8));

function NotificationException() {}
function ErrorException() {}

function primitiveMultiply(a, b) {
  const rand = Math.random();
  if (rand < 0.5) return a * b;
  if (rand > 0.85) throw new ErrorException();
  throw new NotificationException();
}

function reliableMultiply(a, b) {
  while (true) {
    try {
      return primitiveMultiply(a, b);
    } catch (error) {
      if (error instanceof ErrorException) throw error;
    }
  }
}

// try {
//   console.log(reliableMultiply(8, 8));
// } catch (error) {
//   console.log('An error occurred:', error);
// }

// console.log(reliableMultiply(8, 8));


// 7\.  Напишите функцию, которая берет объект любой вложенности и преобразует ее в единую плоскую карту с разными уровнями,
// разделенными косой чертой(`'/'`).Пример:

const myObj = {
  a: {
    b: {
      c: 12,
      d: 'Hello World',
    },
    e: [1, 2, 3],
  },
};

// mapObject(demoData);
// // Outputs: {
//   'a/b/c': 12,
//   'a/b/d': 'Hello World',
//   'a/e': [1,2,3]
// }

// --------------------solution--------------------

function mapObject(obj, prefix = '') {
  const result = {};

  for (const key in obj) {
    if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
      const nestedKeys = mapObject(obj[key], `${prefix}${key}/`);
      for (const nestedKey in nestedKeys) {
        result[nestedKey] = nestedKeys[nestedKey];
      }
    } else {
      result[`${prefix}${key}`] = obj[key];
    }
  }

  return result;
}

const obj = {
  a: {
    b: {
      c: 12,
      d: 'Hello World',
    },
    e: [1, 2, 3],
  },
};

// console.log(mapObject(myObj));

// 8\. Напишите функцию`combos`, которая принимает положительное целое число `num` и
// возвращает массив массивов положительных целых чисел, где сумма каждого массива равна`num`.Массивы не должны повторяться. Пример:

// combos(3);
// // Output:
// [
//   [ 3 ],
//   [ 1, 1, 1 ],
//   [ 1, 2 ]
// ]

// combos(10);
// // Output:
// [
//   [ 10 ],
//   [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
//   [ 1, 1, 1, 1, 1, 1, 1, 1, 2 ],
//   [ 1, 1, 1, 1, 1, 1, 1, 3 ],
//   [ 1, 1, 1, 1, 1, 1, 4 ],
//   [ 1, 1, 1, 1, 1, 5 ],
//   [ 1, 1, 1, 1, 6 ],
//   [ 1, 1, 1, 7 ],
//   [ 1, 1, 8 ],
//   [ 1, 9 ],
//   [ 1, 1, 1, 1, 1, 1, 2, 2 ],
//   [ 1, 1, 1, 1, 1, 2, 3 ],
//   [ 1, 1, 1, 1, 2, 4 ],
//   [ 1, 1, 1, 1, 2, 2, 2 ],
//   [ 1, 1, 1, 1, 3, 3 ],
//   [ 1, 1, 1, 2, 5 ],
//   [ 1, 1, 1, 2, 2, 3 ],
//   [ 1, 1, 1, 3, 4 ],
//   [ 1, 1, 2, 6 ],
//   [ 1, 1, 2, 2, 4 ],
//   [ 1, 1, 2, 2, 2, 2 ],
//   [ 1, 1, 2, 3, 3 ],
//   [ 1, 1, 3, 5 ],
//   [ 1, 1, 4, 4 ],
//   [ 1, 2, 7 ],
//   [ 1, 2, 2, 5 ],
//   [ 1, 2, 2, 2, 3 ],
//   [ 1, 2, 3, 4 ],
//   [ 1, 3, 6 ],
//   [ 1, 3, 3, 3 ],
//   [ 1, 4, 5 ],
//   [ 2, 8 ],
//   [ 2, 2, 6 ],
//   [ 2, 2, 2, 4 ],
//   [ 2, 2, 2, 2, 2 ],
//   [ 2, 2, 3, 3 ],
//   [ 2, 3, 5 ],
//   [ 2, 4, 4 ],
//   [ 3, 7 ],
//   [ 3, 3, 4 ],
//   [ 4, 6 ],e
//   [ 5, 5 ]
// ]

// --------------------solution--------------------

function combos(num) {
  function generateCombinations(target, start, currentCombo) {
    if (target === 0) {
      result.push([...currentCombo]);
      return;
    }
    if (target < 0 || start > num) {
      return;
    }

    for (let i = start; i <= num; i++) {
      currentCombo.push(i);
      generateCombinations(target - i, i, currentCombo);
      currentCombo.pop();
    }
  }

  const result = [];
  generateCombinations(num, 1, []); 
  result[0] = [num]; 
  return result;
}

// console.log(combos(3));
// console.log(combos(10));


// 9\.  Напишите функцию`add`, которая бы работала следующим образом`add(1)(2)(7)...(n)`.
// Количество последовательных визовов неограничено. Пример:

// Number(add(1)(2)); // == 3
// Number(add(1)(2)(5)); // == 8
// Number(add(1)(2)(-3)(4)); //  == 4
// Number(add(1)(2)(3)(4)(-5)); // == 5

// --------------------solution--------------------

const add = function (num) {
  function nextAdd(nextNum) {
    return add(num + nextNum);
  }
  nextAdd.valueOf = function () {
    return num;
  };

  return nextAdd;
};

// console.log(Number(add(1)(2))); // 3
// console.log(Number(add(1)(2)(5))); // 8
// console.log(Number(add(1)(2)(-3)(4))); // 4
// console.log(Number(add(1)(2)(3)(4)(-5))); // 5
