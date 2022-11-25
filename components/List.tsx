import { Dispatch, SetStateAction } from "react"
import { LaunchesInterface } from "../interfaces/launches"
import { Doc } from "../interfaces/launchesQuery"
import Item from "./Item"
interface ListInterface {
  data: Doc[]
  setActiveItem: Dispatch<SetStateAction<LaunchesInterface | null>>
}

function List({ data, setActiveItem }: ListInterface) {
  return (
    <div>
      <ul>
        {data.map((item) => {
          return (
            <Item key={item.id} item={item} setActiveItem={setActiveItem} />
          )
        })}
      </ul>
    </div>
  )
}

export default List
