import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { LanguageContext } from "../context/LanguageContext";
import translate from "../language/translate";
import { deleteImageFireStorage, removePostFireDB } from "../Firebase.config";

class PagePosts extends Component {
  static contextType = LanguageContext;
  constructor(props) {
    super(props);
    this.state = { expanded: true };
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  handleEdit(editObj) {
    const element = document.getElementById("form");
    // scrolls to bottom of AdminForm
    this.props.pageName === "gallery"
      ? element.scrollIntoView(false)
      : window.scrollTo(0, 0);
    // populates sibling AdminForm.jsx state (via parent component)
    // with data (including ID) of admin edit post
    this.props.editPostInputs(editObj);
  }
  handleDelete(id, src, pageName) {
    if (src !== null) {
      deleteImageFireStorage(src);
    }
    removePostFireDB(pageName, id);
  }
  handleClick() {
    this.setState({ expanded: !this.state.expanded });
  }

  render() {
    const { expanded } = this.state;
    const { language } = this.context;
    const { ReadMore } = translate[language];
    const {
      auth,
      id,
      src,
      textGeo,
      textEng,
      textRus,
      titleGeo,
      titleEng,
      titleRus,
      nameGeo,
      nameEng,
      nameRus,
      pageName
    } = this.props;

    const text =
      language === "Geo"
        ? textGeo
        : language === "Eng"
        ? textEng
        : language === "Rus"
        ? textRus
        : "";

    const name =
      language === "Geo"
        ? nameGeo
        : language === "Eng"
        ? nameEng
        : language === "Rus"
        ? nameRus
        : "";

    const title =
      language === "Geo"
        ? titleGeo
        : language === "Eng"
        ? titleEng
        : language === "Rus"
        ? titleRus
        : "";

    switch (pageName) {
      case "projects":
        return (
          <div>
            <div className="card project_content_title mt-5">
              <div className="card-header project_content_header text-uppercase">
                <h5 className="project-name">{name}</h5>
                {auth && (
                  <div className="float-right">
                    <FontAwesomeIcon
                      type="button"
                      onClick={() => {
                        this.handleEdit({
                          id,
                          src,
                          textGeo,
                          textEng,
                          textRus,
                          nameGeo,
                          nameEng,
                          nameRus,
                          titleGeo,
                          titleEng,
                          titleRus
                        });
                      }}
                      className="icons"
                      icon={faEdit}
                    />
                    <FontAwesomeIcon
                      type="button"
                      onClick={() => {
                        this.handleDelete(id, src, pageName);
                      }}
                      className="icons"
                      icon={faTrash}
                    />
                  </div>
                )}
              </div>
              <h5 className="p-3 project-name">{title}</h5>
              <div className="card-body project-img-text">
                <img src={src} alt={name} className="rounded prj-image" />
                <div className="col-md-8">
                  <p className="card-text project-text">{text.substring(0, 400)}...</p>
                  <button
                    style={{ fontWeight: "500" }}
                    onClick={this.handleClick}
                    className="btn shadow"
                    type="button"
                    data-toggle="collapse"
                    data-target={`#${id}`}
                    aria-expanded="false"
                    aria-controls="collapseExample"
                  >
                    {ReadMore}
                  </button>
                </div>
              </div>
              <div className="collapse" id={id}>
                <div className="card-body">
                  <p className="card-text project-text">{text}</p>
                </div>
              </div>
            </div>
          </div>
        );
      case "news":
        return (
          <div className="container mb-3 shadow p-3 mb-5 rounded news_container">
            <h2 className="p-3 text-uppercase border-bottom">{name}</h2>
            {auth && (
              <div className="float-right">
                <FontAwesomeIcon
                  type="button"
                  onClick={() => {
                    this.handleEdit({
                      id,
                      src,
                      textGeo,
                      textEng,
                      textRus,
                      nameGeo,
                      nameEng,
                      nameRus,
                      titleGeo,
                      titleEng,
                      titleRus
                    });
                  }}
                  icon={faEdit}
                />
                <FontAwesomeIcon
                  type="button"
                  onClick={() => {
                    this.handleDelete(id, src, pageName);
                  }}
                  icon={faTrash}
                />
              </div>
            )}
            <p className="p-3 font-weight-bold">{title}</p>
            <div className="p_and_image card-body">
              <img src={src} className="nws-image rounded" alt={name} />
              <p className="news-text">{text.substring(0, 400)}...</p>
            </div>
            <button
              className={`${
                expanded
                  ? "btn read_more shadow rounded"
                  : "btn read_more rounded"
              }`}
              onClick={this.handleClick}
              type="button"
              data-toggle="collapse"
              data-target={`#${id}`}
              aria-expanded="false"
              aria-controls="collapseExample" >
              {ReadMore}
            </button>
            <div className="collapse" id={id}>
              <div className="card-body">
                <p className='news-text'>{text}</p>
                </div>
            </div>
          </div>
        );
      case "catalog":
        return (
          <div className="col mb-4">
            <div className="card shadow p-3 mb-5 rounded border-0 airplain_background">
              <div className="container text-center">
                <img
                  src={src}
                  className="card-img-top rounded ctl-image"
                  alt={name}
                />
                <div className="card-body">
                  <h5 className="card-title">{name}</h5>
                  <p
                    className={
                      !expanded
                        ? "fade text-truncate"
                        : "card-text text-truncate" }>
                    {text}
                  </p>
                  <button
                    style={{ color: "#333", fontWeight: 500 }}
                    onClick={this.handleClick}
                    className="btn shadow"
                    type="button"
                    data-toggle="collapse"
                    data-target={`#${id}`}
                    aria-expanded="false"
                    aria-controls="collapseExample"
                  >
                    {ReadMore}
                  </button>
                  {auth && (
                    <div id="flex" className="float-right">
                      <FontAwesomeIcon
                        type="button"
                        onClick={() => {
                          this.handleEdit({
                            id,
                            src,
                            textGeo,
                            textEng,
                            textRus,
                            nameGeo,
                            nameEng,
                            nameRus
                          });
                        }}
                        className="icons"
                        icon={faEdit}
                      />
                      <FontAwesomeIcon
                        type="button"
                        onClick={() => {
                          this.handleDelete(id, src, pageName);
                        }}
                        className="icons"
                        icon={faTrash}
                      />
                    </div>
                  )}
                </div>
                <div className="collapse" id={id}>
                  <div className="card-body">
                    <p className="card-text catalog-text">{text}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case "gallery":
        return (
          <div className="carousel-item mt-5 mb-5 rounded">
            <img src={src} className="gallery_img rounded" alt="..." />
            <div id="flex" className="carousel-caption">
              <p className="gallery_text text-center">
                {text}
                {auth && (
                  <div>
                    <FontAwesomeIcon
                      style={{ color: "blue" }}
                      type="button"
                      onClick={() => {
                        this.handleEdit({ id, src, textGeo, textEng, textRus });
                      }}
                      className="icons"
                      icon={faEdit}
                    />
                    <FontAwesomeIcon
                      style={{ color: "blue" }}
                      type="button"
                      onClick={() => {
                        this.handleDelete(id, src, pageName);
                      }}
                      className="icons"
                      icon={faTrash}
                    />
                  </div>
                )}
              </p>
            </div>
          </div>
        );
      default:
        return;
    }
  }
}

export default PagePosts;
