import SolanaLogo from './logotype.inline.svg'
import Image from 'next/image'

export interface AppSolanaHeaderLink {
  href: string
  label: string
}

export function AppSolanaHeader({ links }: { links: AppSolanaHeaderLink[] }) {
  return (
    <header className="w-full max-w-3xl rounded-full px-6 py-3 mx-auto mt-5 bg-neutral-900 border border-neutral-700">
      <div className="max-w-[1200] container mx-auto py-md px-6">
        <div className="flex justify-between">
          <a href="https://solana.com" rel="noopener noreferrer">
            <Image src={SolanaLogo} alt="Solana Logo" width={149} height={22} className="text-white" />
          </a>

          <div className="flex gap-2">
            {links.map((link) => (
              <a
                href={link.href}
                key={link.label}
                className="text-neutral-500 transition duration-200 ease-in-out hover:text-neutral-400"
                rel="noopener noreferrer"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}
