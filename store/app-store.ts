import {create} from 'zustand'

export enum FetchStatus {
    IDLE,
    FETCHING,
    SUCCESS,
    ERROR
}

export interface Article {
    title: string
    author: string
    description: string
}

export interface FetchResponse {
    articles: Article[]
}

export interface AppStore {
    pageNumber: number
    status: FetchStatus
    fetchArticles: (query: string) => Promise<void>

    articles: Article[]

    query: string
}

export const useAppStore = create<AppStore>((set, get) => ({
    status: FetchStatus.IDLE,
    pageNumber: 1,
    articles: [],
    query: "",
    fetchArticles: async (query: string) => {
        set(state => ({...state, status: FetchStatus.FETCHING}))
        const resp = await fetch('https://newsapi.org/v2/everything?' + new URLSearchParams({
            apiKey: "183daca270264bad86fc5b72972fb82a",
            q: query,
            // searchIn: "title",
            pageNumber: get().pageNumber.toString(),
            pageSize: "10"
        }))
        // console.log("resp:", JSON.stringify(resp))

        if (resp.ok) {
            set(state => ({...state, status: FetchStatus.SUCCESS}))
            const data: FetchResponse = await resp.json()
            // console.log("data", JSON.stringify(data))
            const isSameQuery = query === get().query
            const articles = isSameQuery ? [...get().articles, ...data.articles] : data.articles
            // console.log("articles: ", articles)
            const pageNumber = isSameQuery ? get().pageNumber + 1 : 1

            set(state => ({...state, articles: articles, pageNumber, query, status: FetchStatus.IDLE}))
        } else {
            set(state => ({...state, query, status: FetchStatus.ERROR}))
        }
    }
}))

export default useAppStore
