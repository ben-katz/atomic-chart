export default async function ElementPage({params}: {params: Promise<{ slug: string }>}) {
  
    // Get the element name from the URL
    const slug = (await params).slug

    return (
        <main className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold">{slug}</h1>
        </main>
    )

}