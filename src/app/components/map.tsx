'use client'

import React, { useRef, useEffect, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ''

interface MapboxMapProps {
  airports: Array<{ name: string; longitude: number; latitude: number }>
}

export default function AirportMap({ airports }: MapboxMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const [lng] = useState(-98.5795)
  const [lat] = useState(39.8283)
  const [zoom] = useState(3)

  useEffect(() => {
    if (map.current) return // initialize map only once
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current!,
      style: 'mapbox://styles/mapbox/navigation-night-v1',
      center: [lng, lat],
      zoom: zoom,
    })

    map.current.on('load', () => {
      if (!map.current) return

      // Add terrain and hillshade layers
      map.current.addSource('mapbox-dem', {
        'type': 'raster-dem',
        'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
        'tileSize': 512,
        'maxzoom': 14
      })

      map.current.addSource('airports', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: airports.map(airport => ({
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [airport.longitude, airport.latitude]
            },
            properties: {
              name: airport.name
            }
          }))
        }
      })

      // Add airports layer first
      map.current.addLayer({
        id: 'airports',
        type: 'circle',
        source: 'airports',
        paint: {
          'circle-radius': 6,
          'circle-color': '#FFD700',
          'circle-stroke-width': 2,
          'circle-stroke-color': '#000000'
        }
      })
      
      // Then add hillshading layer
      map.current.addLayer({
        'id': 'hillshading',
        'source': 'mapbox-dem',
        'type': 'hillshade',
        'paint': {
          'hillshade-illumination-direction': 270,
          'hillshade-exaggeration': 0.6
        }
      }, 'airports');

      // Add popups
      map.current.on('click', 'airports', (e) => {
        if (!e.features) return
        const coordinates = (e.features[0].geometry as { coordinates: number[] }).coordinates.slice()
        const name = e.features[0].properties?.name

        new mapboxgl.Popup()
          .setLngLat(coordinates as [number, number])
          .setHTML(`<div style="font-size: 16px; color: white; background-color: black; padding: 5px; font-weight: medium;">${name}</div>`)
          .addTo(map.current!)
      })

      // Change cursor on hover
      map.current.on('mouseenter', 'airports', () => {
        if (map.current) map.current.getCanvas().style.cursor = 'pointer'
      })
      map.current.on('mouseleave', 'airports', () => {
        if (map.current) map.current.getCanvas().style.cursor = ''
      })
    })
  }, [airports, lat, lng, zoom])

  return <div ref={mapContainer} className="map-container" style={{ height: '100vh' }} />
}

