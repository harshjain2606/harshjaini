import React, { useState } from 'react'
import { useProductContext } from '../contextApi/ProductContext.jsx'
import { useNavigate } from 'react-router-dom'


const Createproduct = () => {
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    image: ''
  })

  const { createProduct } = useProductContext()
  const navigate = useNavigate()

  const handleSubmit = async () => {
    const { success, message } = await createProduct(newProduct)
    console.log('success', success)
    console.log('message', message)

    if (!success) {
      alert('Error: Data inadequate')
    } else {
      alert('Success: Product created')
      navigate('/') // optional: redirect to homepage
    }

    setNewProduct({ name: '', price: '', image: '' })
  }

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg">
      <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">
        Create New Product
      </h1>

      <div className="flex flex-col space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="number"
          name="price"
          placeholder="Product Price"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
          className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="text"
          name="image"
          placeholder="Product Image URL"
          value={newProduct.image}
          onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
          className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Add Product
        </button>
      </div>
    </div>
  )
}

export {Createproduct}
