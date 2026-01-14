'use client'

import { useEffect } from 'react'

export default function AnimationController() {
  useEffect(() => {
    // Ensure no-animations class is set
    if (!document.documentElement.classList.contains('no-animations')) {
      document.documentElement.classList.add('no-animations')
    }
    
    function enableAnimations() {
      // Wait for content to be fully loaded, then enable animations after 0.5ms
      const enable = () => {
        setTimeout(() => {
          document.documentElement.classList.remove('no-animations')
          const wrapper = document.querySelector('.wrapper')
          const content = document.querySelector('.content')
          if (wrapper) wrapper.classList.add('animate')
          if (content) content.classList.add('animate')
        }, 0.5)
      }
      
      if (document.readyState === 'complete') {
        enable()
      } else {
        window.addEventListener('load', enable, { once: true })
      }
    }
    
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', enableAnimations)
    } else {
      enableAnimations()
    }
  }, [])
  
  return null
}
