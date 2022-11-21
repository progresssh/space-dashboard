import Image from "next/image"
import { useEffect, useState } from "react"
import { CrewMember } from "../interfaces/crewMember"
import { LaunchesInterface } from "../interfaces/launches"

export default function Crew({
    activeItem,
}: {
    activeItem: LaunchesInterface | null
}) {
    const [crewMembers, setCrewMembers] = useState<CrewMember[] | null>(null)

    // const options = {
    //     query: {},
    //     options: {
    //         limit: 500,
    //         select: {
    //             name: 1,
    //             date_utc: 1,
    //             success: 1,
    //         },
    //     },
    // }

    // const params: RequestInit = {
    //     headers: { "Content-Type": "application/json" },
    //     method: "POST",
    //     body: JSON.stringify(options),
    // }
    useEffect(() => {
        // if (activeItem?.crew.length) {

        if (activeItem?.crew) {
            const fetchData = async () => {
                const urls = activeItem.crew.map(
                    (member: { crew: string; role: string }) => {
                        return `https://api.spacexdata.com/v4/crew/${member.crew}`
                    },
                )
                try {
                    const crewInfo = await Promise.all(
                        urls.map((url) => fetch(url).then((res) => res.json())),
                    )

                    setCrewMembers(crewInfo)
                } catch (e) {
                    console.log(e)
                }
            }
            fetchData()
        }
    }, [activeItem])

    return (
        <ul className="flex ">
            {crewMembers?.map((member) => (
                <li>
                    <div>{member.name}</div>
                    <Image
                        src={member.image}
                        alt={`Photo of ${member.name}`}
                        width={400}
                        height={400}
                    ></Image>
                </li>
            ))}
        </ul>
    )
}
