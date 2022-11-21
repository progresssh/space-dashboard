import Title from "../components/Title"
import List from "../components/List"
import next, { GetServerSideProps } from "next"
import { RequestInit } from "next/dist/server/web/spec-extension/request"
import { LaunchesQueryInterface } from "../interfaces/launchesQuery"
import { useState } from "react"
import { LaunchesInterface } from "../interfaces/launches"
import { Launch } from "../components/Launch"
import Button from "../components/Button"

interface ServerSideResult {
    launchesData: LaunchesQueryInterface
    nextLaunchData: LaunchesInterface
}

export default function Home(props: ServerSideResult) {
    const nextLaunchData = props.nextLaunchData
    const [activeItem, setActiveItem] = useState<LaunchesInterface | null>(
        nextLaunchData,
    )

    return (
        <div className="flex flex-row">
            <Title />
            <Button
                nextLaunchData={props.nextLaunchData}
                setActiveItem={setActiveItem}
            />
            <List
                data={props.launchesData.docs}
                setActiveItem={setActiveItem}
            />
            <Launch activeItem={activeItem} />
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
                date_utc: 1,
                success: 1,
            },
            sort: {
                date_utc: "desc",
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
