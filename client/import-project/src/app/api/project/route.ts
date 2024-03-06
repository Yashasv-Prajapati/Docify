import { NextResponse } from 'next/server'


//In data source URL our main API will go
const DATA_SOURCE_URL = ""

const API_KEY: string = process.env.DATA_API_KEY as string

// Just normal fetch function on the server side, nothing special here. 
// The API key is stored in an environment variable and accessed using process.env.DATA_API_KEY.
export async function GET() {
    const res = await fetch(DATA_SOURCE_URL)

    // Projects is the data type stored in types.d.ts
    const projects: Project[] = await res.json()

    return NextResponse.json(projects)
}

export async function POST(request: Request) {
    const { userId, repo }: Partial<Project> = await request.json()

    if (!userId || !repo) return NextResponse.json({ "message": "Missing required data" })

    const res = await fetch(DATA_SOURCE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'API-Key': API_KEY
        },
        body: JSON.stringify({
            userId, repo, completed: false
        })
    })

    const newProject: Project = await res.json()

    return NextResponse.json(newProject)
}

export async function PUT(request: Request) {
    const { userId, id, repo }: Project = await request.json()

    if (!userId || !id || !repo) return NextResponse.json({ "message": "Missing required data" })

    const res = await fetch(`${DATA_SOURCE_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'API-Key': API_KEY
        },
        body: JSON.stringify({
            userId, repo
        })
    })

    const updatedTodo: Project = await res.json()

    return NextResponse.json(updatedTodo)
}

export async function DELETE(request: Request) {
    const { id }: Partial<Project> = await request.json()

    if (!id) return NextResponse.json({ "message": "Project id required" })

    await fetch(`${DATA_SOURCE_URL}/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'API-Key': API_KEY
        }
    })

    return NextResponse.json({ "message": `Todo ${id} deleted` })
}