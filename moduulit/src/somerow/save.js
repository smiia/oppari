import { useBlockProps, RichText } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { Icon } from '@wordpress/components';
export default function Save({attributes}) {
    const { sometext, socialLinks } = attributes;
    return (
        <div { ...useBlockProps.save() }>
            { socialLinks.length > 0 && (
            <div className="wp-block-moduulit-somerow">
                {sometext && <RichText.Content tagName="h4" value={sometext} />}
               <ul>
						{ socialLinks.map( ( item, index ) => {
							return (
								<li key={ index } data-icon={ item.icon }>
									<a href={ item.link }>
										<Icon icon={ item.icon } />
									</a>
								</li>
							);
						} ) }
					</ul>
				</div>
			) }
		</div>
	);
}