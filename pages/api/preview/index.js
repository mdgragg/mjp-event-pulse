import { getEventByUrl } from '../../../lib/api'

export default async function preview(req, res) {
  // Check the secret and next parameters
  // This secret should only be known to this API route and the CMS
  if (
    req.query.secret !== process.env.STRAPI_PREVIEW_SECRET ||
    !req.query.eventUrl
  ) {
    return res.status(401).json({ message: 'Invalid token' })
  }
  console.log(req.query.eventUrl)
  // Fetch the headless CMS to check if the provided `slug` exists
  const url = await getEventByUrl(req.query.eventUrl)

  // If the slug doesn't exist prevent preview mode from being enabled
  if (!url) {
    return res.status(401).json({ message: 'Invalid slug' })
  }

  // Enable Preview Mode by setting the cookies
  res.setPreviewData({
    isAuthenticatedTEST: false,
    url: url
  })

  // Redirect to the path from the fetched post
  // We don't redirect to req.query.slug as that might lead to open redirect vulnerabilities
  res.writeHead(307, { Location: `/${url}/preview` })
  res.end()
}