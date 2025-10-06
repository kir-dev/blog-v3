import { Bone, Flame, Hammer, Mountain } from 'lucide-react'
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

const flintstoneErrorMessages = [
  'Azért kezdtem a testem kisportolni, hogy legyen mit a nők közt kisorsolni.',
  'Nézzük, hogy az uszodát milyen hamar uszod át!',
  'Jól jegyezd meg, hosszába keresztbe, lelkedbe ne ereszd be a kétely mételyét.',
  'Ne hibázzatok, úgy figyelek a bakira, mint Mauglira Bagira.',
  'Az embereknek az élet baja fáj, ezért jobb, ha az ember papagáj.',
  'Ne kezdj nekem alibizni, gyenge vagy mint a ribizli.',
  'Ezzel ne gyere nekem, gyerekem.',
  'Üdvözlöm, vén titán. Jöhet egy parti tán?',
]

const sillyButtonMessages = [
  'Jaj, Frédikém semmi jót nem képzeltem rólad, csak, hogy illendően köszöntsd az anyósodat.',
  'Vedd fel a szemetet, szúrja a szememet!',
  'Ős emlős emelő...',
  'Micsoda kontra, vissza a kiindulópontra!',
  'Biztos Béni lesz, nyisd ki légyszíves!',
  'Van, hogy az ember lepottyan, de meg se kottyan.',
  'Megáll az eszem, szemügyre veszem!',
  'Vilma, éhezem! Adsz kaját mit számba tehet két kezem?',
]

function getFlintstoneMessage(counter: number) {
  const index = Math.floor(counter / 10) % sillyButtonMessages.length
  return sillyButtonMessages[index]
}

export default function Component() {
  const router = useRouter()
  const [error, setError] = useState<string>('')
  const [code, setCode] = useState<string>('')
  const [counter, setCounter] = useState<number>(0)

  useEffect(() => {
    console.log('Pattints a magasba, ne legyél mihaszna!')
  }, [])

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (code !== 'Sziklai Szilárd') {
      setError(
        flintstoneErrorMessages[
          Math.floor(Math.random() * flintstoneErrorMessages.length)
        ],
      )
      setCode('')
      return
    } else {
      router.push('/irma/qo3tefjbw9')
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#f4c27f] to-[#e0a561]">
      <header className="bg-[#8c5a2e] text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() =>
              console.log(
                'https://kir-dev.hu/hu/about/members ritka. Talán ott rejlik a kőkód titka...',
              )
            }
          >
            <Bone className="h-8 w-8" />
            <h1 className="text-2xl font-bold font-cartoony">
              Frédi & Béni Kőkorszaki Kihívása
            </h1>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="bg-[#3b2a1a]/80 text-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">
            Szerencse, hogy maga itt most
            <br /> ilyen magabiztos!
          </h2>

          <p className="mb-6 text-center">
            Dákóm hegyén kék a krétapor,
            <br /> ilyen kihívást nem látott még a Krétakor.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="flex items-center space-x-2">
              <Hammer className="h-6 w-6 text-yellow-300" />
              <span>Törd fel a kőrejtélyeket</span>
            </div>
            <div className="flex items-center space-x-2">
              <Bone className="h-6 w-6 text-yellow-300" />
              <span>Gyűjtsd össze a mamutcsontokat</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mountain className="h-6 w-6 text-yellow-300" />
              <span>Mássz fel a kőhegyre</span>
            </div>
            <div className="flex items-center space-x-2">
              <Flame className="h-6 w-6 text-yellow-300" />
              <span>Világíts a barlang mélyére</span>
            </div>
          </div>

          <div className="text-center">
            <Button
              className="bg-yellow-400 text-black hover:bg-yellow-500 font-bold py-2 px-4 rounded"
              onClick={() => setCounter((prev) => prev + 1)}
            >
              Nyomjad, Béni!
            </Button>
            {counter > 0 && <p className="mt-4 text-lg">{counter}</p>}
            {counter > 20 && (
              <p className="mt-4 italic">{getFlintstoneMessage(counter)}</p>
            )}
          </div>
        </div>

        <div className="mt-8 bg-[#3b2a1a]/80 text-white p-8 rounded-lg shadow-lg max-w-md mx-auto">
          <h3 className="text-xl font-bold mb-4 text-center">Kőkód</h3>
          <form className="space-y-4" onSubmit={onSubmit}>
            <Input
              type="text"
              placeholder="Add meg a titkos kőkódot"
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
            {error && <p className="text-red-400 text-center">{error}</p>}
          </form>
          <p className="hidden">Üdvözlöm, vén titán. Jöhet egy konzol tán?</p>
        </div>
      </main>

      <footer className="bg-[#5e4025]/80 text-white p-4 mt-8">
        <div className="container mx-auto text-center">
          <p>
            Made With Stone By{' '}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <b>Kir-Dev</b>
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    Jobbklikk -{'>'} Inspect -{'>'} Console
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </p>
        </div>
      </footer>
    </div>
  )
}
