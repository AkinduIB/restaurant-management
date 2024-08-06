import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Cards from '../../components/Cards';
import { FaFilter } from "react-icons/fa";

const Menu = () => {
    const [menu, setMenu] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [sortOption, setSortOption] = useState("default");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(6);
    const location = useLocation();

    // Loading data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/menu.json");
                const data = await response.json();
                setMenu(data);
                filterItems(selectedCategory);
            } catch (error) {
                console.log("Error fetching data", error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const category = params.get('category') || 'all';
        setSelectedCategory(category);
        filterItems(category);
    }, [location]);

    // Filtering items based on category
    const filterItems = (category) => {
        setSelectedCategory(category);
        const filtered = category === "all"
          ? menu
          : menu.filter((item) => item.category === category);
        setFilteredItems(filtered);
        setCurrentPage(1);
      };
      

    const showAll = () => {
        setFilteredItems(menu);
        setSelectedCategory("all");
        setCurrentPage(1);
    }

    // Sorting items
    const handleSortChange = (option) => {
        setSortOption(option);
        let sortedItems = [...filteredItems];
        switch (option) {
            case "A-Z":
                sortedItems.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case "Z-A":
                sortedItems.sort((a, b) => b.name.localeCompare(a.name));
                break;
            case "low-to-high":
                sortedItems.sort((a, b) => a.price - b.price);
                break;
            case "high-to-low":
                sortedItems.sort((a, b) => b.price - a.price);
                break;
            default:
                break;
        }
        setFilteredItems(sortedItems);
        setCurrentPage(1);
    };

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div>
            {/* Menu banner */}
            <div className='max-w-screen-2xl container mx-auto x1:px-24 bg-gradient-to-r from-[#fff9e3] from-100%'>
                <div className='py-48 flex flex-col justify-center items-center gap-8'>
                    <div className='text-center space-y-7 px-4'>
                        <h2 className='md:text-5xl text-4xl font-bold md:leading-snug leading-snug'>
                            For the Love of Delicious <span className='text-green'>Perfect</span> <span className='text-red'>Pizza</span>
                        </h2>
                        <p className='text-xl text-gray md:w-4/5 mx-auto'>
                            Bring your family and savor the joy of delectable pizzas like Margherita, Pepperoni, Veggie Delight, BBQ Chicken, and more, all at a great value.
                        </p>
                        <button className='btn bg-red px-8 py-3 font-semibold text-[#ffffff] rounded-full'>Order Now</button>
                    </div>
                </div>
            </div>

            {/* Categories & Filter */}
            <div className='max-w-screen-2xl container mx-auto xl:px-24 md:px-12 px-4 flex justify-between py-12'>
                <div className='flex gap-8 flex-wrap items-center'>
                    <div className='flex gap-2 items-center'>
                        <h3 className='md:text-2xl text-xl font-semibold'>Categories :</h3>
                        <div className='flex items-center'>
  <button
    className={`px-4 py-2 rounded-full ${selectedCategory === "all" ? 'bg-green text-white' : 'bg-gray-200'}`}
    onClick={showAll}
  >
    All
  </button>
  <button
    className={`px-4 py-2 rounded-full ${selectedCategory === "pizza" ? 'bg-green text-white' : 'bg-gray-200'}`}
    onClick={() => filterItems('pizza')}
  >
    Pizza
  </button>
  <button
    className={`px-4 py-2 rounded-full ${selectedCategory === "melts" ? 'bg-green text-white' : 'bg-gray-200'}`}
    onClick={() => filterItems('melts')}
  >
    Melts
  </button>
  <button
    className={`px-4 py-2 rounded-full ${selectedCategory === "dessert" ? 'bg-green text-white' : 'bg-gray-200'}`}
    onClick={() => filterItems('dessert')}
  >
    Desserts
  </button>
</div>

                    </div>
                </div>

                {/* Sorting */}
                <div className='flex gap-4 items-center'>
                    <h3 className='md:text-2xl text-xl font-semibold'>Sort By :</h3>
                    <div className='dropdown dropdown-bottom'>
                        <label tabIndex={0} className="btn m-1 flex items-center gap-2">Filter <FaFilter /></label>
                        <ul
                            tabIndex={0}
                            className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-48"
                            style={{ zIndex: 1000 }}>
                            <li><button onClick={() => handleSortChange("default")}>Default</button></li>
                            <li><button onClick={() => handleSortChange("A-Z")}>A-Z</button></li>
                            <li><button onClick={() => handleSortChange("Z-A")}>Z-A</button></li>
                            <li><button onClick={() => handleSortChange("low-to-high")}>Low to High</button></li>
                            <li><button onClick={() => handleSortChange("high-to-low")}>High to Low</button></li>
                        </ul>

                    </div>
                </div>
            </div>

            {/* Menu items */}
            <div className='max-w-screen-2xl container mx-auto xl:px-24 md:px-12 px-4'>
                <div className='grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6'>
                    {currentItems.map((item) => (
                        <Cards key={item._id} item={item} />
                    ))}
                </div>

                {/* Pagination */}
                <div className="flex justify-center py-8 my-8">
                    <div className="btn-group">
                        {[...Array(Math.ceil(filteredItems.length / itemsPerPage)).keys()].map((number) => (
                            <button
                                key={number + 1}
                                onClick={() => paginate(number + 1)}
                                className={`btn rounded-full ${currentPage === number + 1 ? "bg-green text-white btn-active" : ''}`}
                                style={{ margin: '0 0.25rem' }} // Inline style for margin
                            >
                                {number + 1}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Menu;




