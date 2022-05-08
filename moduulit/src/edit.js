import { __ } from '@wordpress/i18n';
import { PanelBody, RangeControl } from '@wordpress/components';
import { useBlockProps, InnerBlocks, InspectorControls } from '@wordpress/block-editor';

import './editor.scss';

export default function Edit({attributes, setAttributes}) {
	const {columns} = attributes;

	const onChangecolumns = (newColumns) => {
		setAttributes({columns: newColumns});
	};
	return (
		<div {...useBlockProps({
			className: `has-${columns}-columns`,
			})}>
			<InspectorControls>
				<PanelBody>
					<RangeControl label={__('Columns', 'moduuli') }
					min={ 1 }
					max={ 4 }
					onChange={ onChangecolumns }
					value={columns} />
				</PanelBody>
			</InspectorControls>
			<InnerBlocks 
			allowedBlocks={[ 'moduulit/korttimoduuli', 'moduulit/kontenttimoduuli', 'moduulit/somerow' ]}
			orientation="horizontal" />
		</div>
	);
}
