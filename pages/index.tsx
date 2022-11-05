import { LaunchesInterface } from "../interfaces/launches"
import Title from "../components/Title"
import List from "../components/List"
import { GetServerSideProps } from "next"
import { NextLaunchInterface } from "../interfaces/nextlaunch"
import Link from "next/link"

interface ServerSideResult {
    launchesData: LaunchesInterface[]
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
    return (
        <div>
            <Title />
            <List data={props.launchesData} />
            <Launch data={props.nextLaunchData} />
        </div>
    )
}

export const getServerSideProps: GetServerSideProps<
    ServerSideResult
> = async () => {
    // Fetch data from external API
    const launchesRes = await fetch(
        `https://api.spacexdata.com/v4/launches/past`,
    )
    const launchesData = await launchesRes.json()

    const nextLaunchRes = await fetch(
        `https://api.spacexdata.com/v5/launches/next`,
    )
    const nextLaunchData = await nextLaunchRes.json()

    console.log(nextLaunchData)

    // Pass data to the page via props
    return { props: { launchesData, nextLaunchData } }
}
