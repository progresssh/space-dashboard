import { LaunchesInterface } from "../interfaces/launches"

function List({ data }: { data: LaunchesInterface[] }) {
    return (
        <div>
            <ul>
                {data?.map((item) => (
                    <li key={item.id}>{item.name}</li>
                ))}
            </ul>
        </div>
    )
}

export default List
