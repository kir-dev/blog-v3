import { isValidSignature, SIGNATURE_HEADER_NAME } from '@sanity/webhook'
import { NextApiRequest, NextApiResponse } from 'next'

const secret = process.env.REVALIDATE_SECRET

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const signature = req.headers[SIGNATURE_HEADER_NAME] as string
  const isValid = isValidSignature(JSON.stringify(req.body), signature, secret)

  if (!isValid) {
    res.status(401).json({ success: false, message: 'Invalid signature' })
    return
  }

  try {
    const pathToRevalidate = req.body.slug.current
    console.log(`===== Revalidating: ${pathToRevalidate}`)
    await res.revalidate(pathToRevalidate)
    return res.json({ revalidated: true })
  } catch (err) {
    return res.status(500).send('Error while revalidating')
  }
}
