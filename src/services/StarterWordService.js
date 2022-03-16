import { LetterValues } from "./LetterValueService";

const wordlist = import("wordle-wordlist");

const CurrentStartWords = [];
let Words = [];
const GetWords = async () => {
  if (Words) {
    return Promise.resolve(Words);
  }
  Words = await wordlist.guesses();
  return Words;
};

const GetWordWithoutCurrentlyUsedLetters = (word) => {
  const currentlyUsedLetters = CurrentStartWords.join("");
  const wordWithoutLetters = word.filter(
    (l) => currentlyUsedLetters.indexOf(l) === -1
  );
  return wordWithoutLetters;
};
const GetWordScoreInCurrentContext = (word) => {
  return {
    score: GetScoreForString(word),
    contextScore: GetScoreForString(GetWordWithoutCurrentlyUsedLetters(word)),
  };
};
const GetScoreForString = (word) => {
  console.log("Evaluating " + word);
  const letterValues = [...word].map((l) => LetterValues[l.toLowerCase()]);
  const sumOfLetters = letterValues.reduce((p, c) => p + c, 0);
  return sumOfLetters;
};

export const TryWord = async (word, minScore) => {
  const words = await GetWords();
  if (words.indexOf(word) === -1) {
    return { success: false, reason: "Word is is not a valid wordle word" };
  }
  const potentialWordScore = GetWordScoreInCurrentContext(word);

  const isSuccess = potentialWordScore >= minScore;
  return { success: isSuccess, reason: potentialWordScore.reason };
};
export const AddWord = async (word) => {
  const words = await GetWords();
  if (words.indexOf(word) === -1) {
    console.log("I need to add redux so this actually updates everything");
    return { success: false, reason: "Word is is not a valid wordle word" };
  }
  const scoredWord = { word, ...GetWordScoreInCurrentContext(word) };
  CurrentStartWords.push(scoredWord);
  return scoredWord;
};

export const CurrentStartWordList = () => CurrentStartWords;
