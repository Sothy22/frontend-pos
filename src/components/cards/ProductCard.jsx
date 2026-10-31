// export default function ProductCard({ data }) {
//   return (
//     <div className="max-w-sm rounded-xl overflow-hidden shadow-md border border-gray-100 bg-white p-5 flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1 duration-200">
      
//       {/* Image Container */}
//       {data?.images && (
//         <div className="w-full h-full bg-gray-50 rounded-lg overflow-hidden mb-4 flex items-center justify-center">
//           <img 
//             className="w-full h-full object-cover" 
//             src={data?.images} 
//             alt={data?.title} 
//           />
//         </div>
//       )}

//       {/* Text Info */}
//       <div className="flex-1 mb-4">
//         <div className="text-lg font-bold text-gray-950 mb-1 truncate">
//           {data?.title}
//         </div>
//         <div className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
//           {data?.description}
//         </div>
//       </div>

//       {/* Row 1: Price, Quantity, Discount */}
//       <div className="flex items-center justify-between gap-2 border-t border-gray-100 pt-3 text-xs font-medium text-gray-600">
//         <div>
//           Price: <span className="text-sm font-bold text-gray-900">${data?.price}</span>
//         </div>
//         <div>
//           Qty: <span className="font-semibold text-gray-800">{data?.stock}</span>
//         </div>
//         <div className="text-red-600 bg-red-50 px-1.5 py-0.5 rounded font-semibold">
//           -{data?.discountPercentage}%
//         </div>
//       </div>

//       {/* Row 2: Category & Brand */}
//       <div className="flex items-center justify-between gap-2 pt-2 pb-4 text-xs text-gray-500 capitalize">
//         <div className="truncate">
//           Category: <span className="font-medium text-gray-700">{data?.category}</span>
//         </div>
//         <div className="truncate text-right">
//           Brand: <span className="font-medium text-gray-700">{data?.brand || "Generic"}</span>
//         </div>
//       </div>

//       {/* Action Button */}
//       <button 
//         className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-sm py-2.5 px-4 rounded-lg transition-colors duration-150 shadow-sm shadow-blue-100"
//         onClick={() => data?.btnAddToCard?.(data)}
//       >
//         Add to cart
//       </button>
//     </div>
//   );
// }




export default function ProductCard({ data }) {
  return (
    <div className="w-100 bg-gray-300 rounded-lg shadow-2xl p-5 flex flex-col gap-1.5 transition-all duration-300 ease-in hover:scale-105 ">
      {data?.images && (
        <img className="bg-gray-100 rounded-t-lg" src={data?.images} alt="" />
      )}
      <div className="font-bold italic underline">{data?.title}</div>
      <div className="text-md ">{data?.description}</div>

      <div className="flex flex-row gap-3 justify-center">
        <div className=""> Price: ${data?.price}</div>
        <div className=""> Quantity: {data?.stock}</div>
        <div className="">Discount: %{data?.discountPercentage}</div>
      </div>
      <div className="flex flex-row gap-3 justify-center">
        <div className=""> Category: {data?.category}</div>
        <div className=""> Brand: {data?.brand}</div>
      </div>

      <button
        className="bg-gray-300 p-2 w-full rounded-lg transition-all duration-300 ease-in cursor-pointer hover:scale-105 border-2 border-dashed border-blue-400 hover:bg-gray-200"
        onClick={() => data?.btnAddToCard?.(data)}
      >
        Product Detail
      </button>
    </div>
  );
}
