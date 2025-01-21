ActiveRecord::Schema[8.0].define(version: 2025_01_02_075029) do
  enable_extension "pg_catalog.adminpack"
  enable_extension "pg_catalog.plpgsql"
  enable_extension "uuid-ossp"

  create_table "users", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "name", null: false
    t.string "email", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end
end
