// type id = {id: number}
// type name = {name: string}

// export type Feature = id & name

interface id {id: number}
interface name {name: string}

export interface Feature {
    id: number,
    name: string
}