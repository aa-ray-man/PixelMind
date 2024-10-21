import { authOptions } from "@/utils/authOptions";
import { prisma } from "@/utils/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const maxDuration = 100;

export async function POST(request: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: "Login Required" }, { status: 401 })
    }

    // const body = await request.json();    (Extract the body from request)
    const { prompt } = await request.json(); //Extract the prompt element from body from request

    const user = await prisma.user.findUnique({
        where: {
            id: session.user.id
        }
    })
    if (!user) {
        return NextResponse.json({ error: "No user found" }, { status: 401 })
    }

    function generateRandomNumber(): number {
        return Math.floor(Math.random() * 1000000) + 1;
    }
    const randomSeed = generateRandomNumber(); //to genereate a random seed for image

    const imageURL = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?seed=${randomSeed}&width=512&height=512&nologo=True`

    try {
      await fetch(imageURL, { signal: AbortSignal.timeout(80000) });
    } catch(e) {
      return NextResponse.json({
        error: "Error while generating the image"
      }, {status: 500});
    }

    await prisma.post.create({
        data: {
            prompt: prompt,
            url: imageURL,
            userId: user.id,
            seed: randomSeed
        }
    })

    return NextResponse.json({ url: imageURL })
}

export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: "You are Unauthorized" },
        { status: 401 }
      );
    }
  
    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
    });
  
    if (!user) {
      return NextResponse.json({ error: "No user found" }, { status: 401 });
    }
  
    const posts = await prisma.post.findMany({
      where: {
        userId: user.id,
      },
      orderBy: { createdAt: "desc" },
    });
  
    return NextResponse.json(posts);
  }