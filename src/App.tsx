
import { useCallback, useEffect, useMemo, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Gallery from './Gallery';
import { fpCircularArray, CarouselDS } from './CarouselDS';
import './sass/style.scss';
import { CarouselType } from './CircularList/ICircular';

// FP version
function App() {
  const [input, setInput] = useState("");
  const [fetchDataClicker, setFetchDataClicker] = useState(true);

  const [loading, setLoading] = useState(false);
  const [sort, setSort] = useState(true);
  const [b, setB] = useState(true); // when this gets updated, whole component re-renders, including our getCarousel
  const [arrayDataObj, setArrayDataObj] = useState<CarouselType>({
    dataArr: [],
    numCurrent: 0,
    numCounter: 0,
  });
  // depends on state 'fetchDataClicker'
  // returns a memoized function that gets image urls.
  const getImageUrls = useCallback(() => { 

    setLoading(true);
    return new Promise<string []>((resolve) => {
      setTimeout(function(): void {
        resolve([
          "http://chineseruleof8.com/wp-content/uploads/2018/06/beijing-dragon-turtle.jpg",
          "http://chineseruleof8.com/wp-content/uploads/2018/06/beijing-cold-in-tiannamen.jpg",
          "http://chineseruleof8.com/wp-content/uploads/2018/06/beijing-white-pagoda.jpg",
          "http://chineseruleof8.com/wp-content/uploads/2018/06/beijing-waterfall-stairway.jpg",
          "http://chineseruleof8.com/wp-content/uploads/2018/06/beijing-onto-the-next-section.jpg"
        ]);
      }, 3000);
    });
  }, [fetchDataClicker]);

  // depends on when 'getimageUrls' is updated witha new callback, we execute getimageUrls so that it can fetch
  // then we update state with its received results, rendering the page.
  useMemo(async () => {
    console.log('getImageUrls callback has been updated. We need to create new Carousel and update it with the results');
    return await getImageUrls().then((results: string []) => { // very slow process if lots of data
      console.log('create new Carousel, update with new fetch results');
      arrayDataObj.dataArr = results;
      setLoading(false);
    });
  }, [getImageUrls]);

  // correct
  // First we need to cache it. Then we need to say under what dependency do we re-cache?
  // 1) if carousel is updated from our fetch, then we sort it and return it for cache
  // 2) if sort is updated via click, then we sort it and return it for cache
  const getCarousel = useCallback(() => {
    fpCircularArray.sort(sort, arrayDataObj);
    return fpCircularArray;
  }, [loading, sort]);

  return (
    <div className="App">
      <header className="App-header">
        <input type="text" value={input} onChange={event => setInput((event.target.value))} />
        <button onClick={() => setFetchDataClicker(state => !state)}>fetch data</button>
        <button onClick={() => setB(state => !state)}>{b?"true":"false"}</button>
        <button onClick={() => setSort(state => !state)}>toggle sort</button>

        {
          loading ? 
          <div id="loadingNote">
            <h3 className="item">Fetching images from server</h3>
            <img className="App-logo item" src={logo} alt="loading...." />
          </div> : 
          <small>fetched {fpCircularArray.numOfItems(arrayDataObj)} images</small>
        }

        <ul>
            {getCarousel().getItems(arrayDataObj).map((url: string) => {
                return (<li key={url}>
                    {url.split('/').splice(-1).pop()}
                </li>);
            })}
        </ul>

			  <Gallery carousel={getCarousel} sort={sort} data={arrayDataObj} />
      </header>
    </div>
  );
}

export default App;

/*
// OOP version
function App() {
  const [input, setInput] = useState("");
  const [fetchDataClicker, setFetchDataClicker] = useState(true);
  const [carousel, setCarousel] = useState<CarouselDS>();
  const [loading, setLoading] = useState(false);
  const [sort, setSort] = useState(true);
  const [b, setB] = useState(true); // when this gets updated, whole component re-renders, including our getCarousel

  // depends on state 'fetchDataClicker'
  // returns a memoized function that gets image urls.
  const getImageUrls = useCallback(() => { 
    console.log('create getImageUrls callback!');
    setLoading(true);
    return new Promise<string []>((resolve) => {
      setTimeout(function(): void {
        resolve([
          "http://chineseruleof8.com/wp-content/uploads/2018/06/beijing-dragon-turtle.jpg",
          "http://chineseruleof8.com/wp-content/uploads/2018/06/beijing-cold-in-tiannamen.jpg",
          "http://chineseruleof8.com/wp-content/uploads/2018/06/beijing-white-pagoda.jpg",
          "http://chineseruleof8.com/wp-content/uploads/2018/06/beijing-waterfall-stairway.jpg",
          "http://chineseruleof8.com/wp-content/uploads/2018/06/beijing-onto-the-next-section.jpg"
        ]);
      }, 3000);
    });
  }, [fetchDataClicker]);

  // depends on when 'getimageUrls' is updated witha new callback, we execute getimageUrls so that it can fetch
  // then we update state with its received results, rendering the page.
  useMemo(async () => {
    console.log('getImageUrls callback has been updated. We need to create new Carousel and update it with the results');
    return await getImageUrls().then((results: string []) => { // very slow process if lots of data
      console.log('create new Carousel, update with new fetch results', results);

      // update states, re-render
      setCarousel(new CarouselDS(results)); 
      setLoading(false);
    });
  }, [getImageUrls]);

  // erroneous. Gallery will re-render if any state is changed.
  const errGetCarousel = () => {
    carousel?.sort(sort);
    return carousel;
  }

  // correct
  // First we need to cache it. Then we need to say under what dependency do we re-cache?
  // 1) if carousel is updated from our fetch, then we sort it and return it for cache
  // 2) if sort is updated via click, then we sort it and return it for cache
  const getCarousel = useCallback(() => {
    carousel?.sort(sort);
    return carousel;
  }, [carousel, sort]);

  return (
    <div className="App">
      <header className="App-header">
        <input type="text" value={input} onChange={event => setInput((event.target.value))} />
        <button onClick={() => setFetchDataClicker(state => !state)}>fetch data</button>
        <button onClick={() => setB(state => !state)}>{b?"true":"false"}</button>
        <button onClick={() => setSort(state => !state)}>toggle sort</button>

        {
          loading ? 
          <div id="loadingNote">
            <h3 className="item">Fetching images from server</h3>
            <img className="App-logo item" src={logo} alt="loading...." />
          </div> : 
          <small>fetched {carousel?.numOfItems()} images</small>
        }

        <ul>
            {carousel?.getItems().map((url: string) => {
                return (<li key={url}>
                    {url.split('/').splice(-1).pop()}
                </li>);
            })}
        </ul>

			  <Gallery carousel={getCarousel} sort={sort} />
      </header>
    </div>
  );
}

export default App;
*/