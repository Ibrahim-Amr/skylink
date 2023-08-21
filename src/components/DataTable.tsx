import { useState, useEffect, useCallback } from 'react';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Paginator } from 'primereact/paginator';
import toast from 'react-hot-toast';
import AddProductModal from './AddProduct/AddProductModal';
import { InputText } from 'primereact/inputtext';

export interface ProductType {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

const Table = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [globalFilter, setGlobalFilter] = useState('');

  const navigation = useNavigate();

  const fetchProducts = useCallback(async () => {
    const { data } = await axios.get(
      `https://dummyjson.com/products?limit=5&skip=${currentPage * 5}`
    );
    setProducts(data.products);
  }, [currentPage]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const deleteProduct = (id: any) => {
    if (window.confirm('are you sure?')) {
      const filteredData = products.filter((product) => product.id != id);
      console.log(filteredData);
      setProducts(filteredData);
      toast.success('deleted successfully');
    }
  };

  return (
    <div className='card overflow-y-scroll'>
      <div className='flex flex-row-reverse justify-center items-center gap-x-10 p-5'>
        <AddProductModal setProducts={setProducts} />
        <InputText
          className='w-full'
          onChange={(e) => {
            setGlobalFilter(e.target.value);
          }}
        />
      </div>
      <DataTable
        value={products}
        rows={5}
        rowsPerPageOptions={[5, 10]}
        tableStyle={{ minWidth: '50rem' }}
        className='!min-w-[1400px]'
        globalFilter={globalFilter}
      >
        <Column
          field='title'
          header='Title'
          style={{ width: '25%' }}
          sortable
        ></Column>
        <Column
          field='description'
          header='description'
          style={{ width: '25%' }}
          sortable
        ></Column>
        <Column
          field='price'
          header='Price'
          style={{ width: '25%' }}
          sortable
        ></Column>
        <Column
          field='brand'
          header='Brand'
          style={{ width: '25%' }}
          sortable
        ></Column>
        <Column
          field='Actions'
          header='Actions'
          body={(rowData) => (
            <div className='flex justify-center items-center gap-3'>
              {rowData.id && (
                <Button
                  label='View'
                  severity='success'
                  onClick={() => navigation(`/product/${rowData.id}`)}
                />
              )}
              <Button label='Edit' severity='warning' />
              <Button
                label='Delete'
                severity='danger'
                onClick={() => deleteProduct(rowData.id)}
              />
            </div>
          )}
        />
      </DataTable>
      <Paginator
        first={currentPage * 5}
        rows={5}
        totalRecords={100}
        onPageChange={(e) => setCurrentPage(e.page)}
      />
    </div>
  );
};

export default Table;
