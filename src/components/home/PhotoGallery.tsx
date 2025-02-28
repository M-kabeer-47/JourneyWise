"use client"
import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

const photos = [
  { src: 'https://images.unsplash.com/photo-1503220317375-aaad61436b1b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80', alt: 'Man hiking in mountains', aspectRatio: '16/9' },
  { src: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80', alt: 'Man on a cliff overlooking the ocean', aspectRatio: '16/9' },
  { src: 'https://images.unsplash.com/photo-1539635278303-d4002c07eae3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80', alt: 'Man looking at map on mountain top', aspectRatio: '4/3' },
  { src: 'https://images.unsplash.com/photo-1530521954074-e64f6810b32d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80', alt: 'Man on a boat in crystal clear water', aspectRatio: '16/9' },
  { src: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80', alt: 'Man walking on a suspension bridge in the forest', aspectRatio: '16/9' },
  { src: 'https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80', alt: 'Man standing in front of Colosseum', aspectRatio: '3/4' },
]

export default function PhotoGallery() {
  const galleryRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up')
          }
        })
      },
      { threshold: 0.1 }
    )

    if (galleryRef.current) {
      const images = galleryRef.current.querySelectorAll('.gallery-image')
      images.forEach((img) => observer.observe(img))
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div ref={galleryRef} className="w-full bg-gray-50 py-16  w-full  text-white mt-[150px]">
      <div className="mx-auto max-w-7xl">
      <motion.h2 
          className="text-4xl font-bold mb-12 text-center max-[450px]:text-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="bg-clip-text text-charcoal">
          Capture Your Journey, Frame Your Adventures
          </span>
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:grid-rows-[auto_1fr]">
          <div className="sm:col-span-2 lg:col-span-2 sm:row-span-2">
            <GalleryImage photo={photos[0]} priority />
          </div>
          <div className="sm:col-span-1 lg:col-span-1 sm:row-span-2 h-full">
            <GalleryImage photo={photos[5]} fullHeight />
          </div>
          <div className="sm:col-span-1 lg:col-span-1">
            <GalleryImage photo={photos[2]} />
          </div>
          <div className="sm:col-span-1 lg:col-span-1">
            <GalleryImage photo={photos[3]} />
          </div>
          <div className="sm:col-span-2 lg:col-span-1">
            <GalleryImage photo={photos[4]} />
          </div>
        </div>
      </div>
    </div>
  )
}

function GalleryImage({ photo, priority = false, fullHeight = false }: { photo: typeof photos[0], priority?: boolean, fullHeight?: boolean }) {
  return (
    <div className={`gallery-image relative w-full ${fullHeight ? 'h-full' : 'h-0 pb-[66.67%]'} overflow-hidden rounded-lg shadow-md transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-[1.02]`}>
      <Image
        src={photo.src}
        alt={photo.alt}
        layout="fill"
        objectFit="cover"
        className="transition-transform duration-300 ease-in-out hover:scale-110"
        priority={priority}
      />
    </div>
  )
}

