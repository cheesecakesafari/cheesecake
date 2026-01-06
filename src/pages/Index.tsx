import React, { useState } from 'react'
import { Header } from '@/components/sections/Header'
import { HeroSection } from '@/components/sections/HeroSection'
import { PackagesSection } from '@/components/sections/PackagesSection'
import OurCars from '@/components/sections/OurCars'
import { EnhancedFooter } from '@/components/sections/EnhancedFooter'
import { FloatingWidget } from '@/components/sections/FloatingWidget'
import { FloatingWhatsApp } from '@/components/sections/FloatingWhatsApp'
import { HamburgerMenu } from '@/components/sections/HamburgerMenu'
import { CommentsSection } from '@/components/ui/comments-section'
import { GallerySection } from '@/components/ui/gallery-section'

export default function IndexPage() {
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);

  return (
    <>
      <Header />
      <HeroSection />
      <PackagesSection />
      
      {/* Comments Section */}
      <CommentsSection
        isCommentModalOpen={isCommentModalOpen}
        setIsCommentModalOpen={setIsCommentModalOpen}
      />
      
      {/* Gallery Section */}
      <GallerySection
        isGalleryModalOpen={isGalleryModalOpen}
        setIsGalleryModalOpen={setIsGalleryModalOpen}
      />

      <OurCars />
      <EnhancedFooter />
      <FloatingWidget />
      <FloatingWhatsApp />
      <HamburgerMenu />
    </>
  )
}
