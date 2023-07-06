import React from 'react'
import Image from 'next/image'
import Lightbox from 'react-18-image-lightbox'
import { Swiper, SwiperSlide, SwiperClass } from 'swiper/react';
import { Navigation, Autoplay, Controller } from 'swiper';
import 'swiper/css';
import Icon from './global/icons/Icon';

const CarouselPhoto = ({ images, autoplay }: { images: { [key: string]: string }[], autoplay: boolean }) => {
    const [lightbox, setLightbox] = React.useState<{ open: boolean, image: number | null, title: string }>({ open: false, image: null, title: '' })
    const getUrl = (url: string) => { return `${process.env.SERVER_URL}${url}` }

    const [firstSwiper, setFirstSwiper] = React.useState<SwiperClass | null>(null);
    const [secondSwiper, setSecondSwiper] = React.useState<SwiperClass | null>(null);

    return (
        <React.Fragment>
            <div className='av-products-carousel'>
                <Swiper
                    className='av-products-carousel-top'
                    modules={[Navigation, Autoplay, Controller]}
                    onSwiper={setFirstSwiper}
                    controller={{ control: secondSwiper }}
                    autoplay={!autoplay ? false : { delay: 5000 }}
                    slidesPerView={1}
                    spaceBetween={10}
                    navigation={{
                        nextEl: ".swiper__button.next",
                        prevEl: ".swiper__button.previous",
                    }}
                >
                    <div className="swiper__button previous">
                        <Icon name="CaretLeft" />
                    </div>
                    <div className="swiper__button next">
                        <Icon name="CaretRight" />
                    </div>
                    {images.map((img: { [key: string]: string }, key: number) => {
                        return (
                            <SwiperSlide className="av-products-slide" key={key}>
                                <Image
                                    className="gallery-img"
                                    priority
                                    src={`${process.env.SERVER_URL}${img.path}`}
                                    alt={img.name}
                                    width={400}
                                    height={400}
                                    style={{ height: '100%', width: 'auto' }}
                                    onClick={() => setLightbox({ open: true, image: key, title: img.name })}
                                />
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
                <Swiper
                    className='av-products-carousel-thumbs'
                    modules={[Navigation, Autoplay, Controller]}
                    onSwiper={setSecondSwiper}
                    controller={{ control: firstSwiper }}
                    slidesPerView={3}
                    centeredSlides={true}
                    slideToClickedSlide={true}
                    spaceBetween={10}
                >
                    <div className="gallery-thumbs-wrapper">
                        {images.map((img, key) => {
                            return (
                                <SwiperSlide
                                    className="gallery-thumbs-slide"
                                    key={key}
                                >
                                    <Image
                                        className="gallery-img"
                                        src={`${process.env.SERVER_URL}${img.path}`}
                                        alt={img.name}
                                        width={400}
                                        height={400}
                                        style={{ height: '100%', width: '100%', objectFit: 'cover' }}
                                    />
                                </SwiperSlide>
                            )
                        })}
                    </div>
                </Swiper>
            </div>

            {(lightbox.open && lightbox.image !== null) && (
                <Lightbox
                    mainSrc={getUrl(images[lightbox.image].url)}
                    nextSrc={getUrl(images[(lightbox.image + 1) % images.length].url)}
                    prevSrc={getUrl(images[(lightbox.image + images.length - 1) % images.length].url)}
                    onCloseRequest={() => setLightbox({ open: false, image: null, title: '' })}
                    onMovePrevRequest={() => setLightbox(prev => ({ ...prev, image: ((lightbox.image || 0) + images.length - 1) % images.length }))}
                    onMoveNextRequest={() => setLightbox(prev => ({ ...prev, image: ((lightbox.image || 0) + 1) % images.length }))}
                    imageTitle={images[lightbox.image].alternativeText}
                    imageLoadErrorMessage="Une erreur est survenu... L'image ne peut pas être chargée."
                />
            )}
        </React.Fragment>
    )
}

export default CarouselPhoto;