<?php
/**
 * Plugin Name:         Plugin for FE
 * Description:         Hello world
 * Version:             1.0.0
 * Author:              AZ
 */

function load_ng_scripts() {
    wp_enqueue_style( 'ng_styles', plugin_dir_url( __FILE__ ) . 'dist/fc-fe/styles.a36e4d787a2b3ab7.css' );
    wp_register_script( 'ng_main', plugin_dir_url( __FILE__ ) . 'dist/fc-fe/main.a0648473337aeb5b.js', [], false, true );
    wp_register_script( 'ng_polyfills', plugin_dir_url( __FILE__ ) . 'dist/fc-fe/polyfills.12e4f5b9b273a830.js', [], false, true );
    wp_register_script( 'ng_runtime', plugin_dir_url( __FILE__ ) . 'dist/fc-fe/runtime.b00716f348ad6b5b.js', [], false, true );
    wp_register_script( 'ng_additional', plugin_dir_url( __FILE__ ) . 'dist/fc-fe/504.c7e61e68fac32ec2.js', [], false, true );
}

add_action( 'wp_enqueue_scripts', 'load_ng_scripts' );

function attach_ng() {
	 $user = get_current_user_id();
     $data_array = array(
            'is_logged_in' => is_user_logged_in(),
            'user_id' => $user,
            'user_roles' => json_encode( ( array ) $user->roles)
        );
      wp_localize_script( 'ng_main', 'user_data', $data_array );

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
