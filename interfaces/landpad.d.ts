export interface LandpadInterface {
    name: string | null
    full_name: string | null
    locality: string | null
    region: string | null
    timezone: string | null
    latitude: number | null
    longitude: number | null
    launch_attempts: number | null
    launch_successes: number | null
    rockets: string[] | null[]
    launches: string[] | null[]
    status: string | null
    id: string | null
}
