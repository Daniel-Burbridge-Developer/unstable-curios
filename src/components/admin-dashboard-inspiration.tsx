import React from 'react';

// Generate an array of 40 photo URLs using a placeholder service
const photos: string[] = Array.from(
  { length: 40 },
  (_, i) => `https://via.placeholder.com/150?text=Photo+${i + 1}`
);

const AdminDashboardInspiration: React.FC = () => {
  return (
    <div className='min-h-screen flex flex-col bg-gray-50'>
      {/* Header */}
      <header className='bg-blue-600 text-white p-4 shadow'>
        <h1 className='text-2xl font-bold'>Admin Dashboard</h1>
      </header>

      <div className='flex flex-1'>
        {/* Sidebar */}
        <aside className='w-64 bg-gray-100 p-4 border-r'>
          <nav>
            <ul>
              <li className='mb-2'>
                <button className='w-full text-left px-4 py-2 rounded hover:bg-blue-200'>
                  Items
                </button>
              </li>
              <li className='mb-2'>
                <button className='w-full text-left px-4 py-2 rounded hover:bg-blue-200'>
                  Collections
                </button>
              </li>
              <li className='mb-2'>
                <button className='w-full text-left px-4 py-2 rounded hover:bg-blue-200'>
                  Organisations
                </button>
              </li>
            </ul>
          </nav>

          <div className='mt-6'>
            <button className='w-full bg-green-500 text-white py-2 rounded mb-2 hover:bg-green-600'>
              Create New
            </button>
            <button className='w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600'>
              Edit Existing
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className='flex-1 p-6 overflow-auto'>
          {/* Section for selecting a product image */}
          <section>
            <h2 className='text-2xl font-semibold mb-4'>
              Select Product Image
            </h2>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4'>
              {photos.map((photo, index) => (
                <div
                  key={index}
                  className='border rounded overflow-hidden hover:shadow-lg transition-shadow duration-200'
                >
                  <img
                    src={photo}
                    alt={`Photo ${index + 1}`}
                    className='w-full h-32 object-cover'
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Form Section for product information */}
          <section className='mt-8'>
            <h2 className='text-2xl font-semibold mb-4'>Product Information</h2>
            <form className='grid grid-cols-1 gap-6'>
              <div>
                <label
                  htmlFor='productName'
                  className='block text-sm font-medium text-gray-700'
                >
                  Product Name
                </label>
                <input
                  id='productName'
                  name='productName'
                  type='text'
                  placeholder='Enter product name'
                  className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500'
                />
              </div>

              <div>
                <label
                  htmlFor='productDescription'
                  className='block text-sm font-medium text-gray-700'
                >
                  Description
                </label>
                <textarea
                  id='productDescription'
                  name='productDescription'
                  rows={4}
                  placeholder='Enter product description'
                  className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500'
                ></textarea>
              </div>

              <div>
                <label
                  htmlFor='productPrice'
                  className='block text-sm font-medium text-gray-700'
                >
                  Price
                </label>
                <input
                  id='productPrice'
                  name='productPrice'
                  type='number'
                  placeholder='Enter product price'
                  className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500'
                />
              </div>

              <div>
                <button
                  type='submit'
                  className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'
                >
                  Submit
                </button>
              </div>
            </form>
          </section>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboardInspiration;
