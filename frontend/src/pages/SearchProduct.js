// Importing necessary React hooks
import React, { useEffect, useState } from 'react';

// Importing router hook to read query from URL
import { useLocation } from 'react-router-dom';

// Importing existing API configuration
import SummaryAPI from '../common';

// Importing component to display products
import VerticalCard from '../components/VerticalCard';

// Importing helper function that is sending image URL to backend AI search API
import searchProductByImage from '../helpers/searchProductByImage';

const SearchProduct = () => {
    // Creating a hook to get the search query from the URL
    const query = useLocation();

    // Creating a state that is storing the product data to display
    const [data, setData] = useState([]);

    // Creating a state that is tracking if loading is happening
    const [loading, setLoading] = useState(true);

    console.log("query", query.search);

    // Defining a function that is fetching products based on text or image mode
    const fetchProduct = async () => {
        setLoading(true);

        // Parsing the search parameters from the URL
        const urlSearch = new URLSearchParams(query.search);
        const queryText = urlSearch.get("q");
        const imageLink = urlSearch.get("image");

        if (imageLink) {
            // If an image URL is found in query params, performing AI-based image search
            const matchedProducts = await searchProductByImage(imageLink);
            setData(matchedProducts);
        } else if (queryText) {
            // If text query is found, performing normal MongoDB text search
            const response = await fetch(SummaryAPI.searchProduct.url + "?q=" + queryText);
            const dataResponse = await response.json();
            setData(dataResponse.data);
        } else {
            // If neither found, setting empty data
            setData([]);
        }

        setLoading(false);
    };

    // Running fetchProduct whenever the search query changes
    useEffect(() => {
        fetchProduct();
    }, [query]);  // Watching only query now

    return (
        <div className='container mx-auto p-4'>
            {
                loading && (
                    <p className='text-lg text-center'>Loading...</p>
                )
            }

            <p className='text-lg font-semibold my-3'>Search Results : {data.length}</p>

            {
                data.length === 0 && loading === false && (
                    <p className='bg-white text-lg p-4'>No Results Found...</p>
                )
            }

            {
                data.length !== 0 && !loading && (
                    <VerticalCard loading={loading} data={data} />
                )
            }
        </div>
    );
};

export default SearchProduct;