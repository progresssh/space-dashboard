import { LaunchesInterface } from "../interfaces/launches"

export default function ActiveItem({
    activeItem,
}: {
    activeItem: LaunchesInterface | null
}) {
    console.warn(activeItem)
    return <div>{activeItem?.details}</div>
}
