'use client'
import React, { useEffect, useState } from 'react'
import { FaWhatsapp } from 'react-icons/fa'
import styled from 'styled-components'

const WhatsAppButton = () => {
  const [isMounted, setIsMounted] = useState(false)
  const phoneNumber = '919300606666'
  const message = 'Hello! I have a question.'
  const hoverMessage = 'Chat with us!'

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleClick = () => {
    window.open(
      `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`,
      '_blank',
    )
  }

  // Don't render on server to avoid hydration mismatch
  if (!isMounted) {
    return null
  }

  return (
    <FloatingContainer>
      <Tooltip>{hoverMessage}</Tooltip>
      <FloatingButton onClick={handleClick}>
        <FaWhatsapp size={32} />
      </FloatingButton>
    </FloatingContainer>
  )
}

// Styled components with deterministic class names
const FloatingContainer = styled.div`
  position: fixed;
  bottom: 30px;
  right: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1000;
`

const FloatingButton = styled.div`
  width: 60px;
  height: 60px;
  background-color: #25d366;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;

  &:hover {
    background-color: #128c7e;
    transform: scale(1.1);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  }

  &:active {
    transform: scale(0.95);
  }
`

const Tooltip = styled.span`
  visibility: hidden;
  width: max-content;
  background-color: #333;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 8px 12px;
  position: absolute;
  z-index: 1;
  bottom: 100%;
  right: 50%;
  transform: translateX(50%);
  margin-bottom: 10px;
  opacity: 0;
  transition: opacity 0.3s;

  ${FloatingContainer}:hover & {
    visibility: visible;
    opacity: 1;
  }

  &::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: #333 transparent transparent transparent;
  }
`

export default WhatsAppButton
