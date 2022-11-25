import { Dispatch, SetStateAction } from "react"
import { LaunchesInterface } from "../interfaces/launches"

interface Button {
  setActiveItem: Dispatch<SetStateAction<LaunchesInterface | null>>
  nextLaunchData: LaunchesInterface
}

export default function Button({ setActiveItem, nextLaunchData }: Button) {
  return (
    <div>
      <button onClick={() => setActiveItem(nextLaunchData)}>
        Latest launch
      </button>
    </div>
  )
}
