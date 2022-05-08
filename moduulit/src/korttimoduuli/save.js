import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function Save({attributes}) {
    const { titlec, textb, textc, url, alt, id } = attributes;
    return (
        <div { ...useBlockProps.save() }>
            {url && (
                <img src={url} alt={alt} className={ id ? `wp-image-${id}` : null }
             />)}
             <div className="cardwrap">
             <div className="textwrap">
            {titlec && <RichText.Content tagName="h5" value={titlec} />}
            {textc && <RichText.Content tagName="p" value={textc} />}</div>
            {textb && <RichText.Content tagName="div" className="cardb" value={textb} />}
        </div></div>
    );
}
