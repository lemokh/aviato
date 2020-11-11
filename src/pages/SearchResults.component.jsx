import React from "react";
import { LanguageContext } from '../context/LanguageContext'
import { connect } from "react-redux";

class SearchResults extends React.Component {
  static contextType = LanguageContext;
  constructor(props) {
    super(props);
    this.pageSearch = this.pageSearch.bind(this);
  }
  pageSearch(reduxState, searchInput, finalResultArr, language) {
    if (reduxState !== null) {
      if (typeof reduxState !== "undefined") {
        if (finalResultArr.length < 20) {
        
          const pageMatches = [];
          const pageIds = Object.keys(reduxState);
          const pageValues = Object.values(reduxState);
          // collects redux page items that include the search input value
          for (let i = 0; i < pageValues.length; i++) {
            if (pageValues[i].name.includes(searchInput)) {
              pageMatches.push(pageValues[i]);
              continue;
            }
            if (pageValues[i].title.includes(searchInput)) {
              pageMatches.push(pageValues[i]);
              continue;
            }
            if (typeof pageValues[i].textGeo !== "undefined") {
              if (pageValues[i].textGeo.includes(searchInput)) {
                pageMatches.push(pageValues[i]);
                continue;
              }
            }
            if (typeof pageValues[i].textEng !== "undefined") {
              if (pageValues[i].textEng.includes(searchInput)) {
                pageMatches.push(pageValues[i]);
                continue;
              }
            }
            if (typeof pageValues[i].textRus !== "undefined") {
              if (pageValues[i].textRus.includes(searchInput)) {
                pageMatches.push(pageValues[i]);
                continue;
              }
            }
          }
          let pageMatchDivArray = pageMatches.map((item, index) => (
            <div style={{backgroundColor: '#fff1d0'}} className="container text-center mt-5 border-bottom"
              id={pageIds[index]}
              key={pageIds[index]} >
              <img className='rounded prj-image' src={item.src} alt={item.name} />
              <h2><strong>{item.name}</strong></h2>
              <p><strong>{item.title}</strong></p>
              <p className="rounded p-3">
                {language === 'Geo' ? item.textGeo : language === 'Eng' ? item.textEng : language === 'Rus' ? item.textRus : 'not found'}
              </p>
            </div>
          ));
        
          finalResultArr.push(...pageMatchDivArray);
        }
      }
    }
  }
  render() {
    const { entireRedux, searchInput } = this.props;
    const { language } = this.context;
    const finalSearchResults = [];

    if (entireRedux !== null) {
      if (searchInput.trim().length) {
        this.pageSearch(entireRedux.news, searchInput, finalSearchResults, language);
        this.pageSearch(entireRedux.gallery, searchInput, finalSearchResults, language);
        this.pageSearch(entireRedux.projects, searchInput, finalSearchResults, language);
        this.pageSearch(entireRedux.catalog, searchInput, finalSearchResults, language);
        if (!finalSearchResults.length) {
          finalSearchResults.push("NO SEARCH RESULTS");
        }
      } else {
        finalSearchResults.push("NO SEARCH RESULTS");
      }
  
    }
    return <div className="container">{finalSearchResults}</div>;
  }
}
const mapStateToProps = reduxState => ({
  entireRedux: reduxState.siteData
});

export default connect(mapStateToProps)(SearchResults);
