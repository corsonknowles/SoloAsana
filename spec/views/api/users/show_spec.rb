require 'rails_helper'

RSpec.describe User, type: :view do
  let(:user) { create(:user, role: "Victor", department: "CS", about: "Short bio", photo: photo) }
  let(:photo) { File.new "#{Rails.root}/app/assets/images/favicon.png" } # re-use Favicon because it is a small file

  it "renders user json" do
    render partial: "api/users/user.json.jbuilder", locals: { user: user }

    user_hash = JSON.parse(rendered)

    expect(user_hash['id']).to eq(user.id)
    expect(user_hash['role']).to eq(user.role)
    expect(user_hash['username']).to eq(user.username)
    expect(user_hash['department']).to eq(user.department)
    expect(user_hash['about']).to eq(user.about)
    expect(user_hash['photo']).to eq(user.photo)
  end
end
