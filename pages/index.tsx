import { LandpadInterface } from "../interfaces/landpad"
import Title from "../components/Title"
import List from "../components/lIST"
import { GetServerSideProps } from "next"
import { NextLaunchInterface } from "../interfaces/nextlaunch"
import Link from "next/link"

interface ServerSideResult {
    landpadsData: LandpadInterface[]
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
            <List data={props.landpadsData} />
            <Launch data={props.nextLaunchData} />
        </div>
    )
}

export const getServerSideProps: GetServerSideProps<
    ServerSideResult
> = async () => {
    // Fetch data from external API
    const landpadsRes = await fetch(`https://api.spacexdata.com/v4/landpads`)
    const landpadsData = await landpadsRes.json()

    const nextLaunchRes = await fetch(
        `https://api.spacexdata.com/v5/launches/next`,
    )
    const nextLaunchData = await nextLaunchRes.json()

    console.log(nextLaunchData)

    // Pass data to the page via props
    return { props: { landpadsData, nextLaunchData } }
}
