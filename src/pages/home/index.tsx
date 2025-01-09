import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { fetchProducts, postCart } from '../../store/slices/exampleSlice';

function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { products } = useSelector((state: RootState) => state.example);
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const onAddMoreProduct = () => {
    dispatch(postCart({ title: 'this is test' }));
  };

  return (
    <div className="py-10">
      <h1 className="text-3xl font-semibold text-center mb-8">Product List</h1>
      <div className="flex justify-center py-3">
        <button onClick={() => onAddMoreProduct()} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Add More Product
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-4">

        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
          >
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-bold text-gray-800">
                {product.title}
              </h3>
              <p className="text-gray-600 mt-2">{product.description}</p>
              <p className="text-lg font-semibold text-blue-600 mt-4">
                $
                {product.price}
              </p>
              <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors duration-300">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
