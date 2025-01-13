import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { fetchProducts, postCart } from '../../store/slices/exampleSlice';

function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { products } = useSelector((state: RootState) => state.example);
  const logged = useSelector((state: RootState) => state.login);

  const isLogged = logged.accessToken !== '';
  const user = logged?.user || {};

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const onAddMoreProduct = () => {
    dispatch(postCart({ title: 'this is test' }));
  };

  console.log('logged', logged);
  return (
    <div className="py-10">
      {/* User information */}
      <div className="border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="p-2 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">Logged in:</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-3 sm:mt-0">
              {isLogged ? 'Yes' : 'No'}
            </dd>
          </div>
          {logged.user && (
            <>
              <div className="p-2 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0">
                <dt className="text-sm/6 font-medium text-gray-900">
                  Username:
                </dt>
                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-3 sm:mt-0">
                  {user.username}
                </dd>
              </div>
              <div className="p-2 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0">
                <dt className="text-sm/6 font-medium text-gray-900">Email:</dt>
                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-3 sm:mt-0">
                  {user.email}
                </dd>
              </div>
              <div className="p-2 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0">
                <dt className="text-sm/6 font-medium text-gray-900">Gender:</dt>
                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-3 sm:mt-0">
                  {user.gender}
                </dd>
              </div>
              {/* Add more fields as needed */}
            </>
          )}
        </dl>
      </div>

      <h2 className="text-3xl font-semibold text-center my-8">Product List</h2>
      <div className="flex justify-center py-3">
        <button
          onClick={() => onAddMoreProduct()}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
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
                ${product.price}
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
