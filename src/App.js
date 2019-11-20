import React, {Fragment} from 'react';
import axios from 'axios'
import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }
// class App extends Component {
//   state = {
//     repos: null
//   }
//   getUser = (e) => {
//     e.preventDefault();
//     const user = e.target.elements.username.value;
//     if (user) {
//       axios.get(`https://api.github.com/users/${user}`)
//           .then((res) => {
//             const repos = res.data.public_repos;
//             this.setState({ repos });
//           })
//     } else return;
//   }
//   render() {
//     return (
//         <div className="App">
//           <header className="App-header">
//             <h1 className="App-title">HTTP Calls in React</h1>
//           </header>
//           <UserForm getUser={this.getUser} />
//           { this.state.repos ? <p>Number of repos: { this.state.repos }</p> : <p>Please enter a username.</p> }
//         </div>
//     );
//   }
// };
export default class App extends React.Component {
  state = {
    shops: [],
  }

  async componentDidMount() {
    const getBusinessesUrl = `${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses/search?categories=icecream&latitude=34.0754&longitude=-84.2941&sort_by=best_match&limit=5`;
    const getReviewsUrl = `${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses`;
    const headers = {
      "Authorization" : "Bearer wmp0TS1chUh1jLYKy9LIxGH_uW8beAPZBFAZ0Ceqesh8vplGFQORFl9om152LPNq2HS5W28J-6WDFIxLMpeOLxwpfbGxuktJqPeurNpRvtIgzQRLVic54hZkxXnUXXYx"
    };
    try{
      const res = await axios.get(getBusinessesUrl,{headers});
      const shops = res.data.businesses;
      shops.map(async(shop) => {
        try{
          const res = await axios.get(`${getReviewsUrl}/${shop.id}/reviews`, {headers});
          shop.review = res.data.reviews;
          this.setState({shops:this.state.shops.concat(shop)})
        }
        catch(e){
          console.log(e);
        }
      }
      );
    }
    catch(e){
      console.log('errororor',e);
    }
  }

  render() {
    return (
        <Fragment>
          <h1> Top 5 Icecream shops around Alpharetta according to yelp</h1>
        <ul>
          { this.state.shops.map(shop => <li key={shop.id.toString()} >
                <p>{shop.name}</p>
            <img src={shop.image_url} height="500px" width="500px" alt={shop.name}/>
                <p>Address: {shop.location.address1}, {shop.location.city}, {shop.location.state}</p>
                <p> Overall Rating: {shop.rating}</p>
                <ul>Reviews:{shop.review.map(rev => <li key={rev.id.toString()}> {rev.user.name} says "<small>{rev.text}</small>"  </li> )} </ul>
          </li>

          )

          }
        </ul>
        </Fragment>
    )
  }
}
