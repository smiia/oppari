import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import Edit from './edit';
import Save from './save';


registerBlockType('moduulit/somerow', {
	title: __('Somerow', 'moduulit'),
    description: __('Somerow', 'moduulit'),
    icon: 'admin-site-alt2',
    parent: ['moduulit/moduuli'],
    supports: {
        reusable: true,
        html: false,
        align: false,
    },
    attributes: {
        sometext: {
            type: 'string',
            source: 'html',
            selector: 'h4',
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
        socialLinks: {
			type: 'array',
			default: [
				{ link: 'https://twitter.com', icon: 'twitter' },
				{ link: 'https://instagram.com', icon: 'instagram' },
			],
			source: 'query',
			selector: '.wp-block-moduuli-somerow ul li',
			query: {
				icon: {
					source: 'attribute',
					attribute: 'data-icon',
				},
				link: {
					source: 'attribute',
					selector: 'a',
					attribute: 'href',
				},
            },
        },
    },
    edit: Edit,
	save: Save,
});

