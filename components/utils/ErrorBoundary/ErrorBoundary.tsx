'use client'

import { Component, ErrorInfo, ReactNode } from 'react'
import gsap from 'gsap'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  }

  public static getDerivedStateFromError(_: Error): State {
    // Kill all GSAP animations on error
    gsap.killTweensOf("*")
    return { hasError: true }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo)
  }

  public componentWillUnmount() {
    // Clean up any remaining GSAP animations
    gsap.killTweensOf("*")
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div style={{ 
          padding: '20px', 
          textAlign: 'center',
          color: '#F39',
          fontFamily: 'var(--font-cooper)',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#161616'
        }}>
          <h2 style={{ 
            fontSize: '3rem',
            marginBottom: '2rem'
          }}>
            Oops, something went wrong!
          </h2>
          <button 
            onClick={() => {
              gsap.killTweensOf("*")
              this.setState({ hasError: false })
            }}
            style={{
              padding: '1rem 2rem',
              fontSize: '1.5rem',
              background: '#F39',
              border: 'none',
              borderRadius: '0.5rem',
              color: '#FFF',
              cursor: 'pointer',
              fontFamily: 'inherit'
            }}
          >
            Try again
          </button>
        </div>
      )
    }

    return this.props.children
  }
} 