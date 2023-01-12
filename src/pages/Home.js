import React, { Component } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Pagination as PaginationSwiper, Navigation } from "swiper";

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
      <div className="flex flex-col py-3">
        <Swiper
          pagination={{
            type: "progressbar",
          }}
          navigation={true}
          modules={[PaginationSwiper, Navigation]}
          className="w-100"
        >
          {this.state.dataListSeasonNow.map((val) => (
            <SwiperSlide className="flex py-5 px-20">
              {/* <div className="w-50 h-50" style={{backgroundImage: `url("https://via.placeholder.com/500")` }}></div> */}
              <img
                src={val.images.webp.large_image_url}
                className="basis-1/4"
              />
              <div className="flex flex-col bg-soft-black-color basis-3/5 p-4 text-white">
                <span className="text-3xl font-bold">{val.title}</span>
                <span className="mt-auto flex gap-2 justify-end">
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
        <div className="grid grid-cols-2 py-3 md:grid-cols-3 xl:grid-cols-4 gap-4">
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
