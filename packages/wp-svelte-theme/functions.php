<?php


/**
 * if user is not logged in or is fetch request, redirect to login page
 */
add_action('template_redirect', function() {
  if (!is_user_logged_in() && is_rest()) {
    wp_redirect(wp_login_url(get_permalink()));
    exit;
  }
});



class Headless_GravityForms
{
  public $rest_base = 'gf/forms';

  public function __construct($namespace)
  {
    /**
     * @api {get} /svelte-gravityforms/v1/gf/forms/1
     * @apiName GetForm
     * @apiGroup GravityForms
     * @apiDescription Retreive a single form
     * @apiParam {Number} form_id ID of the form
     *
     * @apiSuccess {Object[]} GF_Form Object (excluding notifications)
     */
    register_rest_route($namespace, $this->rest_base . '/(?P<form_id>[\d]+)', [
      [
        'methods' => WP_REST_Server::READABLE,
        'callback' => [$this, 'get_form'],
        'args' => [
          'context' => [
            'default' => 'view',
          ],
        ],
      ],
    ]);
  }

  /**
   * Retreive a single form and all fields and options (exluding notifications)
   * @param WP_REST_Request $request
   * @return WP_Error|WP_REST_Response
   */
  public function get_form(WP_REST_Request $request)
  {
    $form_id = $request['form_id'];
    $form = GFAPI::get_form($form_id);

    if ($form) {
      // Strip data we do not want to share
      unset($form['notifications']);

      return new WP_REST_Response($form, 200);
    } else {
      return new WP_Error('not_found', 'Form not found', ['status' => 404]);
    }
  }

}

/**
 * Register custom API routes
 */
add_action('rest_api_init', function () {
  $api_namespace = 'svelte-gravityforms/v1';
  new Headless_GravityForms($api_namespace);
});