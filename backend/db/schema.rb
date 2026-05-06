# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.1].define(version: 2026_05_06_190608) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_catalog.plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.string "name", null: false
    t.bigint "record_id", null: false
    t.string "record_type", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.bigint "byte_size", null: false
    t.string "checksum"
    t.string "content_type"
    t.datetime "created_at", null: false
    t.string "filename", null: false
    t.string "key", null: false
    t.text "metadata"
    t.string "service_name", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "comments", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.bigint "lesson_id"
    t.text "text", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id"
    t.index ["lesson_id"], name: "index_comments_on_lesson_id"
    t.index ["user_id"], name: "index_comments_on_user_id"
  end

  create_table "course_modules", force: :cascade do |t|
    t.bigint "course_id"
    t.datetime "created_at", null: false
    t.string "name", null: false
    t.datetime "updated_at", null: false
    t.index ["course_id"], name: "index_course_modules_on_course_id"
  end

  create_table "courses", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.boolean "is_pro", default: false
    t.string "name", null: false
    t.datetime "updated_at", null: false
  end

  create_table "decisions", force: :cascade do |t|
    t.text "context"
    t.datetime "created_at", null: false
    t.text "decision"
    t.string "title"
    t.text "tradeoffs"
    t.datetime "updated_at", null: false
  end

  create_table "documents", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.bigint "lesson_id"
    t.string "name", null: false
    t.datetime "updated_at", null: false
    t.index ["lesson_id"], name: "index_documents_on_lesson_id"
  end

  create_table "feature_request_votes", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.bigint "feature_request_id", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id", null: false
    t.integer "value"
    t.index ["feature_request_id", "user_id"], name: "index_feature_request_votes_on_feature_request_id_and_user_id", unique: true
    t.index ["feature_request_id"], name: "index_feature_request_votes_on_feature_request_id"
    t.index ["user_id"], name: "index_feature_request_votes_on_user_id"
  end

  create_table "feature_requests", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.text "description"
    t.string "title"
    t.datetime "updated_at", null: false
    t.bigint "user_id", null: false
    t.integer "votes_count"
    t.index ["user_id"], name: "index_feature_requests_on_user_id"
  end

  create_table "friendly_id_slugs", force: :cascade do |t|
    t.datetime "created_at"
    t.string "scope"
    t.string "slug", null: false
    t.integer "sluggable_id", null: false
    t.string "sluggable_type", limit: 50
    t.index ["slug", "sluggable_type", "scope"], name: "index_friendly_id_slugs_on_slug_and_sluggable_type_and_scope", unique: true
    t.index ["slug", "sluggable_type"], name: "index_friendly_id_slugs_on_slug_and_sluggable_type"
    t.index ["sluggable_type", "sluggable_id"], name: "index_friendly_id_slugs_on_sluggable_type_and_sluggable_id"
  end

  create_table "leads", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.string "email"
    t.text "message"
    t.string "name"
    t.string "phone"
    t.string "status", default: "new"
    t.datetime "updated_at", null: false
    t.bigint "user_id", null: false
    t.integer "website_id"
    t.index ["user_id"], name: "index_leads_on_user_id"
  end

  create_table "lessons", force: :cascade do |t|
    t.boolean "active", default: true
    t.bigint "course_module_id"
    t.datetime "created_at", null: false
    t.string "name", null: false
    t.bigint "order"
    t.text "transcription"
    t.datetime "updated_at", null: false
    t.string "youtubeUrl"
    t.index ["course_module_id"], name: "index_lessons_on_course_module_id"
  end

  create_table "messages", force: :cascade do |t|
    t.text "body"
    t.datetime "created_at", null: false
    t.string "email"
    t.string "message_type"
    t.string "name"
    t.string "subject"
    t.datetime "updated_at", null: false
    t.bigint "user_id", null: false
    t.index ["user_id"], name: "index_messages_on_user_id"
  end

  create_table "orders", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "people", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.string "customer_id"
    t.string "email"
    t.string "first_name"
    t.string "last_name"
    t.datetime "updated_at", null: false
  end

  create_table "roles", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.string "name"
    t.datetime "updated_at", null: false
  end

  create_table "tasks", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.text "description"
    t.integer "estimate_hours"
    t.string "risk_level"
    t.string "status"
    t.string "title"
    t.datetime "updated_at", null: false
  end

  create_table "ui_components", force: :cascade do |t|
    t.string "category"
    t.datetime "created_at", null: false
    t.text "html_content"
    t.string "name"
    t.datetime "updated_at", null: false
  end

  create_table "user_roles", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.bigint "role_id", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id", null: false
    t.index ["role_id"], name: "index_user_roles_on_role_id"
    t.index ["user_id"], name: "index_user_roles_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.string "customer_id"
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.boolean "is_pro", default: false
    t.datetime "remember_created_at"
    t.datetime "reset_password_sent_at"
    t.string "reset_password_token"
    t.datetime "updated_at", null: false
    t.string "user_name"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  create_table "website_images", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.integer "position"
    t.datetime "updated_at", null: false
    t.bigint "website_id", null: false
    t.index ["website_id"], name: "index_website_images_on_website_id"
  end

  create_table "website_template_field_values", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "value"
    t.bigint "website_id", null: false
    t.bigint "website_template_field_id", null: false
    t.index ["website_id"], name: "index_website_template_field_values_on_website_id"
    t.index ["website_template_field_id"], name: "idx_on_website_template_field_id_2cb70fd3f2"
  end

  create_table "website_template_fields", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.string "field_type"
    t.string "label"
    t.string "name"
    t.boolean "required"
    t.datetime "updated_at", null: false
    t.bigint "website_template_id", null: false
    t.index ["website_template_id"], name: "index_website_template_fields_on_website_template_id"
  end

  create_table "website_templates", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.text "description"
    t.string "example_url"
    t.text "html_content"
    t.string "name"
    t.string "templateName"
    t.datetime "updated_at", null: false
  end

  create_table "websites", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.string "custom_domain"
    t.string "dark_bg"
    t.string "dark_text"
    t.string "font_choice"
    t.text "html_content"
    t.string "light_bg"
    t.string "light_text"
    t.string "name"
    t.string "secondary_font_choice"
    t.string "slug"
    t.string "subdomain"
    t.datetime "updated_at", null: false
    t.bigint "user_id", null: false
    t.bigint "website_template_id"
    t.index ["custom_domain"], name: "index_websites_on_custom_domain", unique: true, where: "(custom_domain IS NOT NULL)"
    t.index ["slug"], name: "index_websites_on_slug", unique: true
    t.index ["subdomain"], name: "index_websites_on_subdomain", unique: true
    t.index ["user_id"], name: "index_websites_on_user_id"
    t.index ["website_template_id"], name: "index_websites_on_website_template_id"
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
  add_foreign_key "comments", "lessons"
  add_foreign_key "comments", "users"
  add_foreign_key "course_modules", "courses"
  add_foreign_key "documents", "lessons"
  add_foreign_key "feature_request_votes", "feature_requests"
  add_foreign_key "feature_request_votes", "users"
  add_foreign_key "feature_requests", "users"
  add_foreign_key "leads", "users"
  add_foreign_key "lessons", "course_modules"
  add_foreign_key "messages", "users"
  add_foreign_key "user_roles", "roles"
  add_foreign_key "user_roles", "users"
  add_foreign_key "website_images", "websites"
  add_foreign_key "website_template_field_values", "website_template_fields"
  add_foreign_key "website_template_field_values", "websites"
  add_foreign_key "website_template_fields", "website_templates"
  add_foreign_key "websites", "users"
  add_foreign_key "websites", "website_templates"
end
