import { LandpadInterface } from "../interfaces/landpad"

function List({ data }: { data: LandpadInterface[] }) {
    return (
        <div>
            <ul>
                {data?.map((item) => (
                    <li key={item.id}>{item.full_name}</li>
                ))}
            </ul>
        </div>
    )
}

export default List
