import { useState } from "react";
import { useProductContext } from "../contextApi/ProductContext";
import { FaTrash, FaEdit } from "react-icons/fa";

const ProductCard = ({ product }) => {
	const [updatedProduct, setUpdatedProduct] = useState(product);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const { deleteProduct, updateProduct } = useProductContext();

	const handleDeleteProduct = async (pid) => {
		const { success, message } = await deleteProduct(pid);
		alert(success ? `✅ ${message}` : `❌ ${message}`);
	};

	const handleUpdateProduct = async (pid, updatedProduct) => {
		const { success, message } = await updateProduct(pid, updatedProduct);
		setIsModalOpen(false);
		alert(success ? `✅ Product updated successfully` : `❌ ${message}`);
	};

	return (
		<div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl">
			<img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
			<div className="p-4">
				<h3 className="text-lg font-bold mb-2">{product.name}</h3>
				<p className="text-xl font-semibold text-gray-600 dark:text-gray-200 mb-4">
					${product.price}
				</p>
				<div className="flex space-x-2">
					<button
						onClick={() => setIsModalOpen(true)}
						className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
					>
						<FaEdit />
					</button>
					<button
						onClick={() => handleDeleteProduct(product._id)}
						className="p-2 bg-red-500 hover:bg-red-600 text-white rounded"
					>
						<FaTrash />
					</button>
				</div>
			</div>

			{/* Modal */}
			{isModalOpen && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
					<div className="bg-white dark:bg-gray-900 rounded-lg p-6 w-[90%] max-w-md">
						<div className="flex justify-between items-center mb-4">
							<h2 className="text-xl font-bold">Update Product</h2>
							<button
								className="text-gray-500 hover:text-gray-800"
								onClick={() => setIsModalOpen(false)}
							>
								✖
							</button>
						</div>
						<div className="space-y-4">
							<input
								type="text"
								placeholder="Product Name"
								value={updatedProduct.name}
								onChange={(e) =>
									setUpdatedProduct({ ...updatedProduct, name: e.target.value })
								}
								className="w-full border p-2 rounded"
							/>
							<input
								type="number"
								placeholder="Price"
								value={updatedProduct.price}
								onChange={(e) =>
									setUpdatedProduct({ ...updatedProduct, price: e.target.value })
								}
								className="w-full border p-2 rounded"
							/>
							<input
								type="text"
								placeholder="Image URL"
								value={updatedProduct.image}
								onChange={(e) =>
									setUpdatedProduct({ ...updatedProduct, image: e.target.value })
								}
								className="w-full border p-2 rounded"
							/>
						</div>
						<div className="flex justify-end space-x-2 mt-6">
							<button
								onClick={() => handleUpdateProduct(product._id, updatedProduct)}
								className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
							>
								Update
							</button>
							<button
								onClick={() => setIsModalOpen(false)}
								className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
							>
								Cancel
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export {ProductCard};
