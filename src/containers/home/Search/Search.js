// import React, { useEffect, useState } from 'react'
// import Header from '../../../components/Header'
// import { SearchResultsList } from '../searchResultsList/SearchResultsList'
// import { Link } from 'react-router-dom';
// import ROUTES from '../../../navigation/Router';
// import { SearchBar } from '../searchBar/SearchBar';
// import { useSelector } from 'react-redux';
// import { selectData } from '../../../features/SearchData/searchSlice';

//  const Search = () => {
//   const Data = useSelector(selectData);
//   const [input, setInput] = useState([]);
//   useEffect(()=>{
//     console.log(Data);
//   },[Data])
//   return (
//     <div>
//       {Data.title}
//     </div>
//   )
// }

// export default Search

// <div className="container">
//     <h4>Result</h4>
//     <p className="clas">Check each product page for other buying options.</p>
//     </div>  
//     <div>

import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { selectData } from '../../../features/SearchData/searchSlice';
import { Link } from 'react-router-dom';
import ROUTES from '../../../navigation/Router';
import Header from '../../../components/Header';

function Search() {
  const [searchData,setSearchData] = useState([]);
  const Data = useSelector(selectData);
  console.log(Data);
  return (
    <div>
      <Header/>
    <div className="container">
      <h3>Results</h3>
      <p>Check each product page for other buying options.</p>
     <div className='row'>
     {Data.map((p) => (
              <div  className="col-3">
                <div className="card" style={{ width: "18rem" }}>
                  <Link to={ROUTES.detail.name + "?id=" + p.id}>
                    <img
                      src={`data:image/jpeg;base64,${p.imageUrl}`}
                      height="300"
                      className="card-img-top"
                      alt="Product"
                    />
                  </Link>
                  <div className="card-body">
                    <h5 className="card-title">{p.title}</h5>
                    {/* <p className="card-text">{p.description}</p> */}
                    Price: <span className="pricetag">$ {p.price}</span>
                    {/* <button className="btn btn-warning">{p.price}
                  <strong> $</strong>
                  </button> */}
                    {/* <button className="btn btn-primary mx-3">Detail</button> */}
                    {/* <Link to={ROUTES.detail.name + "?id=" + p.id} class="btn btn-primary">
                Detail
              </Link> */}
                  </div>
                </div>
              </div>
            ))}
     </div>
     </div>
    </div>
  )
}

export default Search