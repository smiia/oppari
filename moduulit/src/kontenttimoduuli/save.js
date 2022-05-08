import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function Save({attributes}) {
    const { contenttext, contenttitle, url, alt, id } = attributes;
    return (
        <div { ...useBlockProps.save() }>
            {url && (<div className="kuva-kontent">
                <img src={url} alt={alt} className={ id ? `wp-image-${id}` : null } 
             /></div>)}
            <div className="kontenttiwrap">
                {contenttitle && <RichText.Content tagName="h2" value={contenttitle} />}
            {contenttext && <RichText.Content tagName="p" value={contenttext} />}
            </div>
        </div>
    );
}



