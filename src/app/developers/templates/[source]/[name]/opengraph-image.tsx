import { ImageResponse } from '@vercel/og'
import { templates } from '@/lib/generated/repokit'
import { images } from '@/lib/generated/repokit/images'

export const runtime = 'edge'
export const alt = 'Solana Template'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image({
  params,
}: {
  params: Promise<{ name: string; source: string }>
}) {
  const { name, source } = await params

  // Find the template
  const template = templates.find(
    (t) => t.id === name && t.source.id === source
  )

  if (!template) {
    // Fallback for unknown templates
    return new ImageResponse(
      (
        <div
          style={{
            background: '#0a0a0a',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div style={{ color: 'white', fontSize: '48px', fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>Template Not Found</div>
        </div>
      ),
      { ...size }
    )
  }

  // Get the template image if available
  const templateImageKey = Object.keys(images).find(key => key === template.id)
  const templateImage = templateImageKey ? images[templateImageKey as keyof typeof images] : null

  return new ImageResponse(
    (
      <div
        style={{
          background: '#0a0a0a',
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Gradient shapes in top left */}
        <div
          style={{
            position: 'absolute',
            top: '-100px',
            left: '-100px',
            width: '400px',
            height: '400px',
            background: 'linear-gradient(135deg, #14F195 0%, transparent 70%)',
            borderRadius: '50%',
            opacity: 0.3,
            filter: 'blur(80px)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '50px',
            left: '50px',
            width: '200px',
            height: '200px',
            background: '#9945FF',
            borderRadius: '50%',
            opacity: 0.2,
            filter: 'blur(60px)',
          }}
        />

        {/* Additional gradient overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle at 20% 50%, rgba(20, 241, 149, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(153, 69, 255, 0.1) 0%, transparent 50%)',
          }}
        />

        {/* Left side - Template info */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '60px',
            gap: '24px',
            zIndex: 10,
          }}
        >
          {/* Source badge */}
          <div
            style={{
              background: 'linear-gradient(135deg, #14F195 0%, #9945FF 100%)',
              color: 'white',
              padding: '8px 16px',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
              letterSpacing: '-0.01em',
              alignSelf: 'flex-start',
            }}
          >
            {template.source.name}
          </div>

          {/* Template name */}
          <div
            style={{
              fontSize: '52px',
              fontWeight: '600',
              fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
              color: 'white',
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
            }}
          >
            {template.name}
          </div>

          {/* Description */}
          <div
            style={{
              fontSize: '22px',
              fontWeight: '400',
              fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
              color: 'rgba(255, 255, 255, 0.85)',
              lineHeight: 1.5,
              letterSpacing: '-0.01em',
            }}
          >
            {template.description}
          </div>

          {/* Keywords */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '12px',
              marginTop: '12px',
            }}
          >
            {template.keywords.slice(0, 5).map((keyword, i) => (
              <div
                key={i}
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: '500',
                  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  letterSpacing: '-0.01em',
                }}
              >
                {keyword}
              </div>
            ))}
          </div>

          {/* Solana branding */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginTop: '24px',
            }}
          >
            <svg width="40" height="40" viewBox="0 0 240 240" fill="none">
              <circle cx="120" cy="120" r="80" stroke="#14F195" strokeWidth="8" fill="none"/>
              <path d="M160 80L80 160" stroke="#14F195" strokeWidth="8" strokeLinecap="round"/>
              <path d="M80 80L160 160" stroke="#14F195" strokeWidth="8" strokeLinecap="round"/>
            </svg>
            <div
              style={{
                fontSize: '18px',
                color: '#14F195',
                fontWeight: '600',
                fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
                letterSpacing: '-0.01em',
              }}
            >
              Powered by Solana
            </div>
          </div>
        </div>

        {/* Right side - Template preview or gradient */}
        <div
          style={{
            width: '480px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: templateImage ? 'transparent' : 'linear-gradient(135deg, rgba(20, 241, 149, 0.2) 0%, rgba(153, 69, 255, 0.2) 100%)',
            borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          {templateImage ? (
            <img
              src={templateImage.src}
              alt={`${template.name} preview`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: 0.8,
              }}
            />
          ) : (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '20px',
              }}
            >
              <svg width="120" height="120" viewBox="0 0 240 240" fill="none">
                <rect x="60" y="60" width="120" height="120" stroke="white" strokeWidth="4" fill="none" opacity="0.3"/>
                <circle cx="120" cy="120" r="40" stroke="white" strokeWidth="4" fill="none" opacity="0.3"/>
                <path d="M120 80V160M80 120H160" stroke="white" strokeWidth="4" opacity="0.3"/>
              </svg>
              <div
                style={{
                  color: 'rgba(255, 255, 255, 0.5)',
                  fontSize: '18px',
                  textAlign: 'center',
                }}
              >
                Template Preview
              </div>
            </div>
          )}
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}