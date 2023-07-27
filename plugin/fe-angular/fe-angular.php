<?php
/**
 * Plugin Name:         Plugin for FE
 * Description:         Hello world
 * Version:             1.0.0
 * Author:              AZ
 */

function load_ng_scripts() {
    wp_enqueue_style( 'ng_styles', plugin_dir_url( __FILE__ ) . 'dist/fc-fe/styles.a36e4d787a2b3ab7.css' );
    wp_register_script( 'ng_main', plugin_dir_url( __FILE__ ) . 'dist/fc-fe/main.965c5f79033d0fdc.js', [], false, true );
    wp_register_script( 'ng_polyfills', plugin_dir_url( __FILE__ ) . 'dist/fc-fe/polyfills.12e4f5b9b273a830.js', [], false, true );
    wp_register_script( 'ng_runtime', plugin_dir_url( __FILE__ ) . 'dist/fc-fe/runtime.86228d1633fa3768.js', [], false, true );
    wp_register_script( 'ng_additional', plugin_dir_url( __FILE__ ) . 'dist/fc-fe/278.20d22de67b0b4891.js', [], false, true );
}

add_action( 'wp_enqueue_scripts', 'load_ng_scripts' );

function attach_ng() {
    wp_enqueue_script( 'ng_main' );
    wp_enqueue_script( 'ng_polyfills' );
    wp_enqueue_script( 'ng_runtime' );
    wp_enqueue_script( 'ng_additional' );

    return "<app-root></app-root>";
}

add_shortcode( 'ng_wp', 'attach_ng' );

// Add the shortcode [ng_wp] to any page or post.
// The shorcode can be whatever. [ng_wp] is just an example.
?>
