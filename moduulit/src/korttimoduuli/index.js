import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import Edit from './edit';
import Save from './save';


registerBlockType('moduulit/korttimoduuli', {
	title: __('Korttimoduuli', 'moduulit'),
    description: __('Korttimoduulin osa', 'moduulit'),
    icon: 'id-alt',
    parent: ['moduulit/moduuli'],
    supports: {
        reusable: false,
        html: false,
    },
    attributes: {
        titlec: {
            type: 'string',
            source: 'html',
            selector: 'h5',
        },
        textc: {
            type: 'string',
            source: 'html',
            selector: 'p',
        },
        textb: {
            type: 'string',
            source: 'html',
            selector: 'p',
        },
        textbu: {
            type: 'string',
            source: 'html',
            selector: 'p',
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

