import React, { Component } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Pagination as PaginationSwiper, Navigation, Autoplay } from "swiper";

/* HOC */
import HOC from "..//HOC/mainHOC";

// Component
import { Pagination } from "../components/Index";

// Service
import { getAllAnime, getAnimeSeason } from "../helper/api";
import { PageRoutePath } from "../utils/config";

export class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataListAnime: [],
      dataListSeasonNow: [],
      pageSetting: {
        last_visible_page: 2194,
        has_next_page: true,
        current_page: 1,
      },
    };
  }
  componentDidMount() {
    const { toast } = this.props;
    Promise.all([this.getData(), this.getRecommendationAnime()]).then((res) => {
      // toast.fire({
      //   icon: "success",
      //   title: "Fetch Successfull",
      // });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.pageSetting.current_page !== prevState.pageSetting.current_page
    ) {
      this.getData();
    }
  }

  getRecommendationAnime = () => {
    getAnimeSeason().then((res) => {
      const data = res.data;
      this.setState({
        dataListSeasonNow: data.data.slice(0, 10),
      });
    });
  };

  getData = () => {
    const requestBody = {
      page: this.state.pageSetting.current_page,
      limit: 10,
    };

    getAllAnime(requestBody).then((res) => {
      const data = res.data;
      this.setState({
        dataListAnime: data.data,
        pageSetting: data.pagination,
      });
    });
  };

  onHandlePagination = (currentPage) => {
    this.setState({
      pageSetting: {
        ...this.state.pageSetting,
        current_page: currentPage,
      },
    });
  };

  navigateTo = (Route, data) => {
    const { navigate } = this.props;

    if (Route === PageRoutePath.DETAIL_ANIME_PLAIN) {
      navigate(`${Route}/${data}`);
    } else {
      navigate(Route);
    }
  };

  render() {
    console.log(this.state.dataListSeasonNow);
    return (
      <div className="flex flex-col gap-5 py-3">
        <Swiper
          pagination={{
            type: "progressbar",
          }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          navigation={true}
          modules={[PaginationSwiper, Navigation, Autoplay]}
          className=" w-100"
        >
          {this.state.dataListSeasonNow.map((val, idxVal) => (
            <SwiperSlide
              className="flex flex-col md:flex-row md:py-5 md:px-20"
              key={idxVal}
            >
              {/* <div className="w-50 h-50" style={{backgroundImage: `url("https://via.placeholder.com/500")` }}></div> */}
              <img
                src={val.images.webp.large_image_url}
                className="object-cover h-72 md:h-full w-auto md:basis-1/4"
              />
              <div className="flex flex-col md:basis-3/4">
                <div className="grow flex flex-col gap-4 bg-soft-black-color p-3 md:p-5 text-white">
                  <div className="flex flex-col gap-2">
                    {/* Title and Type Anime */}
                    <div className="flex gap-5 justify-between">
                      <span className="grow text-base md:text-2xl font-bold">
                        {val.title}
                      </span>
                      <span className="bg-primary-color py-1 px-3 text-white text-xs md:text-base rounded-2xl h-fit w-fit">
                        {val.type}
                      </span>
                    </div>

                    {/* Genre */}
                    <div className="flex gap-1 md:gap-2 text-gray-color text-xs md:text-sm">
                      {val.genres.map((valGenre, idx) => (
                        <div key={idx} className="flex gap-1 md:gap-2">
                          <span>{valGenre.name}</span>
                          {idx + 1 !== val.genres.length && <span>•</span>}
                        </div>
                      ))}
                    </div>
                  </div>
                  <span className="italic text-xs md:text-base">
                    {val.rating}
                  </span>
                </div>
                <span className="bg-primary-color text-white flex gap-2 justify-end p-3 md:px-5 md:py-4  text-sm md:text-base">
                  Coming On:
                  <span className="font-black italic">
                    {val.aired.string !== "Not available"
                      ? new Date(val?.aired?.from).toLocaleDateString()
                      : "No Available Date"}
                  </span>
                </span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Anime List with Pagination */}
        <div className="flex flex-col">
          <section className="text-lg md:text-3xl font-black text-soft-black-color">
            Top Anime
          </section>
          <div className="grid grid-cols-2 py-2 md:!py-5 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {this.state.dataListAnime.map((val, idx) => (
              <div
                className="flex flex-col gap-2 cursor-pointer"
                key={idx}
                onClick={() =>
                  this.navigateTo(PageRoutePath.DETAIL_ANIME_PLAIN, val.mal_id)
                }
              >
                <img
                  alt={"imageList"}
                  src={val.images.jpg.large_image_url}
                  className="rounded-md w-auto h-5/6 object-cover"
                />
                <div className="flex gap-1 justify-between">
                  <span className="font-bold !text-soft-black-color text-xs md:text-base">
                    {val.title_english}
                  </span>
                  <span className="bg-primary-color py-1 px-2 text-white text-xs rounded-2xl h-fit">
                    {val.score}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center items-center">
          <Pagination
            totalPage={this.state.pageSetting.last_visible_page}
            currentPage={this.state.pageSetting.current_page}
            onUpdate={this.onHandlePagination}
          />
        </div>
      </div>
    );
  }
}

export default HOC(Home);
