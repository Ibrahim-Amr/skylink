import { useState, useEffect, useCallback } from 'react';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Paginator } from 'primereact/paginator';
interface Country {
  name: string;
  code: string;
}

interface Representative {
  name: string;
  code: string;
}

interface Customer {
  id: number;
  name: string;
  country: Country;
  company: string;
  date: string;
  status: string;
  verified: boolean;
  activity: number;
  representative: Representative;
  balance: number;
}

const Table = () => {
  const [products, setProducts] = useState<Customer[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
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
    }
  };

  return (
    <div className='card overflow-y-scroll'>
      <DataTable
        value={products}
        rows={5}
        rowsPerPageOptions={[5, 10]}
        tableStyle={{ minWidth: '50rem' }}
        className='!min-w-[1400px]'
      >
        <Column field='title' header='title' style={{ width: '25%' }}></Column>
        <Column
          field='description'
          header='description'
          style={{ width: '25%' }}
        ></Column>
        <Column field='price' header='price' style={{ width: '25%' }}></Column>
        <Column field='brand' header='brand' style={{ width: '25%' }}></Column>
        <Column
          field='Actions'
          header='Actions'
          body={(rowData) => (
            <div className='flex justify-center items-center gap-3'>
              <Button
                label='View'
                severity='success'
                onClick={() => navigation(`/product/${rowData.id}`)}
              />
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
