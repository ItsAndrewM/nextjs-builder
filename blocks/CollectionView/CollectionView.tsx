import React, { FC, useState, useEffect } from 'react'
import { NextSeo } from 'next-seo'
import { Themed } from '@theme-ui/mdx'
// import { jsx } from '@theme-ui/core'
import { LoadingDots } from '@components/ui'
import builderConfig from '@config/builder'
import { ProductGrid, ProductGridProps } from '../ProductGrid/ProductGrid'
import { getCollection } from '@lib/swell/storefront-data-hooks/src/api/operations-swell'

interface Props {
  className?: string
  children?: any
  collection: string | any
  productGridOptions: ProductGridProps
  renderSeo?: boolean
}

const CollectionPreview: FC<Props> = ({
  collection: initialCollection,
  productGridOptions,
  renderSeo,
}): JSX.Element => {
  const [collection, setCollection] = useState(initialCollection)
  const [loading, setLoading] = useState(false)

  useEffect(() => setCollection(initialCollection), [initialCollection])

  useEffect(() => {
    const fetchCollection = async () => {
      setLoading(true)
      const result = await getCollection(builderConfig, {
        handle: collection,
      })
      setCollection(result)
      setLoading(false)
    }
    if (typeof collection === 'string') {
      fetchCollection()
    }
  }, [collection])

  if (!collection || typeof collection === 'string' || loading) {
    return (
      <>
        <LoadingDots />
      </>
    )
  }

  const { title, description, products } = collection
  return (
    <>
      <Themed.div
        sx={{ display: 'flex', flexDirection: 'column' }}
        key={collection.id}
      >
        {renderSeo && (
          <NextSeo
            title={collection.title}
            description={collection.description}
            openGraph={{
              type: 'website',
              title,
              description,
            }}
          />
        )}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ marginTop: 0, marginBottom: 2 }}>
            <Themed.h1>{collection.title}</Themed.h1>
          </span>
          <div dangerouslySetInnerHTML={{ __html: collection.description! }} />
        </div>
        <Themed.div sx={{ p: 5 }}>
          <ProductGrid {...productGridOptions} products={products} />
        </Themed.div>
      </Themed.div>
    </>
  )
}

export default CollectionPreview
