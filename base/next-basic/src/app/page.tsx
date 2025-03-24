import Image from 'next/image'

export default function Home() {
  return (
    <div>
      <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '100px', gap: '4rem' }}>
        <h1>Scaffold</h1>
        <Image src="/logo.svg" alt="App.js logo" width={170} height={170} />
      </main>
    </div>
  )
}
