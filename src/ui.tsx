import * as React from "react";
import * as ReactDOM from "react-dom";
import "./ui.css";
import { Searchbar } from "./components/Searchbar/index";
import { BrandItem } from "./components/BrandItem/index";

declare function require(path: string): any;

const App = () => {

  const [data, setData] = React.useState([])
// Function called when a result is clicked
const chooseBrand = (brand) => {
  const numberOfColors = brand.colors.length;
  const colors = brand.colors;
  const brandName = brand.name
  parent.postMessage({ pluginMessage: { colors, numberOfColors, brandName } }, "*");
};

const filterBrand = (brands, query) => {
  if (!query) {
      return [];
  }

  return brands.filter((post) => {
      const postName = post.name.toLowerCase();
      return postName.includes(query);
  });
};
const [searchQuery, setSearchQuery] = React.useState('');
const filteredBrand = filterBrand(data, searchQuery.toLowerCase());

const fetchData = async () => {
  fetch('https://raw.githubusercontent.com/Carlosarturo28/Appalette/master/src/database.json').then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error('Something went wrong');
  })
  .then((data) => {
    setData(data)
  })
  .catch((error) => {
    console.log(error)
  });
}

React.useEffect( () => {
  fetchData()
}, [])

  return (
    <div className="container">
      <Searchbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <ul>
        {filteredBrand.length > 0
          ? filteredBrand.map((brand) => (
            <BrandItem key={Math.random()} onClick={chooseBrand} brand={brand} />
          ))
          : <img src={require('./assets/empty.png')} width="200" />
        }
      </ul>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("react-page"));