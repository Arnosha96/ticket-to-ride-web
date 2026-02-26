// src/entities/game/model/types.ts

export type PlayerId = string
export type RouteId = string
export type CityId = string

export type CardColor =
  | "red"
  | "blue"
  | "green"
  | "yellow"
  | "black"
  | "white"
  | "orange"
  | "purple"
  | "locomotive"

export interface Player {
  id: PlayerId
  name: string
  cards: CardColor[]
  score: number
}

export interface Route {
  id: RouteId
  cityA: CityId
  cityB: CityId
  length: number
  color: CardColor | "gray"
  ownerId?: PlayerId
}

export type GameStatus = "waiting" | "playing" | "finished"

export interface Game {
  id: string
  players: Player[]
  routes: Route[]
  deck: CardColor[]
  discardPile: CardColor[]
  currentPlayerIndex: number
  status: GameStatus
  turn: TurnState
}

export interface TurnState {
  cardsDrawn: number
}

export type GameResult =
  | { ok: true; game: Game }
  | { ok: false; error: string }