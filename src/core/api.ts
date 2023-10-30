import axios from "axios";
import { CardType } from "./types";

const API = axios.create({ baseURL: "http://localhost:8080" }); // http://localhost:8080

export const addCard = (data: CardType) => API.post("/cards", data);
export const getCards = () => API.get("/cards");
export const getCard = (id: string | undefined) => API.get(`/cards/${id}`);