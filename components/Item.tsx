import { Dispatch, SetStateAction } from "react"
import { LaunchesInterface } from "../interfaces/launches"

interface ItemInterface {
    item: {
        id: string
        name: string
    }

    setActiveItem: Dispatch<SetStateAction<LaunchesInterface | null>>
}

export default function Item({ item, setActiveItem }: ItemInterface) {
    console.log(item)
    async function handleClick(e: Event) {
        e.preventDefault()
        const res = await fetch(
            `https://api.spacexdata.com/v5/launches/${item.id}`,
        )
        const data = await res.json()

        setActiveItem(data)
    }

    return (
        <li key={item.id} onClick={(e) => handleClick(e)}>
            {item.name}
        </li>
    )
}
