import React from "react";
import FirebaseContext from '../../firebase/context';
import LinkItem from './LinkItem';
import {LINKS_PER_PAGE} from '../../utils';

function LinkList(props) {
  const {firebase} = React.useContext(FirebaseContext);
  const [links, setLinks] = React.useState([]);
  const [cursor, setCursor] = React.useState(null);
  const isTopPage = props.location.pathname.includes('top');
  const isNewPage = props.location.pathname.includes('new');
  const page = Number(props.match.params.page);
  
  React.useEffect(() => {
    const unsubscribe = getLinks();
    return () => unsubscribe();
  }, [isTopPage, page]);

  function getLinks() {      
    const hasCursor = Boolean(cursor);  
    const orderBy = { name: "created", direction: "desc"};
    
    if (isTopPage) {
      orderBy.name = "voteCount";
    }

    var linkList = firebase.db.collection("links").orderBy(orderBy.name, orderBy.direction);
    
    console.log(page);

    if (page !== 1 && hasCursor) {
      linkList = linkList.startAfter(cursor.created);
    } 
    
    return linkList
      .limit(LINKS_PER_PAGE)
      .onSnapshot(handleSnapshot);
      
  }

  function handleSnapshot(snapshot) {
    const links = snapshot.docs.map(doc => {
      return {id: doc.id, ...doc.data()}
    });

    const lastLink = links[links.length - 1];
    setLinks(links);
    setCursor(lastLink);    
  }

  function visitPreviousPage() {
    if (page > 1) {
      props.history.push(`/new/${page - 1}`);
    }
  }

  function visitNextPage() {
    if (page <= links.length / LINKS_PER_PAGE) {
      props.history.push(`/new/${page + 1}`)
    }
  }

  const pageIndex = page ? (page - 1)*LINKS_PER_PAGE + 1 : 0;

  return (
  <div>
      {links.map((link, index) => (
        <LinkItem key={link.id} showCount={true} link={link} index={index + pageIndex} />
      ))}
      {isNewPage && (
        <div className="pagination">
          <div className="pointer mr2" onClick={visitPreviousPage}>Previous</div>
          <div className="pointer" onClick={visitNextPage}>Next</div>
        </div>
      )}
  </div>);
}

export default LinkList;
