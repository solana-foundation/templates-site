import { TemplateFilter } from './types'

export const filters: TemplateFilter[] = [
  {
    id: 'usecases',
    keywords: [
      {
        id: 'starter',
        name: 'Starter',
      },
      {
        id: 'backend',
        name: 'Backend',
      },
      {
        id: 'mobile',
        name: 'Mobile',
      },
      {
        id: 'payments',
        name: 'Payments',
      },
      {
        id: 'airdrop',
        name: 'Airdrop',
      },
    ],
    name: 'Use Cases',
  },
  {
    id: 'frameworks',
    keywords: [
      {
        id: 'nextjs',
        name: 'Next.js',
      },
      {
        id: 'expo',
        name: 'Expo',
      },
      {
        id: 'vite',
        name: 'Vite',
      },
      {
        id: 'react',
        name: 'React',
      },
      {
        id: 'react-native',
        name: 'React Native',
      },
      {
        id: 'node',
        name: 'Node',
      },
    ],
    name: 'Frameworks',
  },
  {
    id: 'solana-sdks',
    keywords: [
      {
        id: 'solana-kit',
        name: '@solana/kit',
      },
      {
        id: 'solana-web3js',
        name: '@solana/web3.js',
      },
      {
        id: 'gill',
        name: 'Gill',
      },
    ],
    name: 'Solana SDKs',
  },
  {
    id: 'wallet-adapters',
    keywords: [
      {
        id: 'wallet-ui',
        name: 'Wallet UI',
      },
      {
        id: 'mobile-wallet-adapter',
        name: 'Mobile Wallet Adapter',
      },
      {
        id: 'wallet-adapter',
        name: 'Wallet Adapter',
      },
    ],
    name: 'Wallet Adapters',
  },
]
