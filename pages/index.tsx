import { Box } from '@chakra-ui/react'
import { Head } from '../shared/components'

export default function Home() {
  return (
    <>
      <Head
        title={"Create Next App"}
        description={"Generated by create next app"}
        icon={"/favicon.ico"}
      />
      <Box>Content</Box>
    </>
  )
}
