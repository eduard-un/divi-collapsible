<?php
/**
 * Plugin Name: Divi Collapsible Mobile Menu
 * Plugin URI: https://divi.tech/plugins/divi-collapsible
 * Description: A WordPress plugin that adds a collapsible mobile menu to the Divi theme.
 * Version: 1.1.0
 * Author: Eduard Ungureanu
 * Author URI: https://divi.tech
 * License: GPL2
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: divi-collapsible
 * Domain Path: /languages
 *
 * @package DiviCollapsible
 */

// Exit if accessed directly.
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Main DiviCollapsible Class.
 *
 * @since 1.1.0
 */
class DiviCollapsible {
    /**
     * Plugin version.
     *
     * @var string
     */
    public $version = '1.1.0';

    /**
     * The single instance of the class.
     *
     * @var DiviCollapsible
     */
    protected static $_instance = null;

    /**
     * Admin instance.
     *
     * @var DiviCollapsible_Admin
     */
    public $admin = null;

    /**
     * Main DiviCollapsible Instance.
     *
     * Ensures only one instance of DiviCollapsible is loaded or can be loaded.
     *
     * @return DiviCollapsible - Main instance.
     */
    public static function instance() {
        if (is_null(self::$_instance)) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    /**
     * DiviCollapsible Constructor.
     */
    public function __construct() {
        $this->define_constants();
        $this->includes();
        $this->init_hooks();
    }

    /**
     * Define plugin constants.
     */
    private function define_constants() {
        $this->define('DIVI_COLLAPSIBLE_VERSION', $this->version);
        $this->define('DIVI_COLLAPSIBLE_PLUGIN_DIR', plugin_dir_path(__FILE__));
        $this->define('DIVI_COLLAPSIBLE_PLUGIN_URL', plugin_dir_url(__FILE__));
    }

    /**
     * Define constant if not already set.
     *
     * @param string $name  Constant name.
     * @param mixed  $value Constant value.
     */
    private function define($name, $value) {
        if (!defined($name)) {
            define($name, $value);
        }
    }

    /**
     * Include required files.
     */
    private function includes() {
        // No files to include
    }

    /**
     * Initialize hooks.
     */
    private function init_hooks() {
        // Enqueue scripts and styles.
        add_action('wp_enqueue_scripts', array($this, 'enqueue_scripts'));

        // Initialize the plugin.
        add_action('init', array($this, 'init'));
    }

    /**
     * Initialize the plugin.
     */
    public function init() {
        // Plugin initialization
    }

    /**
     * Enqueue scripts and styles.
     */
    public function enqueue_scripts() {
        // Only enqueue if Divi theme is active.
        if ($this->is_divi_active()) {
            // Enqueue CSS.
            wp_enqueue_style(
                'divi-collapsible-styles',
                DIVI_COLLAPSIBLE_PLUGIN_URL . 'assets/css/divi-collapsible.css',
                array(),
                DIVI_COLLAPSIBLE_VERSION
            );

            // Enqueue JS.
            wp_enqueue_script(
                'divi-collapsible-script',
                DIVI_COLLAPSIBLE_PLUGIN_URL . 'assets/js/divi-collapsible.js',
                array('jquery'),
                DIVI_COLLAPSIBLE_VERSION,
                true
            );
        }
    }



    /**
     * Check if Divi theme is active.
     *
     * @return bool
     */
    private function is_divi_active() {
        $theme = wp_get_theme();
        return ('Divi' === $theme->get('Name') || 'Divi' === $theme->get('Template'));
    }


}

/**
 * Returns the main instance of DiviCollapsible.
 *
 * @return DiviCollapsible
 */
function Divi_Collapsible() {
    return DiviCollapsible::instance();
}

// Global for backwards compatibility.
$GLOBALS['divi_collapsible'] = Divi_Collapsible();

/**
 * Plugin activation function.
 */
function divi_collapsible_activation() {
    // Nothing to do on activation
}

// Register activation hook.
register_activation_hook(__FILE__, 'divi_collapsible_activation');
