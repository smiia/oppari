import { useBlockProps, RichText, MediaPlaceholder, BlockControls, MediaReplaceFlow, InspectorControls, store as blockEditorStore,} from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { isBlobURL, revokeBlobURL } from '@wordpress/blob';
import { useEffect, useState, useRef } from '@wordpress/element';
import { usePrevious } from '@wordpress/compose';
import { useSelect } from '@wordpress/data';
import { Spinner, withNotices, ToolbarButton, PanelBody, TextareaControl, SelectControl } from '@wordpress/components';



function Edit({
    attributes, setAttributes, noticeOperations, noticeUI }) 
    {
    const { contenttext, contenttitle, url, alt, id } = attributes;
    const titleRef = useRef();
    const [blobURL, setBlobURL] = useState();
    const previousURL = usePrevious(url);
    const imageObject = useSelect(
		( select ) => {
			const { getMedia } = select( "core" );
			return id ? getMedia( id ) : null;
		},
		[ id ]
	);
    const onChangeContenttext = (newContenttext) => {
        setAttributes({contenttext: newContenttext});
    };

    const onChangeContenttitle = (newContenttitle) => {
        setAttributes({contenttitle: newContenttitle});
    };

    const onChangeImgSize = ( newURL ) => {
		setAttributes( { url: newURL } );
	};

    const imageSizes = useSelect( ( select ) => {
		return select( blockEditorStore ).getSettings().imageSizes;
	}, [] );

    const getImgSizeOptions = () => {
		if ( ! imageObject ) return [];
		const options = [];
		const sizes = imageObject.media_details.sizes;
		for ( const key in sizes ) {
			const size = sizes[ key ];
			const imageSize = imageSizes.find( ( s ) => s.slug === key );
			if ( imageSize ) {
				options.push( {
					label: imageSize.name,
					value: size.source_url,
				} );
			}
		}
		return options;
	};

    const onSelectImg = ( image ) => {
		if ( ! image || ! image.url ) {
			setAttributes( { url: undefined, id: undefined, alt: '' } );
			return;
		}
		setAttributes( { url: image.url, id: image.id, alt: image.alt } );
	};

    const onSelURL = (newURL) => { setAttributes({
        url: newURL,
        id: undefined,
        alt: '',
    });
};
    const onUploadErr = (message) => {
        noticeOperations.removeAllNotices();
        noticeOperations.createErrorNotice(message);
    };

    const onChangeAltII = (newAltII) => {
        setAttributes({alt: newAltII});
    };

    const removeImg = () => {
        setAttributes({
            url: undefined,
            alt: '',
            id: undefined,
        })
    };

    useEffect( () => {
		if ( ! id && isBlobURL( url ) ) {
			setAttributes( {
				url: undefined,
				alt: '',
			} );
		}
	}, [] );

	useEffect( () => {
		if ( isBlobURL( url ) ) {
			setBlobURL( url );
		} else {
			revokeBlobURL( blobURL );
			setBlobURL();
		}
	}, [ url ] );

    useEffect(() => {
        if(url && !previousURL) {
        titleRef.current.focus();}
    }, [url, previousURL] );

    return (

<>
       <InspectorControls>
        <PanelBody 
            title={__('Image Settings' ,'kontenttimoduuli')}>
                { id && (
						<SelectControl
							label={ __( 'Image Size', 'kontenttimoduuli' ) }
							options={ getImgSizeOptions() }
							value={ url }
							onChange={ onChangeImgSize }
						/>
					) }
                {url && !isBlobURL(url) && (
            <TextareaControl 
                label={__('Alt Text' ,'kontenttimoduuli')}
                value={alt}
                onChange={onChangeAltII}
                help={__("Alternative text describes your image for people who cannot see it. Add a short description with its key details.", 'kontenttimoduuli')} />
                 ) } 
            </PanelBody>
        </InspectorControls>
        {url && (
       <BlockControls group="inline">
				<MediaReplaceFlow
					name={ __( 'Change Picture', 'kontenttimoduuli' ) }
					onSelect={ onSelectImg }
					onSelURL={ onSelURL }
					onError={ onUploadErr }
					accept="image/*"
					allowedTypes={ [ 'image' ] }
					mediaId={ id }
					mediaURL={ url }
				/>
                <ToolbarButton onClick={ removeImg}>{__('Remove Image', 'kontenttimoduuli')}</ToolbarButton>
			</BlockControls>
        )}
    <div { ...useBlockProps() }>
        { url && (
				<div className={ `wp-block-moduulit-kontenttimoduuli-kuva${ isBlobURL( url ) ? ' is-loading' : ''}` }>
					<img src={ url } alt={ alt } />
					{ isBlobURL( url ) && <Spinner /> }
				</div>
			) }
        <MediaPlaceholder 
            icon="format-image" 
            onSelect={ onSelectImg }
            onSelURL={ onSelURL }
            onError={ onUploadErr }
            accept="image/*"
            allowedTypes={['image']}
            disableMediaButtons={url}
            notices={noticeUI}
        /><div className="kontenttiwrap">
            <RichText
                    ref={titleRef}
                    tagName="h2" 
                    className="content-title"
					placeholder={ __( 'Kirjoita otsikko tähän', 'kontenttimoduuli') }
					value={ contenttitle }
					onChange={ onChangeContenttitle }
				/>
           <RichText
                    className="content-text"
                    tagName="p" 
					placeholder={ __( 'Kirjoita teksti tähän', 'kontenttimoduuli') }
					value={ contenttext }
					onChange={ onChangeContenttext }
				/>
            </div></div></>
            );
}
export default withNotices( Edit );