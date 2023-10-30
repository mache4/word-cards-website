import { useState, useRef } from "react";
import { WordType } from "../core/types";
import { accentsTidy } from "../core/utils";

interface Props {
    words: WordType[],
    numOfWords: number,
    visible: boolean,
    hide: any
}

const Quiz = ({ words, numOfWords, visible, hide }: Props) => {
    let [haveIt, setHaveIt] = useState<number[]>([0]);

    const [number, setNumber] = useState<number>(0);
    const [message, setMessage] = useState<string>("");
    const [showAnswer, setShowAnswer] = useState(false);
    const answerRef = useRef<any>();

    const generateUniqueRandom = (max: number): number => {
        let random: number = Math.floor(Math.random() * max);
        random = Number(random);

        if (!haveIt.includes(random)) {
            setHaveIt([...haveIt, random]);
            return random;
        } else {
            if (haveIt.length < max)
                return generateUniqueRandom(max);
            else {
                setHaveIt([]);
                return -1;
            }
        }
    }

    const handleNext = () => {
        setNumber(generateUniqueRandom(numOfWords));
        setMessage("");
        setShowAnswer(false);
        answerRef.current.value = "";
    }

    const handleGuess = () => {
        let answer = accentsTidy(answerRef.current.value);
        if (accentsTidy(words[number].selectedLanguageName) === answer)
            return setMessage("CORRECT");
        else
            return setMessage("FALSE");
    }

    const handleShowAnswer = () => setShowAnswer(true);

    const handleTryAgain = () => {
        setHaveIt([]);
        setNumber(generateUniqueRandom(numOfWords));
    }

    const handleLeave = () => {
        hide();
        if (number > -1)
            handleNext();
        handleTryAgain();
        setHaveIt([]);
    }

    const handleEnter = (e: any) => {
        let answer = accentsTidy(answerRef.current.value);

        if (e.key === "Enter") {
            if (accentsTidy(words[number].selectedLanguageName) === answer)
                handleNext();
            else
                handleGuess();
        }
        else if (e.keyCode.toString() === "38")
            handleShowAnswer();
    }

    return (
        <div className={`fixed z-50 w-full h-screen top-0 left-0 flex flex-col items-center justify-center bg-slate-700 text-white ${visible ? "block" : "hidden"}`}>
            <button className="bg-red-600 px-4 py-2 rounded-md" onClick={handleLeave}>Leave</button>
            {number > -1 && <div className="w-[50%]">
                <p className={`opacity-0 text-2xl my-4 ${message === "CORRECT" && "text-green-500 opacity-100 "} ${message === "FALSE" && "text-red-500 opacity-100"}`}>
                    {message}
                    {message !== "FALSE" && message !== "CORRECT" && "CIGAN"}
                </p>
                {words && <>
                    <p className="text-xl">{words[number].englishName}</p>
                    <input
                        className="block w-[20rem] mx-auto text-black text-xl text-center my-2 outline-none border-4 border-slate-700 focus:border-black"
                        type="text"
                        ref={answerRef}
                        onKeyDown={(e: any) => handleEnter(e)} />
                </>}
                <div className="flex flex-col w-[20rem] items-center mx-auto gap-5 mt-8">
                    <div className="w-full flex items-center justify-between">
                        <button className="px-4 py-2 rounded-md bg-cyan-600" onClick={handleShowAnswer}>Show Answer</button>
                        <button className="px-4 py-2 rounded-md bg-cyan-600" onClick={handleGuess}>Guess</button>
                    </div>
                    <div className="w-full flex items-center justify-between">
                        <button className="px-4 py-2 rounded-md bg-cyan-600">Switch To Spanish</button>
                        <button className="px-4 py-2 rounded-md bg-cyan-600" onClick={handleNext}>Next {"->"}</button>
                    </div>
                </div>
                <p className={`opacity-0 text-xl my-4 ${showAnswer && "opacity-100"}`}>
                    Answer: <span className="text-cyan-600">{words[number].selectedLanguageName}</span>
                </p>
                <div className="mt-8">
                    <p>While typing you can use keyboard:</p>
                    <p>To Guess Press ENTER</p>
                    <p>To Show Answer Press UP ARROW Key</p>
                    <p>To Swap Languages Press DOWN ARROW Key</p>
                </div>
            </div>}
            {number === -1 && <>
                <h1 className="text-2xl my-4">Quiz Done.</h1>
                <button className="px-4 py-2 rounded-md bg-cyan-600" onClick={handleTryAgain}>Try Again</button>
            </>}
        </div>
    );
};

export default Quiz;

/*

- if word is not guessed correctly mark it as false (add markings latter (correct and false)) (counter na vrhu)
- if answer is not inserted just skip and don't remove it from the array (let it appear again)
- switch languages (from esp to eng and vice versa)
- myb if Show Answer is clicked mark it as false
- if answer is correct on Enter press just go next, but if it's false display FALSE and try again
- myb dissable guess button after first guess

*/