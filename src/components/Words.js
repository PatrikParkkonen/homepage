
export const boardDefault = [
    ["","","","",""],
    ["","","","",""],
    ["","","","",""],
    ["","","","",""],
    ["","","","",""],
    ["","","","",""],
];

export const generateWordSet = async () => {
    let wordSet;
    let todaysWord;
    await fetch("/wordle-bank.txt")
    .then((response) => response.text())
    .then((result) => {
        const wordArr = result.split("\r\n");
            console.log("Word list:", wordArr);
        todaysWord = wordArr[Math.floor(Math.random() * wordArr.length)]
            console.log("Today's word:", todaysWord);
        wordSet = new Set(wordArr);
    });

    return { wordSet, todaysWord };
}