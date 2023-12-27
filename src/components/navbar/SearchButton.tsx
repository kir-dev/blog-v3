import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import { Button, Kbd } from '@nextui-org/react'

interface Props {
  commandKey: 'ctrl' | 'command'
  handleOpenCmdk: () => void
}

const SearchButton = ({ commandKey, handleOpenCmdk }: Props) => {
  return (
    <Button
      aria-label="Quick search"
      className="text-sm font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20"
      endContent={
        <Kbd className="hidden py-0.5 px-2 lg:inline-block" keys={commandKey}>
          K
        </Kbd>
      }
      startContent={
        <MagnifyingGlassIcon
          className="text-base text-default-400 pointer-events-none flex-shrink-0 h-4 w-4"
          strokeWidth={2}
        />
      }
      onPress={handleOpenCmdk}
    >
      Quick Search...
    </Button>
  )
}

export default SearchButton
