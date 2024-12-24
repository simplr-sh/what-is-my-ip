import { Hono } from 'hono'

const app = new Hono()

app.get('/', async (c) => {
  const xForwardedFor = c.req.header('X-Forwarded-For')
  const cfConnectingIP = c.req.header('CF-Connecting-IP')

  const ip = cfConnectingIP || xForwardedFor
  const splitIp = ip?.split('.')

  const city = c.req.raw.cf?.city
  const regionName = c.req.raw.cf?.region
  const country = c.req.raw.cf?.country

  return c.html(`<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>What is my IP | simplr.sh - Everything web, but simplr!</title>
  <link rel="stylesheet" href="/style.css" />
</head>

<body>
  <main>
    <div class="container">
      <img priority="high" src="/simplr.png" alt="simplr.sh logo" width="256" height="256" />
      <h2 style="font-family: monospace;">What is my IP?</h2>
      <h1 class="dot-animation">
        ${splitIp?.map((num) => num).join('<span>.</span>')}
      </h1>
      <p class="tagline">${city}, ${regionName}, ${country}</p>
    </div>
  </main>
</body>

</html>`)
})

export default app
