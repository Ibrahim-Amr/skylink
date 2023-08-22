import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import axios from 'axios';
const ProductDetails = () => {
  const { id } = useParams();

  const { isLoading, error, data } = useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const response = await axios.get(`https://dummyjson.com/products/${id}`);
      return response.data;
    },
  });

  if (isLoading)
    return (
      <section className='flex justify-center items-center font-bold text-5xl'>
        <h1>Loading.</h1>;
      </section>
    );

  if (error)
    return (
      <section className='flex justify-center items-center font-bold text-5xl'>
        <h1>something is wrong,try again later.</h1>;
      </section>
    );

  return (
    <section className='min-h-screen max-w-[1600px] mx-auto flex justify-center items-center gap-x-10'>
      <div className='flex-1'>
        <img
          src={data?.thumbnail}
          alt={data?.title}
          className='w-full h-full object-cover rounded-xl'
        />
      </div>
      <div className='flex-1 space-y-5'>
        <h1 className='text-7xl font-bold'>{data?.title}</h1>
        <h6 className='text-sm font-bold text-neutral-500'>
          {data?.description}
        </h6>
        <p className='flex justify-start items-center gap-5 text-2xl font-semibold'>
          <span>${data?.price}</span>
          <span className='line-through text-neutral-500'>
            ${data?.discountPercentage}
          </span>
        </p>
        <p className='flex justify-start items-center gap-5 text-2xl font-semibold'>
          <span className='text-green-500'> {data.stock}</span>
          <span>In Stock</span>
        </p>
      </div>
    </section>
  );
};

export default ProductDetails;
