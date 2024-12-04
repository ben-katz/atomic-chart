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
            <div tw="text-4xl w-full h-full bg-white flex items-center justify-center">
                <div tw="relative w-full h-full p-8 flex flex-col justify-center items-center">
                    <span tw="absolute top-12 left-12 text-6xl">{element?.number}</span>
                    <div tw="flex flex-col items-center pb-8">
                        <span tw="text-[148px] leading-[1] font-bold">{element?.symbol}</span>
                        <span tw="text-[44px]">{element?.name}</span>
                    </div>
                    <span tw="absolute bottom-12 text-2xl">{element?.atomic_mass}</span>
                </div>
            </div>
        ),
        {
            ...size,
        }
    )
}