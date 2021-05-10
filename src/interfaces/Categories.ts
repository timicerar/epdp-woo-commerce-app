export interface ICategoryImage {
    id: number
    src: string
    alt: string
    name: string
}

export interface ICategory {
    id: number
    name: string
    slug: string
    description: string
    image: ICategoryImage
}

export interface ICategoryAdd {
    name: string
    slug: string
    description: string
}
