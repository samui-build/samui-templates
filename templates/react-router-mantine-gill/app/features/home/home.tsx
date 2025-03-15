import type { Route } from './+types/home'
import { UiCard, UiPage } from '~/ui'
import { Button, Group, Stack, TextInput } from '@mantine/core'
import { useFetcher } from 'react-router'
import { useEffect } from 'react'
import { getSolanaClient } from '~/lib/get-solana-client'
import { address as addressFn, assertIsAddress } from 'gill'

const client = getSolanaClient()

export async function loader() {
  const genesisHash = await client.rpc.getGenesisHash().send()

  return {
    genesisHash,
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function meta(args: Route.MetaArgs) {
  return [
    //
    { title: 'Home - Placeholder' },
    { name: 'description', content: 'The Placeholder Home page' },
  ]
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData()
  const address = formData.get('address')
  if (!address) {
    throw new Error('address is required')
  }

  assertIsAddress(address.toString())
  const balance = await client.rpc.getBalance(addressFn(address.toString())).send()
  await new Promise((resolve) => setTimeout(resolve, 300))
  return { address, balance }
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const fetcher = useFetcher()

  const isIdle = fetcher.state === 'idle'

  useEffect(() => {
    console.log(` -> fetcher state ${fetcher.state}`)
  }, [fetcher.state])

  return (
    <UiPage title="Home">
      <UiCard title="Welcome Home!">
        <fetcher.Form action="/home" method="post">
          <Stack>
            <TextInput
              description="The address to get the balance for"
              required
              readOnly={!isIdle}
              type="text"
              name="address"
              label="Address"
            />
            <Group justify="flex-end">
              <Button loading={!isIdle} type="submit">
                Submit
              </Button>
            </Group>
          </Stack>
        </fetcher.Form>
        <pre>{JSON.stringify({ actionData: fetcher.data, loaderData }, null, 2)}</pre>
      </UiCard>
    </UiPage>
  )
}
