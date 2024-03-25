import { NextApiRequest, NextApiResponse } from 'next'
import { parseBody } from 'next-sanity/webhook'
import { revalidateTag } from 'next/cache'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { body, isValidSignature } = await parseBody<{
      _type: string
      slug?: string | undefined
    }>(req, process.env.REVALIDATE_SECRET)

    if (!isValidSignature) {
      return new Response('Invalid Signature', { status: 401 })
    }

    if (!body?._type) {
      return new Response('Bad Request', { status: 400 })
    }

    revalidateTag(body._type)
    return res.json({
      status: 200,
      revalidated: true,
      now: Date.now(),
      body,
    })
  } catch (error: any) {
    console.error(error)
    return new Response(error.message, { status: 500 })
  }
}
