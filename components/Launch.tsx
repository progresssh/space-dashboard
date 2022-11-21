import { LaunchesInterface } from "../interfaces/launches"
import Crew from "./Crew"

export function Launch({
    activeItem,
}: {
    activeItem: LaunchesInterface | null
}) {
    const launchTime = activeItem?.date_utc
    console.log(activeItem?.cores)
    return (
        <div>
            <span>
                {activeItem?.success != null
                    ? activeItem.success
                        ? "success "
                        : "failure"
                    : "TBD"}
            </span>

            <h2>{activeItem?.name}</h2>
            <h3>{activeItem?.flight_number}</h3>
            <time>{launchTime?.toString()}</time>

            <p>{activeItem?.details}</p>
            <Crew activeItem={activeItem} />
        </div>
    )
}
