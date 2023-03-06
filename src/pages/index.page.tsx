import Head from 'next/head'
import { getCssText, Heading } from '@ignite-ui/react'

export default function Home() {
  return (
    <>
      <Head>
        <title>Ignite Call</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style
          id="stitches"
          dangerouslySetInnerHTML={{ __html: getCssText() }}
        />
      </Head>

      <main>
        <Heading>Hello World!</Heading>
      </main>
    </>
  )
}
