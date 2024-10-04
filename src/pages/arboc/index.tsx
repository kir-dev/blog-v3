import { Anchor, Compass, Map, Skull } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '~/components/ui/tooltip'

const pirateErrorMessages = [
  'Arghh, tévúton jársz, matróz! Ez nem a helyes kincshez vezető kulcs!',
  'Az ördög bújt beléd, kalóz! Próbálkozz újra, vagy a cápák elé vetlek!',
  'Túl messzire sodródtál a széllel, haramiám! Ez nem visz el a zsákmányhoz.',
  'Hoppá, kalóz, ez a kód annyit ér, mint egy üres rumos hordó!',
  'Nem találtad el, pajtás! Próbáld újra, különben megesküdöm, hogy a papagájod is kinevet!',
  'Ez a kód rosszabb, mint egy lyukas hajó! Próbálj szerencsét újra!',
  'Még a polipok is jobban boldogulnak, mint te ezzel a kóddal! Keresd újra a helyeset!',
  'Ó, nem, kapitány! Ezzel a kóddal nem nyitod a kincsesláda zárját!',
]

const pointlessButtonMessages = [
  'Hé, kalóz! Mit vársz ettől a gombtól? Nem fog kincset adni!',
  'Arghh! Nyomkodhatod ezt a gombot egész nap, de attól még semmi sem történik!',
  'Ez a gomb olyan haszontalan, mint egy tengerész iránytű szélcsendben!',
  'Miért pazarlod az idődet, haramiám? Ez a gomb egy lyukas hordóval egyenértékű!',
  'A papagájom is jobban tudja, hogy ez a gomb semmire sem jó!',
  'Még egy kalóz is tudja, hogy a semmit sem csináló gomb nyomkodása időpocsékolás!',
  'Ez a gomb olyan üres, mint egy kiivott rumos hordó!',
  'Hoppá, te kalóz! A gombot nyomkodva nem jutsz előrébb. Tényleg ezt akarod csinálni?',
]

function getPirateMessage(counter: number) {
  const messageIndex = Math.floor(counter / 20) % pointlessButtonMessages.length
  return pointlessButtonMessages[messageIndex]
}

export default function Component() {
  const router = useRouter()
  const [error, setError] = useState<string>('')
  const [code, setCode] = useState<string>('')
  const [counter, setCounter] = useState<number>(0)
  useEffect(() => {
    console.log('Nem lehet kattintani a navbarban lévő szöveget?')
  }, [])
  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    console.log('Code:', code)
    if (code !== 'SzakállasKincs') {
      setError(
        pirateErrorMessages[
          Math.floor(Math.random() * pirateErrorMessages.length)
        ],
      )
      setCode('')
      return
    } else {
      router.push('/arboc/qo3tefjbw9')
    }
  }
  return (
    <div className="flex flex-col min-h-screen bg-[#c63e3e] bg-center">
      <header className="bg-[#94252a] text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() =>
              console.log(
                'A HTML headben lehet van valami információ komment formájában',
              )
            }
          >
            <Skull className="h-8 w-8" />
            <h1 className="text-2xl font-bold">Kalózok CTF Kihívása</h1>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="bg-black/70 text-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">
            Ahoy, ti koszos kalózok!
          </h2>
          <p className="mb-6 text-center">
            Üdvözlünk a hét tenger legveszélyesebb CTF kihívásában! Készen
            álltok, hogy próbára tegyétek hacker képességeiteket, és
            megszerezzétek az elásott kincset?
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="flex items-center space-x-2">
              <Compass className="h-6 w-6 text-yellow-400" />
              <span>Fejtsétek meg a rejtvényeket</span>
            </div>
            <div className="flex items-center space-x-2">
              <Anchor className="h-6 w-6 text-yellow-400" />
              <span>Biztosítsátok a zsákmányt</span>
            </div>
            <div className="flex items-center space-x-2">
              <Map className="h-6 w-6 text-yellow-400" />
              <span>Fejtsétek meg a rejtett térképeket</span>
            </div>
            <div className="flex items-center space-x-2">
              <Skull className="h-6 w-6 text-yellow-400" />
              <span>Járjatok túl a rivális kalózok eszén</span>
            </div>
          </div>
          <div className="text-center">
            <Button
              className="bg-yellow-400 text-black hover:bg-yellow-500 font-bold py-2 px-4 rounded"
              onClick={() => setCounter((prev) => prev + 1)}
            >
              Nyomjátok!
            </Button>
            {counter > 0 && <p className="mt-4 text-lg">{counter}</p>}
            {counter > 20 && getPirateMessage(counter)}
          </div>
        </div>
        <div className="mt-8 bg-black/70 text-white p-8 rounded-lg shadow-lg max-w-md mx-auto">
          <h3 className="text-xl font-bold mb-4 text-center">Titkos kód</h3>
          <form className="space-y-4" onSubmit={onSubmit}>
            <Input
              type="text"
              placeholder="Kérlek add meg a talált kódot"
              className="w-full border-white"
              value={code}
              onChange={(event) => setCode(event.target.value)}
            />
            <Button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-black font-semibold"
            >
              Ellenőrzés
            </Button>
            {error && <p className="text-red-500 text-center">{error}</p>}
          </form>
          <p className="hidden">Esetleg a konzolt megnyitottad már?</p>
        </div>
      </main>

      <footer className="bg-black/50 text-white p-4 mt-8">
        <div className="container mx-auto text-center">
          <p>
            Made With Love By{' '}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <b>Kir-Dev</b>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Jobbklikk -{'>'} Inspect</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </p>
        </div>
      </footer>
    </div>
  )
}
