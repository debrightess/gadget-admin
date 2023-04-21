import axios from 'axios'
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function ProductForm({
  title: existingTitle,
  description: existingDescription,
  price: existingPrice,
}) {
  const [title, setTitle] = useState(existingTitle || '')
  const [description, setDescription] = useState(existingDescription || '')
  const [price, setPrice] = useState(existingPrice || '')
  const [goToProducts, setGoToProducts] = useState(false)

  const router = useRouter()

  async function createProduct(ev) {
    ev.preventDefault()
    const data = { title, description, price }
    await axios.post('/api/products', data)
    setGoToProducts(true)
  }

  if (goToProducts) {
    router.push('/products')
  }

  return (
    <form onSubmit={createProduct}>
      <label>Prodcut name</label>
      <input
        type='text'
        placeholder='product name'
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
      />
      <label>Description</label>
      <textarea
        placeholder='description'
        value={description}
        onChange={(ev) => setDescription(ev.target.value)}
      />
      <label>Price (in USD)</label>
      <input
        type='number'
        placeholder='price '
        value={price}
        onChange={(ev) => setPrice(ev.target.value)}
      />
      <button type='submit' className='btn-primary'>
        Save
      </button>
    </form>
  )
}
