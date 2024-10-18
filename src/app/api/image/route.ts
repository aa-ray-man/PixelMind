import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest){
    const {prompt} = await request.json(); //Extract the prompt element from body from request

    function generateRandomNumber(): number{
        return Math.floor(Math.random()*1000000)+1;
    }
    const randomSeed = generateRandomNumber(); //to genereate a random seed for image

    const imageURL = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}&seed=${randomSeed}`

    await fetch(imageURL)

    return NextResponse.json({ url: imageURL})
} 