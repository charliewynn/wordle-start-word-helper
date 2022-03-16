import "./styles/StartWordHelper.css";
import { CurrentStartWordList } from "./services/StarterWordService";

function StartWordHelper() {
  const renderCurrentWord = (word) => {
    return (
      <div key={word.word} className="current-word">
        <div className="current-word__word">{word.word}</div>
        <div className="current-word__score">{word.score}</div>
        <div className="current-word__contextScore">{word.contextScore}</div>
      </div>
    );
  };
  const renderCurrentWordList = () => {
    const currentWords = CurrentStartWordList();
    console.log("Got Current Words", currentWords);
    return (
      <div className="current-words">{currentWords.map(renderCurrentWord)}</div>
    );
  };
  return <div className="start-word-helper">{renderCurrentWordList()}</div>;
}

export default StartWordHelper;
