import { Dispatch, SetStateAction } from "react"
import { LaunchesInterface } from "../interfaces/launches"

interface ItemInterface {
    item: {
        id: string
        name: string
        date_utc: Date
        success: boolean
    }

    setActiveItem: Dispatch<SetStateAction<LaunchesInterface | null>>
}

export default function Item({ item, setActiveItem }: ItemInterface) {
    const launchDate = new Date(item.date_utc)
    const launchSuccess = item.success

    function launchStatus() {
        const currentDate = new Date()

        if (launchSuccess === null) {
            return "text-orange-300"
        }

        if (launchSuccess === false) {
            return "text-red-500"
        } else if (launchDate.getTime() <= currentDate.getTime()) {
            return "text-green-300"
        } else {
            return "text-orange-300"
        }
    }

    async function handleClick(e: React.MouseEvent<HTMLElement>) {
        e.preventDefault()
        const res = await fetch(
            `https://api.spacexdata.com/v5/launches/${item.id}`,
        )
        const data = await res.json()

        setActiveItem(data)
    }

    return (
        <li
            className={launchStatus()}
            key={item.id}
            onClick={(e) => handleClick(e)}
        >
            {item.name}
        </li>
    )
}
