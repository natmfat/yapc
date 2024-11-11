CREATE TABLE IF NOT EXISTS user_ (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  avatar_url text NOT NULL,
  banner_url text NOT NULL DEFAULT '/banner/default.png',

  username text NOT NULL,
  first_name text,
  last_name text,
  bio text,

  social_twitter text DEFAULT NULL,
  social_github text DEFAULT NULL,
  social_discord text DEFAULT NULL,
  social_youtube text DEFAULT NULL,
  social_website text DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS role_ (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name text NOT NULL,
  description text NOT NULL
);

-- many to many, users can have many roles
CREATE TABLE IF NOT EXISTS user_role_ (
  user_id bigint REFERENCES user_(id),
  role_id bigint REFERENCES role_(id),

  PRIMARY KEY (user_id, role_id)
);

-- post update type 
-- published an update, project, post
CREATE TABLE IF NOT EXISTS update_type_ (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name text NOT NULL
);

CREATE TABLE IF NOT EXISTS post_ (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id bigint REFERENCES user_(id),
  update_type_id bigint REFERENCES update_type_(id),
  heading text NOT NULL,
  body text NOT NULL,
  stars bigint NOT NULL DEFAULT 0,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- post tags
CREATE TABLE IF NOT EXISTS tag_ (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name text NOT NULL
);

-- many to many, post can have many tags
CREATE TABLE IF NOT EXISTS post_tag_ (
  post_id bigint REFERENCES post_(id) ON DELETE CASCADE,
  tag_id bigint REFERENCES tag_(id) ON DELETE CASCADE,

  PRIMARY KEY (post_id, tag_id)
);

-- comments that go on posts
CREATE TABLE IF NOT EXISTS comment_ (
  post_id bigint REFERENCES post_(id),
  user_id bigint REFERENCES user_(id),
  body text NOT NULL,
  stars bigint NOT NULL DEFAULT 0,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- featured projects (have to be manually "cleared")
-- most recent approved projects are displayed on the dashboard
CREATE TABLE IF NOT EXISTS featured_ (
  post_id bigint REFERENCES post_(id),
  user_id bigint REFERENCES user_(id),
  approved boolean NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  PRIMARY KEY (post_id, user_id)
);
