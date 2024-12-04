// Import the element data
import elementData from "@/data/elements.json"

// Utility function to get the element data based on the slug
const getElement = async (slug: string) => {
    return elementData.elements.find((element) => element.name.toLowerCase() === slug.toLowerCase())
}

export default async function ElementPage({params}: {params: Promise<{ slug: string }>}) {
  
    // Get the element name from the URL
    const slug = (await params).slug
    const element = await getElement(slug)

    // If the element is not found, return a not found page
    if (!element) {
        return (
            <main className="flex flex-col gap-2 items-center justify-center h-screen">
                <h1 className="text-4xl font-bold">This element doesn't exist!</h1>
                <p>yet...</p>
            </main>
        )
    }

    // Otherwise we can freely use the element data in our page!
    return (
        <main className="flex flex-col gap-2 items-center justify-center h-screen">
            <span className="text-8xl">{element?.symbol}</span>
            <h1 className="text-4xl font-bold">{element?.name}</h1>
        </main>
    )

}