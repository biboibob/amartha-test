import React, { Component } from "react";

/* HOC */
import HOC from "..//HOC/mainHOC";

// Component
import { Pagination } from "../components/Index";

// Service
import { getAllAnime } from "../helper/api";
import { PageRoutePath } from "../utils/config";

export class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataListAnime: [],
      pageSetting: {
        last_visible_page: 2194,
        has_next_page: true,
        current_page: 1,
      },
    };
  }
  componentDidMount() {
    this.getData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.pageSetting.current_page !== prevState.pageSetting.current_page
    ) {
      this.getData();
    }
  }

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
    return (
      <div className="flex flex-col py-3">
        <div className="grid grid-cols-2 py-3 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {this.state.dataListAnime.map((val, idx) => (
            <div
              className="flex flex-col gap-2"
              key={idx}
              onClick={() =>
                this.navigateTo(PageRoutePath.DETAIL_ANIME_PLAIN, val.mal_id)
              }
            >
              <img
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
