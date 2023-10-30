import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCard } from "../core/api";
import { CardType, WordType } from "../core/types";
import Quiz from "../components/Quiz";

interface Props {

}

const Card = (props: Props) => {
    const [data, setData] = useState<CardType>();
    const [quiz, setQuiz] = useState(false);
    const params = useParams();
    const { id } = params;

    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    }

    useEffect(() => {
        getCard(id)
            .then(res => setData(res.data))
            .catch(err => console.log(err));
    }, [id]);

    return (
        <div className="relative">
            <button className="absolute top-0 left-0 px-4 py-2 border bg-sky-600 text-white rounded-md" onClick={goBack}>{"<- Go Back"}</button>
            {data && <div className="text-center">
                <h1 className="text-4xl">{data.title}</h1>
                <p className="text-gray-300">{data.language}</p>
                <p className="mt-5 mb-2 underline">{data.numOfWords} words</p>
                <div className="h-[60vh] overflow-auto border rounded-md w-1/4 mx-auto">
                    <table className="border-2 border-white w-full mx-auto">
                        <thead className="border">
                            <tr>
                                <td className="border p-2 font-bold">English Name</td>
                                <td className="border p-2 font-bold">{data.language} Name</td>
                            </tr>
                        </thead>
                        {data.words.map((word: WordType) => (
                            <tr>
                                <td className="border p-2">{word.englishName}</td>
                                <td className="border p-2">{word.selectedLanguageName}</td>
                            </tr>
                        ))}
                    </table>
                </div>
                <button className="my-4 px-4 py-2 border bg-sky-600 text-white rounded-md" onClick={() => setQuiz(true)}>Start Quiz</button>
                <Quiz
                    words={data.words}
                    numOfWords={data.numOfWords}
                    visible={quiz}
                    hide={() => setQuiz(false)}
                />
            </div>}
            {!data && <>
                <h1 className="text-center text-2xl underline my-2">Loading for Data...</h1>
                <p className="text-center">If it loads for too long, either the link is wrong or the server is not responding...</p>
            </>}
        </div>
    );
};

export default Card;