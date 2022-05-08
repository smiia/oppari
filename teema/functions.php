<?php
/**
 * oppari functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package oppari
 */

if ( ! defined( '_S_VERSION' ) ) {
	define( '_S_VERSION', '1.0.0' );
}

if ( ! function_exists( 'oppari_setup' ) ) :
	function oppari_setup() {
		load_theme_textdomain( 'oppari', get_template_directory() . '/languages' );

		add_theme_support( 'automatic-feed-links' );
		add_theme_support( 'title-tag' );
		add_theme_support( 'responsive-embeds' );
		add_theme_support( 'align-wide' );
		add_theme_support( 'editor-styles' );
		add_editor_style( 'style-editor.css' );
		add_theme_support( 'post-thumbnails' );

		register_nav_menus(
			array(
				'menu-1' => esc_html__( 'Primary', 'oppari' ),
			)
		);

		add_theme_support(
			'html5',
			array(
				'search-form',
				'comment-form',
				'comment-list',
				'gallery',
				'caption',
				'style',
				'script',
			)
		);

		function oppari_load_dashicons() {
			wp_enqueue_style( 'dashicons' );
		}

		add_action( 'wp_enqueue_scripts', 'oppari_load_dashicons' );
		add_theme_support ( 'custom-spacing' );
		add_theme_support ( 'custom-units', 'px', 'rem', 'em' );
		add_theme_support( 'editor-color-palette', array(
			array(
				'name' => esc_attr__( 'Martinique',
				'themelangDomain' ),
				'slug' => 'martinique',
				"color" =>  '#383053',
				),
				array(
					'name' => esc_attr__( 'Martinique',
					'themelangDomain' ),
					'slug' => 'gablegreen',
					"color" =>  '#10292B',
					),
					array(
						'name' => esc_attr__( 'Eastern Blue',
						'themelangDomain' ),
						'slug' => 'easternblue',
						"color" =>  '#28ACAD',
						),
						array(
							'name' => esc_attr__( 'Old Rose',
							'themelangDomain' ),
							'slug' => 'oldrose',
							"color" =>  '#B87F72',
							),
							array(
								'name' => esc_attr__( 'Young Rose',
								'themelangDomain' ),
								'slug' => 'youngrose',
								"color" =>  '#13434a',
								),
							array(
								'name' => esc_attr__( 'Paradiso',
								'themelangDomain' ),
								'slug' => 'paradiso',
								"color" =>  '#328787',
								),
				array(
					'name' => esc_attr__( 'Eggplant',
					'themelangDomain' ),
					'slug' => 'eggplant',
					"color" =>  '#6c446c',
					),
					array(
						'name' => esc_attr__( 'Hopbush',
						'themelangDomain' ),
						'slug' => 'hopbush',
						"color" =>  '#c66299',
						),
						array(
							'name' => esc_attr__( 'Melanie',
							'themelangDomain' ),
							'slug' => 'melanie',
							"color" =>  '#e1b1c7',
							),
			)
		);

		add_theme_support(
			'editor-gradient-presets',
			array(
				array(
					'name' => esc_attr__( 'Martinique to Eggplant',
					'themeLangDomain' ),
					'gradient' => 'linear-gradient(135deg,#383053 0%, #6c445c 100%)',
					'slug' => 'martinique-to-eggplant'
				)
			)
				);

		add_theme_support( 'customize-selective-refresh-widgets' );
		add_theme_support(
			'custom-logo',
			array(
				'height'      => 250,
				'width'       => 250,
				'flex-width'  => true,
				'flex-height' => true,
			)
		);
	}
endif;
add_action( 'after_setup_theme', 'oppari_setup' );

function oppari_content_width() {
	$GLOBALS['content_width'] = apply_filters( 'oppari_content_width', 670 );
}
add_action( 'after_setup_theme', 'oppari_content_width', 0 );

function oppari_widgets_init() {
	register_sidebar(
		array(
			'name'          => esc_html__( 'Sidebar', 'oppari' ),
			'id'            => 'sidebar-1',
			'description'   => esc_html__( 'Add widgets here.', 'oppari' ),
			'before_widget' => '<section id="%1$s" class="widget %2$s">',
			'after_widget'  => '</section>',
			'before_title'  => '<h2 class="widget-title">',
			'after_title'   => '</h2>',
		)
	);

	register_sidebar(
		array(
			'name'          => esc_html__( 'Footer column one', 'oppari' ),
			'id'            => 'footer_col_1',
			'description'   => esc_html__( 'Add widgets here.', 'oppari' ),
			'before_widget' => '<section id="footercol" class="footer-col-1">',
			'after_widget'  => '</section>',
			'before_title'  => '<h4 class="footer-title">',
			'after_title'   => '</h4>',
		)
	);

	register_sidebar(
		array(
			'name'          => esc_html__( 'Footer column two', 'oppari' ),
			'id'            => 'footer_col_2',
			'description'   => esc_html__( 'Add widgets here.', 'oppari' ),
			'before_widget' => '<section id="footercol" class="footer-col-2">',
			'after_widget'  => '</section>',
			'before_title'  => '<h4 class="footer-title">',
			'after_title'   => '</h4>',
		)
	);

	register_sidebar(
		array(
			'name'          => esc_html__( 'Footer column three', 'oppari' ),
			'id'            => 'footer_col_3',
			'description'   => esc_html__( 'Add widgets here.', 'oppari' ),
			'before_widget' => '<section id="footercol" class="footer-col-3">',
			'after_widget'  => '</section>',
			'before_title'  => '<h4 class="footer-title">',
			'after_title'   => '</h4>',
		)
	);



}
add_action( 'widgets_init', 'oppari_widgets_init' );

function oppari_scripts() {
	wp_enqueue_style( 'oppari-style', get_stylesheet_uri(), array(), _S_VERSION );
	wp_style_add_data( 'oppari-style', 'rtl', 'replace' );
    wp_enqueue_script( 'custom', get_template_directory_uri() . '/js/custom.js', array(), _S_VERSION, true );
	wp_enqueue_script( 'oppari-navigation', get_template_directory_uri() . '/js/navigation.js', array(), _S_VERSION, true );

	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}
}
add_action( 'wp_enqueue_scripts', 'oppari_scripts' );

require get_template_directory() . '/inc/custom-header.php';

require get_template_directory() . '/inc/template-tags.php';

require get_template_directory() . '/inc/template-functions.php';

require get_template_directory() . '/inc/customizer.php';

if ( defined( 'JETPACK__VERSION' ) ) {
	require get_template_directory() . '/inc/jetpack.php';
}

register_default_headers( array(
    'default-image' => array(
        'url'           => get_stylesheet_directory_uri() . '/assets/img/default-header.jpg',
        'thumbnail_url' => get_stylesheet_directory_uri() . '/assets/img/default-header.jpg',
        'description'   => __( 'Default Header Image', 'textdomain' )
    ),
) );

require_once(get_stylesheet_directory() . '/inc/scssphp/scss.inc.php');
if (is_customize_preview()) {
	add_action('wp_head', function() {
		$compiler = new ScssPhp\ScssPhp\Compiler();

		$source_scss = get_stylesheet_directory() . '/assets/scss/style.scss';
		$scssContents = file_get_contents($source_scss);
		$import_path = get_stylesheet_directory() . '/assets/scss';
		$compiler->addImportPath($import_path);

		$variables = [
			'$main' => get_theme_mod('main', '#328787'),
			'$header' => get_theme_mod('header', '#10292b'),
			'$bg' => get_theme_mod('bg', '#1a3334'),
			'$headers' => get_theme_mod('headers', '#fff'),
			'$cards' => get_theme_mod('cards', '#328787'),
			'$content' => get_theme_mod('content', '#13434a'),
			'$footer-c' => get_theme_mod('footer-c', '#383053'),
			'$footer-t' => get_theme_mod('footer-t', '#fff'),
			'$secondary' => get_theme_mod('secondary', '#28acad'),
			'$color-tertiary' => get_theme_mod('color-tertiary', '#b1e1df'),
			'$color-fourth' => get_theme_mod('color-fourth', '#1a3334'),
			'$color-ctext' => get_theme_mod('color-ctext', '#fff'),
			'$link-b' => get_theme_mod('link-b', '#24c0c0'),
			'$theme-text-size' => get_theme_mod('theme-text-size', '16') . 'px',
			'$theme-border-radius' => get_theme_mod('theme-border-radius', '10') . 'px',
		];
		$compiler->setVariables($variables);

		$css = $compiler->compile($scssContents);
		if (!empty($css) && is_string($css)) {
			echo '<style type="text/css">' . $css . '</style>';
		}
	});
}

add_action('customize_register', function($wp_customize) {
	$wp_customize->add_section('theme-fonts', [
		'title' => __('Tekstien ja painikkeiden värit', 'txtdomain'),
		'priority' => 30
	]);


	$wp_customize->add_setting('headers', ['default' => '#fff']);
	$wp_customize->add_control(new WP_Customize_Color_Control($wp_customize, 'headers', [
		'section' => 'theme-fonts',
		'label' => __('Yläotsakkeen tekstin väri', 'txtdomain'),
		'priority' => 2
	]));


	$wp_customize->add_setting('footer-t', ['default' => '#fff']);
	$wp_customize->add_control(new WP_Customize_Color_Control($wp_customize, 'footer-t', [
		'section' => 'theme-fonts',
		'label' => __('Alaotsakkeen tekstin väri', 'txtdomain'),
		'priority' => 54
	]));

	$wp_customize->add_setting('color-fourth', ['default' => '#1a3334']);
	$wp_customize->add_control(new WP_Customize_Color_Control($wp_customize, 'color-fourth', [
		'section' => 'theme-fonts',
		'label' => __('Napit', 'txtdomain'),
		'priority' => 40
	]));

	$wp_customize->add_setting('color-ctext', ['default' => '#fff']);
	$wp_customize->add_control(new WP_Customize_Color_Control($wp_customize, 'color-ctext', [
		'section' => 'theme-fonts',
		'label' => __('Sisältötekstin väri', 'txtdomain'),
		'priority' => 38
	]));

	$wp_customize->add_setting('link-b', ['default' => '#24c0c0']);
	$wp_customize->add_control(new WP_Customize_Color_Control($wp_customize, 'link-b', [
		'section' => 'theme-fonts',
		'label' => __('Linkkien väri', 'txtdomain'),
		'priority' => 50
	]));

	$wp_customize->add_setting('theme-text-size', ['default' => '16']);
	$wp_customize->add_control('theme-text-size', [
		'section' => 'theme-fonts',
		'label' => __('Fontin koko', 'txtdomain'),
		'type' => 'number',
		'priority' => 60,
		'input_attrs' => ['min' => 8, 'max' => 20, 'step' => 1]
	]);

	$wp_customize->add_setting('theme-border-radius', ['default' => '0']);
	$wp_customize->add_control('theme-border-radius', [
		'section' => 'theme-fonts',
		'label' => __('Reunojen pyöreys', 'txtdomain'),
		'type' => 'number',
		'priority' => 60,
		'input_attrs' => ['min' => 0, 'max' => 30, 'step' => 1]
	]);
});

add_action('customize_register', function($wp_customize) {
	$wp_customize->add_section('theme-variables', [
		'title' => __('Lohkojen ja otsakkeiden värit', 'txtdomain'),
		'priority' => 20
	]);
	$wp_customize->add_setting('cards', ['default' => '#328787']);
$wp_customize->add_control(new WP_Customize_Color_Control($wp_customize, 'cards', [
	'section' => 'theme-variables',
	'label' => __('Korttien taustan väri', 'txtdomain'),
	'priority' => 3
]));

$wp_customize->add_setting('content', ['default' => '#13434a']);
$wp_customize->add_control(new WP_Customize_Color_Control($wp_customize, 'content', [
	'section' => 'theme-variables',
	'label' => __('Sisältömoduulin taustan väri', 'txtdomain'),
	'priority' => 4
]));

$wp_customize->add_setting('header', ['default' => '#10292B']);
$wp_customize->add_control(new WP_Customize_Color_Control($wp_customize, 'header', [
	'section' => 'theme-variables',
	'label' => __('Teeman yläotsakkeen väri', 'txtdomain'),
	'priority' => 8
]));

$wp_customize->add_setting('main', ['default' => '#328787']);
$wp_customize->add_control(new WP_Customize_Color_Control($wp_customize, 'main', [
	'section' => 'theme-variables',
	'label' => __('Teeman pääväri', 'txtdomain'),
	'priority' => 10
]));

$wp_customize->add_setting('bg', ['default' => '#1a3334']);
$wp_customize->add_control(new WP_Customize_Color_Control($wp_customize, 'bg', [
	'section' => 'theme-variables',
	'label' => __('Taustan väri', 'txtdomain'),
	'priority' => 1
]));


$wp_customize->add_setting('secondary', ['default' => '#28ACAD']);
$wp_customize->add_control(new WP_Customize_Color_Control($wp_customize, 'secondary', [
	'section' => 'theme-variables',
	'label' => __('Teeman toinen pääväri', 'txtdomain'),
	'priority' => 20
]));

$wp_customize->add_setting('color-tertiary', ['default' => '#b1e1df']);
$wp_customize->add_control(new WP_Customize_Color_Control($wp_customize, 'color-tertiary', [
	'section' => 'theme-variables',
	'label' => __('Korostusväri', 'txtdomain'),
	'priority' => 30
]));

$wp_customize->add_setting('footer-c', ['default' => '#10292B']);
$wp_customize->add_control(new WP_Customize_Color_Control($wp_customize, 'footer-c', [
	'section' => 'theme-variables',
	'label' => __('Alaotsakkeen taustan väri', 'txtdomain'),
	'priority' => 55
]));

});

add_action('customize_save_after', function() {
	$compiler = new ScssPhp\ScssPhp\Compiler();

	$source_scss = get_stylesheet_directory() . '/assets/scss/style.scss';
	$scssContents = file_get_contents($source_scss);
	$import_path = get_stylesheet_directory() . '/assets/scss';
	$compiler->addImportPath($import_path);
	$target_css = get_stylesheet_directory() . '/style.css';

	$variables = [
		'$main' => get_theme_mod('main', '#328787'),
		'$header' => get_theme_mod('header', '#10292b'),
		'$bg' => get_theme_mod('bg', '#1a3334'),
		'$headers' => get_theme_mod('headers', '#fff'),
		'$cards' => get_theme_mod('cards', '#328787'),
		'$content' => get_theme_mod('content', '#13434a'),
		'$footer-c' => get_theme_mod('footer-c', '#383053'),
		'$footer-t' => get_theme_mod('footer-t', '#fff'),
		'$secondary' => get_theme_mod('secondary', '#28acad'),
		'$color-tertiary' => get_theme_mod('color-tertiary', '#b1e1df'),
		'$color-fourth' => get_theme_mod('color-fourth', '#1a3334'),
		'$color-ctext' => get_theme_mod('color-ctext', '#fff'),
		'$link-b' => get_theme_mod('link-b', '#24c0c0'),
		'$theme-text-size' => get_theme_mod('theme-text-size', '16') . 'px',
		'$theme-border-radius' => get_theme_mod('theme-border-radius', '10') . 'px',
	];
	$compiler->setVariables($variables);

	$css = $compiler->compile($scssContents);
	if (!empty($css) && is_string($css)) {
		file_put_contents($target_css, $css);
	}
});
