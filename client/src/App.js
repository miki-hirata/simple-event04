//import logo from './logo.svg';
//import './App.css';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { RootPage } from "./pages/Root.js";
import { EventListPage } from "./pages/EventList.js";
import { EventDetailPage } from "./pages/EventDetail.js";
import { PlaceListPage } from "./pages/PlaceList.js";
import { PlaceDetailPage } from "./pages/PlaceDetail.js";
import { PlaceEditPage } from "./pages/PlaceEdit.js";
import { PlaceAddPage } from "./pages/PlaceAdd.js";
import "./css/style.css"

function Header(props){
  const {events, changeFilter} = props;
  return(
    <header>
      <div className="header_area main_width">           
        <Link
          className="main_title"
          to={`/`}
        ><h1><span>簡易イベント表示</span></h1></Link>
      </div>
    </header>
  );
}
function Navi(){
  return(
    <div className="navi_area">    
      <ul className="navi_list">
      <li><Link to={`/events`}><span>イベント一覧</span></Link></li>
      <li><Link to={`/places`}><span>会場一覧</span></Link></li>
      </ul>  
    </div>
  );
}
export default function App() {
  return (
    <Router>
      <Header />
      <div className="wrapper">
        <Navi />
        <main className="main_area">
          <div className="main_width">
            <Switch>
              <Route path="/" exact>
                <RootPage />
              </Route>
              <Route path="/events" exact>
                <EventListPage />
              </Route>
              <Route path="/events/:eventId">
                <EventDetailPage />
              </Route>
              <Route path="/places" exact>
                <PlaceListPage />
              </Route>
              <Route path="/places/add" exact>
                <PlaceAddPage />
              </Route>
              <Route path="/places/edit/:placeId" exact>
                <PlaceEditPage />
              </Route>
              <Route path="/places/:placeId" exact>
                <PlaceDetailPage />
              </Route>
            </Switch>
          </div>
        </main>
      </div>
    </Router>
  );
}