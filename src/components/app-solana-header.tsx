import SolanaLogo from './logotype.inline.svg'
import Image from 'next/image'

export interface AppSolanaHeaderLink {
  href: string
  label: string
}

export function AppSolanaHeader({ links }: { links: AppSolanaHeaderLink[] }) {
  return (
    <header className="bg-black p-6">
      <div className="max-w-[1200] container mx-auto py-md px-6">
        <div className="flex justify-between">
          <a href="https://solana.com" rel="noopener noreferrer">
            <Image src={SolanaLogo} alt="Solana Logo" width={149} height={22} className="text-white" />
          </a>

          <div className="flex gap-2 text-neutral-500">
            {links.map((link) => (
              <a href={link.href} key={link.label} rel="noopener noreferrer">
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}
