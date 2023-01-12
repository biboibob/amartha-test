import React, { Component } from "react";
import Swal from "sweetalert2";

/* Component */
import { Button } from "../components/custom/Index";

/* HOC */
import HOC from "../HOC/mainHOC";

// EndPoint
import { getDetailAnime } from "../helper/api";

// Service
import { PageRoutePath } from "../utils/config";

export class DetailAnime extends Component {
  constructor(props) {
    super(props);

    this.state = {
      animeDetail: {},
      idAnime: null,
      toggleReadMore: false,
    };
  }

  componentDidMount() {
    const { params } = this.props;
    this.setState(
      {
        idAnime: params.id,
      },
      () => {
        this.getData();
      }
    );
  }

  navigateTo = (Route) => {
    const { navigate } = this.props;
    navigate(Route);
  };

  onToggleReadMore = () => {
    this.setState({
      toggleReadMore: this.state.toggleReadMore ? false : true,
    });
  };

  getData = () => {
    const requestBody = {
      id: parseInt(this.state.idAnime),
    };
    getDetailAnime(requestBody).then((res) => {
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
          animeDetail: data.data,
        });
      }
    });
  };

  render() {
    const animeInformation = this.state.animeDetail;

    const animeDetail = {
      aired: animeInformation.aired?.string,
      japanTitle: animeInformation.title_japanese,
      rating: animeInformation.rating,
      type: animeInformation.type,
      genres: animeInformation.genres,
      licensor: animeInformation.licensors,
      producer: animeInformation.producers,
      favorite: animeInformation.favorites,
      studio: animeInformation.studios,
    };

    return (
      <div className="flex flex-col md:flex-row gap-4 py-3">
        <div className="flex justify-center md:basis-1/4">
          <img
            alt="DetailImageAnime"
            src={animeInformation.images?.jpg.large_image_url}
            className="float rounded-xl w-auto h-96 object-cover md:sticky top-24"
          />
        </div>
        <div className="flex flex-col md:flex-row gap-3 md:basis-3/4 p-2 md:p-0">
          <div className="flex flex-col gap-4 basis-3/5">
            {/* Title Section */}
            <div className="flex flex-col gap-2">
              <span className="text-lg md:text-xl text-soft-black-color font-black">
                {animeInformation.title_english}
              </span>
              <div className="flex gap-2 text-gray-color text-sm md:text-base">
                <span>{animeInformation.episodes} Episodes</span>•
                <span>{animeInformation.duration}</span>•
                <span>{animeInformation.year}</span>
              </div>
            </div>

            {/* Synopsis Section */}
            <div className="flex flex-col gap-2">
              <section className="text-base md:text-lg font-semibold">Synopsis</section>
              <span
                className={`text-sm md:text-base tracking-wider leading-relaxed text-soft-black-color ${
                  !this.state.toggleReadMore && "line-clamp-5"
                }`}
              >
                {animeInformation.synopsis}
              </span>
              <Button
                className={"text-xs md:text-sm mt-2 mb-3"}
                value={`${
                  this.state.toggleReadMore ? "Read Less" : "Read More"
                }`}
                onClick={this.onToggleReadMore}
              />
            </div>

            {/* Detail Section */}
            <div className="flex flex-col gap-2">
              <section className="text-base md:text-lg font-semibold">Detail</section>
              {Object.keys(animeDetail).map((val, idx) => (
                <div className="flex gap-3 flex-col" key={idx}>
                  <div className="flex">
                    <span className="grow">{val}</span>
                    {Array.isArray(animeDetail[val]) ? (
                      <div className="text-sm md:text-base flex flex-col shrink">
                        {animeDetail[val].map((valArr, idxArr) => (
                          <span className="text-right" key={idxArr}>
                            {valArr.name}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <div className="text-sm md:text-base shrink">{animeDetail[val]}</div>
                    )}
                  </div>
                  <div className="border-b" />
                </div>
              ))}
            </div>
          </div>
          {animeInformation?.trailer?.embed_url && (
            <div className="flex flex-col gap-3 basis-2/5">
              <object
                className="h-48 w-100"
                data={`${animeInformation?.trailer?.embed_url}`}
              ></object>
              <a
                className="flex gap-2 bg-youtube-color justify-center items-center p-2 rounded-lg text-white cursor-pointer"
                href={animeInformation?.trailer?.url}
              >
                <i className="fa-brands fa-youtube"></i>
                Watch On Youtube
              </a>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default HOC(DetailAnime);
