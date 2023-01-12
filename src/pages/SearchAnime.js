import React, { Component } from "react";
import Swal from "sweetalert2";

// Service
import { PageRoutePath } from "../utils/config";

// Service
import { getAnimeBySearch, getCharacterBySearch } from "../helper/api";

/* Module */
import _ from "lodash";

export class SearchAnime extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: "",
      bestResult: [],
      character: [],
    };
  }

  componentDidMount() {
    // Promise.all([
    //   this.getData(),
    //   /* Handle Too Many Request from JIKAN */
    //   setTimeout(() => {
    //     this.getCharacter();
    //   }, 1000),
    // ]).then((res) => {});
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.search !== this.state.search && this.state.search !== "") {
      Promise.all([this.getData(), this.getCharacter()]).then((res) => {});
    }
  }

  getData = () => {
    const requestBody = {
      letter: this.state.search,
      order_by: "scored_by",
      type: "tv",
      limit: 6,
    };
    return getAnimeBySearch(requestBody)
      .then((res) => {
        const data = res.data;

        if (res.data.status === 404) {
          Swal.fire({
            title: "Whoops! Something Happend.",
            text: `${data.message}. You'll be redirecting to Home`,
            icon: "warning",
            confirmButtonText: "Ok",
          }).then((result) => {
            if (result.isConfirmed) {
              this.navigateTo(PageRoutePath.Home);
            }
          });
        } else {
          this.setState({
            bestResult: data.data,
          });
        }
      })
      .catch((err) => {
        Swal.fire({
          title: "Whoops! Something Happend.",
          text: `${err}`,
          icon: "error",
          confirmButtonText: "Ok",
        });
      });
  };

  getCharacter = () => {
    const requestBody = {
      letter: this.state.search,
      limit: 6,
    };
    return getCharacterBySearch(requestBody)
      .then((res) => {
        const data = res.data;

        if (res.data.status === 404) {
          Swal.fire({
            title: "Whoops! Something Happend.",
            text: `${data.message}. You'll be redirecting to Home`,
            icon: "warning",
            confirmButtonText: "Ok",
          }).then((result) => {
            if (result.isConfirmed) {
              this.navigateTo(PageRoutePath.Home);
            }
          });
        } else {
          this.setState({
            character: data.data,
          });
        }
      })
      .catch((err) => {
        Swal.fire({
          title: "Whoops! Something Happend.",
          text: `${err}`,
          icon: "error",
          confirmButtonText: "Ok",
        });
      });
  };

  onHandleChange = _.debounce((name, value) => {
    this.setState({
      [name]: value,
    });
  }, 500);

  navigateTo = (Route, data) => {
    const { navigate } = this.props;

    if (Route === PageRoutePath.DETAIL_ANIME_PLAIN) {
      navigate(`${Route}/${data}`);
    } else {
      navigate(Route);
    }
  };

  render() {
    return (
      <div className="flex flex-col grow gap-5 py-5">
        {/* Handle Searh Input */}
        <div className="flex gap-2 w-fit m-auto justify-center items-center relative">
          <input
            onChange={(e) => this.onHandleChange("search", e.target.value)}
            className="border-b border-b-primary-color pr-10 text-primary-color text-2xl outline-none w-64 md:w-96"
          />
          <i
            className=" fa-solid absolute right-3 text-primary-color fa-magnifying-glass"
            onClick={this.getData}
          ></i>
        </div>

        {this.state.search === "" && this.state.bestResult.length === 0 ? (
          // Handle If Search Empty String
          <div className="flex flex-col gap-5 grow justify-center items-center">
            <i className="fa-solid fa-question fa-5x md:fa-8x text-primary-color"></i>
            <div className="flex flex-col gap-2 items-center">
              <span className="text-xl md:text-3xl font-bold text-soft-black-color">
                Looking For Something?
              </span>
              <span className="text-xs md:text-base text-gray-color">
                Find Something With Searchbar Above.
              </span>
            </div>
          </div>
        ) : (
          <>
            {/* Top Result */}
            <div className="topResult flex gap-3 flex-col">
              <span className="font-black text-xl text-soft-black-color">
                Best Result
              </span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {this.state.bestResult.slice(0, 3).map((val, idx) => (
                  <div
                    className="flex gap-2 md:gap-1 flex-row md:!flex-col"
                    key={idx}
                    onClick={() =>
                      this.navigateTo(
                        PageRoutePath.DETAIL_ANIME_PLAIN,
                        val.mal_id
                      )
                    }
                  >
                    <img
                      src={val.images.webp.large_image_url}
                      className="float rounded-xl w-20 md:w-auto h-auto md:h-96 object-center object-cover"
                    />
                    <div className="flex flex-col">
                      <span className="font-bold text-soft-black-color text-base mt-2">
                        {val.title}
                      </span>
                      <div className="flex gap-1 text-gray-color text-sm">
                        <span className="text-blue-800">{val.status}</span>•
                        <span>{val.year}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Character */}
            <div className="character flex gap-3 flex-col">
              <span className="font-black text-lg text-soft-black-color">
                Character
              </span>
              <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
                {this.state.character.map((val, idx) => (
                  <a
                    className="flex flex-col justify-center gap-2 items-center cursor-pointer"
                    href={val.url}
                    key={idx}
                  >
                    <img
                      src={val.images.webp.image_url}
                      className="w-24 h-24 md:h-40 md:w-40 rounded-full object-top object-cover"
                    />
                    <span className="font-bold text-sm md:text-base">{val.name}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Series */}
            <div className="Series flex gap-3 flex-col">
              <span className="font-black text-lg text-soft-black-color">
                Series
              </span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {this.state.bestResult.map((val, idx) => (
                  <div
                    className="flex gap-2"
                    key={idx}
                    onClick={() =>
                      this.navigateTo(
                        PageRoutePath.DETAIL_ANIME_PLAIN,
                        val.mal_id
                      )
                    }
                  >
                    <img
                      src={val.images.webp.large_image_url}
                      className="float rounded-xl h-auto w-8 md:w-10 basis-1/4"
                    />
                    <div className="flex flex-col gap-1 basis-3/4">
                      <span className="font-bold text-soft-black-color text-base mt-2 line-clamp-2">
                        {val.title}
                      </span>
                      <div className="flex gap-1 text-gray-color text-xs md:text-sm">
                        <span>{val.episodes} Episode</span>
                        <span>{val.year}</span>,<span>{val.duration}</span>
                      </div>
                      <div className="flex gap-2 text-gray-color text-xs md:text-sm">
                        <span className="text-blue-800">{val.status}</span>•
                        <span>{val.year}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    );
  }
}

export default SearchAnime;
