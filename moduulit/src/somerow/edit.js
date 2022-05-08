import { __ } from '@wordpress/i18n';
import { Icon, Tooltip , TextControl, Button} from '@wordpress/components';
import { useBlockProps, RichText } from '@wordpress/block-editor';
import { useEffect, useState, useRef } from '@wordpress/element';
import { usePrevious } from '@wordpress/compose';
import { DndContext, useSensor, useSensors, PointerSensor } from '@dnd-kit/core';
import { SortableContext, horizontalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import { restrictToHorizontalAxis } from '@dnd-kit/modifiers';
import SortableItem from './sortable-item';


export default function Edit({
    attributes, setAttributes, isSelected, }) 
    {
    const { sometext, url, socialLinks } = attributes;
    const [ selectedLink, setSelectedLink ] = useState();
    const titleRef = useRef();
    const onChangeSomeText = (newSomeText) => {
        setAttributes({sometext: newSomeText});
    };
    
    const sensors = useSensors(
		useSensor( PointerSensor, {
			activationConstraint: { distance: 5 },
		} )
	);
    const prevURL = usePrevious( url );
	const prevIsSelected = usePrevious( isSelected );

    const addNewSomeItem = () => {
		setAttributes( {
			socialLinks: [ ...socialLinks, { icon: 'wordpress', link: '' } ],
		} );
		setSelectedLink( socialLinks.length );
	};

    const updateSocialItem = ( type, value ) => {
		const socialLinksCopy = [ ...socialLinks ];
		socialLinksCopy[ selectedLink ][ type ] = value;
		setAttributes( { socialLinks: socialLinksCopy } );
	};

const removeSocialItem = () => {
		setAttributes( {
			socialLinks: [
				...socialLinks.slice( 0, selectedLink ),
				...socialLinks.slice( selectedLink + 1 ),
			],
		} );
		setSelectedLink();
	};

    const handleDragEnd = ( event ) => {
		const { active, over } = event;
		if ( active && over && active.id !== over.id ) {
			const oldIndex = socialLinks.findIndex(
				( i ) => active.id === `${ i.icon }-${ i.link }`
			);
			const newIndex = socialLinks.findIndex(
				( i ) => over.id === `${ i.icon }-${ i.link }`
			);
			setAttributes( {
				socialLinks: arrayMove( socialLinks, oldIndex, newIndex ),
			} );
			setSelectedLink( newIndex );
		}
	};

    useEffect( () => {
		if ( url && ! prevURL ) {
			titleRef.current.focus();
		}
	}, [ url, prevURL ] );

	useEffect( () => {
		if ( prevIsSelected && ! isSelected ) {
			setSelectedLink();
		}
	}, [ isSelected, prevIsSelected ] );


    return (
        <div { ...useBlockProps() }>
            <RichText 
            placeholder={ __( 'Social Media', 'somerow') }
            tagName="h4" 
            onChange={onChangeSomeText} 
            value={ sometext } 
            allowedFormats={[]}/>
            <div className="wp-block-moduuli-somerow">
                <ul>
                <DndContext
							sensors={ sensors }
							onDragEnd={ handleDragEnd }
                            modifiers={ [ restrictToHorizontalAxis ] }
						>
							<SortableContext
								items={ socialLinks.map(
									( item ) => `${ item.icon }-${ item.link }`
								) }
								strategy={ horizontalListSortingStrategy }
							>
								{ socialLinks.map( ( item, index ) => {
									return (
										<SortableItem
											key={ `${ item.icon }-${ item.link }` }
											id={ `${ item.icon }-${ item.link }` }
											index={ index }
											selectedLink={ selectedLink }
											setSelectedLink={ setSelectedLink }
											icon={ item.icon }
										/>
									);
								} ) }
							</SortableContext>
						</DndContext>

                { isSelected && (
                <li className="wp-block-moduuli-somerow-add-more">
                   <Tooltip text={__("Add more links", 'somerow')}>
                       <button aria-label={__("Add more links", 'somerow')} onClick={addNewSomeItem}>
                           <Icon icon="plus" />
                           </button>
                           </Tooltip>
                </li>
                )}
            </ul>
        </div>

            {selectedLink !== undefined && (
            <div className="wp-block-moduuli-somerow-link-form">
                <TextControl label={__('Icon', 'text-somerow')} value={socialLinks[selectedLink].icon } onChange={(icon) => { 
                    updateSocialItem( 'icon', icon);
                } }
                />
                <TextControl label={__('URL', 'text-somerow')} value={socialLinks[selectedLink].link} onChange={(link) => { 
                    updateSocialItem( 'link', link );
                }} />
                <br />
                <Button isDestructive onClick={removeSocialItem}>
                    { __('Remove Link', 'text-somerow')}
                </Button>
                
                </div>
            )}
            </div>
    );
}
