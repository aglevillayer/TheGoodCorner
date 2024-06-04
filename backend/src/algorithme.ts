// // Lien des algo : https://gist.github.com/karimmakhloufi/ad4a44f39260ab66907e614e6cfd735c

// //Algorithme 1 : Capitalization and Mutability
// function capitalizeWord(word) {
//   word = word[0].toUpperCase() + word.slice(1);
//   return word;
// }

// // Algorithme 2 : Get the integers between two numbers
// function range(startNum, endNum) {
//   const integers = [];
//   for (i = startNum + 1; i < endNum; i++) {
//     integers.push(i);
//   }
//   return integers;
// }

// // Algorithme 3 : Array plus array
// function arrayPlusArray(arr1, arr2) {
//   return arr1.concat(arr2).reduce((acc, cur) => acc + cur);
// }

// // Algorithme 4 : Invert values
// function invert(array) {
//   return array.map((a) => -a);
// }

// // Algorithme 5 : Sum Arrays
// function sum(numbers) {
//   return numbers.reduce((acc, currentValue) => acc + currentValue, 0);
// }

// // Algorithme 6 : Price of Mangoes
// function mango(quantity, price){
//     return (Math.floor(quantity/3)*2*price + (quantity%3)*price)
//   }

// // Algorithme 7 : Hello, Name or World!
// function hello(name: string) {
//   console.log(name);
//   if (name == "") {
//     return "Hello, World!";
//   } else {
//     const nameLowerCase: string = name.toLowerCase();
//     console.log(nameLowerCase);
//     console.log(nameLowerCase[0].toUpperCase() + nameLowerCase.slice(1));
//     const nameCapitalized: string =
//       nameLowerCase[0].toUpperCase() + nameLowerCase.slice(1);
//     return `Hello, ${nameCapitalized}!`;
//   }
// }
// console.log(hello("joHn"));

// // Algorithme 8 : String repeat
// export function repeatStr(n: number, s: string): string {
//   let word = "";
//   for (let i = 1; i <= n; i++) {
//     word += s;
//   }
//   return word;
// }
// // Correction simple
// export function repeatStr1(n: number, s: String): String {
//   return s.repeat(n);
// }

// console.log(repeatStr(3, "s"));

// Algorithme 9 : Who likes it?
// export const likes = (a: string[]): string => {
//   let word: string = "";
//   if (a.length == 1) {
//     return `${a[0]} likes this`;
//   } else if (a.length == 2) {
//     return `${a[0]} and ${a[1]} like this`;
//   } else if (a.length == 3) {
//     return `${a[0]}, ${a[1]} and ${a[2]} like this`;
//   } else if (a.length >= 4) {
//     return `${a[0]}, ${a[1]} and ${a.length - 2} others like this`;
//   }
//   return "no one likes this";
// };
// console.log(likes(["PEter", "Alice", "Roger"]));

// Algorithme 10 : Evens times last
export function evenLast(numbers: number[]): number {
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    if (i % 2 == 0) {
      sum += numbers[i];
    }
    return sum * numbers[numbers.length - 1];
  }
  return 0;
}
console.log(evenLast([]));
