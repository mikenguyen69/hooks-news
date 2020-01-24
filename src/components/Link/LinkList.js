import React from "react";
import FirebaseContext from "../../firebase/context";
import LinkItem from "./LinkItem";
import {LINKS_PER_PAGE} from "../../utils";
import axios from "axios";

function LinkList(props) {
  const {firebase} = React.useContext(FirebaseContext);
  const [links, setLinks] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [totalLinks, setTotalLinks] = React.useState(0);
  const isTopPage = props.location.pathname.includes("top");
  const isNewPage = props.location.pathname.includes("new");
  const page = Number(props.match.params.page);  
  const linksRef = firebase.db.collection("links");

  React.useEffect(() => {
    const unsubscribe = getLinks();
    return () => unsubscribe();
  }, [isTopPage, page]);

  function getLinks() {    
    setLoading(true);  
   
    if (isTopPage) {
      return linksRef
        .orderBy("voteCount", "desc")
        .onSnapshot(handleSnapshot);
    } 
    else {      
      // get total collection count;
      linksRef.orderBy("created", "desc").get().then(snapshot => {
        setTotalLinks(snapshot.size);
      });

      const offset = page * LINKS_PER_PAGE - LINKS_PER_PAGE;
      axios.get(`https://us-central1-hooks-news-e53b4.cloudfunctions.net/linksPagination?offset=${offset}`)
        .then(response => {
          const links = response.data;        
          setLinks(links);    
          setLoading(false);      
        });         
      
      
      return () => {};
    }
  }

  function handleSnapshot(snapshot) {
    const links = snapshot.docs.map(doc => {
      console.log(doc.data().url);
      return {id: doc.id, ...doc.data()}
    });
    
    setLinks(links);   
    setLoading(false);
  }

  function visitPreviousPage() {
    if (page > 1) {
      props.history.push(`/new/${page - 1}`);
    }
  }

  function visitNextPage() {
    if (showNextPage) {
      props.history.push(`/new/${page + 1}`)
    }
  }

  const pageIndex = page ? (page - 1)*LINKS_PER_PAGE + 1 : 1;
  const showNextPage = page < totalLinks / LINKS_PER_PAGE;
  const showPrevPage = page > 1;

  return (
  <div style={{opacity: loading ? 0.25 : 1}}>
      {links.map((link, index) => (
        <LinkItem key={link.id} showCount={true} link={link} index={index + pageIndex} />
      ))}
      {isNewPage && (
        <div className="pagination">
          {showPrevPage && (
          <div className="pointer mr2" onClick={visitPreviousPage}>Previous</div>
          )}          
          {showNextPage && (
          <div className="pointer" onClick={visitNextPage}>Next</div>
          )}
        </div>
      )}
  </div>);
}

export default LinkList;
