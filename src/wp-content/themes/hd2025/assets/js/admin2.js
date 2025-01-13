jQuery(function($) {
  $(document).ajaxStart(() => {
    Pace.restart();
  });
  const create_user = $("#createuser");
  create_user.find("#send_user_notification").removeAttr("checked").attr("disabled", true);
});
//# sourceMappingURL=admin2.js.map
