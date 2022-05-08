import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import Edit from './edit';
import Save from './save';


registerBlockType('moduulit/kontenttimoduuli', {
	title: __('Kontenttimoduuli', 'moduulit'),
    description: __('Kontenttimoduulin osa', 'moduulit'),
    icon: 'id-alt',
    parent: ['moduulit/moduuli'],
    supports: {
        html: false,
        align: true,
    },
    attributes: {
        contenttext: {
            type: 'string',
            source: 'html',
            selector: 'p',
        },
        contenttitle: {
            type: 'string',
            source: 'html',
            selector: 'h2',
        },
        id: {
            type: 'number',
        },
        alt: {
            type: 'string',
            source: 'attribute',
            selector: 'img',
            attribute: 'alt',
            default: '',
        },
        url: {
            type: 'string',
            source: 'attribute',
            selector: 'img',
            attribute: 'src',
        },
    },
    edit: Edit,
	save: Save,
});

