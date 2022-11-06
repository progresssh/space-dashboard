import Title from "../components/Title"
import List from "../components/List"
import { GetServerSideProps } from "next"
import { NextLaunchInterface } from "../interfaces/nextlaunch"
import Link from "next/link"
import { RequestInit } from "next/dist/server/web/spec-extension/request"
import { LaunchesQueryInterface } from "../interfaces/launchesQuery"
import { useState } from "react"
import { LaunchesInterface } from "../interfaces/launches"
import ActiveItem from "../components/ActiveItem"

interface ServerSideResult {
    launchesData: LaunchesQueryInterface
    nextLaunchData: NextLaunchInterface
}

function Launch({ data }: { data: NextLaunchInterface }) {
    const today = new Date().valueOf
    const date = data.date_utc

    return (
        <div className="font-extrabold">
            <p>
                {date.valueOf <= today ? (
                    <Link
                        className="text-green-500"
                        href={data.links.webcast}
                        target="_blank"
                    >
                        {data.name} - Launch Complete
                    </Link>
                ) : (
                    date.toString()
                )}
            </p>
        </div>
    )
}

export default function Home(props: ServerSideResult) {
    const [activeItem, setActiveItem] = useState<LaunchesInterface | null>(null)

    return (
        <div>
            <Title />
            <ActiveItem activeItem={activeItem} />
            <List data={props.launchesData} setActiveItem={setActiveItem} />
            <Launch data={props.nextLaunchData} />
        </div>
    )
}

export const getServerSideProps: GetServerSideProps<
    ServerSideResult
> = async () => {
    let launchesData
    let nextLaunchData

    const options = {
        query: {},
        options: {
            limit: 500,
            select: {
                name: 1,
            },
        },
    }

    const params: RequestInit = {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(options),
    }

    try {
        const launchesRes = await fetch(
            `https://api.spacexdata.com/v4/launches/query`,
            params,
        )
        launchesData = await launchesRes.json()
        console.log(launchesData)
    } catch (error) {
        console.error(error)
    }
    // Fetch data from external API
    try {
        const nextLaunchRes = await fetch(
            `https://api.spacexdata.com/v5/launches/next`,
        )

        nextLaunchData = await nextLaunchRes.json()
    } catch (error) {
        console.error(error)
    }

    // Pass data to the page via props
    return { props: { launchesData, nextLaunchData } }
}
