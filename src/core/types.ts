export interface UserType {
    _id?: string,
    email: string,
    password: string,
    username: string,
    cards: CardType[],
    createdAt?: string
}

export interface CardType {
    _id?: string,
    title: string,
    image?: any,
    words: WordType[],
    numOfWords: number,
    language: string,
    createdAt?: string
}

export interface WordType {
    _id?: string,
    englishName: string,
    selectedLanguageName: string,
    image?: string,
    createdAt?: string
}