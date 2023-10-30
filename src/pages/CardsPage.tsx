import { useEffect, useState } from "react";
import { getCards } from "../core/api";
import { CardType } from "../core/types";
import { useNavigate } from "react-router-dom";

const CardsPage = () => {
    const [cards, setCards] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getCards()
            .then(res => setCards(res.data))
            .catch(err => console.log(err));
    }, []);

    return (
        <div className="text-center">
            <p className="my-4 underline">For the sake of records and ranking, please log in.</p>
            <div className="flex items-center justify-center gap-8 flex-wrap">
                {cards && cards.map((card: CardType) => (
                    <div className="w-[50%] md:w-[25%] lg:w-[15%] min-h-[18rem] flex flex-col items-center justify-center bg-slate-600 shadow-lg">
                        <h1 className="text-2xl">{card.title}</h1>
                        <p className="text-gray-300">{card.language}</p>
                        <p className="underline">{card.numOfWords} words</p>
                        <button className="my-4 px-4 py-2 border bg-sky-600 text-white rounded-md" onClick={() => navigate(`/cards/${card._id}`)}>
                            OPEN
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CardsPage;