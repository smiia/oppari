import { registerBlockType } from '@wordpress/blocks';
import './korttimoduuli';
import './somerow';
import './kontenttimoduuli';
import './style.scss';
import Edit from './edit';
import save from './save';

registerBlockType('moduulit/moduuli', {
	edit: Edit,
	save,
});
