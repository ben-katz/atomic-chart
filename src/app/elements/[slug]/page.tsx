// Import the element data
import elementData from "@/data/elements.json"

// Utility function to get the element data based on the slug
export const getElement = async (slug: string) => {
    return elementData.elements.find((element) => element.name.toLowerCase() === slug.toLowerCase())
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    
    const slug = (await params).slug
    const element = await getElement(slug)

    const title = `What is ${element?.symbol} on the periodic table?`
    const description = `${element?.symbol} is the element ${element?.name} on the periodic table.`
    const keywords = [element?.name, element?.symbol, "periodic table", "element", "chemistry"]

    return {
        title: title,
        description: description,
        keywords: keywords,
        twitter: {
            title: title,
            description: description
        }
    }
}

export default async function ElementPage({ params }: { params: Promise<{ slug: string }> }) {

    // Get the element name from the URL
    const slug = (await params).slug
    const element = await getElement(slug)

    // If the element is not found, return a not found page
    if (!element) {
        return (
            <div className="flex flex-col gap-2 items-center justify-center h-screen">
                <h1 className="text-4xl font-bold text-center">This element doesn&apos;t exist!</h1>
                <p className="text-center">yet...</p>
            </div>
        )
    }

    // Otherwise we can freely use the element data in our page!
    return (
        <div className="w-full flex flex-col gap-4">
            <div className="flex flex-col lg:flex-row w-full lg:max-h-[300px] gap-4">
                <div className="relative w-full h-full lg:max-w-[300px] aspect-square p-8 flex flex-col justify-center items-center border border-black dark:border-white">
                    <span className="absolute top-8 left-8 text-xl">{element?.number}</span>
                    <div className="flex flex-col items-center gap-4 pb-8">
                        <span className="text-7xl font-bold">{element?.symbol}</span>
                        <h1 className="text-xl">{element?.name}</h1>
                    </div>
                    <span className="absolute bottom-8 text-sm">{element?.atomic_mass}</span>
                </div>
                <div className="w-full min-w-0 p-8 flex flex-col justify-between gap-2 border border-black dark:border-white">
                    <div className="flex flex-col gap-0.5">
                        <span className="font-bold">Appearance</span>
                        <span className="text-sm">{element?.appearance}</span>
                    </div>
                    <div className="flex flex-col gap-0.5">
                        <span className="font-bold">Category</span>
                        <span className="text-sm">{element?.category}</span>
                    </div>
                    <div className="flex flex-col gap-0.5">
                        <span className="font-bold">Discovered by</span>
                        <span className="text-sm">{element?.discovered_by || 'N/A'}</span>
                    </div>
                    <div className="flex flex-col gap-0.5">
                        <span className="font-bold">Named by</span>
                        <span className="text-sm">{element?.named_by || 'N/A'}</span>
                    </div>

                </div>
            </div>
            <div className="w-full min-w-0 p-8 flex flex-col gap-6 border border-black dark:border-white">
                <div className="flex flex-col gap-1">
                    <span className="font-bold">What element is {element?.symbol} on the periodic table?</span>
                    <span className="text-sm">{element?.symbol} is the element {element?.name} on the periodic table.</span>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="font-bold">What is the symbol for {element?.name} on the periodic table?</span>
                    <span className="text-sm">The symbol for {element?.name} on the periodic table is {element?.symbol}.</span>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="font-bold">What does {element?.name} look like?</span>
                    <span className="text-sm">To the human eye, {element?.name} is {element?.appearance}.</span>
                </div>
            </div>

        </div>
    )
}