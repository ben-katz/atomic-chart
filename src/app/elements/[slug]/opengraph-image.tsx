import { ImageResponse } from 'next/og'
import { getElement } from './page'

export const size = {
    width: 1200,
    height: 630,
}

export const contentType = 'image/png'

export default async function Image({ params }: { params: { slug: string } }) {

    const element = await getElement(params.slug)

    return new ImageResponse(
        (
            <div tw="text-4xl bg-white flex items-center justify-center">
                <div tw="relative w-full h-full max-w-[300px] aspect-square p-8 flex flex-col justify-center items-center border border-black dark:border-white">
                    <span tw="absolute top-8 left-8 text-xl">{element?.number}</span>
                    <div tw="flex flex-col items-center gap-4 pb-8">
                        <span tw="text-7xl font-bold">{element?.symbol}</span>
                        <h1 tw="text-xl">{element?.name}</h1>
                    </div>
                    <span tw="absolute bottom-8 text-sm">{element?.atomic_mass}</span>
                </div>
            </div>
        ),
        {
            ...size,
        }
    )
}