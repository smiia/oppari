import { useBlockProps, RichText, MediaPlaceholder, BlockControls, MediaReplaceFlow, InspectorControls, store as blockEditorStore,} from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { isBlobURL, revokeBlobURL } from '@wordpress/blob';
import { useEffect, useState, useRef } from '@wordpress/element';
import { usePrevious } from '@wordpress/compose';
import { useSelect } from '@wordpress/data';
import { Spinner, withNotices, ToolbarButton, PanelBody, TextareaControl, SelectControl } from '@wordpress/components';

 function Edit({attributes, setAttributes, noticeOperations, noticeUI }) {
    const {titlec, textc, url, alt, id, textb } = attributes;
    const [blobURL, setBlobURL] = useState();
    const titleRef = useRef();
    const prevURL = usePrevious(url);
    const imageObject = useSelect(
		( select ) => {
			const { getMedia } = select( "core" );
			return id ? getMedia( id ) : null;
		},
		[ id ]
	);

    const imageSizes = useSelect( ( select ) => {
		return select( blockEditorStore ).getSettings().imageSizes;
	}, [] );

    const getImageSizeOptions = () => {
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

    const onChangeImageSize = ( newURL ) => {
		setAttributes( { url: newURL } );
	};
 

    const onChangeTitlec = (newTitlec) => {
        setAttributes({titlec: newTitlec});
    };
    const onChangeTextc = (newTextc) => {
        setAttributes({textc: newTextc});
    };

    const onChangeTextb = (newTextb) => {
        setAttributes({textb: newTextb});
    };

    const onSelectImage = ( image ) => {
		if ( ! image || ! image.url ) {
			setAttributes( { url: undefined, id: undefined, alt: '' } );
			return;
		}
		setAttributes( { url: image.url, id: image.id, alt: image.alt } );
	};

    const onSelectURL = (newURL) => { setAttributes({
        url: newURL,
        id: undefined,
        alt: '',
    });
};
    const onUploadError = (message) => {
        noticeOperations.removeAllNotices();
        noticeOperations.createErrorNotice(message);
    };

    const onChangeAlt = (newAlt) => {
        setAttributes({alt: newAlt});
    };

    const removeImage = () => {
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
        if(url && !prevURL) {
        titleRef.current.focus();}
    }, [url, prevURL] );

    return (
        <>

        <InspectorControls>
        <PanelBody 
            title={__('Image Settings' ,'korttimoduuli')}>
                { id && (
						<SelectControl
							label={ __( 'Image Size', 'korttimoduuli' ) }
							options={ getImageSizeOptions() }
							value={ url }
							onChange={ onChangeImageSize }
						/>
					) }
                {url && !isBlobURL(url) && (
            <TextareaControl 
                label={__('Alt Text' ,'korttimoduuli')}
                value={alt}
                onChange={onChangeAlt}
                help={__("Alternative text describes your image for people who cannot see it. Add a short description with its key details.", 'korttimoduuli')} />
                 ) } 
            </PanelBody>
        </InspectorControls>
        {url && (
       <BlockControls group="inline">
				<MediaReplaceFlow
					name={ __( 'Change Picture', 'korttimoduuli' ) }
					onSelect={ onSelectImage }
					onSelectURL={ onSelectURL }
					onError={ onUploadError }
					accept="image/*"
					allowedTypes={ [ 'image' ] }
					mediaId={ id }
					mediaURL={ url }
				/>
                <ToolbarButton onClick={ removeImage}>{__('Remove Image', 'korttimoduuli')}</ToolbarButton>
			</BlockControls>
        )}
    <div { ...useBlockProps() }>
        { url && (
				<div className={ `wp-block-moduulit-korttimoduuli-kuva${ isBlobURL( url ) ? ' is-loading' : ''}` }>
					<img src={ url } alt={ alt } />
					{ isBlobURL( url ) && <Spinner /> }
				</div>
			) }
        <MediaPlaceholder 
            icon="format-image" 
            onSelect={ onSelectImage }
            onSelectURL={ onSelectURL }
            onError={ onUploadError }
            accept="image/*"
            allowedTypes={['image']}
            disableMediaButtons={url}
            notices={noticeUI}
        />
        <div className="cardwrap">
        <div className="textwrap">
        <RichText 
            ref={titleRef}
            placeholder={ __( 'Kortin otsikko', 'korttimoduuli') }
            tagName="h5" 
            onChange={onChangeTitlec} 
            value={ titlec } />
        <RichText 
            placeholder={ __( 'Kortin sisältöteksti', 'korttimoduuli') }
            tagName="p" 
            onChange={onChangeTextc} 
            value={ textc } />
                </div>
                <RichText
                    className="cardb"
                    tagName="div"
					aria-label={ __( 'Napin teksti' ) }
					placeholder={ __( 'Napin teksti', 'korttimoduuli') }
					value={ textb }
					onChange={ onChangeTextb }
				/></div></div>
        </>
    );
}

export default withNotices( Edit );