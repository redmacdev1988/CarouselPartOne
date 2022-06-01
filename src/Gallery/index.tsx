import { useEffect, useState } from "react";
interface IProps {
    carousel: any,
    sort: boolean
}

function Gallery(props: IProps) {
    // props
    const { carousel, sort } = props;

    // state
    const [urls, setUrls] = useState<string [] | undefined>(['nothing']);
    
    // we only re-render (by updating our url) if our parent props have changed
    useEffect(() => {
        console.log(`fetching items, there are: ${carousel()?.numOfItems()}`);
        setUrls(carousel()?.getItems()); // 2) then, update our state 'url', which will trigger a re-render
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