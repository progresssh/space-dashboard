import { Dispatch, SetStateAction } from "react"
import { LaunchesInterface } from "../interfaces/launches"
import { LaunchesQueryInterface } from "../interfaces/launchesQuery"
import Item from "./Item"
interface ListInterface {
    data: LaunchesQueryInterface
    setActiveItem: Dispatch<SetStateAction<LaunchesInterface | null>>
}

function List({ data, setActiveItem }: ListInterface) {
    return (
        <div>
            <ul>
                {data.docs.map((item) => {
                    return (
                        <Item
                            key={item.id}
                            item={item}
                            setActiveItem={setActiveItem}
                        />
                    )
                })}
            </ul>
        </div>
    )
}

export default List
