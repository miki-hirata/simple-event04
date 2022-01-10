//import logo from './logo.svg';
//import './App.css';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { RootPage } from "./pages/Root.js";
import { EventListPage } from "./pages/EventList.js";
import { EventDetailPage } from "./pages/EventDetail.js";
import { PlaceListPage } from "./pages/PlaceList.js";
import { PlaceDetailPage } from "./pages/PlaceDetail.js";
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

function PlaceAddPage() {
  return (
    <>
      <form action="/place/add" method="post">
        <label htmlFor="name">名前</label>
        <input type="text" name="name"/>
        <label htmlFor="memo">メモ</label>
        <input type="text" name="memo"/>
        <button type="submit">追加</button>
      </form>
    </>
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
              <Route path="/places/:placeId" exact>
                <PlaceDetailPage />
              </Route>
              <Route path="/places/add" exact>
                p
                <PlaceAddPage />
              </Route>
            </Switch>
          </div>
        </main>
      </div>
    </Router>
  );
}