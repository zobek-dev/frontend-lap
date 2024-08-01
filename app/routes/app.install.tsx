import {
  Card,
  Layout,
  Page,
  Text,
  BlockStack,
  Button,
  InlineStack,
} from '@shopify/polaris'
import { useLoaderData } from '@remix-run/react'
import { authenticate } from '~/shopify.server'
import type {
  LoaderFunctionArgs,
  LoaderFunction,
  // ActionFunction,
  // ActionFunctionArgs,
} from '@remix-run/node'
import { TitleBar } from '@shopify/app-bridge-react'

export const loader: LoaderFunction = async ({
  request,
}: LoaderFunctionArgs) => {
  const { admin, session } = await authenticate.admin(request)

  try {
    // const response = await admin.rest.resources.CarrierService.all({
    //   session: session,
    // })
    const carrier_service = new admin.rest.resources.CarrierService({
      session: session,
    })

    carrier_service.name = 'Envío Internacional Lap Commerce'
    carrier_service.callback_url =
      'https://l0hjgum7d4.execute-api.us-east-1.amazonaws.com/rates'
    carrier_service.service_discovery = true
    await carrier_service.save({
      update: true,
    })
    //console.log(response)
    console.log(carrier_service)
    return null
  } catch (error) {
    console.log(error)
  }
}

const createCourierService = async () => {
  console.log('algo')
}

export default function AdditionalPage() {
  const data: any = useLoaderData()
  console.log(data)
  return (
    <Page>
      <TitleBar title="Install Connector" />
      <Layout>
        <Layout.Section>
          <Card>
            <BlockStack gap="300">
              <Text as="p" variant="bodyMd">
                Here in got installed the app
              </Text>
              <InlineStack>
                <Button onClick={createCourierService}>
                  Agregar las tarifas
                </Button>
              </InlineStack>
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  )
}

// function generateCarrierService(){

// }
