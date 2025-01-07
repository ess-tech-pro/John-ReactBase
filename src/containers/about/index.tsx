import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { fetchCarts } from "../../store/slices/exampleSlice";

const AboutContainer = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { carts } = useSelector((state: RootState) => state.example);

  useEffect(() => {
    dispatch(fetchCarts());
  }, [dispatch]);

  console.log(carts);

  return (
    <div className="py-10">
      <h1 className="text-3xl font-semibold text-center mb-8">Product List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-4">
        {carts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
          >
            <div className="p-4">
              <h3 className="text-xl font-bold text-gray-800">{product.id}</h3>
              <p className="text-lg font-semibold text-blue-600 mt-4">
                ${product.total}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutContainer;
