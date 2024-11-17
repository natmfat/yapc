CREATE TYPE user_provider_strategy_ AS ENUM ('google', 'discord', 'github', 'form');

CREATE TYPE post_update_type_ AS ENUM ('update', 'project', 'article');


CREATE TABLE IF NOT EXISTS user_ (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  avatar_url text NOT NULL,
  banner_url text NOT NULL DEFAULT '/banner/default.png',

  username text NOT NULL,
  first_name text DEFAULT NULL,
  last_name text DEFAULT NULL,
  bio text DEFAULT NULL,

  social_twitter text DEFAULT NULL,
  social_github text DEFAULT NULL,
  social_discord text DEFAULT NULL,
  social_youtube text DEFAULT NULL,
  social_website text DEFAULT NULL,

  onboarding_complete boolean NOT NULL DEFAULT false
);

-- connected account, like github or discord
-- stores the user id (to verify account), and some identifier of the connection
CREATE TABLE IF NOT EXISTS user_provider_ (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id bigint REFERENCES user_(id),
  strategy user_provider_strategy_ NOT NULL,
  profile_id text NOT NULL, -- serves as the username/identifier/email of the provider
  profile_password text NOT NULL -- serves as the password or auth token of the provider
);

CREATE TABLE IF NOT EXISTS role_ (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name text NOT NULL,
  description text NOT NULL,

  -- refers to "strength" of permissions
  -- 0 might mean "base" user, while 3 might mean "moderator" 
  -- (so anything greater than or equal to 3 can perform a restricted action)
  level int NOT NULL DEFAULT 0
);

-- many to many, users can have many roles
CREATE TABLE IF NOT EXISTS user_role_ (
  user_id bigint REFERENCES user_(id),
  role_id bigint REFERENCES role_(id),

  PRIMARY KEY (user_id, role_id)
);

CREATE TABLE IF NOT EXISTS notification_ (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id bigint REFERENCES user_(id),
  body text NOT NULL
);

CREATE TABLE IF NOT EXISTS post_ (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id bigint REFERENCES user_(id),
  update_type post_update_type_ NOT NULL,
  thumbnail_url text NOT NULL,
  heading text NOT NULL,
  body text NOT NULL,
  embed text DEFAULT NULL,
  pinned boolean NOT NULL DEFAULT false,

  stat_stars bigint NOT NULL DEFAULT 0,
  stat_views bigint NOT NULL DEFAULT 0,
  -- stat_comments - derived property that we should add

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- post tags
CREATE TABLE IF NOT EXISTS tag_ (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name text NOT NULL,
  approved boolean NOT NULL DEFAULT FALSE
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
  approved boolean NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  PRIMARY KEY (post_id, user_id)
);
