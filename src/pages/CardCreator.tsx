import { useRef, useState } from "react";
import { addCard } from "../core/api";
import { WordType } from "../core/types";

const CardCreator = () => {
    const titleRef = useRef<HTMLInputElement | any>();
    const languageRef = useRef<HTMLInputElement | any>();
    const [words, setWords] = useState<WordType[]>([]);


    const handleSubmit = () => {
        // if (titleRef.current.value.toString() !== "Spanish")
        //     return;
        addCard({
            title: titleRef.current.value.toString(),
            words,
            numOfWords: words.length,
            language: languageRef.current.value
        })
            .then()
            .catch(err => console.log(err));
    };

    const handleAdd = () => {
        const newWords = [...words, { englishName: "", selectedLanguageName: "", }];
        setWords(newWords);
    };

    const handleEnglishNameChange = (e: any, i: number) => {
        const inputData = [...words];
        inputData[i].englishName = e.target.value;
        setWords(inputData);
    };

    const handleSelectedLanguageNameChange = (e: any, i: number) => {
        const inputData = [...words];
        inputData[i].selectedLanguageName = e.target.value;
        setWords(inputData);
    };

    const handleDelete = (i: number) => {
        const deleteWord = [...words];
        deleteWord.splice(i, 1);
        setWords(deleteWord);
    };

    console.log("data: ", words);

    return (
        <div className="text-center flex flex-col gap-4">
            <label className="text-2xl">Title</label><input className="text-2xl text-black block w-[20%] mx-auto" type="text" placeholder="title" ref={titleRef} />
            <label className="text-2xl">Language</label><input className="text-2xl text-black block w-[20%] mx-auto" type="text" placeholder="language" ref={languageRef} />
            <button className="border block w-36 bg-sky-700 mx-auto" onClick={handleAdd}>+</button>
            {words.map((data: WordType, i: number) => (
                <div className="">
                    <label>English Name</label><input onChange={e => handleEnglishNameChange(e, i)} type="text" className="border-2 text-black border-black" />
                    <label>Selected Language Name</label><input onChange={e => handleSelectedLanguageNameChange(e, i)} type="text" className="border-2 text-black border-black" />
                    <button className="" onClick={() => handleDelete(i)}>x</button>
                </div>
            ))}
            <button className="border block w-36 bg-sky-700 mt-20 mx-auto" onClick={handleSubmit}>Submit</button>
        </div>
    );
};

export default CardCreator;