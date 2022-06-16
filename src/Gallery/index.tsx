import { useEffect, useState } from "react";
import { CarouselType } from "../CircularList/ICircular";
interface IProps {
    carousel: any,
    sort: boolean,
    data: CarouselType | undefined
}

function Gallery(props: IProps) {
    // props
    const { carousel, sort, data} = props;

    // state
    const [urls, setUrls] = useState<string [] | undefined>(['nothing']);
    
    // we only re-render (by updating our url) if our parent props have changed
    useEffect(() => {
        setUrls(carousel()?.getItems(data)); // 2) then, update our state 'url', which will trigger a re-render
    }, [carousel, sort]); // 1) if parent state 'sort' or 'carousel' is updated...

    // render
    return <div id="gallery">
        <ul id="thumbnailList">
            {urls?.map((url: string) => {
                return (<li key={url}>
                    <img className="thumbnail" src={url} width = {80}/>
                </li>);
            })}
        </ul>
    </div>
}
export default Gallery;