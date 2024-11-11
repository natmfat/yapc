import { MockDatabase } from "shitgen/MockDatabase";
import { Model } from "shitgen/client/Model";
export { sql } from "shitgen/client/sql";
const database = new MockDatabase({"user_":{"id": {"type":"bigint","modifierPrimaryKey":true,"modifierNotNull":true,"modifierDefault":true,"reference":null},"avatar_url": {"type":"text","modifierPrimaryKey":false,"modifierNotNull":true,"modifierDefault":false,"reference":null},"banner_url": {"type":"text","modifierPrimaryKey":false,"modifierNotNull":true,"modifierDefault":true,"reference":null},"username": {"type":"text","modifierPrimaryKey":false,"modifierNotNull":true,"modifierDefault":false,"reference":null},"first_name": {"type":"text","modifierPrimaryKey":false,"modifierNotNull":false,"modifierDefault":true,"reference":null},"last_name": {"type":"text","modifierPrimaryKey":false,"modifierNotNull":false,"modifierDefault":true,"reference":null},"bio": {"type":"text","modifierPrimaryKey":false,"modifierNotNull":false,"modifierDefault":true,"reference":null},"social_twitter": {"type":"text","modifierPrimaryKey":false,"modifierNotNull":false,"modifierDefault":true,"reference":null},"social_github": {"type":"text","modifierPrimaryKey":false,"modifierNotNull":false,"modifierDefault":true,"reference":null},"social_discord": {"type":"text","modifierPrimaryKey":false,"modifierNotNull":false,"modifierDefault":true,"reference":null},"social_youtube": {"type":"text","modifierPrimaryKey":false,"modifierNotNull":false,"modifierDefault":true,"reference":null},"social_website": {"type":"text","modifierPrimaryKey":false,"modifierNotNull":false,"modifierDefault":true,"reference":null}},"role_":{"id": {"type":"bigint","modifierPrimaryKey":true,"modifierNotNull":true,"modifierDefault":true,"reference":null},"name": {"type":"text","modifierPrimaryKey":false,"modifierNotNull":true,"modifierDefault":false,"reference":null},"description": {"type":"text","modifierPrimaryKey":false,"modifierNotNull":true,"modifierDefault":false,"reference":null},"level": {"type":"int","modifierPrimaryKey":false,"modifierNotNull":true,"modifierDefault":true,"reference":null}},"user_role_":{"user_id": {"type":"bigint","modifierPrimaryKey":false,"modifierNotNull":true,"modifierDefault":false,"reference":{"tableName":"user_","columnName":"id"}},"role_id": {"type":"bigint","modifierPrimaryKey":false,"modifierNotNull":true,"modifierDefault":false,"reference":{"tableName":"role_","columnName":"id"}}},"update_type_":{"id": {"type":"bigint","modifierPrimaryKey":true,"modifierNotNull":true,"modifierDefault":true,"reference":null},"name": {"type":"text","modifierPrimaryKey":false,"modifierNotNull":true,"modifierDefault":false,"reference":null}},"post_":{"id": {"type":"bigint","modifierPrimaryKey":true,"modifierNotNull":true,"modifierDefault":true,"reference":null},"user_id": {"type":"bigint","modifierPrimaryKey":false,"modifierNotNull":true,"modifierDefault":false,"reference":{"tableName":"user_","columnName":"id"}},"update_type_id": {"type":"bigint","modifierPrimaryKey":false,"modifierNotNull":true,"modifierDefault":false,"reference":{"tableName":"update_type_","columnName":"id"}},"heading": {"type":"text","modifierPrimaryKey":false,"modifierNotNull":true,"modifierDefault":false,"reference":null},"body": {"type":"text","modifierPrimaryKey":false,"modifierNotNull":true,"modifierDefault":false,"reference":null},"embed": {"type":"text","modifierPrimaryKey":false,"modifierNotNull":false,"modifierDefault":true,"reference":null},"stars": {"type":"bigint","modifierPrimaryKey":false,"modifierNotNull":true,"modifierDefault":true,"reference":null},"pinned": {"type":"boolean","modifierPrimaryKey":false,"modifierNotNull":true,"modifierDefault":true,"reference":null},"created_at": {"type":"TIMESTAMPTZ","modifierPrimaryKey":false,"modifierNotNull":true,"modifierDefault":true,"reference":null},"updated_at": {"type":"TIMESTAMPTZ","modifierPrimaryKey":false,"modifierNotNull":true,"modifierDefault":true,"reference":null}},"tag_":{"id": {"type":"bigint","modifierPrimaryKey":true,"modifierNotNull":true,"modifierDefault":true,"reference":null},"name": {"type":"text","modifierPrimaryKey":false,"modifierNotNull":true,"modifierDefault":false,"reference":null},"approved": {"type":"boolean","modifierPrimaryKey":false,"modifierNotNull":true,"modifierDefault":true,"reference":null}},"post_tag_":{"post_id": {"type":"bigint","modifierPrimaryKey":false,"modifierNotNull":true,"modifierDefault":false,"reference":{"tableName":"post_","columnName":"id"}},"tag_id": {"type":"bigint","modifierPrimaryKey":false,"modifierNotNull":true,"modifierDefault":false,"reference":{"tableName":"tag_","columnName":"id"}}},"comment_":{"post_id": {"type":"bigint","modifierPrimaryKey":false,"modifierNotNull":true,"modifierDefault":false,"reference":{"tableName":"post_","columnName":"id"}},"user_id": {"type":"bigint","modifierPrimaryKey":false,"modifierNotNull":true,"modifierDefault":false,"reference":{"tableName":"user_","columnName":"id"}},"body": {"type":"text","modifierPrimaryKey":false,"modifierNotNull":true,"modifierDefault":false,"reference":null},"stars": {"type":"bigint","modifierPrimaryKey":false,"modifierNotNull":true,"modifierDefault":true,"reference":null},"created_at": {"type":"TIMESTAMPTZ","modifierPrimaryKey":false,"modifierNotNull":true,"modifierDefault":true,"reference":null},"updated_at": {"type":"TIMESTAMPTZ","modifierPrimaryKey":false,"modifierNotNull":true,"modifierDefault":true,"reference":null}},"featured_":{"post_id": {"type":"bigint","modifierPrimaryKey":false,"modifierNotNull":true,"modifierDefault":false,"reference":{"tableName":"post_","columnName":"id"}},"user_id": {"type":"bigint","modifierPrimaryKey":false,"modifierNotNull":true,"modifierDefault":false,"reference":{"tableName":"user_","columnName":"id"}},"approved": {"type":"boolean","modifierPrimaryKey":false,"modifierNotNull":true,"modifierDefault":true,"reference":null},"created_at": {"type":"TIMESTAMPTZ","modifierPrimaryKey":false,"modifierNotNull":true,"modifierDefault":true,"reference":null},"updated_at": {"type":"TIMESTAMPTZ","modifierPrimaryKey":false,"modifierNotNull":true,"modifierDefault":true,"reference":null}}});
export type UserData = {
  id: number;
  avatar_url: string;
  banner_url: string;
  username: string;
  first_name: string | null;
  last_name: string | null;
  bio: string | null;
  social_twitter: string | null;
  social_github: string | null;
  social_discord: string | null;
  social_youtube: string | null;
  social_website: string | null;
}
export type UserAutoGenerated = "id";
export type UserOptional = "id" | "banner_url" | "first_name" | "last_name" | "bio" | "social_twitter" | "social_github" | "social_discord" | "social_youtube" | "social_website";
export type UserRelationship = {
}
const user = new Model<UserData, UserAutoGenerated, UserOptional, UserRelationship>("user_", database);
export type RoleData = {
  id: number;
  name: string;
  description: string;
  level: number;
}
export type RoleAutoGenerated = "id";
export type RoleOptional = "id" | "level";
export type RoleRelationship = {
}
const role = new Model<RoleData, RoleAutoGenerated, RoleOptional, RoleRelationship>("role_", database);
export type UserRoleData = {
  user_id: number;
  role_id: number;
}
export type UserRoleAutoGenerated = never;
export type UserRoleOptional = never;
export type UserRoleRelationship = {
  user_id: UserData;
  role_id: RoleData;
}
const userRole = new Model<UserRoleData, UserRoleAutoGenerated, UserRoleOptional, UserRoleRelationship>("user_role_", database);
export type UpdateTypeData = {
  id: number;
  name: string;
}
export type UpdateTypeAutoGenerated = "id";
export type UpdateTypeOptional = "id";
export type UpdateTypeRelationship = {
}
const updateType = new Model<UpdateTypeData, UpdateTypeAutoGenerated, UpdateTypeOptional, UpdateTypeRelationship>("update_type_", database);
export type PostData = {
  id: number;
  user_id: number;
  update_type_id: number;
  heading: string;
  body: string;
  embed: string | null;
  stars: number;
  pinned: boolean;
  created_at: string;
  updated_at: string;
}
export type PostAutoGenerated = "id";
export type PostOptional = "id" | "embed" | "stars" | "pinned" | "created_at" | "updated_at";
export type PostRelationship = {
  user_id: UserData;
  update_type_id: UpdateTypeData;
}
const post = new Model<PostData, PostAutoGenerated, PostOptional, PostRelationship>("post_", database);
export type TagData = {
  id: number;
  name: string;
  approved: boolean;
}
export type TagAutoGenerated = "id";
export type TagOptional = "id" | "approved";
export type TagRelationship = {
}
const tag = new Model<TagData, TagAutoGenerated, TagOptional, TagRelationship>("tag_", database);
export type PostTagData = {
  post_id: number;
  tag_id: number;
}
export type PostTagAutoGenerated = never;
export type PostTagOptional = never;
export type PostTagRelationship = {
  post_id: PostData;
  tag_id: TagData;
}
const postTag = new Model<PostTagData, PostTagAutoGenerated, PostTagOptional, PostTagRelationship>("post_tag_", database);
export type CommentData = {
  post_id: number;
  user_id: number;
  body: string;
  stars: number;
  created_at: string;
  updated_at: string;
}
export type CommentAutoGenerated = never;
export type CommentOptional = "stars" | "created_at" | "updated_at";
export type CommentRelationship = {
  post_id: PostData;
  user_id: UserData;
}
const comment = new Model<CommentData, CommentAutoGenerated, CommentOptional, CommentRelationship>("comment_", database);
export type FeaturedData = {
  post_id: number;
  user_id: number;
  approved: boolean;
  created_at: string;
  updated_at: string;
}
export type FeaturedAutoGenerated = never;
export type FeaturedOptional = "approved" | "created_at" | "updated_at";
export type FeaturedRelationship = {
  post_id: PostData;
  user_id: UserData;
}
const featured = new Model<FeaturedData, FeaturedAutoGenerated, FeaturedOptional, FeaturedRelationship>("featured_", database);
export const shitgen = { user, role, userRole, updateType, post, tag, postTag, comment, featured };