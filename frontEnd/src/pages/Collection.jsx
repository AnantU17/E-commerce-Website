import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import Product from "./Product";
import ProductItem from "../components/ProductItem";

const Collection = () => {
  const { products ,search,showSearch } = useContext(ShopContext);
  const [showFliter, setShowFilter] = useState(false);
  const [filterProducts,setFilterProducts] = useState([]);
  const [category,setCategory] = useState([]);
  const [subCategory,setSubCategory] =useState([]);
  const [sortType,setSortType] =useState('relevant');
  
  const toggleCategory = (e) =>{
    if(category.includes(e.target.value)){
      setCategory(prev=>prev.filter(item=> item !==e.target.value))
    }
    else{
      setCategory(prev=> [...prev,e.target.value])
    }
  }

  const toggleSubCategory = (e) => {
    if(subCategory.includes(e.target.value)){
      setSubCategory(prev=>prev.filter(item=> item !==e.target.value))
    }
    else{
      setSubCategory(prev=> [...prev,e.target.value])
    }
  }

  const applyFilter = ()=>{
    

    let productCopy = products.slice();

    if(showSearch && search){
      productCopy = productCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }

    if(category.length > 0){
      productCopy = productCopy.filter(item=>category.includes(item.category))
    }
    if(subCategory.length > 0){
      productCopy = productCopy.filter(item=> subCategory.includes(item.subCategory))
    }
    setFilterProducts(productCopy)
  }
  const sortProduct = () => {
    let fpcopy = filterProducts.slice();
    switch (sortType){
      case 'low-high' :
        setFilterProducts(fpcopy.sort((a,b)=>(a.price-b.price)));
        break;
      case 'high-low' :
        setFilterProducts(fpcopy.sort((a,b)=>(b.price - a.price)));
        break;
      default:
        applyFilter();
        break;
    }
  }

  useEffect(()=>{
    setFilterProducts(products);
  },[])

  useEffect(()=>{
    applyFilter();
  },[category,subCategory,search,showSearch,products])
  
  useEffect(()=>{
    sortProduct();
  },[sortType])

  return (
    <div className="dlex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* filer optin */}
      <div className="min-w-60">
        <p onClick={()=>setShowFilter(!showFliter)} className="my-2 text-xl flex items-center cursor-pointer gap-2">
          FLITERS
          <img src={assets.Dropdown_icon} className={`h-3 sm:hidden  ${showFliter ? 'rotate-90' : ''}`} alt="" />
        </p>
        {/* category fliter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${ showFliter ? "" : "hidden"} sm:block`}>
          <p className="mb-3 text-sm font-medium">CATEGORIERS</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input type="checkbox" value={"Men"} className="w-3" onChange={toggleCategory} />
              Men
            </p>
            <p className="flex gap-2">
              <input type="checkbox" value={"Women"} className="w-3" onChange={toggleCategory} />
              Women
            </p>
            <p className="flex gap-2">
              <input type="checkbox" value={"Kids"} className="w-3" onChange={toggleCategory} />
              Kids
            </p>
          </div>
        </div>
        {/* SubCategory Filter */}
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${ showFliter ? "" : "hidden"} sm:block`}>
          <p className="mb-3 text-sm font-medium">TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input type="checkbox" value={"Topwear"} className="w-3" onChange={toggleSubCategory} />
              Topwear
            </p>
            <p className="flex gap-2">
              <input type="checkbox" value={"Bottomwear"} className="w-3" onChange={toggleSubCategory} />
              Bottomwear
            </p>
            <p className="flex gap-2">
              <input type="checkbox" value={"Winterwear"} className="w-3" onChange={toggleSubCategory} />
              Winterwear
            </p>
          </div>
        </div>
      </div>
      {/* right side */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
        <Title text1={'ALL'} text2={'COLLECTION'}/>
        {/* Product Sort */}
        <select onChange={(e)=>setSortType(e.target.value)} className="border-2 border-gray-300 text-sm px-2">
          <option value='relavent'>Sort by: Relavent</option>
          <option value='low-high'>Sort by: Low to High</option>
          <option value='high-low'>Sort by: High to Low</option>
        </select>
        </div>
        {/* Map Products */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
        {
          filterProducts.map((item,index)=>(
            <ProductItem key={index} name={item.name} id={item._id} price={item.price} image={item.image} />
          ))
        }
        </div>
      </div>
    </div>
  );
};

export default Collection;
