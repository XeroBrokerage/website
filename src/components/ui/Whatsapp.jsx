'use client'
import React from 'react'
import { FaWhatsapp } from 'react-icons/fa'
import styled from 'styled-components'

const WhatsAppButton = () => {
  // Replace with your WhatsApp number in international format (no spaces or special characters)
  const phoneNumber = '9300606666'
  const message = 'Hello! I have a question.' // Pre filled message

  const handleClick = () => {
    window.open(
      `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`,
      '_blank',
    )
  }

  return (
    <FloatingButton onClick={handleClick}>
      <FaWhatsapp size={32} />
    </FloatingButton>
  )
}

const FloatingButton = styled.div`
  position: fixed;
  bottom: 30px;
  right: 30px;
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
  z-index: 1000;

  &:hover {
    background-color: #128c7e;
    transform: scale(1.1);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  }

  &:active {
    transform: scale(0.95);
  }
`

export default WhatsAppButton
