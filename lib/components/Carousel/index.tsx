import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import styled, { useTheme } from "styled-components";
import { useEffect, useRef, useState } from "react";
import { CarouselProps } from "./interface";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";

const Carousel = ({
  className = "",
  options = [],
  type = "default",
  background,
  withPagination = false,
  hovered = false,
}: CarouselProps) => {

  const theme = useTheme();

  const slider = useRef<any>();
  const [images, setImages] = useState<any>(options);
  const [activeIndex, setActiveIndex] = useState(0);
  const [initialSlide, setInitialSlide] = useState<any>(
    options?.findIndex((el) => el.default)
  );

  useEffect(() => {
    setImages(options);
    const findDefaultIndex = options?.findIndex((el) => el.default);
    setInitialSlide(findDefaultIndex);
  }, [options]);

  const handleChange = (event: any) => {
    setActiveIndex(event.clickedIndex);
    event.slideTo(event.clickedIndex);
  };

  const handleEnter = (ev: any) => {
    if (hovered) {
      const index = ev.target.swiperSlideIndex;
      slider?.current?.swiper.slideTo(index);
    } else {
      return;
    }
  };

  const types: any = {
    default: (
      <ContentSwiper
        className={className}
        $background={background}
      >
        <Swiper
          className="swiper-classic"
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 3000,
            pauseOnMouseEnter: true,
          }}
          modules={[Pagination, Autoplay]}
        >
          {images?.map((item: any, index: number) => {
            return (
              <SwiperSlide key={index} onMouseEnter={handleEnter}>
                {item?.text && (
                  <div className="content-title">
                    <p className="text-white">{item.text}</p>
                  </div>
                )}
                <img src={item?.path} alt="" />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </ContentSwiper>
    ),
    grid: (
      <ContentSwiper
        className={className}
        $background={background}
      >
        <Swiper
          className="swiper-grid"
          key={initialSlide}
          ref={slider}
          initialSlide={initialSlide}
          grabCursor={true}
          slidesPerView={"auto"}
          spaceBetween={10}
          speed={1000}
          centeredSlides={true}
          freeMode={false}
          onClick={handleChange}
          modules={[Pagination, Autoplay]}
          onSlideChange={() => {}}
          onSwiper={(swiper) => {}}
          autoplay={{
            delay: 3000,
            pauseOnMouseEnter: true,
          }}
          pagination={{
            enabled: withPagination,
            clickable: true,
          }}
          // mousewheel={{
          //   thresholdDelta: 30,
          // }}
        >
          {images?.map((item: any, index: number) => {
            return (
              <SwiperSlide key={index} onMouseEnter={handleEnter}>
                {item?.text && (
                  <div className="content-title">
                    <p className="text-white">{item.text}</p>
                  </div>
                )}
                <img src={item?.path} alt=""/>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </ContentSwiper>
    ),
  };

  return types[type];
};

export default Carousel;

const ContentSwiper = styled.div<{ $background?: string }>`
  .swiper-classic {
    width: 100%;
    background: ${({ $background }) => ($background ? $background : "inherit")};
    .swiper-slide {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center !important;
      font-size: 18px;
      height: 400px;
      img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
      }
      .content-title {
        padding: ${({theme}) => theme.spaces.space4};
        position: absolute;
        left: 0;
        bottom: 0;
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        width: 100%;
        height: 150px;
        z-index: 2;
        opacity: 1;
        display: flex;
        align-items: center;
        p {
          font-size: ${({theme}) => theme.font.size.big};
        }
      }
      &.swiper-slide-active {
        position: relative;
        .content-title {
          opacity: 1;
        }
      }
    }
  }
  .swiper-grid {
    width: 100%;
    background: ${({ $background }) => ($background ? $background : "inherit")};
    .swiper-slide {
      position: relative;
      width: 200px !important;
      height: 400px;
      border-radius: 12px;
      overflow: hidden;
      transition: 1s;
      user-select: none;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
        transition: 1s;
      }
      .content-title {
        position: absolute;
        left: 0px;
        bottom: 0px;
        width: 100%;
        height: 200px;
        z-index: 2;
        opacity: 0;
        border-radius: 12px;
        border-top-right-radius: 0;
        border-top-left-radius: 0;
        display: flex;
        align-items: center;
        p {
          font-size: ${({theme}) => theme.font.size.xBig};
          line-height: 50px;
        }
      }
      &::after {
        content: "";
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(
          120deg,
          rgba(130, 13, 13, 0.8),
          rgba(39, 8, 92, 0.8)
        );
        mix-blend-mode: multiply;
        z-index: 1;
      }
      &.swiper-slide-active {
        position: relative;
        width: 550px !important;
        transition: 0.5s;
        .content-title {
          transform: rotate(0deg) scale(1);
          transition-delay: 0.3s;
          opacity: 1;
        }
        img {
          /* transform: scale(1.3);
          object-position: 50% 0%; */
        }
        &::after {
          background: rgba(123, 123, 123, 0.4);
        }
      }
    }
  }
  @media only screen and (max-width: ${({theme}) => theme.breakpoints.mobile}) {
  }
`;
