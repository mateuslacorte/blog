'use client'

import { useLastConnection } from '@/hooks/useLastConnection'
import { useProbabilityWorker } from '@/hooks/useProbabilityWorker'

export default function Header() {
  const lastConnection = useLastConnection()
  useProbabilityWorker()

  return (
    <header className="site clearfix">
      <div className="col one">
        <img
          src="/assets/images/logo.png"
          alt="LACORTE Systems"
          id="logo-v"
          style={{ display: 'block', height: 'auto', margin: '0 auto', width: '200px' }}
        />
      </div>
      <div className="col two">
        <h4>
          LACORTE Systems (tm) <br />{' '}
          <b>L</b>ightweight <b>A</b>dvanced <b>C</b>ryptographic <b>O</b>nly{' '}
          <b>R</b>ealtime <b>T</b>erminal <b>E</b>ngine (LACORTE)
        </h4>
        <p>----------------------------------------</p>
        <p>LACORTE v 1.0.0</p>
        <p>(c)2025 LACORTE Industries</p>
        <p>- Server 591 -</p>
        <p>----------------------------------------</p>
        {lastConnection && (
          <p id="last-connection">Last connection: {lastConnection}</p>
        )}
        <p>
          <a href="https://linkedin.com/in/mateuslacorte" target="_blank" rel="noopener noreferrer">
            [ LinkedIn ]
          </a>
          <a href="https://github.com/mateuslacorte" target="_blank" rel="noopener noreferrer">
            [ GitHub ]
          </a>
        </p>
      </div>
    </header>
  )
}

