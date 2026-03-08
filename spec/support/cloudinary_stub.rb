# frozen_string_literal: true

# Shared context that redirects any XHR destined for api.cloudinary.com to the
# local /cloudinary_upload_stub endpoint.  Include this in system specs that
# exercise a successful photo upload so they work without a live Cloudinary
# account or network access.
RSpec.shared_context "with cloudinary stub" do
  before do
    page.execute_script(<<~JS)
      (function () {
        if (window.__cloudinaryStubInstalled) return;
        window.__cloudinaryStubInstalled = true;

        var origOpen = XMLHttpRequest.prototype.open;
        XMLHttpRequest.prototype.open = function (method, url) {
          if (url && url.indexOf('api.cloudinary.com') !== -1) {
            url = '/cloudinary_upload_stub';
          }
          return origOpen.apply(this, arguments);
        };
      })();
    JS
  end
end
