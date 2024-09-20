import { useState, useEffect } from 'react';
import { PRODUCTS } from '../utils/Products';

const ShoppingCart = () => {

  const [discount, setDiscount] = useState(0);
  const [products, setProducts] = useState(() => {
    const savedProducts = localStorage.getItem('cartProducts');
    return savedProducts ? JSON.parse(savedProducts) : PRODUCTS;
  });

  const subtotal = products.reduce((total: number, product: any) => total + product.price * product.quantity, 0);

  const discountedTotal = subtotal - (subtotal * (discount / 100));

  useEffect(() => {
    localStorage.setItem('cartProducts', JSON.stringify(products));
  }, [products]);

  const handleQuantityChange = (id: number, quantity: number) => {
    setProducts((prevProducts: any) =>
      prevProducts.map((product: any) =>
        product.id === id ? { ...product, quantity } : product
      )
    );
  };

  const handleRemoveProduct = (id: number) => {
    setProducts((prevProducts: any) => prevProducts.filter((product: any) => product.id !== id));
  };

  const handleDiscountChange = (e: any) => {
    setDiscount(e.target.value);
  };

  return (
    <div className="w-full p-6 bg-cyan-50 shadow-md rounded-lg flex flex-col h-screen">
      <h1 className="text-3xl font-bold mb-10 text-black">Shopping Cart</h1>
      <div className="mb-4">
        <div className="flex justify-between items-center font-bold border-b pb-2">
          <span className="text-lg text-black w-1/2">Product</span>
          <span className="text-lg text-black w-1/4 text-center">Price</span>
          <span className="text-lg text-black w-1/4 text-center">Quantity</span>
        </div>
      </div>
      <div className="space-y-4 flex-grow overflow-y-auto min-h-[200px]">
        {products.map((product: any) => (
          <div key={product.id} className="flex justify-between items-center p-4 border-b">
            <span className="text-lg text-black w-1/2">{product.name}</span>
            <span className="text-lg text-black w-1/4 text-center">
              {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(product.price)}
            </span>
            <div className='flex flex-row w-1/4 justify-center'>
              <input
                type="number"
                value={product.quantity}
                onChange={(e) => handleQuantityChange(product.id, Number(e.target.value))}
                min="0"
                className="w-16 text-center border rounded text-black"
              />
              <button
                onClick={() => handleRemoveProduct(product.id)}
                className="ml-4 text-red-500 hover:text-red-700"
              >
                Remove Product
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="sticky bottom-0 bg-cyan-50 p-4 border-t">
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <strong className="text-lg text-black">Total:</strong>
            <span className="text-xl text-black">
              {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(subtotal)}
            </span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center mb-2">
              <span className="text-black mr-2">Apply Discount:</span>
              <input
                type="number"
                value={discount}
                onChange={handleDiscountChange}
                min="0"
                max="100"
                placeholder="Discount (%)"
                className="w-20 p-2 border rounded text-black"
              />
            </div>
            <strong className="text-lg text-black">Discounted Total:</strong>
            <span className="text-xl text-black">
              {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(discountedTotal)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
