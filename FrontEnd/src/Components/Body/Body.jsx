import React, { useContext, useEffect, useState } from "react";
import "./body.css";
import { URL } from "../../constant";
import RestaurantCard from "../RestaurantCard/RestaurantCard";
import SearchBar from "../SearchBar/SearchBar";
import Shimmer from "../Shimmmer/Shimmer";
import NoRestaurant from "../NoRestaurant/NoRestaurant";
import { Link } from "react-router-dom";
import useOnline from "../../util/useOnline";
import Anim from "./response.json";
import Lottie from "lottie-react";
import { SearchContext } from "../Context/SearchContext";
import { useDispatch } from "react-redux";
import { addItems } from "../../util/CartSlice";

const Body = () => {
  // state variable
  const [filtredRestaurant, setFiltredRestaurant] = useState(null);
  const [allrestaurant, setAllRestaurant] = useState(null);
  const SearchBarContext = useContext(SearchContext);
  const [carasoul,setCarasoul] = useState(null);
  // const [latitude, setLatitude] = useState(0);
  // const [longitude, setLongitude] = useState(0);

  // search functionalities of the app
  const filterRestaurant = (searchTerm) => {
    const searchedRestaurant = allrestaurant?.filter((ele) =>
      ele?.info?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase())
    );
    setFiltredRestaurant(searchedRestaurant);
  };

  // Api call to get the restaurant data
  useEffect(() => {
    fetchData();
  }, []);

  // api calling function
  const fetchData = async () => {
    try {
      // await getLocationInfo();
      await getRestaurant();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // function to get longitude and latitude of user's location
  // const getLocationInfo = () => {
  //   navigator.geolocation.getCurrentPosition((position) => {
  //     const lat = position.coords.latitude;
  //     const long = position.coords.longitude;
  //     setLatitude(lat);
  //     setLongitude(long);
  //     console.log("the longitude of the my place is :" + long);
  //     console.log("the latitide of the my place is :" + lat);
  //   });
  // };

  // restaurant data fetching

  async function getRestaurant() {
    try {
      const data = await fetch(URL);
      // const data = await fetch(
      //   `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${latitude}&lng=${longitude}&page_type=DESKTOP_WEB_LISTING`
      // );
      // console.log(data);

      if (!data.ok) {
        throw new Error('Network response was not ok');
      }

      const contentType = data.headers.get('content-type');
      if (contentType && contentType.includes('application/json')){
        const json = await data?.json();
        // // Normalize response to always be an array
        // if (!Array.isArray(json)) {
        //   json = [json];
        // }
        // console.log(json?.data?.success?.cards);
        console.log(json.data.success.cards[0].gridWidget.gridElements.infoWithStyle.info);
        if (json.data.success.cards.length == 5) {
          setAllRestaurant(
            json?.data?.success?.cards[4].gridWidget?.gridElements?.infoWithStyle
              ?.restaurants
          );
          setFiltredRestaurant(
            json?.data?.success?.cards[4].gridWidget?.gridElements?.infoWithStyle
              ?.restaurants
          );
          setCarasoul(json.data.success.cards[0].gridWidget.gridElements.infoWithStyle.info);
        }
        if (json.data.success.cards.length == 4) {
          setAllRestaurant(
            json?.data?.success?.cards[3].gridWidget?.gridElements?.infoWithStyle
              ?.restaurants
          );
          setFiltredRestaurant(
            json?.data?.success?.cards[3].gridWidget?.gridElements?.infoWithStyle
              ?.restaurants
          );
        }

      }
      else{
        throw new Error('Invalid Content-Type');
      }
    }
    catch (error) {
      console.error("Error fetching data:", error);
    }

  }

  // net connnectivity  checker hook
  const isOnline = useOnline();

  if (!isOnline) {
    return (
      <>
        <div className="NoInterNetContainer">
          <h3>no internet acess</h3>
          <Lottie animationData={Anim} className="isOnlineAnim" />
        </div>
      </>
    );
  }

const CarasoulData = ()=>{
  {
  //  carasoul.map((info)=>{
  //   return(
  //     <h1>hello </h1>
  //   )
  //  })
  <h1></h1>
  }

}

  return (
    <>

       {/* carasoul  */}

      <CarasoulData/>

      {/* Search bar component     */}

      <div className="bodyComp">
        {SearchBarContext?.isSearchVisible && (
          <div className="searchCont">
            <SearchBar searchFun={filterRestaurant} />
          </div>
        )}

        {/* card component */}
        <div className="bodyCard">
          {allrestaurant != null ? (
            filtredRestaurant?.length != 0 ? (
              filtredRestaurant?.map((element) => {
                return (
                  <Link
                    to={"/restaurant/" + element?.info?.id}
                    key={element?.info?.id}
                    className="link"
                  >
                    <RestaurantCard
                      card={element?.info}
                      delivaryInfo={element?.info?.sla}
                    />
                  </Link>
                );
              }) 
             
            ) : (
              <NoRestaurant />
            )
          ) : (
            <Shimmer />
          )}
        </div>
      </div>
    </>
  );
};

export default Body;
